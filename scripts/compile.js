// scripts/compile.js
// BandTwine 高级编译脚本
// 特性:
// - 从 'bandtwine_src' 目录加载多个 .json 源文件
// - 预编译文本标记，提升运行时性能
// - 智能冲突检测 (节点、元数据、变量)
// - 支持 '--force' 参数以强制合并
// - 分别输出元数据和核心故事数据，优化代码结构

const fs = require('fs');
const path = require('path');

// --- 配置 ---
const STORY_SOURCE_DIR = path.join(__dirname, '../bandtwine_src');
const METADATA_OUTPUT_PATH = path.join(__dirname, '../src/common/metadata.js');
const STORY_OUTPUT_PATH = path.join(__dirname, '../src/common/story.compiled.js');

/**
 * 解析包含标记的文本，并将其转换为结构化的指令数组。
 * @param {string} text - 包含标记的原始文本。
 * @returns {Array<Object>} - 代表渲染指令的 segment 对象数组。
 */
function compileText(text) {
    if (typeof text !== 'string' || !text) {
        return [];
    }
    const segments = [];
    // 正则表达式，用于匹配所有支持的标记类型
    const regex = /(\{\w+\.?[\w.]*\}|\n|\$\([^)]+\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // 添加标记前的纯文本部分
        if (match.index > lastIndex) {
            segments.push({ type: 'text', content: text.substring(lastIndex, match.index) });
        }

        const matched = match[0];
        if (matched === '\n') {
            segments.push({ type: 'newline' });
        } else if (matched.startsWith('{var.')) {
            segments.push({ type: 'variable', path: matched.slice(5, -1) });
        } else if (matched.startsWith('{cond.')) {
            segments.push({ type: 'condition', id: matched.slice(6, -1) });
        } else if (matched.startsWith('{random.')) {
            segments.push({ type: 'random', id: matched.slice(8, -1) });
        } else if (matched.startsWith('{img.')) {
            segments.push({ type: 'image', id: matched.slice(5, -1) });
        } else if (matched.startsWith('$(')) {
            segments.push({ type: 'expression', code: matched.slice(2, -1) });
        } else if (/^\{\d+\}$/.test(matched)) {
            segments.push({ type: 'link', index: parseInt(matched.slice(1, -1), 10) });
        } else {
            // 未知或格式错误的标记，作为纯文本处理
            segments.push({ type: 'text', content: matched });
        }
        lastIndex = match.index + matched.length;
    }

    // 添加最后一个标记后的纯文本部分
    if (lastIndex < text.length) {
        segments.push({ type: 'text', content: text.substring(lastIndex) });
    }
    return segments;
}

/**
 * 带有冲突警告的深度合并函数，主要用于合并变量。
 * @param {Object} target - 目标对象。
 * @param {Object} source - 源对象。
 * @param {string} sourceFileName - 源文件名。
 * @param {Array<string>} warnings - 警告信息数组。
 * @param {string} [path=''] - 当前递归路径，用于生成警告信息。
 */
function deepMergeWithWarnings(target, source, sourceFileName, warnings, path = '') {
    for (const key in source) {
        if (!source.hasOwnProperty(key)) continue;

        const newPath = path ? `${path}.${key}` : key;
        const targetValue = target[key];
        const sourceValue = source[key];

        if (targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue) &&
            sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
            deepMergeWithWarnings(targetValue, sourceValue, sourceFileName, warnings, newPath);
        } else if (target.hasOwnProperty(key) && targetValue !== sourceValue) {
            // 如果键已存在且值不同（且不是对象，无法深入合并），则记录警告
            warnings.push(`变量覆盖: '${newPath}' 在 '${sourceFileName}' 中覆盖了先前的值。`);
            target[key] = sourceValue;
        } else {
            target[key] = sourceValue;
        }
    }
}

// --- 主执行流程 ---

function main() {
    console.log('🚀 开始 BandTwine 编译流程...');

    // 1. 解析命令行参数
    const forceMerge = process.argv.includes('--force');

    // 2. 初始化上下文
    const context = {
        nodeRegistry: new Map(), // { nodeId: fileName }
        conflicts: [],           // 致命冲突信息
        warnings: [],            // 非致命警告信息
    };

    let combinedStoryData = {};

    // 3. 读取并合并所有源文件
    try {
        if (!fs.existsSync(STORY_SOURCE_DIR)) {
            throw new Error(`源目录不存在: ${STORY_SOURCE_DIR}`);
        }
        const files = fs.readdirSync(STORY_SOURCE_DIR).filter(file => file.endsWith('.json'));
        if (files.length === 0) {
            throw new Error(`在 ${STORY_SOURCE_DIR} 中没有找到任何 .json 文件。`);
        }
        console.log(`发现 ${files.length} 个故事源文件: ${files.join(', ')}`);

        for (const file of files) {
            const filePath = path.join(STORY_SOURCE_DIR, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);

            // --- 策略化合并 ---
            for (const key in jsonData) {
                if (!jsonData.hasOwnProperty(key)) continue;

                const sourceValue = jsonData[key];
                const targetValue = combinedStoryData[key];

                switch (key) {
                    case 'nodes':
                        for (const nodeId in sourceValue) {
                            if (context.nodeRegistry.has(nodeId)) {
                                context.conflicts.push(`节点冲突: ID '${nodeId}' 在 '${file}' 和 '${context.nodeRegistry.get(nodeId)}' 中重复定义。`);
                            } else {
                                context.nodeRegistry.set(nodeId, file);
                            }
                        }
                        combinedStoryData[key] = { ...(targetValue || {}), ...sourceValue };
                        break;
                    
                    case 'variables':
                        if (!targetValue) combinedStoryData[key] = {};
                        deepMergeWithWarnings(combinedStoryData[key], sourceValue, file, context.warnings, 'variables');
                        break;

                    case 'metadata':
                        if (targetValue && typeof targetValue === 'object') {
                            for (const metaKey in sourceValue) {
                                if (targetValue.hasOwnProperty(metaKey)) {
                                    context.warnings.push(`元数据覆盖: 键 '${metaKey}' 在 '${file}' 中覆盖了先前的值。`);
                                }
                            }
                        }
                        combinedStoryData[key] = { ...(targetValue || {}), ...sourceValue };
                        break;

                    default:
                        // 对于其他未定义策略的顶级键，默认进行覆盖
                        if (combinedStoryData.hasOwnProperty(key)) {
                             context.warnings.push(`顶级键覆盖: '${key}' 在 '${file}' 中覆盖了先前的值。`);
                        }
                        combinedStoryData[key] = sourceValue;
                        break;
                }
            }
        }
        console.log('所有故事源文件已初步合并。');

    } catch (error) {
        console.error(`\n❌ 错误：处理 ${STORY_SOURCE_DIR} 目录失败。`, error.message);
        process.exit(1);
    }

    // 4. 处理冲突与警告
    if (context.warnings.length > 0) {
        console.warn('\n⚠️  发现以下非致命问题:');
        context.warnings.forEach(w => console.warn(`  - ${w}`));
    }

    if (context.conflicts.length > 0) {
        console.error('\n❌ 发现致命的节点ID冲突:');
        context.conflicts.forEach(c => console.error(`  - ${c}`));
        
        if (!forceMerge) {
            console.error('\n编译因节点冲突而终止。请解决冲突，或使用 --force 参数强制合并（后加载的文件会覆盖先前的定义）。');
            process.exit(1);
        } else {
            console.log('\n--force 参数已启用，将继续编译。后加载文件中的冲突节点会覆盖先前的定义。\n');
        }
    }

    // 5. 拆分 metadata
    const metadata = combinedStoryData.metadata || {};
    delete combinedStoryData.metadata;

    // 6. 编译节点文本
    if (combinedStoryData.nodes) {
        console.log('开始编译所有节点的 text 字段...');
        let compiledCount = 0;
        for (const nodeId in combinedStoryData.nodes) {
            const node = combinedStoryData.nodes[nodeId];
            if (node.hasOwnProperty('text')) {
                node.segments = compileText(node.text);
                delete node.text; // 删除原始文本，减小最终包体积
                compiledCount++;
            }
        }
        console.log(`节点编译完成，共处理了 ${compiledCount} 个节点。`);
    }

    // 6.5. 后处理：合并连续的文本节点
if (combinedStoryData.nodes) {
    console.log('开始后处理：合并连续文本节点...');
    for (const nodeId in combinedStoryData.nodes) {
        const node = combinedStoryData.nodes[nodeId];
        if (node.segments && node.segments.length > 1) {
            const mergedSegments = [];
            let textBuffer = '';

            for (const segment of node.segments) {
                if (segment.type === 'text') {
                    textBuffer += segment.content;
                } else {
                    if (textBuffer) {
                        mergedSegments.push({ type: 'text', content: textBuffer });
                        textBuffer = '';
                    }
                    mergedSegments.push(segment);
                }
            }
            // 处理结尾可能残留的 textBuffer
            if (textBuffer) {
                mergedSegments.push({ type: 'text', content: textBuffer });
            }
            node.segments = mergedSegments;
        }
    }
    console.log('文本节点合并完成。');
}

    // 7. 生成并写入最终的 JS 模块
    try {
        const metadataOutput = `// BandTwine 自动生成: 元数据\n// 生成时间: ${new Date().toISOString()}\n\nexport default ${JSON.stringify(metadata, null, 2)};\n`;
        fs.writeFileSync(METADATA_OUTPUT_PATH, metadataOutput, 'utf8');
        console.log(`✅ 已生成轻量元数据文件: ${METADATA_OUTPUT_PATH}`);

        const storyOutput = `// BandTwine 自动生成: 核心故事数据\n// 生成时间: ${new Date().toISOString()}\n\nexport default ${JSON.stringify(combinedStoryData, null, 2)};\n`;
        fs.writeFileSync(STORY_OUTPUT_PATH, storyOutput, 'utf8');
        console.log(`✅ 已生成核心故事数据文件: ${STORY_OUTPUT_PATH}`);
    } catch (error) {
        console.error('\n❌ 错误：写入编译文件失败。', error.message);
        process.exit(1);
    }

    console.log('\n🎉 BandTwine 编译流程全部完成！');
}

// 执行主函数
main();

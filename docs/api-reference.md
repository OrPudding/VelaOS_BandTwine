# API 参考 (API Reference)

欢迎来到 BandTwine 的 API 参考。本章节是为希望深入了解引擎工作原理、进行高级定制或二次开发的开发者准备的。

这里详细列出了构成一个 BandTwine 故事（`common/data.json`）的所有可配置项，并解释了它们在引擎内部的作用和行为。

---

### 故事结构 (Story Structure)

*   **[元数据 (`metadata`)](#metadata-元数据)**: 定义故事的基本信息，如标题、作者和入口。
*   **[变量 (`variables`)](#variables-变量)**: 初始化游戏世界的所有状态和数据。
*   **[节点 (`nodes`)](#nodes-节点)**: 构建故事流程的基本单位，包含场景、事件和对话。

### 节点内部结构 (Node Internals)

*   **[链接 (`links`)](#links-链接)**: 定义玩家的选择和故事的岔路口。
*   **[动作 (`actions`)](#actions-动作)**: 驱动故事状态变化的核心指令。
*   **[条件文本 (`conds`)](#conds-条件文本)**: 根据条件动态显示不同的文本。
*   **[随机事件 (`randoms`)](#randoms-随机事件)**: 为故事增加不确定性和重玩价值。
*   **[图片 (`imgs`)](#imgs-图片)**: 在场景中嵌入图片资源。

### 核心概念 (Core Concepts)

*   **[条件表达式 (Condition Strings)](#条件表达式-condition-strings)**: 控制逻辑判断的强大字符串语法。
*   **[文本标记 (Text Markers)](#文本标记-text-markers)**: 在文本中动态插入内容的特殊标记。

---

## <a id="metadata-元数据"></a> `metadata` (元数据)

`metadata` 对象包含了故事的全局信息和配置。

| 键名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `title` | `String` | 故事的标题。 |
| `author` | `String` | 故事的作者。 |
| `version` | `String` | 故事的版本号。 |
| `indexNode` | `String` | **(必需)** 故事开始的第一个节点的ID。引擎将从这个节点开始加载。 |

**示例:**
```json
"metadata": {
  "title": "迷雾森林的秘密",
  "author": "Manus AI",
  "version": "1.0.0",
  "indexNode": "start"
}
```

---

## <a id="variables-变量"></a> `variables` (变量)

`variables` 对象用于初始化游戏世界的所有状态和数据。

| 顶级键名 | 描述 |
| :--- | :--- |
| `player` | (推荐) 用于存放玩家相关的变量，如属性、物品等。 |
| `world` | (推荐) 用于存放世界相关的变量，如时间、天气等。 |
| `show` | **(特殊)** 用于在游戏侧边栏显示状态。 |
| `temp` | **(特殊)** 用于存放临时变量，**不会被存档**。 |
| *(自定义)* | 您可以定义任何其他顶级对象来组织您的变量。 |

### `variables.world` (世界变量)
引擎会自动处理 `world` 对象下的特定变量：

| 键名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `time` | `Number` | **(核心)** 游戏的核心时间，单位为分钟 (0-1439)。 |
| `day` | `Number` | **(核心)** 游戏的天数。 |
| `formattedTime` | `String` | **(需预定义)** 引擎会自动更新此变量为 "HH:MM" 格式的时间。 |
| `timePeriod` | `String` | **(需预定义)** 引擎会自动更新此变量为 "早晨"、"夜晚" 等时间段。 |

### `variables.show` (侧边栏变量)
`show` 对象下的每个子对象都会被渲染到游戏侧边栏，用于实时显示状态。

| 键名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `desc` | `String` | 在侧边栏显示的描述文本（标签）。 |
| `value`| `Any` | 该状态的初始值。 |

**示例:**
```json
"variables": {
  "world": {
    "time": 480,
    "day": 1,
    "formattedTime": "08:00",
    "timePeriod": "早晨"
  },
  "show": {
    "player_health": { "desc": "生命值", "value": 100 }
  }
}
```

---

## <a id="nodes-节点"></a> `nodes` (节点)

`nodes` 对象是所有故事场景的集合。它的每个键都是一个唯一的节点ID，值是描述该节点内容的节点对象。

| 键名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `title` | `String` | (可选) 节点的标题，会显示在游戏界面顶部。 |
| `text` | `String` | **(必需)** 节点的主要文本内容，支持[文本标记](#文本标记-text-markers)。 |
| `links` | `Array` | (可选) 定义从该节点出发的[链接](#links-链接)（选项）。 |
| `actions` | `Array` | (可选) 定义进入该节点时自动执行的[动作](#actions-动作)。 |
| `conds` | `Object` | (可选) 定义该节点可用的[条件文本](#conds-条件文本)组。 |
| `randoms` | `Object` | (可选) 定义该节点可用的[随机事件](#randoms-随机事件)组。 |
| `imgs` | `Object` | (可选) 定义该节点可用的[图片](#imgs-图片)资源。 |

---

## <a id="links-链接"></a> `links` (链接)

`links` 是一个对象数组，定义了玩家可以做出的选择。**所有链接都必须在节点的 `text` 中通过 `{数字}` 标记引用才能显示。**

| 键名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `text` | `String` | **(必需)** 链接显示的文本。 |
| `target` | `String` | **(必须)** 点击后跳转的目标节点ID。 |
| `condition` | `String` | (可选) 一个[条件表达式](#条件表达式-condition-strings)。若不满足，链接将变灰且不可点击。 |
| `actions` | `Array` | (可选) 点击链接后、跳转前执行的[动作](#actions-动作)数组。 |
| `variants` | `Array` | (可选) “变体链接”数组，可根据不同条件显示不同文本或跳转到不同目标。 |
| `random` | `Array` | (可选) “随机链接”数组，点击后会从数组中随机选择一个结果执行。 |

---

## <a id="actions-动作"></a> `actions` (动作)

`actions` 是一个对象数组，是驱动故事状态变化的核心指令。

| `type` 类型 | 描述 | 主要参数 |
| :--- | :--- | :--- |
| `set` | 设置变量的值。 | `target`, `value` |
| `add` | 对数值型变量进行加法。 | `target`, `value` |
| `toggle` | 切换布尔变量的值。 | `target` |
| `random` | 执行一个在 `randoms` 中定义的随机动作组。 | `id` |
| `vibrate` | 触发设备振动。 | `mode` ("long" / "short") |
| `autosave` | 自动存档到存档位 `0`。 | - |
| `addListener` | 添加一个监听器。 | `id`, `condition`, `actions`, `once` |
| `removeListener`| 移除一个监听器。 | `id` ("all" 为全部) |
| `advanceTime` | 推进游戏时间。 | `minutes` |
| `toast` | 显示一个短暂的提示信息。 | `message`, `duration` |
| `jump` | 强制跳转到指定节点。 | `target`, `condition`, `beforeActions`, `afterActions` |

---

## <a id="conds-条件文本"></a> `conds` (条件文本)

`conds` 对象用于定义条件文本组，与 `{cond.ID}` 标记配合使用。

**结构:**
```json
"conds": {
  "组ID": [
    { "condition": "条件1", "text": "文本1" },
    { "condition": "条件2", "text": "文本2" },
    { "text": "默认文本" }
  ]
}
```
引擎会从上到下检查，并使用第一个满足 `condition` 的 `text`。

---

## <a id="randoms-随机事件"></a> `randoms` (随机事件)

`randoms` 对象用于定义随机事件组，与 `{random.ID}` 标记或 `random` 动作配合使用。

**结构:**
```json
"randoms": {
  "组ID": [
    { "text": "结果A", "weight": 70, "actions": [...] },
    { "text": "结果B", "weight": 30, "condition": "var.player.hasItem" }
  ]
}
```
引擎会根据 `weight` (权重) 和 `condition` (条件) 进行加权随机选择。

---

## <a id="imgs-图片"></a> `imgs` (图片)

`imgs` 对象用于定义图片资源，与 `{img.ID}` 标记配合使用。

| 键名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `path` | `String` | **(必需)** 图片的路径。相对路径会自动添加 `/common/images/` 前缀。 |
| `width`| `Number` | (可选) 图片显示的宽度。 |

---

## <a id="条件表达式-condition-strings"></a> 条件表达式 (Condition Strings)

条件表达式是一个强大的字符串，用于所有需要逻辑判断的地方 (`condition` 字段)。

| 语法 | 示例 | 描述 |
| :--- | :--- | :--- |
| 比较 | `"var.player.gold >= 100"` | 支持 `==`, `!=`, `>`, `<`, `>=`, `<=`。 |
| 逻辑 | `"var.player.hasKey && !var.door.isLocked"` | 支持 `&&` (与), `||` (或), `!` (非)。 |
| 表达式 | `"$(var.player.str + var.player.agi > 20)"` | 执行括号内的 JavaScript 表达式。 |
| 状态 | `"hourChanged"`, `"dayChanged"` | 引擎内置的特殊状态。 |

---

## <a id="文本标记-text-markers"></a> 文本标记 (Text Markers)

文本标记是在节点的 `text` 属性中使用的特殊占位符，用于动态插入内容。

| 标记 | 示例 | 描述 |
| :--- | :--- | :--- |
| 变量 | `{var.player.name}` | 显示指定变量的当前值。 |
| 链接 | `{0}`, `{1}`... | **(核心规则)** 引用并显示 `links` 数组中对应索引的链接。 |
| 条件 | `{cond.desc_id}` | 从 `conds` 中选择一段符合条件的文本显示。 |
| 随机 | `{random.event_id}` | 从 `randoms` 中随机选择一段文本显示。 |
| 图片 | `{img.image_id}` | 从 `imgs` 中选择一张图片嵌入。 |
| 换行 | `\n` | 用于在文本中手动换行。 |

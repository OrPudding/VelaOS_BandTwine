# metadata：故事的元信息

`metadata` 对象是 `data.json` 的顶层属性之一，它包含了关于您故事的基本信息和全局配置。

---

```json
{
  "metadata": {
    "title": "我的第一个互动故事",
    "description": "这是一个示例互动故事",
    "author": "你的名字",
    "version": "1.0.0",
    "versionCode": 1,
    "releaseDate": "2025-09-01",
    "license": "MIT",
    "copyright": "Copyright © 2025 你的名字.",
    "indexNode": "start"
  }
}
```

*   `"title"`：一个字符串，表示您的故事的名称。
*   `"description"`：一个字符串，提供故事的简短描述或副标题。
*   `"author"`：一个字符串，表示故事的创作者或团队名称。
*   `"version"`：一个字符串，用于标识故事的当前版本。
*   `"versionCode"`：一个数字，表示故事的内部版本号，通常用于更新检查。
*   `"releaseDate"`：一个字符串，表示故事的发布日期，格式为 YYYY-MM-DD。
*   `"license"`：一个字符串，表示故事的许可证信息。
*   `"copyright"`：一个字符串，包含故事的版权声明。
*   `"indexNode"`：**这是 `metadata` 中最重要的属性之一**。它是一个字符串，其值必须与您在 `nodes` 对象中定义的某个节点的ID完全匹配。游戏将从 `indexNode` 指定的节点开始加载故事。

正确配置 `metadata` 可以帮助您更好地组织故事，并为玩家提供清晰的故事信息。在下一章节中，我们将深入探讨 `nodes` 对象，它是构建故事流程的核心。
# 文本格式和标记：让故事生动起来

在 `common/data.json` 中，节点的 `"text"` 属性是您编写故事内容的地方。为了让您的故事不仅仅是枯燥的文字，BandTwine 引入了一套强大的文本标记系统。这些标记允许您在文本中动态地插入变量的值、根据条件显示不同的内容、随机生成文本，甚至嵌入交互式链接和图片。
>**画饼**: 在以后的版本中将支持 **自定义组件**

## 4.1 基本文本与换行

最简单的文本就是纯文本。您可以在 `"text"` 属性中直接输入故事内容。为了更好地组织文本，您可以使用 `\n` 来表示换行。

```json
"example_node": {
  "text": "你走进了一个黑暗的洞穴。\n一股潮湿的空气扑面而来。"
}
```

## 4.2 变量标记：`{var.变量路径}`

变量是存储游戏状态和玩家数据的核心。您可以使用 `{var.变量路径}` 标记在文本中直接引用并显示变量的当前值。

**示例：**
假设您的 `"variables"` 中有以下定义：
```json
"variables": {
  "player": {
    "name": "艾瑞克",
    "gold": 100
  },
  "world": {
    "time": 480,
    "day": 1
  }
}
```
您可以在节点文本中这样使用：
```json
"welcome_node": {
  "text": "欢迎你，{var.player.name}！你现在拥有 {var.player.gold} 枚金币。现在是第 {var.world.day} 天的 {var.world.formattedTime}，属于 {var.world.timePeriod}。"
}
```
> **引擎魔法：自动时间变量**
> 您无需手动创建或更新 `{var.world.formattedTime}` 和 `{var.world.timePeriod}`。BandTwine 引擎会根据核心时间变量 `{var.world.time}`（单位：分钟）自动计算并生成它们：
> *   `{var.world.formattedTime}`: 将分钟数转换为 "HH:MM" 格式，如 "08:00"。
> *   `{var.world.timePeriod}`: 根据小时数判断当前是“早晨”、“中午”、“夜晚”等。

## 4.3 条件标记：`{cond.条件组ID}`

条件标记允许您根据特定的条件显示不同的文本内容，这对于创建动态的对话和描述非常有用。

**工作原理：**
当引擎解析到 `{cond.条件组ID}` 标记时，它会去当前节点的 `"conds"` 属性中查找对应的条件组。系统会从上到下检查该组内的条件项，第一个满足 `"condition"` 的项的 `"text"` 将被插入到文本中。

**示例：**
```json
"forest_path": {
  "title": "森林小径",
  "text": "你走在森林小径上。{cond.path_description}",
  "conds": {
    "path_description": [
      { "condition": "var.player.hasMap", "text": "你对照着地图，对周围的环境了如指掌。" },
      { "condition": "var.player.isLost", "text": "你感到有些迷失，周围的树木看起来都一样。" },
      { "text": "小径蜿蜒向前，通向未知的深处。" }
    ]
  }
}
```
> **提示**: 如果前面的所有条件都不满足，条件组中最后一个没有 `"condition"` 的项，会成为默认文本。

## 4.4 随机标记：`{random.随机组ID}`

随机标记允许您在文本中插入随机选择的内容，增加故事的重玩价值。

**工作原理：**
当引擎解析到 `{random.随机组ID}` 标记时，它会去当前节点的 `"randoms"` 属性中查找对应的随机组。系统会根据每个选项的 `"weight"`（权重）进行加权随机选择。

**示例：**
```json
"cave_entrance": {
  "title": "洞穴入口",
  "text": "你来到一个洞穴入口。{random.cave_smell}",
  "randoms": {
    "cave_smell": [
      { "text": "一股潮湿的泥土气息扑鼻而来。", "weight": 50 },
      { "text": "你闻到了一股淡淡的硫磺味。", "weight": 30, "actions": [{ "type": "toast", "message": "你感到一丝不安。" }] },
      { "text": "空气中弥漫着一股甜腻的花香。", "weight": 20 }
    ]
  }
}
```

## 4.5 链接标记：`{数字}`

**这是 BandTwine 的核心规则**：所有在 `"links"` 数组中定义的链接，都必须通过 `{数字}` 标记在 `"text"` 中引用，才能被显示和点击。

**语法：** `{链接索引}`

**工作原理：**
这里的 `数字` 是指该链接在当前节点的 `"links"` 数组中的**索引（从0开始）**。引擎会查找对应索引的链接对象，并将其 `"text"` 属性显示为可点击的文本。

**示例：**
```json
"library_node": {
  "text": "你在图书馆中发现了一本古老的书籍。你决定 {0} 还是 {1}？",
  "links": [
    { "text": "翻开它", "target": "ancient_book_read" },
    { "text": "离开图书馆", "target": "exit_library" }
  ]
}
```

## 4.6 图片标记：`{img.图片ID}`

您可以使用 `{img.图片ID}` 标记在文本中插入图片。

**工作原理：**
当引擎解析到 `{img.图片ID}` 标记时，它会去当前节点的 `"imgs"` 属性中查找对应的图片定义。

**示例：**
```json
"forest_clearing": {
  "title": "森林空地",
  "text": "你来到一片开阔的森林空地。{img.clearing_view} 阳光透过树叶洒下斑驳的光影。",
  "imgs": {
    "clearing_view": {
      "path": "scenes/forest_clearing.png",
      "width": 200
    }
  }
}
```
> **图片路径**: 如果 `path` 是一个相对路径（如上例），引擎会自动在其前面加上 `/common/images/`，形成完整的路径 `/common/images/scenes/forest_clearing.png`。

## 4.7 脚本标记：`{script.脚本ID}`

`{script.脚本ID}` 标记是为未来扩展而预留的。目前，它主要用于在调试模式下输出日志，但未来可以用于在文本流中触发更复杂的自定义脚本逻辑。

通过灵活运用这些文本格式和标记，您可以创建出极具表现力和交互性的故事内容。在下一章节中，我们将深入探讨变量系统。

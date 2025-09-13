# 变量系统：管理故事状态的核心

在互动故事中，故事的状态是不断变化的。玩家的选择、时间的流逝、事件的发生，都会影响故事的走向。**变量系统**就是用来存储和管理这些动态变化数据的核心机制。通过变量，您可以记录玩家的属性、物品清单、任务进度、世界时间等一切您希望在故事中追踪的信息。

## 5.1 `variables` 对象的结构

所有变量都在 `common/data.json` 的顶层属性 `"variables"` 对象中进行初始化。您可以根据故事的需要，在其中定义任意层级的嵌套结构来组织您的变量。

```json
{
  "variables": {
    "player": {
      "name": "",
      "health": 100,
      "gold": 0,
      "inventory": [],
      "hasKey": false
    },
    "world": {
      "time": 480,
      "day": 1,
      "weather": "晴朗"
    },
    "quest": {
      "mainQuestStatus": "未开始"
    },
    "show": {
      "player_money": { "desc": "金钱", "value": 0 }
    }
  }
}
```
> **重要提示**：
> *   **初始值**: 在 `"variables"` 中定义的变量，都应该有一个初始值。这是游戏开始时变量的默认状态。
> *   **数据类型**: 变量可以是任何 JSON 支持的数据类型：字符串、数字、布尔值、数组和对象。
> *   **嵌套**: 建议根据逻辑关系对变量进行分组，例如将所有玩家相关的变量放在 `"player"` 对象下。

## 5.2 访问与修改变量

在 BandTwine 中，您主要通过两种方式与变量互动：

*   **访问变量**: 在节点的 `"text"` 中，使用 `{var.变量路径}` 标记来显示变量的当前值。例如：`"你的金币：{var.player.gold}"`。
*   **修改变量**: 在 `"actions"` 数组中，使用 `set`, `add`, `toggle` 等动作来改变变量的值。我们将在下一章详细介绍。

## 5.3 特殊变量：引擎的魔法口袋

BandTwine 引擎会自动处理一些特殊的变量，为您提供便利。

### 5.3.1 自动时间变量

您只需要在 `"variables"` 中定义核心的时间变量，并为引擎将要自动更新的变量提供**初始值**，引擎就能接管它们。

一个正确的 `world` 变量定义应该像这样：

```json
"variables": {
  "world": {
    "time": 480,
    "day": 1,
    "formattedTime": "08:00",
    "timePeriod": "早晨"
  }
}
```

### 5.3.2 侧边栏状态显示：`variables.show`

这是一个非常强大的调试与展示功能。您在 `"variables.show"` 对象中定义的**所有变量**，都会被自动渲染到游戏界面的**侧边栏**中，让玩家（和您自己）可以随时清晰地看到角色的核心状态。
::: tip 提示
侧边栏状态显示并不美观，只能做到简单的平铺列表显示，
并不直观，也不美观，我们建议开发者自行实现更丰富美观的侧边栏显示。
后续也许会提供一些简易的模板，如进度条等。
:::

**配置方式：**
在 `"variables.show"` 中，每个子对象代表侧边栏的一项。
*   **键名** (如 `"player_stress"`)：这个变量的唯一标识符。
*   `"desc"`: 显示在侧边栏的描述文本（标签）。
*   `"value"`: 该状态的**初始值**。

**示例：**
```json
{
  "variables": {
    "show": {
      "player_stress": { "desc": "压力", "value": 0 },
      "player_control": { "desc": "自控", "value": 100 },
      "player_money": { "desc": "£", "value": 100 }
    }
  }
}
```
**如何更新侧边栏？**
您不需要直接操作 `var.show.player_stress`。当您想改变“压力”时，您应该去操作一个**实际的、隐藏的**玩家状态变量，例如 `var.player.stress`。然后，通过一个**监听器**（我们将在后续章节讲解）来同步这两者的值。

一个更完整的例子是这样的：
```json
{
  "variables": {
    "player": {
      "stress": 0,
      "money": 100
    },
    "show": {
      "player_stress": { "desc": "压力", "value": 0 },
      "player_money": { "desc": "£", "value": 100 }
    }
  }
}
```
当玩家做了某件事，您通过动作 `{"type": "add", "target": "var.player.stress", "value": 5}` 来增加实际的压力值。然后，一个监听器会检测到 `var.player.stress` 的变化，并自动执行 `{"type": "set", "target": "var.show.player_stress.value", "value": "var.player.stress"}`，从而更新侧边栏的显示。

### 5.3.3 临时变量：`variables.temp`

在引擎中，我们有一个 `"temp"` 对象用于存储临时数据。这些数据**不会被保存到存档中**，仅用于在不同节点间传递一次性信息或进行临时计算。

**示例：**
```json
"actions": [
  { "type": "set", "target": "var.temp.lastChoice", "value": "向东" }
]
```
在下一个节点中，您可以通过 `{var.temp.lastChoice}` 来获取这个临时值。

通过灵活运用变量系统，您可以构建出复杂而富有深度的互动故事。在下一章节中，我们将详细探讨动作（Actions）的配置与使用。

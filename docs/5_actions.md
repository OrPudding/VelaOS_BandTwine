## 6. 动作（Actions）：驱动故事的引擎

在互动故事中，仅仅有文本和链接是不足以构建复杂逻辑的。我们需要一种机制来改变游戏状态、触发事件、影响玩家体验。这就是**动作** **(Actions)** 的作用。动作是您在 `common/data.json` 中配置的一系列指令，它们会在特定时机被执行，从而驱动故事的进程。

### 6.1 动作的执行时机

动作可以在 `data.json` 中的多个位置进行配置和执行：

1.  **节点动作 (`"actions"`)**：当玩家**进入**一个新节点时，该节点 `"actions"` 数组中定义的所有动作都会被自动执行。
2.  **链接动作 (`"actions"`)**：当玩家**点击**一个链接时，该链接 `"actions"` 数组中定义的所有动作都会在跳转前被执行。
3.  **随机结果动作 (`"actions"`)**：在随机组中，被选中的随机选项可以包含 `"actions"`，这些动作会在该选项被选中时执行。
4.  **监听器动作 (`"actions"`)**：当监听器条件满足时，其配置的 `"actions"` 会被执行。

### 6.2 动作的基本结构

每个动作都是一个 JSON 对象，它至少包含一个 `"type"` 属性，用于指定动作的类型。

```json
{
  "type": "动作类型"
}
```

接下来，我们将详细介绍每种支持的动作类型及其用法。

---

### 6.3 动作类型详解

#### 6.3.1 `set`：设置变量值

`set` 动作用于将指定变量的值设置为一个新值。

*   `"target"`: (必填) 要设置的变量路径，如 `"var.player.gold"`。
*   `"value"`: (必填) 要设置的新值。可以是字面量（字符串、数字、布尔值）、另一个变量的路径（`"var.other.variable"`）或一个表达式（`"$(expression)"`）。

**示例：**
```json
[
  { "type": "set", "target": "var.player.name", "value": "莉莉丝" },
  { "type": "set", "target": "var.player.hasKey", "value": true },
  { "type": "set", "target": "var.player.attack", "value": "$(var.player.level * 5)" }
]
```

#### 6.3.2 `add`：增加变量值

`add` 动作用于对数值型变量进行加法操作。

*   `"target"`: (必填) 要增加值的变量路径。
*   `"value"`: (必填) 要增加的数值。可以是数字、变量路径或表达式。

**示例：**
```json
[
  { "type": "add", "target": "var.player.gold", "value": 100 },
  { "type": "add", "target": "var.player.health", "value": -50 }
]
```

#### 6.3.3 `toggle`：切换布尔变量

`toggle` 动作用于切换布尔类型变量的值（`true` 变 `false`，`false` 变 `true`）。

*   `"target"`: (必填) 要切换的布尔变量路径。

**示例：**
```json
{ "type": "toggle", "target": "var.game.soundOn" }
```

#### 6.3.4 `random`：执行随机动作组

`random` 动作允许您从当前节点 `"randoms"` 中定义的随机组里，随机选择一个结果并执行其关联的动作。

*   `"id"`: (必填) 随机组的ID。

**示例：**
```json
"event_node": {
  "text": "你触发了一个神秘事件。{0}",
  "links": [{ "text": "继续", "target": "next_node" }],
  "actions": [
    { "type": "random", "id": "mysterious_outcome" }
  ],
  "randoms": {
    "mysterious_outcome": [
      { "weight": 60, "actions": [{ "type": "toast", "message": "什么也没发生。" }] },
      { "weight": 30, "actions": [{ "type": "add", "target": "var.player.sanity", "value": -10 }] }
    ]
  }
}
```

#### 6.3.5 `vibrate`：触发设备振动

`vibrate` 动作用于触发设备的振动反馈。

*   `"mode"`: (可选) 振动模式，如 `"long"` 或 `"short"`。

**示例：**
```json
{ "type": "vibrate", "mode": "long" }
```

#### 6.3.6 `autosave`：自动存档

`autosave` 动作用于触发游戏的自动存档功能，通常保存在存档位 `0`。
>这是一个**只读**的存档位，不能被删除或手动覆盖，每次进入游戏时都会默认加载这个存档位
因此，开发者需要善用 `autosave` ，建议在游戏中的**每天结束**或**重要事件**之后帮玩家自动存档一次，保障玩家体验

**示例：**
```json
{ "type": "autosave" }
```

#### 6.3.7 `addListener`：添加监听器

`addListener` 动作用于动态添加一个监听器，用于在满足特定条件时自动触发动作。

*   `"id"`: (必填) 监听器的唯一标识符。
*   `"condition"`: (必填) 触发此监听器的条件表达式。
*   `"actions"`: (必填) 当监听器被触发时要执行的动作数组。
*   `"once"`: (可选，布尔值) 如果为 `true`（默认），监听器触发一次后会自动移除。
*   `"nodeId"`: (可选) 主要用于在加载节点前触发跳转。

**示例：**
```json
{ 
  "type": "addListener", 
  "id": "low_health_warning", 
  "condition": "var.player.health < 20", 
  "actions": [{ "type": "toast", "message": "警告：生命值很低！" }],
  "once": false
}
```

#### 6.3.8 `removeListener`：移除监听器

`removeListener` 动作用于移除一个或所有已添加的监听器。

*   `"id"`: (必填) 要移除的监听器的ID。如果为 `"all"`，则移除所有监听器。

**示例：**
```json
{ "type": "removeListener", "id": "low_health_warning" }
```

#### 6.3.9 `advanceTime`：推进游戏时间

`advanceTime` 动作用于推进游戏中的世界时间。

*   `"minutes"`: (必填) 要推进的分钟数。

**示例：**
```json
{ "type": "advanceTime", "minutes": 60 }
```

#### 6.3.10 `toast`：显示提示信息

`toast` 动作用于在游戏界面上显示一个短暂的提示信息。

*   `"message"`: (必填) 要显示的提示信息。支持变量或表达式标记。
*   `"duration"`: (可选) 显示时长（毫秒），默认为 `2000`。

**示例：**
```json
{ "type": "toast", "message": "你获得了 {var.player.gold} 枚金币。", "duration": 3000 }
```

#### 6.3.11 `jump`：跳转到指定节点

`jump` 动作用于强制故事跳转到指定的节点。

*   `"target"`: (必填) 要跳转到的目标节点的ID。
*   `"condition"`: (可选) 只有当该条件满足时，`jump` 动作才会执行。
*   `"beforeActions"`: (可选) 在跳转前执行的动作数组。
*   `"afterActions"`: (可选) 在加载目标节点后执行的动作数组。

**示例：**
```json
{ 
  "type": "jump", 
  "target": "game_over", 
  "condition": "var.player.health <= 0"
}
```

---

### 6.4 动作执行的顺序与注意事项

*   **顺序执行**: 在一个 `"actions"` 数组中，动作会按照定义的顺序依次执行。
*   **`jump` 的特殊性**: 如果一个 `jump` 动作被成功执行，那么该 `"actions"` 数组中**后续的所有动作都将被忽略**。因此，建议将 `jump` 动作放在数组的末尾。
*   **变量依赖**: 后续动作可以依赖于前面动作改变的变量值。

通过熟练掌握各种动作类型及其组合，您可以构建出高度互动和引人入胜的叙事体验。

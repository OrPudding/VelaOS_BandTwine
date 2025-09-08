# 第五步：打开秘密之门

欢迎来到我们旅程的最后一站！

我们已经学会了如何创造场景、设置选项、使用变量和执行动作。现在，我们将学习最后一块，也是让故事变得真正“智能”的拼图：**条件 (Conditions)**。

条件，顾名思义，就是让某个选项或事件，只有在“满足特定条件时”才能被激活。就像一扇上了锁的门，只有当你拥有钥匙时，才能使用“开门”这个选项。

---

### 上锁的门：`condition` 属性

要为一个选项（Link）设置条件，我们只需要在它的定义里，添加一个 `"condition"` 属性。`"condition"` 的值是一个“条件表达式”字符串，用来描述这个选项可以被点击的条件。

对于布尔类型的变量（`true` 或 `false`），最简洁的条件表达式就是变量本身。例如，要检查玩家是否拥有钥匙，我们只需写：`"condition": "var.player.hasKey"`。

现在，让我们在故事中加入一扇锁上的门。我们在 `start` 节点添加一个通往 `locked_door` 场景的新选项。

```json
"start": {
  "text": "你在一间安静的房间里醒来，阳光透过窗帘的缝隙洒在地板上。房间的另一头，有一扇紧闭的木门。你决定 {0}、{1}，或是 {2}？",
  "links": [
    { "text": "查看窗外", "target": "look_outside" },
    { "text": "检查床边的桌子", "target": "check_desk" },
    { "text": "走向那扇门", "target": "locked_door" }
  ]
}
```

接下来，我们为 `locked_door` 场景添加一个“开锁”的选项，并为它加上 `"condition"`：

```json
"locked_door": {
  "text": "这是一扇厚重的木门，上面有一个老旧的黄铜锁孔。\n\n{0}\n{1}\n\n钥匙状态：{var.player.hasKey}",
  "links": [
    {
      "text": "用钥匙开门",
      "target": "door_unlocked",
      "condition": "var.player.hasKey"
    },
    { "text": "转身离开", "target": "start" }
  ]
}
```
> **小提示**: 我们在文本末尾加上了 `钥匙状态：{var.player.hasKey}`，这是一个非常好的调试习惯，可以让我们实时看到变量的值。

现在，神奇的事情发生了：
*   当玩家**没有**钥匙时（`var.player.hasKey` 是 `false`），`condition` 条件不满足。“用钥匙开门”这个选项会**显示出来，但它是浅灰色的，并且无法被点击**。
*   当玩家**拥有**钥匙时（`var.player.hasKey` 是 `true`），`condition` 条件满足。“用钥匙开门”这个选项就会变成正常的、可以点击的状态。

这就是条件链接的核心！它不是隐藏选项，而是根据条件**禁用或启用**选项，这为玩家提供了更清晰的游戏反馈。

### 完整的最终剧本

现在，让我们把所有内容整合起来，形成我们最终的、完整的 `common/data.json` 文件。

```json
{
  "metadata": {
    "indexNode": "start"
  },
  "variables": {
    "player": {
      "hasKey": false
    }
  },
  "nodes": {
    "start": {
      "text": "你在一间安静的房间里醒来，阳光透过窗帘的缝隙洒在地板上。房间的另一头，有一扇紧闭的木门。你决定 {0}、{1}，或是 {2}？",
      "links": [
        { "text": "查看窗外", "target": "look_outside" },
        { "text": "检查床边的桌子", "target": "check_desk" },
        { "text": "走向那扇门", "target": "locked_door" }
      ]
    },
    "look_outside": {
      "text": "你拉开窗帘，外面是一片宁静的森林，薄雾弥漫在树林间。\n\n{0}",
      "links": [
        { "text": "回到房间中央", "target": "start" }
      ]
    },
    "check_desk": {
      "text": "你走向桌子，上面放着一盏熄灭的油灯和一本合上的旧书。你决定 {0}，或者 {1}。",
      "links": [
        {
          "text": "拿起书本",
          "target": "found_key",
          "actions": [
            { "type": "set", "target": "var.player.hasKey", "value": true }
          ]
        },
        { "text": "先不管它", "target": "start" }
      ]
    },
    "found_key": {
      "text": "你拿起了书，发现书下压着一枚小小的黄铜钥匙。你把它放进了口袋。\n\n{0}",
      "links": [
        { "text": "回到房间中央", "target": "start" }
      ]
    },
    "locked_door": {
      "text": "这是一扇厚重的木门，上面有一个老旧的黄铜锁孔。\n\n{0}\n{1}\n\n钥匙状态：{var.player.hasKey}",
      "links": [
        {
          "text": "用钥匙开门",
          "target": "door_unlocked",
          "condition": "var.player.hasKey"
        },
        { "text": "转身离开", "target": "start" }
      ]
    },
    "door_unlocked": {
      "text": "你将钥匙插入锁孔，轻轻一转，门开了。门外是通往自由的走廊。你的冒险，才刚刚开始……"
    }
  }
}
```

---

### 🎉 恭喜！您已完成所有新手训练！

太了不起了！您已经走完了“快速上手”的全部旅程。

回顾一下，您已经掌握了：
*   **创建场景 (Nodes)**
*   **设置选项 (Links)** 并通过 `{}` 标记显示它们
*   **使用变量 (Variables)**
*   **执行动作 (Actions)**
*   **添加条件 (Conditions)** 来启用或禁用选项

这五项技能，是构建任何复杂互动故事的基石。您现在已经完全有能力去创作属于您自己的、更加宏大的故事了。

当您准备好探索更多高级功能，例如会“变身”的链接 (`variants`)、随机事件、时间系统等等，可以随时查阅我们的 **[深度指南](/guides)** 和 **[API 参考](/api-reference)**。

祝您创作愉快！

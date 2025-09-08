# 第四站：选择的力量

在上一站，我们的世界学会了“记忆”。但目前，这份记忆是静态的。玩家无论做什么，都无法改变“没有钥匙”这个事实。

现在，我们将赋予玩家真正的力量。我们将学习如何通过 **动作 (Actions)**，让玩家的每一次选择，都能切实地改变故事的状态，重塑世界的记忆。

---

### 赋予选择“力量”：`actions` 属性

我们如何让一个选择拥有力量呢？答案是在链接（Link）中添加一个名为 `"actions"` 的属性。

`"actions"` 是一个数组 `[ ]`，里面可以存放一个或多个“动作”对象 `{ }`。当玩家点击这个链接时，这里面的所有动作就会被依次执行。

最常用的动作之一，就是 `set` 动作。它的作用是：**设置 (set)** 一个变量的值。

让我们来改造一下 `check_desk` 节点。我们不再让它直接显示状态，而是给玩家一个新的选择：“拿起书本”。当玩家做出这个选择时，我们假设书下藏着一把钥匙。

```json
"check_desk": {
  "text": "你走向桌子，上面放着一盏熄灭的油灯和一本合上的旧书。你决定 {0}，或者 {1}。",
  "links": [
    {
      "text": "拿起书本",
      "target": "found_key",
      "actions": [
        {
          "type": "set",
          "target": "var.player.hasKey",
          "value": true
        }
      ]
    },
    {
      "text": "先不管它",
      "target": "start"
    }
  ]
}
```
让我们来解读第一个链接中的 `actions` 魔法：
*   `"type": "set"`: 我们要执行一个“设置”类型的动作。
*   `"target": "var.player.hasKey"`: 我们要设置的目标是 `player.hasKey` 这个变量。
*   `"value": true`: 我们要把它设置成新值 `true`。

当玩家点击 `{0}`（“拿起书本”）时，这个 `set` 动作会**在跳转到新场景之前**立刻执行，将 `var.player.hasKey` 的值从 `false` 改为 `true`。

### 见证世界的改变

为了能清楚地看到世界的变化，我们需要创建一个新的场景 `found_key`，让它来显示我们改变后的记忆。

现在，让我们把完整的 `common/data.json` 整合起来：

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
      "text": "你在一间安静的房间里醒来，阳光透过窗帘的缝隙洒在地板上。你决定 {0} 还是 {1}？",
      "links": [
        { "text": "查看窗外", "target": "look_outside" },
        { "text": "检查床边的桌子", "target": "check_desk" }
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
      "text": "你拿起了书，发现书下压着一枚小小的黄铜钥匙。\n\n当前钥匙状态：{var.player.hasKey}\n\n{0}",
      "links": [
        { "text": "回到房间中央", "target": "start" }
      ]
    }
  }
}
```

现在，整个流程是这样的：
1.  玩家在 `check_desk` 场景选择 `{0}`（“拿起书本”）。
2.  `set` 动作立刻执行，将 `var.player.hasKey` 的值变为 `true`。
3.  故事跳转到 `found_key` 场景。
4.  `found_key` 场景的文本显示出来，此时 `{var.player.hasKey}` 会被解析为最新的值 `true`。玩家将看到：“当前钥匙状态：true”。

---

### 💪 你已掌握改变世界的力量！

太棒了！您已经掌握了互动叙事中最核心、最激动人心的部分：通过玩家的选择来驱动故事状态的变化。

现在，我们的故事不再是简单的“看”，而是真正的“玩”。但还有一个问题：即使我们没有钥匙，一扇需要钥匙的门可能依然为我们敞开。如何让世界根据它拥有的记忆，来做出不同的反应呢？

这就是我们旅途的最后一站，我们将学习如何创造“条件”，打开那扇只为有缘人准备的秘密之门。

**下一站: [第五步：打开秘密之门](/5-creating-conditional-logic)**

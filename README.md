以下是为你的项目（VelaOS_BandTwine）量身定制的完整 README 示例，重点介绍如何编写和扩展 `game-data.json`，并帮助开发者快速上手与正确配置节点和变量。

---

# VelaOS_BandTwine

一个类似 Twine 的基于节点的文字游戏引擎，适配小米 VelaOS。  
本项目核心通过 `game-data.json` 配置游戏流程和逻辑，无需代码即可实现丰富交互。

## 目录

- [项目简介](#项目简介)
- [快速开始](#快速开始)
- [game-data.json 结构说明](#game-datajson-结构说明)
  - [变量（variables）](#变量variables)
  - [节点（nodes）](#节点nodes)
  - [动作（actions）](#动作actions)
  - [脚本（scripts）](#脚本scripts)
- [自定义与扩展](#自定义与扩展)
- [常见问题](#常见问题)
- [致谢](#致谢)

---

## 项目简介

BandTwine 让你像写故事一样设计互动小说/文字冒险游戏，支持条件跳转、变量操作、时间推进、监听器、图片、存档、表达式等丰富功能。

---

## 快速开始

1. 克隆本仓库并安装依赖。
2. 编辑 `src/common/game-data.json`，编写你的游戏内容。
3. 在支持的设备或模拟器上运行。

---

## game-data.json 结构说明

### 文件总览

```json
{
  "variables": { ... },
  "nodes": { ... }
}
```

### 变量（variables）

用于保存全局状态、玩家数据、系统信息等。支持嵌套结构。

**示例：**

```json
"variables": {
  "world": {
    "time": 480,
    "day": 1,
    "formattedTime": "08:00",
    "timePeriod": "早晨"
  },
  "player": {
    "name": { "value": "玩家" },
    "level": { "value": 1 }
  },
  "show": {
    "counter": { "value": 0, "desc": "计数器" },
    "flag": { "value": false, "desc": "状态标志" },
    "score": { "value": 100, "desc": "分数" }
  }
}
```

- 可通过 `{var.变量路径}` 方式在文本和条件中引用，如 `{var.show.counter.value}`。
- 支持数字、字符串、布尔类型。
- show组的变量将会显示在侧边状态标签页，必须有value和desc，请开发者自行规划

---

### 节点（nodes）

每个节点代表一个“场景”或“步骤”，包含显示文本、跳转链接、可选动作等。

**基本结构：**

```json
"nodes": {
  "start": {
    "text": "欢迎来到VelaOS_BandTwine！\n请选择：\n{0}\n{1}",
    "links": [
      { "text": "进入冒险", "target": "adventure" },
      { "text": "查看说明", "target": "help" }
    ]
  }
}
```

#### 节点字段说明

- `text`：节点内容，支持变量插值。
- `links`：选项数组，决定玩家可以做什么，每项格式如下：
  - `text`：选项内容
  - `target`：跳转到的节点ID
  - `actions`（可选）：选中后会执行的动作（见下节）
- 可定义其他自定义字段，如图片、脚本等。

---

### 动作（actions）

用于节点跳转时修改变量、调用功能、执行脚本等。

**常用动作类型：**

- `add`：对数值型变量加减
- `set`：设定变量
- `toggle`：切换布尔值
- `jump`：条件跳转到指定节点
- `toast`：弹出提示
- `vibrate`：设备震动
- `autosave` :帮用户自动存档到第5槽位
- `advanceTime`：推进游戏内时间
- `addListener`/`removeListener`：添加/移除监听器

**示例：**

```json
{
  "text": "计数器：{var.show.counter.value}",
  "links": [
    {
      "text": "加一",
      "target": "counter_test",
      "actions": [
        { "type": "add", "target": "var.show.counter.value", "value": 1 }
      ]
    },
    {
      "text": "切换状态",
      "target": "counter_test",
      "actions": [
        { "type": "toggle", "target": "var.show.flag.value" }
      ]
    }
  ]
}
```

---

### 脚本（scripts）（未完善）

用于复用复杂的逻辑或批量动作，在节点或监听器中触发。

---

## 自定义与扩展

- 你可以自由添加节点，设计分支剧情。
- 支持条件渲染、复杂表达式，如：
  ```json
  "condition": "var.show.counter.value > 10 && var.show.flag.value"
  ```
- 可添加监听器，实现“计数器大于3时触发事件”等功能。
- 支持图片、存档、Toast、Jump跳转等功能。
- 变量、动作类型均可扩展，建议参考内置测试节点。

---

## 常见问题

**Q: 如何引用变量？**  
A: 用 `{var.变量路径}`，如 `{var.player.name.value}`。

**Q: 支持哪些动作？**  
A: 详见“动作”章节，或参考 `game-data.json` 的内置测试节点。

**Q: 如何实现条件分支？**  
A: 在 link 或 action 里加 `condition` 字段，满足时才会显示或执行。

---

## 致谢

- 灵感参考自 Twine
- 感谢所有开源贡献者

---

## 进阶参考

建议从 `src/common/game-data.json` 的测试节点（如 `test_variables`、`test_conditions` 等）学习各类功能的用法。可以直接复制后定制自己的节点。

---

如需更多帮助，请提 Issue 或讨论。欢迎贡献你的故事和节点！

---

**附录：节点完整示例**

```json
"my_node": {
  "text": "你遇到了一只猫，当前分数：{var.show.score.value}",
  "links": [
    {
      "text": "撸猫 +10分",
      "target": "my_node",
      "actions": [
        { "type": "add", "target": "var.show.score.value", "value": 10 }
      ]
    },
    {
      "text": "离开",
      "target": "start"
    }
  ]
}
```

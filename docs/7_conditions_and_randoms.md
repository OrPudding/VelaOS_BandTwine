# 条件与随机 (Conditions & Randoms)

在互动故事中，故事的走向往往不是一成不变的。**条件（Conditions）** 和 **随机（Randoms）** 正是实现这种动态性和不确定性的核心机制。条件允许您根据特定的逻辑判断来控制故事元素；而随机则为您的故事注入了惊喜和重玩价值。


## 7.1 条件（Conditions）：故事的逻辑判断

条件是用于评估某个表达式或状态是否为 `true` 的逻辑判断。它们是构建复杂剧情分支、实现玩家选择后果、控制游戏元素可见性的基石。

#### 7.1.1 条件表达式语法

在 BandTwine 中，条件是一个字符串，支持以下语法：

**1. 变量比较**
您可以直接比较变量的值与字面量、或其他变量的值。

*   **等于 (`==`)**: `"var.player.gold == 100"`
*   **不等于 (`!=`)**: `"var.player.health != 0"`
*   **大于 (`>`) / 小于 (`<`) / 大于等于 (`>=`) / 小于等于 (`<=`)**: `"var.player.level >= 5"`

**2. 逻辑组合 (`&&`, `||`)**
您可以使用 `&&` (与) 和 `||` (或) 来组合多个条件。

*   **与 (`&&`)**: `"var.player.hasKey && var.door.isLocked"`
*   **或 (`||`)**: `"var.player.health <= 20 || var.player.isPoisoned"`

**3. 布尔变量简写**
如果一个变量本身就是布尔值（`true`/`false`），您可以直接使用它作为条件。
*   `"var.player.hasKey"` (等同于 `"var.player.hasKey == true"`)
*   `"!var.player.hasKey"` (等同于 `"var.player.hasKey == false"`)

**4. 表达式条件 (`$(...)`)**
对于更复杂的逻辑，您可以使用 `$(...)` 包裹 JavaScript 表达式。
*   `"$(var.player.strength + var.player.agility > 20)"`
*   `"$(var.player.inventory.includes('药水'))"`

**5. 预定义状态**
*   `"hourChanged"`: 当游戏时间的小时部分发生变化时为 `true`。
*   `"dayChanged"`: 当游戏时间的天数发生变化时为 `true`。

#### 7.1.2 条件的应用场景

1.  **链接的可用性 (`"condition"`)**:
    控制链接是否可点击。若条件不满足，链接会变灰。
    ```json
    "links": [
      {
        "text": "用钥匙开门",
        "target": "door_unlocked",
        "condition": "var.player.hasKey"
      }
    ]
    ```

2.  **条件文本 (`"conds"`)**:
    在节点的 `"text"` 中，使用 `{cond.ID}` 标记，根据条件显示不同文本。
    ```json
    "text": "你感到 {cond.player_mood}。",
    "conds": {
      "player_mood": [
        { "condition": "var.player.health > 80", "text": "精力充沛" },
        { "condition": "var.player.health <= 20", "text": "非常虚弱" },
        { "text": "有些疲惫" }
      ]
    }
    ```

3.  **动作的条件执行 (`"condition"`)**:
    在 `jump` 等动作中，可以指定条件。
    ```json
    "actions": [
      {
        "type": "jump",
        "target": "game_over",
        "condition": "var.player.health <= 0"
      }
    ]
    ```

4.  **监听器的触发条件 (`"condition"`)**:
    监听器会在每个链接点击后，节点加载前，持续监控某个条件，一旦满足则触发动作。
    ```json
    { 
      "type": "addListener", 
      "id": "critical_health_event", 
      "condition": "var.player.health <= 10", 
      "actions": [{ "type": "toast", "message": "生命危在旦夕！" }]
    }
    ```

---

## 7.2 随机（Randoms）：为故事增加不确定性

随机机制允许您在故事中引入不可预测的元素。

#### 7.2.1 `randoms` 对象的结构

随机组定义在节点的 `"randoms"` 属性中。它是一个对象，其键是随机组的ID，值是一个包含随机选项的数组。

```json
"randoms": {
  "random_group_id": [
    { "text": "结果A", "weight": 70 },
    { "text": "结果B", "weight": 30 }
  ]
}
```

#### 7.2.2 随机选项的属性

*   `"text"` (可选): 当此选项被选中时，要显示的文本。
*   `"target"` (可选): 当此选项被选中时，要跳转到的节点ID。
*   `"actions"` (可选): 当此选项被选中时，要执行的动作数组。
*   `"weight"` (可选, 数字): 此选项被选中的权重，默认为 `1`。
*   `"condition"` (可选, 字符串): 只有当此条件满足时，该选项才会被纳入随机选择的范围。

#### 7.2.3 随机的应用场景

1.  **随机文本 (`{random.ID}`)**:
    在 `"text"` 中插入随机生成的描述。
    ```json
    "text": "你打开了宝箱，里面 {random.chest_loot}。",
    "randoms": {
      "chest_loot": [
        { "text": "空空如也。", "weight": 40 },
        { "text": "有一枚金币！", "weight": 30, "actions": [{ "type": "add", "target": "var.player.gold", "value": 1 }] }
      ]
    }
    ```

2.  **随机链接 (`"random"`)**:
    当玩家点击某个链接时，不确定地跳转到不同的目标。
    ```json
    "links": [
      {
        "text": "探索洞穴深处",
        "random": [
          { "target": "monster_encounter", "weight": 60 },
          { "target": "treasure_room", "weight": 40 }
        ]
      }
    ]
    ```

3.  **随机动作 (`"type": "random"`)**:
    在动作序列中触发一个随机事件。
    ```json
    "actions": [
      { "type": "random", "id": "daily_event" }
    ],
    "randoms": {
      "daily_event": [
        { "weight": 50, "actions": [{ "type": "add", "target": "var.player.mood", "value": 5 }] },
        { "weight": 50, "actions": [{ "type": "add", "target": "var.player.mood", "value": -5 }] }
      ]
    }
    ```

通过熟练运用条件和随机机制，您可以为您的互动故事注入生命力，提供更加丰富和引人入胜的体验。

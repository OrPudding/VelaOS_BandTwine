## BandTwine

一个类似 Twine 的基于节点的文字游戏引擎，适配小米 VelaOS。  
本项目核心通过 `game-data.json` 配置游戏流程和逻辑，无需代码即可实现丰富交互。
---

## 许可

本项目的游戏引擎部分遵循GNU Affero通用公共许可证（AGPLv3）开源。这意味着：

    您可以自由地使用、修改和分发本软件，包括商业用途。

    但是，如果您修改了游戏引擎部分，并且以任何形式发布（包括通过网络提供服务），则必须将修改后的完整源代码公开，并遵循AGPLv3协议。

特别地，文件 `src/common/game-data-json` 及文件夹 `src/common/images` 下的资源文件 遵循MIT协议分发。这意味着您可以单独使用该文件而不需要公开其衍生作品。

有关详细信息，请参阅 LICENSE 文件。


### 节点文件编写教程（游戏引擎数据层）

本教程详细解析游戏引擎节点文件的数据结构和配置方法，不包含脚本实现部分。节点文件(`game-data.json`)是游戏内容的核心载体，采用JSON格式定义所有游戏内容。

---

#### **一、节点基础结构**
每个节点代表游戏中的一个场景或事件，基础结构如下：
```json
{
  "nodes": {
    "unique_node_id": {
      "title": "场景标题",
      "text": "场景内容{支持动态标记}",
      "links": [],
      "actions": [],
      "imgs": {},
      "randoms": {},
      "conds": {}
    }
  },
  "variables": {}
}
```

---

#### **二、核心元素详解**

##### 1. **文本内容（text）**
支持动态标记系统，标记会被实时解析：
```json
"text": "现在是{var.world.formattedTime}，{cond.time_period}。\n{img.background}{0}{1}"
```

| **标记类型**      | **语法**             | **示例**                     | **说明**                     |
|-------------------|----------------------|------------------------------|------------------------------|
| 变量引用          | `{var.path}`         | `{var.player.name}`          | 显示变量值                   |
| 条件文本块        | `{cond.group_name}`  | `{cond.greeting}`            | 显示条件组匹配文本           |
| 图片              | `{img.image_id}`     | `{img.background}`           | 插入配置的图片               |
| 链接按钮          | `{数字}`             | `{0}`                        | 显示第1个链接按钮      |
| 随机文本          | `{random.group_id}`  | `{random.dialog}`            | 显示随机组结果               |
| 换行符            | `\n`                 | `第一行\n第二行`             | 强制文本换行                 |

---

##### 2. **链接选项（links）**
定义玩家可选择的选项：
```json
"links": [
  {
    "text": "查看地图",
    "target": "map_scene",
    "condition": "var.items.map == true",
    "actions": [
      {"type": "add", "target": "var.stats.explore", "value": 1}
    ],
    "incom": {"location": "town_square"},
    "random": [
      {"if": "var.weather == 'rain'", "target": "indoor_map", "weight": 1.0},
      {"target": "outdoor_map", "weight": 0.5}
    ]
  }
]
```

| **属性**    | **类型**  | **必填** | **说明**                                  |
|-------------|-----------|----------|-------------------------------------------|
| text        | string    | ✓        | 选项显示文本                              |
| target      | string    | ✓        | 目标节点ID                                |
| condition   | string    |          | 显示条件表达式                            |
| actions     | array     |          | 选择后执行的动作                          |
| incom       | object    |          | 向目标节点传递临时变量 {key: value}       |
| random      | array     |          | 随机跳转子选项（见随机组说明）            |

---

##### 3. **条件组（conds）**
实现动态文本内容：
```json
"conds": {
  "time_period": [
    {
      "condition": "var.world.time < 300",
      "text": "深夜"
    },
    {
      "condition": "var.world.time < 480",
      "text": "凌晨"
    },
    {
      "text": "白天" // 默认选项
    }
  ]
}
```
- 引擎按顺序检查条件，返回第一个匹配的`text`
- 最后一个元素可作为默认项（无`condition`）

---

##### 4. **随机组（randoms）**
实现概率分支：
```json
"randoms": {
  "enemy_encounter": [
    {
      "text": "遇到哥布林！",
      "actions": [{"type": "jump", "target": "goblin_fight"}],
      "weight": 0.7,
      "condition": "var.area == 'forest'"
    },
    {
      "text": "发现宝箱！",
      "weight": 0.3
    }
  ]
}
```

| **属性**    | **类型**  | **必填** | **说明**                     |
|-------------|-----------|----------|------------------------------|
| text        | string    |     ✓     | 直接返回的文本               |
| actions     | array     |          | 选中时执行的动作             |
| weight      | number    |         | 权重值（≥0）                 |
| condition   | string    |          | 生效条件                     |

---

##### 5. **图片配置（imgs）**
定义场景图片资源：
```json
"imgs": {
  "tavern": {
    "path": "tavern_${var.weather}.png",
    "width": 300
  }
}
```
| **属性** | **类型** | **必填** | **说明**                                    |
|----------|-----------|----------|---------------------------------------------|
| path     | string    | ✓        | 路径（支持${表达式}动态路径）               |
| width    | number    |          | 显示宽度（px），默认150                     |

> **路径解析规则**：
> - 自动添加前缀`/common/images/`（除非包含`/`或`http`）
> - 示例：`"bg.png"` → `/common/images/bg.png`

---

##### 6. **动作系统（actions）**
节点和链接均可包含动作列表：
```json
"actions": [
  // 变量操作
  {"type": "set", "target": "var.player.hp", "value": 100},
  {"type": "add", "target": "var.player.gold", "value": 50},
  {"type": "toggle", "target": "var.flags.hasKey"},

  // 游戏流程
  {"type": "jump", "target": "next_node", "condition": "var.day > 3"},
  {"type": "autosave"},

  // 系统交互
  {"type": "vibrate", "mode": "short"},
  {"type": "toast", "message": "金币+${var.gain}"},

  // 时间推进
  {"type": "advanceTime", "minutes": 30},

  // 事件监听
  {"type": "addListener", 
   "id": "midnight", 
   "condition": "var.world.time == 0",
   "actions": [{"type": "jump", "target": "midnight_event"}],
   "options": {"once": true}
  }
]
```

**动作类型详解**：

| **类型**       | **参数**              | **说明**                                      |
|----------------|-----------------------|-----------------------------------------------|
| set            | target, value         | 设置变量值                                    |
| add            | target, value         | 变量加法（支持数字）                          |
| toggle         | target                | 布尔值取反                                    |
| jump           | target, condition     | 条件跳转到节点                                |
| autosave       | -                     | 自动存档到槽位4                              |
| vibrate        | mode:short/long       | 触发设备震动                                  |
| toast          | message, duration     | 显示消息提示                                  |
| advanceTime    | minutes               | 推进游戏时间（分钟）                          |
| addListener    | id, condition, actions| 添加事件监听器                                |
| removeListener | id / "all"            | 移除监听器                                    |

---

##### 7. **全局变量（variables）**
定义游戏初始状态：
```json
"variables": {
  "player": {
    "name": "旅行者",
    "hp": 100,
    "gold": 50
  },
  "world": {
    "day": 1,
    "time": 480,  // 分钟制 (8:00)
    "formattedTime": "08:00"
  },
  "flags": {
    "metKing": false
  },
  "show": {
    "reputation": {
      "desc": "声望值",
      "value": "var.player.reputation"
    }
  }
}
```

**特殊变量组**：
- `show`：定义状态界面显示的变量
  - `desc`：界面显示的名称
  - `value`：绑定的变量路径

---

#### **三、高级用法示例**

##### 复合条件链接
```json
{
  "text": "进入森林？",
  "condition": "var.energy > 30 && var.hasTorch == true",
  "actions": [
    {"type": "add", "target": "var.energy", "value": -10}
  ],
  "random": [
    {
      "if": "var.weather == 'rain'",
      "target": "forest_rain",
      "incom": {"difficulty": 2}
    },
    {
      "target": "forest_sunny",
      "incom": {"difficulty": "$(var.base_difficulty + 1)"}
    }
  ]
}
```

##### 动态图片路径
```json
"imgs": {
  "character": {
    "path": "char_${var.gender}_${var.mood}.png",
    "width": 200
  }
}
// 解析为: char_male_happy.png
```

##### 时间监听器
```json
"actions": [
  {
    "type": "addListener",
    "id": "lunch_time",
    "condition": "var.world.time == 720", // 12:00
    "actions": [
      {"type": "jump", "target": "lunch_event"}
    ],
    "options": {"type": "time"}
  }
]
```

---

#### **四、最佳实践指南**

1. **ID命名规范**
   - 节点ID：`location_event`（城堡_宴会）
   - 随机组：`sceneId_result`（洞穴_宝藏）
   - 条件组：`sceneId_display`（商店_折扣提示）

2. **复杂逻辑拆分**
   ```json
   // 不推荐
   "condition": "var.a>1 && (var.b<3 || var.c=='yes')"
   
   // 推荐：拆分为多条件链接
   "links": [
     {
       "text": "选项A",
       "condition": "var.a>1 && var.b<3",
       "target": "..."
     },
     {
       "text": "选项B",
       "condition": "var.a>1 && var.c=='yes'",
       "target": "..."
     }
   ]
   ```

3. **存档兼容设计**
   - 关键变量用`var.permanent`命名
   - 避免在`temp`中存储长期数据
   - 时间相关变量必须使用`var.world.time/day`

4. **性能优化**
   - 超过5个选项改用随机组
   - 复杂条件预先计算到变量
   - 大图片使用压缩格式（webp/jpg）

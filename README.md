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
| actions     | array     |          | 命中时执行的动作             |
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

##### 6. **动作系统（actions）**（详见附录）
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

---
>附录
---
### 动作系统（Actions）深度教程

动作系统是游戏引擎的核心逻辑驱动机制，用于处理游戏状态变化、流程控制和玩家交互反馈。以下是每个动作类型的详细解析、参数设置和底层原理说明。

---

#### **动作基础结构**
所有动作共享的基础结构：
```json
{
  "type": "动作类型",
  "参数1": "值",
  "参数2": "值",
  // 条件参数（可选）
  "condition": "布尔表达式"
}
```

---

### **一、变量操作类动作**

#### 1. **set - 设置变量**
```json
{
  "type": "set",
  "target": "var.player.hp",
  "value": 100
}
```
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| target | string | ✓ | 变量路径（以`var.`开头） |
| value | 任意 | ✓ | 支持表达式、变量引用、原始值 |
| condition | string |  | 执行条件表达式 |

**原理**：
- 解析`value`（处理变量引用和表达式）
- 沿路径创建嵌套对象（如`var.player.stats`自动创建）
- 类型转换：字符串"10"转为数字10

**高级用法**：
```json
{
  "type": "set",
  "target": "var.system.lastChoice",
  "value": "{img.choice_${var.currentOption}}"
}
// 动态变量名：存储当前选项的图片路径
```

---

#### 2. **add - 增减变量值**
```json
{
  "type": "add",
  "target": "var.player.gold",
  "value": -50
}
```
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| target | string | ✓ | 数字类型变量路径 |
| value | number | ✓ | 支持负数和表达式 |

**原理**：
1. 获取当前值（不存在则视为0）
2. 解析`value`（支持`$(表达式)`）
3. 执行加法运算
4. 处理整数溢出（引擎自动处理）

**特殊案例**：
```json
{
  "type": "add",
  "target": "var.world.time",
  "value": "$(60 - var.world.time % 60)" 
}
// 精确推进到下个整点
```

---

#### 3. **toggle - 布尔值取反**
```json
{
  "type": "toggle",
  "target": "var.flags.hasKey"
}
```
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| target | string | ✓ | 布尔变量路径 |

**原理**：
- 非布尔值转换规则：
  - 数字0 → false
  - 空字符串 → false
  - 其他值 → true

---

### **二、游戏流程控制**

#### 1. **jump - 条件跳转**
```json
{
  "type": "jump",
  "target": "forest_encounter",
  "condition": "var.player.level > 5",
  "beforeActions": [
    {"type": "set", "target": "var.temp.area", "value": "forest"}
  ],
  "afterActions": [
    {"type": "vibrate", "mode": "long"}
  ]
}
```
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| target | string | ✓ | 目标节点ID |
| condition | string |  | 跳转条件 |
| beforeActions | array |  | 跳转前执行的动作 |
| afterActions | array |  | 跳转后执行的动作 |

**执行流程**：
1. 检查`condition`（为空则视为true）
2. 执行`beforeActions`
3. 加载目标节点
4. 目标节点加载完成后执行`afterActions`

---

#### 2. **random - 随机分支**
```json
{
  "type": "random",
  "id": "tavern_events"
}
```
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✓ | 当前节点的随机组ID |

**底层机制**：
1. 获取`randoms`下对应ID的数组
2. 过滤掉不满足`condition`的选项
3. 按权重随机选择（权重和归一化算法）
4. 执行选中项的`actions`

---

### **三、系统交互动作**

#### 1. **vibrate - 设备震动**
```json
{
  "type": "vibrate",
  "mode": "short" // 或 "long"
}
```
**原理**：
- `short`：触发100ms震动
- `long`：触发400ms震动
- 依赖设备API，无设备时静默失败

---

#### 2. **toast - 消息提示**
```json
{
  "type": "toast",
  "message": "获得${var.goldAmount}金币!",
  "duration": 1500
}
```
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|------|------|
| message | string | ✓ | - | 支持动态表达式 |
| duration | number |  | 2000 | 显示时长(ms) |

**解析顺序**：
1. 处理`${表达式}`
2. 解析变量引用`{var.path}`
3. 执行数学运算`$(1+1)`

---

#### 3. **autosave - 自动存档**
```json
{"type": "autosave"}
```
**执行逻辑**：
1. 创建存档数据包：
   ```js
   {
     time: "2025-01-01 12:00", 
     state: {
       vars: {...},
       currentNodeId: "...",
       listeners: [...]
     }
   }
   ```
2. 存储到槽位4
3. 更新存档菜单显示

---

### **四、时间系统动作**

#### 1. **advanceTime - 推进时间**
```json
{
  "type": "advanceTime",
  "minutes": "$(var.travelTime * 60)"
}
```
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| minutes | number | ✓ | 推进的分钟数 |

**时间推进算法**：
```javascript
advanceTime(minutes) {
  const current = this.getVariable("var.world.time");
  let newTime = current + minutes;
  let daysAdded = 0;
  
  // 处理跨天
  while (newTime >= 1440) {
    newTime -= 1440;
    daysAdded++;
  }
  
  // 更新状态
  this.setVariable("var.world.time", newTime);
  this.setVariable("var.world.day", this.getVariable("var.world.day") + daysAdded);
  
  // 触发时间监听器
  this.checkTimeListeners();
}
```

---

### **五、事件监听系统**

#### 1. **addListener - 添加监听器**
```json
{
  "type": "addListener",
  "id": "midnight_event",
  "condition": "var.world.time == 0",
  "actions": [
    {"type": "jump", "target": "midnight_scene"}
  ],
  "options": {
    "once": true,
    "type": "time",
    "nodeId": "tavern"
  }
}
```
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✓ | 监听器唯一ID |
| condition | string | ✓ | 触发条件表达式 |
| actions | array | ✓ | 触发时执行的动作 |
| options | object |  | 配置项 |

**options详解**：
| 属性 | 类型 | 默认值 | 说明 |
|------|------|------|------|
| once | boolean | true | 是否单次触发 |
| type | string | "general" | 监听器类型(time/general) |
| nodeId | string | null | 限定生效节点 |

---

#### 2. **removeListener - 移除监听器**
```json
{
  "type": "removeListener",
  "id": "all" // 或指定ID
}
```
**执行效果**：
- `"all"`：清除所有监听器
- 指定ID：移除匹配ID的监听器

---

### **六、复合动作示例**

#### 商店购买系统
```json
{
  "type": "jump",
  "target": "shop_buy_result",
  "condition": "var.player.gold >= var.item.price",
  "beforeActions": [
    {
      "type": "add",
      "target": "var.player.gold",
      "value": "$(-var.item.price)"
    },
    {
      "type": "add",
      "target": "var.player.inventory.{var.item.id}",
      "value": 1
    },
    {
      "type": "addListener",
      "id": "first_use_{var.item.id}",
      "condition": "var.player.inventory.{var.item.id} == 1",
      "actions": [{"type": "jump", "target": "item_first_use"}],
      "options": {"once": true}
    }
  ]
}
```

#### 时间敏感事件
```json
{
  "type": "addListener",
  "id": "full_moon",
  "condition": "var.world.day % 28 == 0 && var.world.time == 1260", // 21:00
  "actions": [
    {"type": "set", "target": "var.flags.fullMoon", "value": true},
    {"type": "jump", "target": "werewolf_event"}
  ],
  "options": {
    "type": "time",
    "once": false
  }
}
```

---

### **七、执行原理与优先级**

#### 动作执行流程
1. **条件检查**：验证`condition`表达式
2. **参数解析**：处理动态表达式和变量引用
3. **执行动作**：修改游戏状态
4. **副作用处理**：
   - 时间推进 → 检查时间监听器
   - 变量修改 → 更新状态界面
   - 跳转动作 → 中断当前执行队列

#### 优先级规则
1. 节点内动作优先于链接动作
2. `jump`动作会中断后续动作
3. 监听器按添加顺序执行
4. 时间监听器优先于常规监听器

#### 错误处理机制
- 变量不存在：创建并赋默认值（数字0，字符串""）
- 表达式错误：返回0并记录日志
- 无效节点：显示错误信息并返回起始点
- API调用失败：静默失败（存档、震动等）

---

### **八、最佳实践指南**

1. **变量管理**
   ```json
   // 避免
   {"type": "set", "target": "var.temp", "value": 10}
   
   // 推荐
   {"type": "set", "target": "var.session.tempValue", "value": 10}
   ```

2. **时间推进策略**
   - 短操作：15-30分钟
   - 长场景：2-4小时
   - 睡眠：8小时（自动触发日出事件）

3. **监听器优化**
   ```json
   // 低效
   "condition": "var.world.time >= 480 && var.world.time <= 720"
   
   // 高效
   "condition": "$(Math.floor(var.world.time/60) == 12)"
   ```

4. **存档设计**
   - 自动存档：关键决策后
   - 手动存档：场景切换时
   - 临时存档：长时间操作前

5. **跨平台兼容**
   ```json
   {
     "type": "toast",
     "message": "震动提示!",
     "condition": "var.device.hasVibrator"
   },
   {
     "type": "vibrate",
     "condition": "var.device.hasVibrator"
   }
   ```

---

### **九、调试技巧**

1. 调试模式激活：
   ```json
   {
     "type": "set",
     "target": "var.system.debug",
     "value": true
   }
   ```
   
2. 状态监控动作：
   ```json
   {
     "type": "toast",
     "message": "HP={var.player.hp}/nGold={var.player.gold}",
     "duration": 3000
   }
   ```

3. 快速存档/读档：
   ```json
   {
     "type": "autosave"
   },
   {
     "type": "jump",
     "target": "debug_room",
     "condition": "var.system.debug"
   }
   ```

通过合理组合这些动作，您可以构建复杂的游戏机制，如昼夜循环、经济系统、任务链等，同时保持代码的可维护性和性能。

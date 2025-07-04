## 许可

本项目的游戏引擎部分遵循GNU Affero通用公共许可证（AGPLv3）开源。这意味着：

- 您可以自由地使用、修改和分发本软件，包括商业用途。

- 但是，如果您修改了游戏引擎部分，并且以任何形式发布（包括通过网络提供服务），则必须将修改后的完整源代码公开，并遵循AGPLv3协议。


特别地，文件 `src/common/game-data.json` 被允许闭源使用。这意味着您可以单独使用该文件而不需要公开其衍生作品。

有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

游戏引擎节点文件编写教程
概述

本教程将指导你如何为基于文本的互动小说游戏引擎编写节点文件。节点文件使用JSON格式，定义了游戏的变量系统、场景节点、链接选项、随机事件等内容。通过本教程，你将学会如何构建完整的游戏叙事结构。
文件结构

节点文件(game-data.json)包含以下主要部分：

```
{
  "variables": {
    // 游戏变量定义
  },
  "nodes": {
    // 游戏节点定义
  }
}

```
1. 变量系统 (variables)

定义游戏中使用的变量，包括一般变量、布尔变量等。

    "variables": {
      "show": {
        "health": {
          "desc": "健康值",
          "value": 100
        },
        "money": {
          "desc": "金钱",
          "value": 50
        }
      },
      "inventory": {
        "sword": false,
        "potion": 3
      },
      "flags": {
        "met_merchant": false,
        "completed_quest": true
      }
    }

变量组：

    显示给玩家的变量(玩家可以随时打开侧栏查看的)：必须在show对象中，包含desc(描述)和value(值)
    引用的时候遵循一般变量进行引用就好，比如{var.show.health.value}当然desc也可以

    其它变量(你可以自由命名，并可选地在特定节点中通过引用的方式显示给玩家)

2. 节点定义 (nodes)

每个节点代表游戏中的一个场景或决策点，使用唯一ID作为键名。
基本节点结构

    "start": {
      "text": "你醒来发现自己在一个陌生的森林中。{0}\n{1}",
      "links": [
        // 选项链接
      ],
      "imgs": {
        // 图片资源
      },
      "randoms": {
        // 随机组
      },
      "conds": {
        // 条件组
      },
      "scripts": {
        // 脚本
      },
      "actions": [
        // 节点进入时执行的动作
      ]
    }

2.1 文本内容 (text)

节点的主体文本内容，支持特殊标记：

    "text": "你的健康值: {var.show.health.value}\n金钱: {var.show.money.value}\n{0}\n{1}"

支持的标记：

        {var.path}：插入变量值（如{var.show.health.value}）

        {random.id}：插入随机组结果

        {cond.id}：插入条件组结果

        {img.id}：插入图片

        {js.id}：执行脚本

        {数字}：插入链接选项（如{0}表示第一个链接）

2.2 链接选项 (links)

定义玩家可选择的选项：

    "links": [
      {
        "text": "探索森林",
        "target": "forest_explore",
        "condition": "var.show.health.value > 30",
        "actions": [
          {
            "type": "add",
            "target": "var.show.health.value",
            "value": -10
          }
        ]
      },
      {
        "text": "前往村庄",
        "target": "village",
        "random": [
          {
            "target": "village_safe",
            "weight": 8,
            "if": "var.inventory.sword == true"
          },
          {
            "target": "village_attack",
            "weight": 2
          }
        ]
      }
    ]

链接属性：

    text：选项显示文本

    target：跳转的目标节点ID

    condition：选项显示条件（可选）

    actions：选择后执行的动作（可选）

    random：随机跳转选项（可选）

2.3 图片资源 (imgs)

定义节点中使用的图片：

    "imgs": {
      "forest": {
        "path": "forest_scene.png",
        "width": 300
      },
      "npc": {
        "path": "characters/${var.character.gender}_${var.character.class}.png",
        "width": 150
      }
    }

图片属性：

    path：图片路径（支持变量表达式）

    width：显示宽度（像素）

2.4 随机组 (randoms)

定义文本中使用的随机内容：

    "randoms": {
      "encounter": [
        {
          "text": "一只野兔从草丛中窜出",
          "weight": 5
        },
        {
          "text": "你发现了一个宝箱！",
          "weight": 2,
          "condition": "var.flags.has_key == true"
        },
        {
          "text": "一群狼包围了你！",
          "weight": 3
        }
      ]
    }

2.5 条件组 (conds)

根据条件显示不同文本：

    "conds": {
      "health_status": [
        {
          "text": "你感觉精力充沛",
          "condition": "var.show.health.value > 70"
        },
        {
          "text": "你感觉有些疲惫",
          "condition": "var.show.health.value > 30"
        },
        {
          "text": "你濒临死亡，需要治疗"
        }
      ]
    }

2.6 脚本 (scripts)

在节点中执行JavaScript代码：

    "scripts": {
      "calculate_damage": "set('var.show.health.value', get('var.show.health.value') - (10 * get('var.enemy.strength'));"
    }

脚本API：

    set(path, value)：设置变量

    get(path)：获取变量值

    rand(min, max)：生成随机数

    print(msg)：输出调试信息

2.7 节点动作 (actions)

节点加载时自动执行的动作：

    "actions": [
      {
        "type": "add",
        "target": "var.show.money.value",
        "value": 50
      },
      {
        "type": "toggle",
        "target": "var.flags.met_king"
      }
    ]

动作类型：

    set：设置变量值

    add：增加变量值

    toggle：切换布尔值

    random：随机执行子动作

3. 条件表达式

游戏中使用类似JavaScript的条件表达式：
基本语法：

    // 变量比较
    "var.show.health.value > 50"

    // 逻辑运算
    "var.inventory.sword == true && var.show.money.value >= 100"
    
    // 组合条件
    "(var.flags.met_ally || var.inventory.letter == true) && var.show.health.value > 10"

支持的操作符：

    比较：==, !=, >, <, >=, <=

    逻辑：&&, ||

    分组：()

4. 完整示例

```
{
  "variables": {
    "show": {
      "health": { "desc": "健康值", "value": 100 },
      "money": { "desc": "金钱", "value": 50 }
    },
    "inventory": {
      "sword": false,
      "potion": 3
    },
    "flags": {
      "met_wizard": false
    }
  },
  
  "nodes": {
    "start": {
      "text": "你在一个神秘森林中醒来。{img.forest}\n健康值: {var.show.health.value}\n{0}\n{1}",
      "imgs": {
        "forest": {
          "path": "forest.png",
          "width": 300
        }
      },
      "links": [
        {
          "text": "探索森林深处",
          "target": "deep_forest",
          "condition": "var.inventory.sword == true"
        },
        {
          "text": "前往村庄",
          "target": "village"
        }
      ],
      "actions": [
        {
          "type": "add",
          "target": "var.show.health.value",
          "value": -10
        }
      ]
    },
    
    "village": {
      "text": "你到达了一个宁静的村庄。{random.village_scene}\n{0}\n{1}",
      "randoms": {
        "village_scene": [
          { "text": "村民们正在忙碌地工作。", "weight": 3 },
          { "text": "村庄广场正在举行庆典！", "weight": 1 }
        ]
      },
      "links": [
        {
          "text": "拜访铁匠铺",
          "target": "blacksmith"
        },
        {
          "text": "前往酒馆",
          "target": "tavern",
          "actions": [
            {
              "type": "set",
              "target": "var.show.money.value",
              "value": "var.show.money.value - 5"
            }
          ]
        }
      ]
    },
    
    "blacksmith": {
      "text": "铁匠打量着你：{cond.blacksmith_dialog}",
      "conds": {
        "blacksmith_dialog": [
          {
            "text": "你需要一把好剑吗？只要30金币。{0}",
            "condition": "var.show.money.value >= 30"
          },
          {
            "text": "你看起来买不起我的商品。{1}"
          }
        ]
      },
      "links": [
        {
          "text": "购买剑",
          "target": "buy_sword",
          "condition": "var.show.money.value >= 30"
        },
        {
          "text": "离开",
          "target": "village"
        }
      ]
    },
    
    "buy_sword": {
      "text": "你获得了一把锋利的剑！",
      "actions": [
        {
          "type": "set",
          "target": "var.inventory.sword",
          "value": true
        },
        {
          "type": "add",
          "target": "var.show.money.value",
          "value": -30
        }
      ],
      "links": [
        {
          "text": "返回村庄",
          "target": "village"
        }
      ]
    }
  }
}

```
5. 最佳实践

    模块化设计：将大型游戏拆分为多个JSON文件，按章节或区域组织(在下一个版本中实现)

    命名规范：使用一致的节点ID命名规则（如forest_intro, village_market）

    变量管理：

        使用show对象存储玩家可见的状态

        使用flags跟踪重要事件

        使用inventory管理物品

    内容测试：

        使用调试模式验证条件表达式

        测试所有可能的随机分支

        验证图片资源路径

    版本控制：使用Git等工具管理节点文件变更

结语

通过本教程，你应该已经掌握了游戏节点文件的基本结构和编写方法。节点文件作为游戏内容的核心载体，通过合理的结构设计和丰富的交互元素，可以构建出引人入胜的互动叙事体验。

## 快速上手

### 1. 开发

```
npm install
npm run start
```

### 2. 构建

```
npm run build
npm run release
```

### 3. 调试

```
npm run watch
```
### 4. 代码规范化配置
代码规范化可以帮助开发者在git commit前进行代码校验、格式化、commit信息校验

使用前提：必须先关联git

macOS or Linux
```
sh husky.sh
```

windows
```
./husky.sh
```


## 了解更多

你可以通过我们的[官方文档](https://iot.mi.com/vela/quickapp)熟悉和了解快应用。

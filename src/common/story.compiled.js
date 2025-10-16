// BandTwine 自动生成: 核心故事数据
// 生成时间: 2025-10-16T16:15:21.905Z

export default {
  "variables": {
    "calc1": "",
    "calc2": "",
    "calc3": "",
    "world": {
      "time": 480,
      "day": 1,
      "formattedTime": "08:00",
      "timePeriod": "早晨"
    },
    "system": {
      "debug": {
        "value": true
      },
      "version": {
        "value": "0.5.0"
      }
    },
    "show": {
      "counter": {
        "value": 0,
        "desc": "计数器"
      },
      "flag": {
        "value": false,
        "desc": "状态标志"
      },
      "watcher": {
        "value": "未添加",
        "desc": "监听器状态"
      },
      "script": {
        "value": "未执行",
        "desc": "脚本输出"
      },
      "score": {
        "value": 100,
        "desc": "分数"
      },
      "formattedTime": {
        "value": "08:00",
        "desc": "当前时间"
      },
      "currentDay": {
        "value": 1,
        "desc": "当前天数"
      },
      "timePeriod": {
        "value": "早晨",
        "desc": "时间段"
      },
      "toastCount": {
        "value": 0,
        "desc": "Toast计数"
      },
      "jumpTarget": {
        "value": "无",
        "desc": "最近跳转目标"
      }
    },
    "player": {
      "name": {
        "value": "测试用户"
      },
      "level": {
        "value": 1
      }
    },
    "test": {
      "expr1": "",
      "expr2": "",
      "expr3": "",
      "expr4": "",
      "expr5": ""
    }
  },
  "nodes": {
    "start": {
      "links": [
        {
          "text": "基础功能测试",
          "target": "test_basic"
        },
        {
          "text": "变量操作测试",
          "target": "test_variables"
        },
        {
          "text": "条件逻辑测试",
          "target": "test_conditions"
        },
        {
          "text": "随机系统测试",
          "target": "test_random"
        },
        {
          "text": "图片系统测试",
          "target": "test_images"
        },
        {
          "text": "存档系统测试",
          "target": "test_save"
        },
        {
          "text": "表达式测试",
          "target": "test_expressions"
        },
        {
          "text": "振动功能测试",
          "target": "test_vibrate"
        },
        {
          "text": "监听器测试",
          "target": "test_watcher"
        },
        {
          "text": "自动存档测试",
          "target": "test_autosave"
        },
        {
          "text": "时间系统测试",
          "target": "test_time"
        },
        {
          "text": "时间监听器测试",
          "target": "test_time_listeners"
        },
        {
          "text": "Toast消息测试",
          "target": "test_toast"
        },
        {
          "text": "Jump跳转测试",
          "target": "test_jump"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "引擎核心特性测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "v0.3.0-beta"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "测试项目："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 4
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 5
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 6
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 7
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 8
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 9
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 10
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 11
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 12
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 13
        }
      ]
    },
    "test_basic": {
      "links": [
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "基础功能测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "特殊符号：&lt;&gt;@#"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "变量显示："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "长文本测试：这是一段用于测试文本显示能力的长文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容"
        },
        {
          "type": "link",
          "index": 0
        }
      ]
    },
    "test_variables": {
      "links": [
        {
          "text": "计数器+1",
          "target": "test_variables",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": 1
            }
          ]
        },
        {
          "text": "计数器-1",
          "target": "test_variables",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": -1
            }
          ]
        },
        {
          "text": "分数+10",
          "target": "test_variables",
          "actions": [
            {
              "type": "add",
              "target": "var.show.score.value",
              "value": 10
            }
          ]
        },
        {
          "text": "分数-10",
          "target": "test_variables",
          "actions": [
            {
              "type": "add",
              "target": "var.show.score.value",
              "value": -10
            }
          ]
        },
        {
          "text": "切换状态",
          "target": "test_variables",
          "actions": [
            {
              "type": "toggle",
              "target": "var.show.flag.value"
            }
          ]
        },
        {
          "text": "重置数据",
          "target": "test_variables",
          "actions": [
            {
              "type": "set",
              "target": "var.show.counter.value",
              "value": 0
            },
            {
              "type": "set",
              "target": "var.show.flag.value",
              "value": false
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "变量操作测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前分数："
        },
        {
          "type": "variable",
          "path": "show.score.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前状态："
        },
        {
          "type": "variable",
          "path": "show.flag.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 4
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 5
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 6
        }
      ]
    },
    "test_conditions": {
      "links": [
        {
          "text": "增加计数器",
          "target": "test_conditions",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": 1
            }
          ]
        },
        {
          "text": "减少计数器",
          "target": "test_conditions",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": -1
            }
          ]
        },
        {
          "text": "切换状态",
          "target": "test_conditions",
          "actions": [
            {
              "type": "toggle",
              "target": "var.show.flag.value"
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "conds": {
        "basic": [
          {
            "condition": "var.show.counter.value > 5",
            "text": "计数器>5"
          },
          {
            "text": "此时计数器≤5"
          }
        ],
        "complex": [
          {
            "condition": "var.show.counter.value > 10 && var.show.flag.value",
            "text": "此时计数器>10且状态为真"
          },
          {
            "condition": "var.show.counter.value < 5 || !var.show.flag.value",
            "text": "此时计数器<5或状态为假"
          },
          {
            "text": "其他情况"
          }
        ],
        "nested": [
          {
            "condition": "var.show.counter.value > 15",
            "text": "此时计数器大于15"
          },
          {
            "condition": "var.show.counter.value > 10",
            "text": "此时计数器大于10"
          },
          {
            "condition": "var.show.counter.value > 5",
            "text": "此时计数器大于5"
          },
          {
            "text": "此时计数器小于等于5"
          }
        ]
      },
      "segments": [
        {
          "type": "text",
          "content": "条件逻辑测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "状态："
        },
        {
          "type": "variable",
          "path": "show.flag.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "基础条件："
        },
        {
          "type": "newline"
        },
        {
          "type": "condition",
          "id": "basic"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "复杂条件："
        },
        {
          "type": "newline"
        },
        {
          "type": "condition",
          "id": "complex"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "嵌套条件："
        },
        {
          "type": "newline"
        },
        {
          "type": "condition",
          "id": "nested"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        }
      ]
    },
    "test_random": {
      "links": [
        {
          "text": "重新生成",
          "target": "test_random"
        },
        {
          "text": "返回主节点",
          "target": "start"
        },
        {
          "text": "增加计数器",
          "target": "test_random",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": 1
            }
          ]
        },
        {
          "text": "减少计数器",
          "target": "test_random",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": -1
            }
          ]
        }
      ],
      "randoms": {
        "basic": [
          {
            "text": "选项A"
          },
          {
            "text": "选项B"
          },
          {
            "text": "选项C"
          }
        ],
        "weighted": [
          {
            "text": "选项1(60%概率出现)",
            "weight": 0.6
          },
          {
            "text": "选项2(30%概率出现)",
            "weight": 0.3
          },
          {
            "text": "选项3(10%概率出现)",
            "weight": 0.1
          }
        ],
        "conditional": [
          {
            "text": "计数器>5时才可能出现",
            "condition": "var.show.counter.value > 5"
          },
          {
            "text": "一般情况"
          }
        ]
      },
      "segments": [
        {
          "type": "text",
          "content": "随机测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "基础随机："
        },
        {
          "type": "random",
          "id": "basic"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "权重随机："
        },
        {
          "type": "random",
          "id": "weighted"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "条件随机："
        },
        {
          "type": "newline"
        },
        {
          "type": "random",
          "id": "conditional"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "(增加计数器到5试试？)"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        }
      ]
    },
    "test_images": {
      "links": [
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "imgs": {
        "120px": {
          "path": "120px.png",
          "width": 120
        },
        "120px.alt": {
          "path": "test/120px.png",
          "width": 120
        },
        "dynamic": {
          "path": "${var.player.level.value + '.png'}",
          "width": 120
        }
      },
      "segments": [
        {
          "type": "text",
          "content": "图片测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "这是一个宽度为120px的图片"
        },
        {
          "type": "image",
          "id": "120px"
        },
        {
          "type": "text",
          "content": "这是一个多层路径的图片"
        },
        {
          "type": "image",
          "id": "120px.alt"
        },
        {
          "type": "text",
          "content": "这是一个动态路径的图片"
        },
        {
          "type": "image",
          "id": "dynamic"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        }
      ]
    },
    "test_save": {
      "links": [
        {
          "text": "修改测试数据",
          "target": "test_save_modify"
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "存档测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前状态："
        },
        {
          "type": "variable",
          "path": "show.flag.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        }
      ]
    },
    "test_save_modify": {
      "links": [
        {
          "text": "计数器+5",
          "target": "test_save_modify",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": 5
            }
          ]
        },
        {
          "text": "切换状态",
          "target": "test_save_modify",
          "actions": [
            {
              "type": "toggle",
              "target": "var.show.flag.value"
            }
          ]
        },
        {
          "text": "返回上级",
          "target": "test_save"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "修改测试数据"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前状态："
        },
        {
          "type": "variable",
          "path": "show.flag.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        }
      ]
    },
    "test_expressions": {
      "actions": [
        {
          "type": "set",
          "target": "var.test.expr1",
          "value": "$(10 + 20 * 3)"
        },
        {
          "type": "set",
          "target": "var.test.expr2",
          "value": "$(var.show.counter.value * 2 + 5)"
        },
        {
          "type": "set",
          "target": "var.test.expr3",
          "value": "$(var.show.counter.value > 5 ? '大于5' : '小于等于5')"
        },
        {
          "type": "set",
          "target": "var.test.expr4",
          "value": "$((10 + var.show.counter.value) * (var.show.flag.value ? 2 : 1))"
        },
        {
          "type": "set",
          "target": "var.test.expr5",
          "value": "$(var.show.counter.value > 10 ? (var.show.flag.value ? 'A' : 'B') : (var.show.counter.value > 5 ? 'C' : 'D'))"
        }
      ],
      "links": [
        {
          "text": "更新表达式",
          "target": "test_expressions"
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "表达式测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "【简单表达式】"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "10+20*3 = "
        },
        {
          "type": "variable",
          "path": "test.expr1"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "【变量表达式】"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "var.show.counter.value*2+5 = "
        },
        {
          "type": "variable",
          "path": "test.expr2"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "【条件表达式】"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "var.show.counter.value > 5 ? '大于5' : '小于等于5' = "
        },
        {
          "type": "variable",
          "path": "test.expr3"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "【嵌套表达式】"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "(10 + var.show.counter.value) * (var.show.flag.value ? 2 : 1) = "
        },
        {
          "type": "variable",
          "path": "test.expr4"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "【复杂嵌套表达式】"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "var.show.counter.value > 10 ? "
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "  (var.show.flag.value ? 'A' : 'B') : "
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "  (var.show.counter.value > 5 ? 'C' : 'D') = "
        },
        {
          "type": "variable",
          "path": "test.expr5"
        },
        {
          "type": "newline"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        }
      ]
    },
    "test_vibrate": {
      "links": [
        {
          "text": "短振动(100ms)",
          "target": "test_vibrate",
          "actions": [
            {
              "type": "vibrate",
              "mode": "short"
            }
          ]
        },
        {
          "text": "长振动(500ms)",
          "target": "test_vibrate",
          "actions": [
            {
              "type": "vibrate",
              "mode": "long"
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "振动功能测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "选择振动类型："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        }
      ]
    },
    "test_watcher": {
      "links": [
        {
          "text": "创建监听器(当计数器>3时触发)",
          "target": "test_watcher",
          "actions": [
            {
              "type": "addListener",
              "id": "test_watcher_1",
              "condition": "var.show.counter.value > 3",
              "actions": [
                {
                  "type": "set",
                  "target": "var.show.watcher.value",
                  "value": "已触发"
                },
                {
                  "type": "vibrate",
                  "mode": "long"
                }
              ],
              "options": {
                "nodeId": "start"
              }
            },
            {
              "type": "set",
              "target": "var.show.watcher.value",
              "value": "已添加"
            }
          ]
        },
        {
          "text": "移除所有监听器",
          "target": "test_watcher",
          "actions": [
            {
              "type": "removeListener",
              "id": "all"
            },
            {
              "type": "set",
              "target": "var.show.watcher.value",
              "value": "已移除"
            }
          ]
        },
        {
          "text": "增加计数器",
          "target": "test_watcher",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": 1
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "监听器测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "监听器状态："
        },
        {
          "type": "variable",
          "path": "show.watcher.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        }
      ]
    },
    "test_autosave": {
      "links": [
        {
          "text": "执行自动存档",
          "target": "test_autosave",
          "actions": [
            {
              "type": "autosave"
            }
          ]
        },
        {
          "text": "修改计数器(触发条件)",
          "target": "test_autosave_modify"
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "自动存档测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        }
      ]
    },
    "test_autosave_modify": {
      "links": [
        {
          "text": "计数器+1",
          "target": "test_autosave_modify",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": 1
            }
          ]
        },
        {
          "text": "计数器-1",
          "target": "test_autosave_modify",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": -1
            }
          ]
        },
        {
          "text": "返回上级",
          "target": "test_autosave"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "修改测试数据"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前计数器："
        },
        {
          "type": "variable",
          "path": "show.counter.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        }
      ]
    },
    "test_time": {
      "links": [
        {
          "text": "推进15分钟",
          "target": "test_time",
          "actions": [
            {
              "type": "advanceTime",
              "minutes": 15
            }
          ]
        },
        {
          "text": "推进75分钟",
          "target": "test_time",
          "actions": [
            {
              "type": "advanceTime",
              "minutes": 75
            }
          ]
        },
        {
          "text": "推进300分钟(测试跨天)",
          "target": "test_time",
          "actions": [
            {
              "type": "advanceTime",
              "minutes": 300
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "时间系统测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前时间："
        },
        {
          "type": "variable",
          "path": "world.formattedTime"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前天数："
        },
        {
          "type": "variable",
          "path": "world.day"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        }
      ]
    },
    "test_time_listeners": {
      "links": [
        {
          "text": "添加整点监听器",
          "target": "test_time_listeners",
          "actions": [
            {
              "type": "addListener",
              "id": "hourly",
              "condition": "hourChanged",
              "actions": [
                {
                  "type": "toast",
                  "message": "整点时间已触发"
                }
              ],
              "options": {
                "once": false
              }
            },
            {
              "type": "set",
              "target": "var.show.watcher.value",
              "value": "整点监听已添加"
            }
          ]
        },
        {
          "text": "添加跨天监听器",
          "target": "test_time_listeners",
          "actions": [
            {
              "type": "addListener",
              "id": "new_day",
              "condition": "dayChanged",
              "actions": [
                {
                  "type": "toast",
                  "message": "新的一天开始了!"
                }
              ],
              "options": {
                "once": false
              }
            },
            {
              "type": "set",
              "target": "var.show.watcher.value",
              "value": "跨天监听已添加"
            }
          ]
        },
        {
          "text": "推进时间(测试整点)",
          "target": "test_time_listeners",
          "actions": [
            {
              "type": "advanceTime",
              "minutes": 59
            }
          ]
        },
        {
          "text": "推进时间(测试跨天)",
          "target": "test_time_listeners",
          "actions": [
            {
              "type": "advanceTime",
              "minutes": 1440
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "时间监听器测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前时间："
        },
        {
          "type": "variable",
          "path": "world.formattedTime"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "监听器状态："
        },
        {
          "type": "variable",
          "path": "show.watcher.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 4
        }
      ]
    },
    "test_time_custom": {
      "links": [
        {
          "text": "添加早晨8点监听",
          "target": "test_time_custom",
          "actions": [
            {
              "type": "addListener",
              "id": "morning_8am",
              "condition": "hourChanged && var.world.time == 480",
              "actions": [
                {
                  "type": "toast",
                  "message": "早上8点，该吃早餐了"
                }
              ],
              "options": {
                "once": false
              }
            },
            {
              "type": "set",
              "target": "var.show.watcher.value",
              "value": "早晨8点监听已添加"
            }
          ]
        },
        {
          "text": "推进到7:55(测试)",
          "target": "test_time_custom",
          "actions": [
            {
              "type": "advanceTime",
              "minutes": 475
            }
          ]
        },
        {
          "text": "再推进10分钟(触发)",
          "target": "test_time_custom",
          "actions": [
            {
              "type": "advanceTime",
              "minutes": 10
            }
          ]
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "自定义时间监听测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "当前时间："
        },
        {
          "type": "variable",
          "path": "world.formattedTime"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "监听器状态："
        },
        {
          "type": "variable",
          "path": "show.watcher.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        }
      ]
    },
    "test_toast": {
      "links": [
        {
          "text": "显示简单Toast",
          "target": "test_toast",
          "actions": [
            {
              "type": "toast",
              "message": "这是一个测试Toast"
            },
            {
              "type": "add",
              "target": "var.show.toastCount.value",
              "value": 1
            }
          ]
        },
        {
          "text": "显示带变量的Toast",
          "target": "test_toast",
          "actions": [
            {
              "type": "toast",
              "message": "当前时间: {var.world.formattedTime}, 计数器: {var.show.counter.value}"
            },
            {
              "type": "add",
              "target": "var.show.toastCount.value",
              "value": 1
            }
          ]
        },
        {
          "text": "显示长持续时间Toast",
          "target": "test_toast",
          "actions": [
            {
              "type": "toast",
              "message": "5秒Toast",
              "duration": 5000
            },
            {
              "type": "add",
              "target": "var.show.toastCount.value",
              "value": 1
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "Toast消息测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "Toast计数："
        },
        {
          "type": "variable",
          "path": "show.toastCount.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        }
      ]
    },
    "test_jump": {
      "links": [
        {
          "text": "无条件跳转到start",
          "target": "test_jump",
          "actions": [
            {
              "type": "jump",
              "target": "start"
            },
            {
              "type": "set",
              "target": "var.show.jumpTarget.value",
              "value": "start"
            }
          ]
        },
        {
          "text": "条件跳转(计数器>3)",
          "target": "test_jump",
          "actions": [
            {
              "type": "jump",
              "target": "test_conditions",
              "condition": "var.show.counter.value > 3",
              "beforeActions": [
                {
                  "type": "toast",
                  "message": "即将跳转到条件测试"
                }
              ],
              "afterActions": [
                {
                  "type": "set",
                  "target": "var.show.jumpTarget.value",
                  "value": "test_conditions"
                }
              ]
            }
          ]
        },
        {
          "text": "带前后操作的跳转",
          "target": "test_jump",
          "actions": [
            {
              "type": "jump",
              "target": "test_expressions",
              "beforeActions": [
                {
                  "type": "set",
                  "target": "var.show.counter.value",
                  "value": 10
                }
              ],
              "afterActions": [
                {
                  "type": "toast",
                  "message": "已跳转到表达式测试"
                },
                {
                  "type": "set",
                  "target": "var.show.jumpTarget.value",
                  "value": "test_expressions"
                }
              ]
            }
          ]
        },
        {
          "text": "增加计数器",
          "target": "test_jump",
          "actions": [
            {
              "type": "add",
              "target": "var.show.counter.value",
              "value": 1
            }
          ]
        },
        {
          "text": "返回主节点",
          "target": "start"
        }
      ],
      "segments": [
        {
          "type": "text",
          "content": "Jump跳转测试"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "最近跳转目标："
        },
        {
          "type": "variable",
          "path": "show.jumpTarget.value"
        },
        {
          "type": "newline"
        },
        {
          "type": "text",
          "content": "操作选项："
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 0
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 1
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 2
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 3
        },
        {
          "type": "newline"
        },
        {
          "type": "link",
          "index": 4
        }
      ]
    }
  }
};

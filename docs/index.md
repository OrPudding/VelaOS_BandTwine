---
# 使用 VitePress 的首页布局
layout: home

# 首页 Hero (英雄区) 配置
hero:
  # 项目名称和 Slogan
  name: "BandTwine (结彩)"
  text: "首个面向 RTOS 智能穿戴的 Twine 实现"
  tagline: 纯 JSON 构建分支剧情，为手腕方寸之间的沉浸叙事体验而生。
  
  # 行动号召按钮
  actions:
    - theme: brand
      text: 快速上手
      link: /quick-start # 链接到快速上手页面
    - theme: alt
      text: 查看 GitHub
      link: https://github.com/OrPudding/VelaOS_BandTwine # 您的 GitHub 仓库

# 首页 Features (特性列表 ) 配置
features:
  - icon: '🚀'
    title: 零代码开发
    details: 纯 JSON 构建分支剧情，任何文本编辑器都是您的开发环境。后续还将提供可视化节点编辑器，让创作更直观。
  - icon: '⌚️'
    title: 穿戴设备专属优化
    details: 内置时间系统、震动反馈、低功耗渲染和小屏交互优化，确保流畅、沉浸的叙事体验。
  - icon: '🌐'
    title: 平台无关设计
    details: BandTwine 引擎核心专注于创作语法，一次学习，即可面向未来所有适配的平台进行创作。
---

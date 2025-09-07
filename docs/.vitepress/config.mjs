import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "BandTwine", // <-- 请替换成您的项目名
  description: "一个开源的RTOS文字游戏引擎", // <-- 可以自定义描述

  // 主题配置
  themeConfig: {
    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/quick-start' },
      { text: '教程', link: '/1_introduction_to_data_js' }, // 链接到教程的第一页
      { text: 'API 参考', link: '/api-reference' },
      // 在这里添加您的 GitHub 链接，让它显示在右上角
      // { text: 'GitHub', link: 'https://github.com/OrPudding/VelaOS_BandTwine' } 
    ],

    // 侧边栏
    sidebar: [
      {
        text: '入门指南',
        items: [
          { text: '项目简介', link: '/home' }, // 假设 home.md 是简介
          { text: '快速上手', link: '/quick-start' },
        ]
      },
      {
        text: '快速上手',
        collapsed: false,
        items: [
            { text: '第一站：点亮第一个场景', link: '/1-your-first-scene' },
            { text: '第二站：创造岔路口 ', link: '/2-adding-choices' },
            { text: '第三站：赋予世界记忆 ', link: '/3-using-variables' },
            { text: '第四站：选择的力量 ', link: '/4-changing-the-story' },
            { text: '第五步：打开秘密之门 ', link: '/5-creating-conditional-logic' },
        ]
      },
      {
        text: 'data.json 教程',
        collapsed: false, // 默认展开这个分组
        items: [
          { text: '1. data.json 简介', link: '/1_introduction_to_data_js' },
          { text: '2. 节点 (Nodes ) 定义', link: '/2_nodes_definition' },
          { text: '3. 文本格式化与标记', link: '/3_text_formatting_and_markers' },
          { text: '4. 变量系统', link: '/4_variable_system' },
          { text: '5. 动作 (Actions)', link: '/5_actions' },
          { text: '6. 条件与随机', link: '/6_conditions_and_randoms' },
          { text: '7. 监听器与时间系统', link: '/7_listeners_and_time_system' },
          { text: '8. 存档与读档', link: '/8_save_and_load' },
          { text: '9. 最佳实践与 FAQ', link: '/9_best_practices_and_faq' },
        ]
      },
      {
        text: '参考手册',
        items: [
          { text: 'API 参考', link: '/api-reference' },
          { text: '社区与贡献', link: '/community' },
        ]
      }
    ],

    // 在这里添加社交链接，例如 GitHub
    socialLinks: [
      { icon: 'github', link: 'https://github.com/OrPudding/VelaOS_BandTwine' } // <-- 请替换成您的仓库地址
    ]
  }
} )

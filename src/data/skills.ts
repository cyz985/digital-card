import type { SkillGroup } from '@/types'

/**
 * 内容编辑区：专业技能（示例数据）
 * 只需修改本文件即可增删技能；level 只能写 1–5 的整数
 */
export const skillGroups: SkillGroup[] = [
  {
    category: '数据分析',
    description: '从业务问题出发完成数据清洗、指标拆解与可视化呈现。',
    items: [
      { name: '数据清洗与预处理', level: 4 },
      { name: '描述性统计与指标拆解', level: 4 },
      { name: 'SQL 查询', level: 3 },
      { name: 'Tableau 可视化', level: 3 },
      { name: 'A/B 测试基础', level: 3 },
    ],
  },
  {
    category: '数字营销',
    description: '围绕用户增长与转化路径，完成内容策划与效果复盘。',
    items: [
      { name: '用户增长与转化漏斗', level: 4 },
      { name: '内容运营与选题策划', level: 4 },
      { name: 'SEO / SEM 基础', level: 3 },
      { name: '社交媒体投放', level: 3 },
    ],
  },
  {
    category: 'Excel 与办公',
    description: '用表格工具完成数据整理、透视分析与汇报呈现。',
    items: [
      { name: 'Excel 高级函数与数据透视表', level: 5 },
      { name: 'Power Query 数据整理', level: 4 },
      { name: 'PowerPoint 汇报呈现', level: 4 },
      { name: '飞书多维表格', level: 3 },
    ],
  },
  {
    category: 'Python 与编程',
    description: '用 Python 完成数据处理、分析与基础自动化脚本。',
    items: [
      { name: 'Python 基础语法', level: 4 },
      { name: 'pandas 数据分析', level: 3 },
      { name: 'Matplotlib / Seaborn 可视化', level: 3 },
      { name: '网络爬虫入门', level: 2 },
    ],
  },
  {
    category: '前端基础',
    description: '能够独立搭建结构清晰、适配移动端的静态页面。',
    items: [
      { name: 'HTML / CSS 语义化布局', level: 3 },
      { name: 'JavaScript 基础', level: 3 },
      { name: 'React 组件开发', level: 2 },
      { name: 'Tailwind CSS', level: 2 },
    ],
  },
]

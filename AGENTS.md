# AGENTS.md｜开发规范与协作约定

本文件面向所有参与本项目的 AI Agent 与开发者。**任何代码改动前先读本文件**，并与 `PRD.md`、`TECH_DESIGN.md` 保持一致；三者冲突时，优先级为：`PRD.md` > `TECH_DESIGN.md` > `AGENTS.md`。

---

## 1. 项目定位

- 数字经济专业学生的**个人数字名片**，纯静态单页网站，无后端。
- 技术栈固定：React + TypeScript + Vite + Tailwind CSS + Framer Motion。
- 目标是可部署到 Vercel 的公网页面，性能与可访问性优先于视觉炫技。

---

## 2. 目录职责

| 目录 | 职责 | 禁止 |
| --- | --- | --- |
| `src/components/layout` | Header、Footer 等页面级固定结构 | 存放业务数据 |
| `src/components/sections` | 五个内容区块，只做数据装配与布局 | 写复杂可复用逻辑 |
| `src/components/ui` | 无业务感知的原子组件 | 直接 import `src/data` |
| `src/data` | 全部文案与内容数据（纯数据，无 JSX） | 引入 React / 组件 |
| `src/hooks` | 可复用行为（滚动、复制、锁定滚动） | 存放 UI |
| `src/lib` | 动画 variants、工具函数 | 存放业务数据 |
| `src/types` | 唯一类型定义来源 | 定义运行时逻辑 |
| `src/styles` | Tailwind 入口与设计令牌 | 写组件私有样式 |
| `src/assets` | 需要构建处理的图片 | 放大体积未压缩资源 |
| `public` | 原样输出的静态资源（favicon、头像、OG 图） | 放需要被 import 的模块 |

新增文件必须落在上述目录内，不新建平级新目录（如 `utils`、`constants`）而不更新本文档。

---

## 3. 开发规范

### 3.1 编码约定

- TypeScript **strict 模式**，不使用 `any`；确实无法推断时用 `unknown` + 类型收窄。
- 组件一律**函数组件 + 具名导出**（`export function Hero()`），不用默认导出（`App`、`main` 入口除外）。
- 组件文件名 PascalCase（`ProjectCard.tsx`），hooks 用 `useXxx.ts`，数据文件 camelCase（`profile.ts`）。
- Props 使用本地 `interface XxxProps`，就近定义在组件文件顶部。
- 单文件建议 ≤ 150 行；超出则拆分到 `ui/`。
- 不写无意义注释；仅在逻辑不直观处写简短说明。禁止大段 JSDoc 模板注释。

### 3.2 数据与类型

- 页面所有可展示文案（姓名、简介、技能、项目、联系方式）**必须**来自 `src/data`，组件内不得硬编码。
- 新增字段先改 `src/types/index.ts`，再改 `data`，最后改组件，保证类型先行的顺序。
- `SkillLevel` 仅允许 `1 | 2 | 3 | 4 | 5`，不得写 0 或 6。
- 导入统一用别名：`import { projects } from "@/data"`，禁止 `../../data/projects` 这类长相对路径。

### 3.3 样式约定

- 只使用 Tailwind 原子类；不使用 CSS Modules、styled-components、内联 `style`（动态计算值除外）。
- 颜色必须使用设计令牌（`bg-ink`、`text-fg`、`text-muted`、`from-accent-from`…），**禁止硬编码十六进制色值**。
- 自定义类只允许出现在 `src/styles/index.css` 的 `@layer components` 中，且需说明用途。
- 类名顺序建议：布局 → 盒模型 → 排版 → 颜色 → 效果 → 状态。
- 使用 `cn()`（`src/lib/utils.ts`）合并条件类名，不手写字符串拼接。

### 3.4 动效约定

- 所有入场动画复用 `src/lib/motion.ts` 的 variants，不在组件内重复定义相同参数。
- 视口触发统一 `viewport={{ once: true, amount: 0.2 }}`，**不允许重复播放**。
- 只动画 `opacity` 与 `transform`；不动画 `width` / `height` / `top` / `left`。
- 单次动效时长 0.4–0.7s，交错间隔 0.06–0.1s；hover 反馈 ≤ 0.3s。
- 必须使用 `useReducedMotion()` 处理减弱动效偏好。
- 禁止无限循环动画（极缓慢背景光晕除外，需可关闭）。

---

## 4. UI 约束（硬性）

### 4.1 主题与色彩

- 页面背景：`#0a0a0a`（`bg-ink`）；正文：`#ffffff`（`text-fg`）。
- 强调色只作为渐变点缀：紫 `#8b5cf6` → 青 `#22d3ee`，不用于大面积背景。
- 卡片背景介于 `#111111`–`#161616`，边框 `rgba(255,255,255,0.08)`。
- 不使用高饱和纯色块（红/绿/黄），状态色如需使用须降低饱和度并控制面积。

### 4.2 排版

- 每页 `h1` 唯一（Hero 姓名），区块标题用 `h2`，卡片标题用 `h3`。
- 中文正文 15–16px，行高 1.7；正文行宽不超过约 72 字符。
- 不使用全大写中文；英文 eyebrow 可使用 `tracking-widest` + 小字号。
- 禁止使用渐变文字超过 1 处/屏（Hero 姓名或区块强调词二选一）。

### 4.3 间距与圆角

- 区块纵向内边距：移动端 `py-20`，桌面 `py-28`。
- 容器：`mx-auto w-full max-w-6xl px-5 md:px-8`。
- 卡片圆角 `rounded-card`（16px），按钮圆角全圆或 12px，二者不混用到同类元素。
- 相邻区块对比依靠间距与背景层级，不额外加分割线堆叠。

### 4.4 响应式（强制）

- 移动端优先编写，断点：`sm 640` / `md 768` / `lg 1024`。
- 375px 宽度下：无横向滚动、无文字截断、无元素重叠。
- 可点击区域最小 44×44px；移动端导航必须是汉堡菜单，不压缩成小字链接。
- 任何横向排列的网格在移动端必须降为单列（`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`）。

### 4.5 图片

- 一律通过 `LazyImage` 渲染；`alt` 必填且语义准确，纯装饰图 `alt=""`。
- 必须声明宽高比以避免 CLS；项目封面用 `aspect-[16/10]`。
- 所有图片统一使用 `loading="lazy"` + `decoding="async"`，包括首屏头像；仅在确有首屏性能需求时才使用 `priority`。
- 禁止使用外链随机图片（如占位图服务）作为最终素材。

### 4.6 交互与可访问性

- 所有可点击元素使用 `<a>` 或 `<button>`，禁止 `div onClick`。
- 外链必须 `target="_blank" rel="noopener noreferrer"`。
- 焦点态可见：`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60`。
- 图标按钮必须有 `aria-label`；装饰图标 `aria-hidden="true"`。
- 页面结构使用 `header` / `nav` / `main` / `section` / `footer` 语义标签。
- 移动端菜单展开时锁定 body 滚动，支持 Esc 关闭，关闭后焦点回到触发按钮。

---

## 5. 注意事项（易错点）

1. **锚点偏移**：固定 Header 会遮挡锚点目标，区块必须加 `scroll-mt-24`（或对应高度），否则跳转后标题被盖住。
2. **`once: true`**：忘记设置会导致上滚再下滚时动画重复播放，违反 PRD。
3. **Tailwind v4 无 config 文件**：设计令牌写在 `src/styles/index.css` 的 `@theme` 中，不要试图创建 `tailwind.config.js`。
4. **v4 中 `@apply` 需在 `@layer` 内**，且优先使用原子类，非必要不 `@apply`。
5. **不要在 `ui/` 组件里 import `src/data`**，否则组件失去复用性并造成循环依赖风险。
6. **Framer Motion 的 `whileInView` 与 `once` 需写在 `viewport` 对象内**，不要写成顶层属性。
7. **图片路径**：`public/` 下用 `/avatar.webp` 绝对路径；`src/assets` 下必须 `import` 后使用，否则构建后 404。
8. **Vercel 部署**：Output Directory 必须是 `dist`；如手动配置 `vercel.json`，SPA 回退 rewrite 不可省略。
9. **不要引入 React Router**：本项目是单页锚点，引入会增加体积且无收益。
10. **不要添加后端请求、环境变量、第三方统计**，保持纯静态。
11. **中文文案**：使用全角标点，避免中英文混排缺空格；专有名词保持原文大小写（GitHub、Python）。
12. **依赖控制**：新增依赖前先确认能否用现有依赖或内联实现；单个依赖 gzip 后 > 30KB 需说明理由。

---

## 6. 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 本地开发，http://localhost:5173
npm run build        # 类型检查 + 生产构建 → dist/
npm run preview      # 预览生产产物
npm run lint         # oxlint 检查
```

> Windows PowerShell 环境若脚本执行策略受限，使用 `npm.cmd` 替代 `npm`。

---

## 7. 交付检查清单

提交前逐项确认：

- [ ] `npm run build` 通过，无 TS 报错。
- [ ] 375 / 768 / 1440 三档布局无溢出。
- [ ] 导航锚点跳转位置正确，当前区块高亮正确。
- [ ] 入场动画只播放一次，减弱动效设置下不位移。
- [ ] 页面无硬编码文案（全部来自 `src/data`）。
- [ ] 图片均懒加载且有 `alt`，无 CLS 抖动。
- [ ] 所有外链带 `rel="noopener noreferrer"`。
- [ ] 无 `console.log` 残留、无未使用依赖。
- [ ] 深色主题色值与设计令牌一致，无硬编码色值。

---

## 8. 内容编辑指南（面向站点所有者）

网站所有可展示内容集中在 `src/data`，修改文案不需要改动任何组件：

| 想修改的内容 | 修改文件 |
| --- | --- |
| 姓名、头像、身份、简介、亮点、按钮、社交入口 | `src/data/profile.ts` |
| 技能分类、技能名称与熟练度 | `src/data/skills.ts` |
| 课程项目、封面、标签、年份、链接 | `src/data/projects.ts` |
| 邮箱、GitHub、微信、电话 | `src/data/contact.ts` |
| 顶部导航文字 | `src/data/navigation.ts` |

说明：

- 邮箱、GitHub 与项目链接目前使用 `#` 占位，文件中已用 `TODO` 注释标出，替换为真实地址即可。
- 技能熟练度 `level` 只能写 `1`–`5` 的整数。
- 头像与项目封面支持两种写法：直接写图片 URL，或调用 `createImageUrl(prompt, size)` 生成配图。
- 修改后执行 `npm run dev` 本地预览，`npm run build` 验证类型与构建。

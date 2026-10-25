# TECH DESIGN｜个人数字名片技术方案

配套文档：`PRD.md`（需求）、`AGENTS.md`（开发规范）。

---

## 1. 技术选型

| 领域 | 选型 | 版本策略 | 说明 |
| --- | --- | --- | --- |
| 构建工具 | Vite | 最新稳定版 | 极快冷启动与 HMR，静态产物简单 |
| 框架 | React | 19.x | 函数组件 + Hooks |
| 语言 | TypeScript | 6.x（strict） | 全量类型约束 |
| 样式 | Tailwind CSS | v4 | 通过 `@tailwindcss/vite` 插件接入，配置内联在 CSS 中 |
| 动画 | Framer Motion | 14.x | 入场动画、交错、hover 微交互 |
| 图标 | 内联 SVG 组件 | — | 不引入图标库，避免额外体积 |
| 部署 | Vercel | — | 静态托管，自动 HTTPS 与 CDN |

### 1.1 关键决策

1. **不引入路由**：单页锚点滚动即可满足需求，避免 React Router 增加体积与复杂度。
2. **不引入 UI 组件库**：页面结构简单，自建组件更易保证视觉一致性。
3. **Tailwind v4**：使用 `@tailwindcss/vite` + CSS 内 `@theme` 定义设计令牌，无需 `tailwind.config.js`。
4. **数据与视图分离**：`src/data` 只导出纯数据，`src/types` 只导出类型，组件只负责渲染。
5. **动画抽象**：统一在 `src/lib/motion.ts` 定义 variants，避免各组件重复写参数。

---

## 2. 架构总览

```
index.html
  └─ src/main.tsx
       └─ <App />
            ├─ <Header />          固定导航（滚动监听 + 移动端菜单）
            ├─ <main>
            │    ├─ <Hero />       #home
            │    ├─ <About />      #about
            │    ├─ <Skills />     #skills
            │    ├─ <Projects />   #projects
            │    └─ <Contact />    #contact
            └─ <Footer />

数据流：src/data/*.ts ──(import)──> sections 组件 ──> 渲染
类型流：src/types/index.ts ──> data 与组件共同约束
样式流：src/styles/index.css（@theme 令牌 + 全局基础样式）──> Tailwind 原子类
动画流：src/lib/motion.ts（variants）──> <Reveal /> 与各组件
```

---

## 3. 完整目录结构

```
digital-card/
├── public/
│   ├── favicon.svg                 # 站点图标
│   ├── avatar.webp                 # 头像（首屏，非懒加载）
│   └── og-cover.jpg                # 社交分享封面 1200×630
├── src/
│   ├── assets/
│   │   └── projects/               # 课程项目封面图（懒加载）
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # 顶部导航 + 移动端菜单
│   │   │   └── Footer.tsx          # 页脚
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # 首页
│   │   │   ├── About.tsx           # 关于我
│   │   │   ├── Skills.tsx          # 专业技能
│   │   │   ├── Projects.tsx        # 课程项目
│   │   │   └── Contact.tsx         # 联系方式
│   │   └── ui/
│   │       ├── Reveal.tsx          # 滚动入场动画包装器
│   │       ├── SectionTitle.tsx    # 区块标题（含渐变强调）
│   │       ├── ProjectCard.tsx     # 项目卡片
│   │       ├── SkillGroup.tsx      # 技能分组卡片
│   │       ├── LazyImage.tsx       # 懒加载图片封装
│   │       ├── GradientButton.tsx  # 主按钮
│   │       └── Icon.tsx            # 内联 SVG 图标集合
│   ├── data/
│   │   ├── profile.ts              # 姓名、头像、简介、社交入口
│   │   ├── skills.ts               # 技能分组与等级
│   │   ├── projects.ts             # 课程项目列表
│   │   ├── contact.ts              # 联系方式
│   │   ├── navigation.ts           # 导航项配置
│   │   └── index.ts                # 统一出口
│   ├── hooks/
│   │   ├── useScrollSpy.ts         # 当前区块高亮
│   │   ├── useScrolled.ts          # 是否已滚动（Header 样式切换）
│   │   ├── useLockBodyScroll.ts    # 移动端菜单打开时锁定滚动
│   │   └── useCopyToClipboard.ts   # 复制邮箱
│   ├── lib/
│   │   ├── motion.ts               # Framer Motion variants 与公共参数
│   │   └── utils.ts                # cn / 滚动工具等轻量函数
│   ├── types/
│   │   └── index.ts                # 全部 TS 数据模型
│   ├── styles/
│   │   └── index.css               # Tailwind 入口 + @theme 令牌 + 基础样式
│   ├── App.tsx                     # 页面组装
│   ├── main.tsx                    # 应用入口
│   └── vite-env.d.ts               # Vite 类型声明
├── index.html                      # HTML 模板（SEO / OG / 字体）
├── package.json
├── tsconfig.json                   # TS 项目引用
├── tsconfig.app.json               # 应用侧编译配置
├── tsconfig.node.json              # Node 侧（vite.config）编译配置
├── vite.config.ts                  # React + Tailwind 插件
├── .oxlintrc.json                  # oxlint 配置（Vite 模板内置）
├── vercel.json                     # 部署配置（可选，默认即可）
├── .gitignore
├── PRD.md
├── TECH_DESIGN.md
└── AGENTS.md
```

> 说明：本期只搭建骨架。`components/**`、`sections/**`、`hooks/**`、`lib/**` 仅保留目录与 `.gitkeep` 占位，不写业务实现；`data/**` 与 `types/**` 在进入功能开发阶段后按本文第 4、5 节落地。

---

## 4. TypeScript 数据模型

统一在 `src/types/index.ts` 定义，`data` 层全部通过类型校验。

```ts
/** 导航项 */
export interface NavItem {
  id: string;        // 区块 id，同时作为锚点
  label: string;     // 展示文案
}

/** 社交 / 外部链接 */
export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "mail" | "wechat" | "phone" | "linkedin" | "link";
}

/** 行动按钮 */
export interface CTA {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external?: boolean;
}

/** 个人档案（Hero + About 共用） */
export interface Profile {
  name: string;
  englishName?: string;
  avatar: string;
  role: string;              // 如「数字经济专业 · 本科生」
  headline: string;          // Hero 一句话简介
  bio: string[];             // About 段落，每个元素一段
  meta: ProfileMetaItem[];   // 标签信息
  highlights?: Highlight[];  // 量化亮点
  ctas: CTA[];
  socials: SocialLink[];
}

export interface ProfileMetaItem {
  label: string;
  value: string;
}

export interface Highlight {
  value: string;   // 如「6+」
  label: string;   // 如「课程项目」
}

/** 技能 */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  level: SkillLevel;     // 1–5，用于星级 / 进度条
  note?: string;         // 可选补充说明
}

export interface SkillGroup {
  category: string;      // 如「数据分析」
  description?: string;
  items: Skill[];
}

/** 课程项目 */
export interface Project {
  id: string;
  title: string;
  description: string;
  cover: string;          // 图片路径（assets 或 public）
  coverAlt: string;
  tags: string[];
  year: string;           // 如「2025 秋」
  links: ProjectLink[];
  featured?: boolean;     // 是否标记为重点项目
}

export interface ProjectLink {
  label: string;          // GitHub / 在线预览
  href: string;
  type: "github" | "demo" | "doc" | "other";
}

/** 联系方式 */
export interface ContactItem {
  label: string;          // 如「邮箱」
  value: string;          // 展示值
  href?: string;          // 跳转地址（mailto / https）
  copyable?: boolean;     // 是否支持复制
  icon: SocialLink["icon"];
}

export interface ContactContent {
  title: string;
  description: string;
  items: ContactItem[];
}

/** 站点级配置 */
export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  locale: string;
}
```

约束：

- `SkillLevel` 使用字面量联合类型，仅允许 1–5，写入越界值编译期报错。
- 所有 `href` 必须为合法字符串；外链统一 `https://` 开头。
- 组件不得定义私有的业务数据结构，如需扩展先改本文件。

---

## 5. 数据层设计

| 文件 | 导出 | 内容 |
| --- | --- | --- |
| `data/profile.ts` | `profile: Profile` | 姓名、头像、简介、CTA、社交入口 |
| `data/skills.ts` | `skillGroups: SkillGroup[]` | 4 个左右的技能分类 |
| `data/projects.ts` | `projects: Project[]` | 4–6 个课程项目 |
| `data/contact.ts` | `contact: ContactContent` | 联系邀请语与联系方式 |
| `data/navigation.ts` | `navItems: NavItem[]` | 5 个导航项 |
| `data/index.ts` | 统一 re-export | 组件从 `@/data` 导入 |

导入路径统一使用别名 `@/`（`vite.config.ts` 与 `tsconfig.app.json` 同步配置）。

---

## 6. 组件设计

### 6.1 分层原则

- `layout/`：页面级固定结构，只有一个实例（Header、Footer）。
- `sections/`：语义区块，对应 PRD 的 5 个主区块，只做数据装配与布局。
- `ui/`：可复用原子组件，不感知具体业务数据（只接收 props）。

### 6.2 关键组件契约

```ts
// Reveal：滚动入场包装器
interface RevealProps {
  children: React.ReactNode;
  delay?: number;          // 秒
  y?: number;              // 初始位移，默认 24
  once?: boolean;          // 默认 true
  className?: string;
  as?: "div" | "section" | "li";
}

// SectionTitle
interface SectionTitleProps {
  eyebrow?: string;        // 小标签，如「ABOUT」
  title: string;
  description?: string;
  align?: "left" | "center";
}

// LazyImage
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;             // 必填
  aspectRatio?: string;    // 如 "16 / 10"，用于规避 CLS
  priority?: boolean;      // 首屏关键图设 true，跳过懒加载
}

// ProjectCard
interface ProjectCardProps {
  project: Project;
  index: number;           // 用于交错动画延迟
}
```

### 6.3 Header 行为

- `useScrolled(8)` 控制背景模糊与边框出现。
- `useScrollSpy(ids)` 基于 `IntersectionObserver` 输出当前激活的区块 id。
- 移动端菜单打开时调用 `useLockBodyScroll`，关闭时恢复；监听 `Escape`。
- 锚点点击使用 `scrollIntoView({ behavior: "smooth", block: "start" })`，并通过 `scroll-mt-*` 预留 Header 高度。

---

## 7. 样式方案

### 7.1 Tailwind v4 接入

`vite.config.ts`：

```ts
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
```

`src/styles/index.css`：

```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0a0a;          /* 页面背景 */
  --color-surface: #111111;      /* 卡片背景 */
  --color-surface-2: #161616;    /* 次级卡片 / hover */
  --color-line: rgba(255, 255, 255, 0.08);
  --color-fg: #ffffff;
  --color-muted: #a1a1aa;
  --color-faint: #71717a;
  --color-accent-from: #8b5cf6;
  --color-accent-to: #22d3ee;

  --font-sans: "Inter", "PingFang SC", "Microsoft YaHei", "Noto Sans SC",
    system-ui, sans-serif;

  --radius-card: 16px;
}
```

### 7.2 设计令牌使用约定

| 语义 | Tailwind 用法 |
| --- | --- |
| 页面背景 | `bg-ink` |
| 卡片 | `bg-surface border border-line rounded-card` |
| 主文字 | `text-fg` |
| 次级文字 | `text-muted` |
| 渐变文字 | `bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent` |
| 渐变描边 | `bg-gradient-to-r from-accent-from/60 to-accent-to/60 p-px` 外层 + 内层实底 |
| 光晕 | 绝对定位的 `blur-3xl opacity-20` 渐变圆形 |

禁止直接写 `#8b5cf6` 等硬编码色值（令牌定义处除外）。

### 7.3 全局基础样式

- `html { scroll-behavior: smooth; }`（并配合 `prefers-reduced-motion` 关闭）
- `body { background: var(--color-ink); color: var(--color-fg); }`
- 自定义滚动条（桌面端）、`::selection` 使用强调色 20% 透明度。
- `@media (prefers-reduced-motion: reduce)` 下禁用过渡与动画。

---

## 8. 动画方案（Framer Motion）

`src/lib/motion.ts` 提供共用 variants：

```ts
import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
```

约定：

- 视口触发统一 `whileInView` + `viewport={{ once: true, amount: 0.2 }}`。
- 仅动画 `opacity` / `transform`。
- 减弱动效：`useReducedMotion()` 命中时直接返回静态 variants。
- 不做无限循环动画（背景光晕仅极缓慢位移，且可关闭）。

---

## 9. 图片懒加载

- 统一使用 `LazyImage`：设置 `loading="lazy"`、`decoding="async"`、显式 `aspectRatio`，外层容器 `overflow-hidden`。
- 首屏头像 / OG 图设 `priority`，改为 `loading="eager"` + `fetchPriority="high"`。
- 图片资源放 `src/assets/projects/`（Vite 构建处理）或 `public/`（原样输出）；头像与 OG 放 `public/`。
- 建议尺寸：项目封面 1200×750，头像 400×400，格式 WebP。

---

## 10. 构建与部署

### 10.1 脚本

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 本地开发（默认 5173） |
| `npm run build` | 类型检查 + 生产构建，输出 `dist/` |
| `npm run preview` | 预览生产产物 |
| `npm run lint` | oxlint 检查 |

### 10.2 Vercel 部署

- Framework Preset：Vite；Build Command：`npm run build`；Output Directory：`dist`。
- 无需环境变量，纯静态资源。
- `vercel.json`（可选，处理 SPA 回退与缓存）：

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 10.3 质量基线

- `tsc --noEmit` 零错误，strict 模式开启。
- 构建产物无未使用依赖警告。
- Lighthouse 移动端 Performance ≥ 90、Accessibility ≥ 95。

---

## 11. 工程约束

- Node ≥ 20（当前环境 v22）。
- 包管理器：npm（锁定 `package-lock.json`）。
- 不引入后端、环境变量、第三方埋点。
- 新增依赖需说明体积影响；优先内联实现。

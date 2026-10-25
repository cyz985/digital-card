import { EditPanel } from '@/components/admin/EditPanel'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'

/** 单页应用：按 PRD 的信息架构组装各区块 */
function App() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
      >
        跳到主要内容
      </a>

      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <EditPanel />
    </>
  )
}

export default App

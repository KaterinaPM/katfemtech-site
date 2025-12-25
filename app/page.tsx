"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, LayoutGroup } from "framer-motion"

type Page = "about" | "playing-with-ai" | "femtech" | "contact"

// Define a chat interaction type
type ChatInteraction = {
  id: string
  type: Page
}

export default function Home() {
  const [cursorVisible, setCursorVisible] = useState(true)
  const [chatHistory, setChatHistory] = useState<ChatInteraction[]>([])
  const [currentSection, setCurrentSection] = useState<Page | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Ensure scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(interval)
  }, [])

  // Custom scroll function with offset for mobile
  const scrollToElementWithOffset = (element: HTMLElement, offset = 0) => {
    if (!element) return

    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  const handleNavigation = (page: Page) => {
    // Add new interaction to chat history
    const newInteractionId = `${page}-${Date.now()}`
    setChatHistory((prev) => [...prev, { id: newInteractionId, type: page }])

    // Update current section for navigation display
    setCurrentSection(page)

    // Small delay to ensure content is rendered before scrolling
    setTimeout(() => {
      // Get the newly added content element
      const contentElement = contentRefs.current[newInteractionId]

      if (contentElement) {
        // Use 60px offset for mobile to account for status bar and some extra space
        scrollToElementWithOffset(contentElement, 60)
      } else if (bottomRef.current) {
        // Fallback to bottom ref if content element isn't found
        scrollToElementWithOffset(bottomRef.current, 60)
      }
    }, 150)
  }

  const clearChat = () => {
    setChatHistory([])
    setCurrentSection(null)
    contentRefs.current = {}

    // Scroll to top when clearing chat
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  // Reusable menu items component
  const MenuItems = () => (
    <motion.ul layout className="space-y-1">
      <motion.li
        layout
        className="text-emerald-400 cursor-pointer hover:underline"
        onClick={() => handleNavigation("about")}
      >
        about
      </motion.li>
      <motion.li
        layout
        className="text-emerald-400 cursor-pointer hover:underline"
        onClick={() => handleNavigation("playing-with-ai")}
      >
        playing with AI
      </motion.li>
      <motion.li
        layout
        className="text-emerald-400 cursor-pointer hover:underline"
        onClick={() => handleNavigation("femtech")}
      >
        femtech
      </motion.li>
      <motion.li
        layout
        className="text-emerald-400 cursor-pointer hover:underline"
        onClick={() => handleNavigation("contact")}
      >
        contact
      </motion.li>
    </motion.ul>
  )

  // Reusable content window component
  const ContentWindow = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-zinc-900/80 p-6 rounded-lg text-zinc-300 mb-6">{children}</div>
  )

  // Section content based on type
  const renderSectionContent = (section: Page) => {
    switch (section) {
      case "about":
        return (
          <ContentWindow>
            <p className="leading-relaxed">
              Hi! My name is Katerina 👋 I am a Product Manager specializing in taking products from 0 to 1. Over the
              past 8+ years in tech, I've worked across product, design, and sales, which has given me a strong
              understanding of both the commercial and technical sides of building impactful products. I've contributed
              to the growth of three startups —{" "}
              <a
                href="https://www.quanwellbeing.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                a B2B SaaS platform
              </a>
              ,{" "}
              <a
                href="https://www.instagram.com/numrussia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                an e-commerce marketplace
              </a>
              ,{" "}
              <a
                href="https://icanchoose.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                and a career search website
              </a>
              .
              <br />
              <br />
              In 2020, I joined a well-being startup as a founding member and spent five years building a user-centered
              product from the ground up, with the goal of setting a new industry standard. Along the way, I learned how
              to navigate ambiguity, make independent decisions, and rely on data as my compass. I exited the startup
              after shipping the third version of the app, just as the company was preparing for its acquisition by{" "}
              <a
                href="https://www.jointruetribe.com/nl/library/hr-tech-bedrijf-truetribe-neemt-employee-wellbeing-platform-quan-over"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                TrueTribe
              </a>{" "}
              in early 2025.
              <br />
              <br />
              As of May 2025, I'm at{" "}
              <a
                href="https://manychat.com/product/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                Manychat
              </a>
              , where I work on building AI agents.
              <br />
              <br />
              <a
                href="https://raw.githubusercontent.com/KaterinaPM/katfemtech-site/31e4606b92c1c1e9c9b2ef071b49565d5995771b/public/Katerina%20Stepanova%20-%20Product%20Manager%20CV%20%E2%80%93%20Jan%202025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Katerina_Stepanova_CV.pdf"
                className="text-emerald-400 hover:underline inline-flex items-center"
              >
                Download my CV here
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </p>
          </ContentWindow>
        )
      case "playing-with-ai":
        return (
          <ContentWindow>
            <div className="leading-relaxed">
              <p>I love playing with AI tools and new products. You can check some of my projects here:</p>
              <br />
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    my website{" "}
                    <a
                      href="https://katfemtech.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      katfemtech.com
                    </a>
                    , which I built using v0
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <a
                      href="https://websim.ai/@katerina/ChristmasReflectionGame"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      my Christmas self-reflection game
                    </a>
                    , which I built using websim.ai
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <a
                        href="https://katerina.app.n8n.cloud/webhook/f54e17e5-866f-4b80-80fe-9e98ad975cc4/chat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline"
                      >
                        my personal cycle syncing assistant
                      </a>
                      , which I built using n8n
                    </span>
                  </div>
                  <div className="text-zinc-400 italic text-xs mt-2 ml-5">
                    Please note this AI assistant is for my personal use only, therefore it is protected with a
                    password. It is connected to my personal calendar, email, and my ChatGPT account. I am happy to show
                    you the demo during our call
                  </div>
                </div>
              </div>
            </div>
          </ContentWindow>
        )
      case "femtech":
        return (
          <ContentWindow>
            <p className="leading-relaxed">
              I am passionate about female health, and love to test and review femtech solutions. You can find my
              content here (@katfemtech on all platforms):
              <br />
              <br />
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/katfemtech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.668.07-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@katfemtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                  TikTok
                </a>
                <a
                  href="https://www.youtube.com/@katfemtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
              </div>
            </p>
          </ContentWindow>
        )
      case "contact":
        return (
          <ContentWindow>
            <p className="leading-relaxed">
              I would love to hear from you! Feel free to message me here:
              <br />
              <br />
              <div className="flex space-x-6">
                <a
                  href="https://www.linkedin.com/in/katerina-step/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="mailto:katyaresearcher@gmail.com"
                  className="text-emerald-400 hover:underline flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  email
                </a>
              </div>
            </p>
          </ContentWindow>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-800 text-white flex flex-col relative overflow-auto">
      {/* Reference for top of page */}
      <div ref={topRef} className="absolute top-0" />

      {/* Main scrollable container with padding adjustments for mobile */}
      <div className="flex-1 p-4 sm:p-8 pt-28 sm:pt-16 pb-24 flex flex-col">
        <LayoutGroup>
          <motion.div layout className="max-w-xl">
            <motion.div layout className="mb-12 sm:mb-16">
              <h1 className="font-mono text-2xl sm:text-3xl mb-2">
                Hi! My name is Katerina👋 <br />I am a Product Manager <br />
                specializing in taking <br />
                products from 0 to 1.
              </h1>
            </motion.div>

            {/* Initial menu items */}
            <motion.div layout className="font-mono text-zinc-400 mt-2 mb-8">
              <MenuItems />
            </motion.div>

            {/* Chat history - render each interaction */}
            {chatHistory.map((interaction) => (
              <motion.div
                key={interaction.id}
                layout
                className="font-mono mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                ref={(el) => {
                  contentRefs.current[interaction.id] = el
                }}
              >
                {/* Command that was "typed" */}
                <motion.div layout className="text-zinc-400 mb-2">
                  main page/{interaction.type.replace("-", " ")} &gt;
                </motion.div>

                {/* Content for this section */}
                {renderSectionContent(interaction.type)}

                {/* Menu items after each interaction */}
                <motion.div layout className="text-zinc-400">
                  <MenuItems />
                </motion.div>
              </motion.div>
            ))}

            {/* Reference for scrolling to bottom */}
            <div ref={bottomRef} />
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Fixed Navigation at Bottom with background to ensure visibility */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-zinc-950 to-transparent pt-8 pb-4 px-4 sm:px-8">
        <div className="font-mono text-zinc-400 flex items-center">
          <span>
            <span className="cursor-pointer hover:text-emerald-400 transition-colors" onClick={clearChat}>
              main page
            </span>
            {currentSection ? `/${currentSection.replace("-", " ")}` : ""} &gt;
          </span>
          <span className={`ml-2 w-3 h-6 bg-emerald-400 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
        </div>
      </div>
    </div>
  )
}

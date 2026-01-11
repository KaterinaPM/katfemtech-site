import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Katerina - Product Manager",
  description: "Product Manager with 8+ years of experience building and scaling tech products",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script
          id="chatbase-embed"
          src="https://www.chatbase.co/embed.min.js"
          strategy="afterInteractive"
          data-chatbot-id="75r32o3VrAg1IeD9w42cu"
        />
        <Script id="chatbase-config" strategy="afterInteractive">
          {`
            window.embeddedChatbotConfig = {
              chatbotId: "75r32o3VrAg1IeD9w42cu",
              domain: "www.chatbase.co"
            }
          `}
        </Script>
      </body>
    </html>
  )
}

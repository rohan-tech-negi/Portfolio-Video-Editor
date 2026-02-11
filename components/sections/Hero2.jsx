'use client'

import { useState } from 'react'
import { Copy, Menu } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('rohanwork953@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
        <h1 className="text-xl font-black tracking-wider">ROHAN</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen pt-24 px-8 md:px-16 flex flex-col md:flex-row items-stretch justify-between gap-12">
        {/* Left Side - Name and Email */}
        <div className="flex flex-col justify-center flex-1">
          <div className="space-y-8">
            {/* Bold Name */}
            <div className="space-y-2">
              <h2 className="text-7xl md:text-8xl font-black leading-none tracking-tighter">
                ROHAN
              </h2>
              <h2 className="text-7xl md:text-8xl font-black leading-none tracking-tighter">
                SINGH
              </h2>
              <h2 className="text-7xl md:text-8xl font-black leading-none tracking-tighter">
                NEGI
              </h2>
            </div>

            {/* Email */}
            <div className="pt-4">
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 text-sm md:text-base font-medium hover:opacity-60 transition-opacity group"
              >
                <span>rohanwork953@gmail.com</span>
                <Copy
                  className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity"
                  strokeWidth={2}
                />
              </button>
              {emailCopied && (
                <p className="text-xs text-gray-500 mt-2">Copied to clipboard!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Image and Description */}
        <div className="flex flex-col justify-center items-center md:items-start flex-1 pt-8 md:pt-0">
          {/* Profile Image */}
          <div className="mb-8 md:mb-12 flex justify-center md:justify-start w-full">
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-200 rounded-full opacity-20 blur-xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-200 shadow-lg">
                <Image
                  src="/profile.jpg"
                  alt="Rohan Singh Negi"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-sm">
            <p className="text-lg md:text-xl leading-relaxed text-gray-900 font-light tracking-wide text-center md:text-left">
              Hello, I'm a professional Video Editor and Cinematographer with a strong eye for storytelling and visual aesthetics. I specialize in cinematic edits, color grading, and dynamic visuals that bring ideas to life. Let's create something powerful.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Attribution */}
      <div className="fixed bottom-6 right-6 text-xs text-gray-400 hover:text-gray-600 transition-colors">
        <span>Made with v0</span>
      </div>
    </div>
  )
}

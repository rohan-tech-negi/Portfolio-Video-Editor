'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('rohanwork953@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black relative">
      
      {/* Hero Section */}
      <section className="min-h-screen px-6 md:px-12 lg:px-16 flex items-center">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center">

            {/* Huge Name */}
            <div className="leading-[0.8] tracking-[-0.04em]">
              <h1 className="font-black text-[18vw] lg:text-[11vw]">ROHAN</h1>
              <h1 className="font-black text-[18vw] lg:text-[11vw]">SINGH</h1>
              <h1 className="font-black text-[18vw] lg:text-[11vw]">NEGI</h1>
            </div>

            {/* Email */}
            <div className="mt-10">
              <button
                onClick={copyEmail}
                className="flex items-center gap-3 text-base md:text-lg font-medium hover:opacity-60 transition-opacity group"
              >
                <span>rohanwork953@gmail.com</span>
                <Copy
                  className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                  strokeWidth={2}
                />
              </button>

              {emailCopied && (
                <p className="text-sm text-gray-500 mt-2">
                  Copied to clipboard!
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center lg:items-end space-y-10">

            {/* Profile Image */}
            <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72">
              <div className="absolute inset-0 bg-gray-300 rounded-full blur-2xl opacity-20"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src="/profile.jpg"
                  alt="Rohan Singh Negi"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Description */}
            <div className="max-w-md lg:max-w-lg">
              <p className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] leading-[1.5] text-gray-900 font-light text-center lg:text-right">
                Hello, I'm a Video Editor and Cinematographer passionate about
                cinematic storytelling and visual aesthetics. I specialize in
                refined edits, color grading, and immersive visual narratives.
                Currently, I'm expanding into 3D and real-time storytelling with
                Unreal Engine to push creative boundaries even further.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Attribution */}
      <div className="fixed bottom-6 right-6 text-xs text-gray-400 hover:text-gray-600 transition-colors">
        Made with Next.js
      </div>

    </div>
  )
}

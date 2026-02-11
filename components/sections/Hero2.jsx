'use client'

import { useState, useEffect } from 'react'
import { Copy } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const copyEmail = () => {
    navigator.clipboard.writeText('rohanwork953@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  // Track mouse position with smooth interpolation
  useEffect(() => {
    let animationFrameId
    let targetPosition = { x: 0, y: 0 }
    let currentPosition = { x: 0, y: 0 }
    let isInitialized = false

    const move = (e) => {
      targetPosition = { x: e.clientX, y: e.clientY }
      
      // Initialize cursor at exact mouse position on first hover
      if (!isInitialized) {
        currentPosition = { x: e.clientX, y: e.clientY }
        setPosition({ x: e.clientX, y: e.clientY })
        isInitialized = true
      }
    }

    const animate = () => {
      // Smooth interpolation (lerp) for cursor following
      currentPosition.x += (targetPosition.x - currentPosition.x) * 0.15
      currentPosition.y += (targetPosition.y - currentPosition.y) * 0.15

      setPosition({
        x: currentPosition.x,
        y: currentPosition.y
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    if (showCursor) {
      window.addEventListener('mousemove', move)
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('mousemove', move)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [showCursor])

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black relative">

      {/* Custom Cursor */}
      {showCursor && (
        <div
          className="hidden md:flex fixed pointer-events-none z-50 items-center justify-center 
                     px-6 py-2 rounded-full bg-[#7CFF4E] text-black text-sm font-semibold"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          COPY
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen px-6 md:px-12 lg:px-16 flex items-center">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center">

            <div className="leading-[0.8] tracking-[-0.04em]">
              <h1 className="font-black text-[18vw] lg:text-[14vw]">ROHAN</h1>
              <h1 className="font-black text-[18vw] lg:text-[14vw]">SINGH</h1>
              <h1 className="font-black text-[18vw] lg:text-[14vw]">NEGI</h1>
            </div>

            {/* Email */}
            <div className="mt-10">
              <button
                onClick={copyEmail}
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
                className="flex items-center gap-3 text-base md:text-lg font-medium 
                           hover:opacity-60 transition-opacity cursor-none"
              >
                <span>rohanwork953@gmail.com</span>
                <Copy className="w-5 h-5 opacity-50" strokeWidth={2} />
              </button>

              {emailCopied && (
                <p className="text-sm text-gray-500 mt-2">
                  Copied to clipboard!
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE (unchanged) */}
          <div className="flex flex-col items-center lg:items-end space-y-10">
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

            <div className="max-w-md lg:max-w-lg">
              <p className="text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] leading-[1.5] 
                            text-gray-900 font-light text-center lg:text-right">
                Cinematic storytelling through motion and light.<br />
                Precision editing. Refined color. Impactful visuals.<br />
                Exploring the future of 3D with Unreal Engine.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
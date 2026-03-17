'use client'

import { useState, useEffect } from 'react'
import {  Download } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {

  const [cursorText, setCursorText] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })


  useEffect(() => {
    let animationFrameId
    let targetPosition = { x: 0, y: 0 }
    let currentPosition = { x: 0, y: 0 }
    let isInitialized = false

    const move = (e) => {
      targetPosition = { x: e.clientX, y: e.clientY }
      if (!isInitialized) {
        currentPosition = { x: e.clientX, y: e.clientY }
        setPosition({ x: e.clientX, y: e.clientY })
        isInitialized = true
      }
    }

    const animate = () => {
      currentPosition.x += (targetPosition.x - currentPosition.x) * 0.15
      currentPosition.y += (targetPosition.y - currentPosition.y) * 0.15
      setPosition({ x: currentPosition.x, y: currentPosition.y })
      animationFrameId = requestAnimationFrame(animate)
    }

    if (cursorText) {
      window.addEventListener('mousemove', move)
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('mousemove', move)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [cursorText])

  const nameVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  }

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  }

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  }

  return (
    <div 
      className="min-h-screen bg-[#f5f5f5] text-black relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Radial feather overlay - edges fade, center stays visible */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(245, 245, 245, 0.5) 85%, rgba(245, 245, 245, 0.9) 100%)`
        }}
      />

      {/* Custom Cursor */}
      {cursorText && (
        <div
          className="hidden md:flex fixed pointer-events-none z-50 items-center justify-center 
                     px-6 py-2 rounded-full bg-[#7CFF4E] text-black text-sm font-semibold"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {cursorText}
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-16 flex items-center relative z-10">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-12">

          {/* LEFT SIDE — Name + Email */}
          <div className="flex flex-col justify-center overflow-hidden">
            <div className=" font-bold leading-[0.85] tracking-[-0.04em]">
              {['ROHAN', 'SINGH', 'NEGI'].map((name, i) => (
                <motion.h1
                  key={name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={nameVariants}
                  className="font-semibold text-[20vw] lg:text-[12.5vw]"
                >
                  {name}
                </motion.h1>
              ))}
            </div>

            {/* Resume Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              className="mt-10 origin-left"
            >
              <a
                href="/ResumeFInal.pdf"
                download="Rohan_Singh_Negi_Resume.pdf"
                onMouseEnter={() => setCursorText('DOWNLOAD')}
                onMouseLeave={() => setCursorText(null)}
                className="group inline-flex items-center gap-3 bg-[#1a1a1a] text-white 
                           pl-6 pr-2 py-2 rounded-full text-sm font-medium 
                           transition-all duration-300 cursor-none"
              >
                <span className="tracking-wide">My Resume</span>

                {/* Download Circle */}
                <span
                  className="flex items-center justify-center 
                             w-9 h-9 rounded-full bg-white text-black 
                             transition-all duration-300 group-hover:bg-gray-200"
                >
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </a>
            </motion.div> 
          </div>

          {/* RIGHT SIDE — Image + Description */}
          <div className="flex flex-col items-center lg:items-end space-y-10 mt-4 lg:mt-0">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80"
            >
              <div className="absolute inset-0 bg-gray-300 rounded-full blur-2xl opacity-20" />
              <div 
                className="relative w-full h-full rounded-full overflow-hidden shadow-lg border border-gray-200"
              >
                <Image
                  src="/profile.PNG"
                  alt="Rohan Singh Negi"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="max-w-md lg:max-w-xl"
            >
              <p className="text-[1.05rem] md:text-[1.1rem] lg:text-[1.6rem] leading-[1.4] 
                            text-gray-900 font-medium text-center lg:text-right">
                Cinematic storytelling through motion and light.
                Precision editing. Refined color. Impactful visuals.
                Exploring the future of 3D with Unreal Engine.
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {

  const [showCursor, setShowCursor] = useState(false)
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

    if (showCursor) {
      window.addEventListener('mousemove', move)
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('mousemove', move)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [showCursor])

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
    <div className="min-h-screen bg-[#f5f5f5] text-black relative">

      {/* Custom Cursor */}
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
    VISIT
  </div>
)}

      {/* Hero Section */}
      {/* pt-24 offsets the fixed navbar (~80px tall) so ROHAN isn't hidden behind it */}
      <section className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-16 flex items-center">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-12">

          {/* LEFT SIDE — Name + Email */}
          <div className="flex flex-col justify-center overflow-hidden">
            <div className="leading-[0.85] tracking-[-0.04em]">
              {['ROHAN', 'SINGH', 'NEGI'].map((name, i) => (
                <motion.h1
                  key={name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={nameVariants}
                  className="font-bold text-[18vw] lg:text-[10vw]"
                >
                  {name}
                </motion.h1>
              ))}
            </div>

            {/* Email */}
            <motion.div
  initial="hidden"
  animate="visible"
  variants={textVariants}
  className="mt-10"
>
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=rohanwork953@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => setShowCursor(true)}
    onMouseLeave={() => setShowCursor(false)}
    className="group inline-flex items-center gap-6 bg-black text-white 
               px-8 py-4 rounded-full text-base font-medium 
               transition-all duration-300 hover:scale-105 cursor-none"
  >
    <span>Email Me</span>

    {/* Circle Arrow */}
    <span className="flex items-center justify-center w-10 h-10 
                     rounded-full bg-white text-black 
                     transition-transform duration-300 
                     group-hover:translate-x-1">
      →
    </span>
  </a>
</motion.div>
          </div>

          {/* RIGHT SIDE — Image + Description */}
          {/* On mobile: add top margin to separate it from the name block */}
          <div className="flex flex-col items-center lg:items-end space-y-10 mt-4 lg:mt-0">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="relative w-52 h-52 md:w-60 md:h-60 lg:w-60 lg:h-60"
            >
              <div className="absolute inset-0 bg-gray-300 rounded-full blur-2xl opacity-20" />
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src="/profile.jpg"
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
              className="max-w-md lg:max-w-lg"
            >
              <p className="text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] leading-[1.5] 
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
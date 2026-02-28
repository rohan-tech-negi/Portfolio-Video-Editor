
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const logoVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  }

 const boxContainerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }
  }
}

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-14 md:px-12 py-6 bg-[#f5f5f5] border-b">

      {/* Logo */}
      <Link href="/" onClick={() => setMenuOpen(false)}>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          className="text-lg md:text-xl font-bold tracking-wider cursor-pointer"
        >
          ROHAN
        </motion.h1>
      </Link>

      {/* Right side: button always anchored to the right */}
      <div className="flex items-center gap-6 ">

        {/* Menu items — absolutely positioned so they never push the button */}
       <motion.div
  initial={{ opacity: 0, x: 16 }}
  animate={{
    opacity: menuOpen ? 1 : 0,
    x: menuOpen ? 0 : 16,
  }}
  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
  style={{ pointerEvents: menuOpen ? "auto" : "none" }}
  className="flex gap-6"
>
          {["Work", "Contact"].map((item, i) => {
            const href = item === "Contact" ? "/contact" : item === "Work" ? "/work" : "/"

            return (
              <motion.div
                key={item}
                animate={{ opacity: menuOpen ? 1 : 0 }}
                transition={{
                  delay: menuOpen ? 0.15 + i * 0.1 : 0,
                  duration: 0.3,
                }}
              >
                <Link
                  href={href}
                  className="text-black text-sm md:text-base font-medium hover:opacity-70 transition whitespace-nowrap"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* 4-box button — always visible, always rightmost */}
        <motion.button
          initial="hidden"
          animate="visible"
          variants={boxContainerVariants}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-10 h-10 flex items-center justify-center z-50 flex-shrink-0 "
          aria-label="Toggle menu"
        >
          <div className="grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
  <span
    key={i}
    className={`w-2 h-2 rounded-sm bg-black transition-transform duration-300 ${
      menuOpen ? "scale-75" : "scale-100"
    }`}
  />
))}

          </div>
        </motion.button>

      </div>
    </nav>
  )
}



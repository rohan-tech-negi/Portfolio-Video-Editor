// 'use client';

// import { Home, Folder, Briefcase, Wrench, PenSquare } from 'lucide-react';

// export default function Navbar() {
//   const navItems = [
//     { icon: Home, label: 'Home', href: '#home' },
//     { icon: Folder, label: 'Projects', href: '#projects' },
//     { icon: Briefcase, label: 'Work', href: '#work' },
//     { icon: Wrench, label: 'Tools', href: '#tools' },
//     { icon: PenSquare, label: 'Contact', href: '#contact' },
//   ];

//   return (
//     <nav 
//       className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
//       aria-label="Main navigation"
//     >
//       <div className="bg-white border-2 border-black/10 rounded-full px-6 py-3 shadow-lg backdrop-blur-sm">
//         <ul className="flex items-center gap-8">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <li key={item.label}>
//                 <a
//                   href={item.href}
//                   className="flex items-center justify-center text-black/60 hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400/50 rounded-full p-2"
//                   aria-label={item.label}
//                 >
//                   <Icon className="w-6 h-6" strokeWidth={1.5} />
//                 </a>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </nav>
//   );
// }

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
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }
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
      <div className="flex items-center gap-6">

        {/* Menu items — absolutely positioned so they never push the button */}
        <motion.div
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
          className="relative w-10 h-10 flex items-center justify-center z-50 flex-shrink-0"
          aria-label="Toggle menu"
        >
          <div className="grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                animate={{ scale: menuOpen ? 0.7 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-2 h-2 rounded-sm bg-black block"
              />
            ))}
          </div>
        </motion.button>

      </div>
    </nav>
  )
}
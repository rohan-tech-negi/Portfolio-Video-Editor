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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-white">

      {/* Logo */}
      <h1 className="text-lg md:text-xl font-bold tracking-wider">
        ROHAN
      </h1>

      {/* Right Side Container */}
      <div className="relative w-14 h-14 flex items-center justify-end">

        {/* Expanding Oval Background */}
        <motion.div
          animate={{
            width: menuOpen ? 280 : 56,
            borderRadius: menuOpen ? 999 : 16
          }}
          transition={{
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="absolute right-0 top-0 h-14 bg-black"
          style={{ originX: 1 }}
        />

        {/* Click Area */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute right-0 w-14 h-14 flex items-center justify-center z-50"
        >
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                animate={{
                  backgroundColor: menuOpen ? "#ffffff" : "#000000"
                }}
                transition={{ duration: 0.3 }}
                className="w-2.5 h-2.5 rounded-sm"
              />
            ))}
          </div>
        </button>

        {/* Menu Items */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 flex gap-8 z-50"
          >
            {["Home", "Projects", "Contact"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-white text-sm md:text-base font-medium cursor-pointer hover:opacity-70 transition"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        )}

      </div>
    </nav>
  )
}

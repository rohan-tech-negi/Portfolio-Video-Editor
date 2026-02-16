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
      <div className="relative flex items-center justify-end gap-8">

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: menuOpen ? 1 : 0,
            x: menuOpen ? 0 : 20
          }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="flex gap-8"
          style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        >
          {["Works", "About", "Contact"].map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: menuOpen ? 1 : 0 }}
              transition={{ delay: menuOpen ? 0.2 + i * 0.1 : 0, duration: 0.3 }}
              className="text-black text-sm md:text-base font-medium cursor-pointer hover:opacity-70 transition"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Click Area with 4 boxes */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-10 h-10 flex items-center justify-center z-50"
        >
          <div className="grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                animate={{
                  scale: menuOpen ? 0.8 : 1
                }}
                transition={{ duration: 0.3 }}
                className="w-2 h-2 rounded-sm bg-black"
              />
            ))}
          </div>
        </button>

      </div>
    </nav>
  )
}
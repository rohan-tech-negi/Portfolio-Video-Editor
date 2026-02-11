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

'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-white">
      <h1 className="text-lg md:text-xl font-bold tracking-wider">ROHAN</h1>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
        aria-label="Menu"
      >
        <Menu className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </nav>
  )
}
// 'use client';

// import { ArrowRight } from 'lucide-react';
// import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
// import { SiDribbble } from 'react-icons/si';

// export default function ContactSection() {
//   const socialLinks = [
//     {
//       id: 1,
//       platform: 'Twitter/X',
//       icon: FaXTwitter,
//       link: 'https://twitter.com',
//     },
//     {
//       id: 2,
//       platform: 'Instagram',
//       icon: FaInstagram,
//       link: 'https://instagram.com',
//     },
//     {
//       id: 3,
//       platform: 'Dribbble',
//       icon: SiDribbble,
//       link: 'https://dribbble.com',
//     },
//     // Replaced Behance with CTA card - same position in grid
//     {
//       id: 4,
//       platform: 'Get in touch',
//       icon: ArrowRight,
//       link: 'mailto:hello@example.com',
//       isCta: true,
//     },
//   ];

//   return (
//     <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-16">
//           <div className="flex items-center gap-2 mb-6">
//             <div className="w-2 h-2 rounded-full bg-lime-400" />
//             <span className="text-xl font-medium text-white">[03] — Connect me</span>
//           </div>
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-tight">
//             I'm all over the internet
//           </h1>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {socialLinks.map((social) => {
//             const IconComponent = social.icon;
            
//             // CTA Card (replaces Behance position)
//             if (social.isCta) {
//               return (
//                 <a
//                   key={social.id}
//                   href={social.link}
//                   className="group bg-lime-400 rounded-3xl p-8 hover:bg-lime-500 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="flex flex-col justify-between h-48">
//                     <h3 className="text-xl font-medium text-gray-900">
//                       {social.platform}
//                     </h3>
//                     <div className="flex justify-end">
//                       <IconComponent className="w-7 h-7 text-gray-900 group-hover:translate-x-1 transition-transform duration-300" />
//                     </div>
//                   </div>
//                 </a>
//               );
//             }
            
//             // Standard social cards
//             return (
//               <a
//                 key={social.id}
//                 href={social.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group bg-white rounded-3xl p-8 hover:shadow-md transition-all duration-300"
//               >
//                 <div className="flex flex-col justify-between h-48">
//                   <h3 className="text-xl font-medium text-gray-900">
//                     {social.platform}
//                   </h3>
//                   <div className="flex justify-end">
//                     <div className="bg-lime-400 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
//                       <IconComponent className="w-5 h-5 text-gray-900" />
//                     </div>
//                   </div>
//                 </div>
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }















'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaXTwitter, FaInstagram, FaBehance } from 'react-icons/fa6';
import { SiDribbble } from 'react-icons/si';
import { TypewriterOnScroll } from '../common/TypeWritter';

export default function ContactSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const socialLinks = [
    {
      id: 1,
      platform: 'Twitter/X',
      icon: FaXTwitter,
      link: 'https://twitter.com',
    },
    {
      id: 2,
      platform: 'Instagram',
      icon: FaInstagram,
      link: 'https://instagram.com',
    },
    {
      id: 3,
      platform: 'Dribbble',
      icon: SiDribbble,
      link: 'https://dribbble.com',
    },
    {
      id: 4,
      platform: 'Behance',
      icon: FaBehance,
      link: 'https://behance.net',
    },
    {
      id: 5,
      platform: 'Get in touch',
      icon: ArrowRight,
      link: 'mailto:hello@example.com',
      isCta: true,
    },
  ];

  const handleMouseMove = (e) => {
    requestAnimationFrame(() => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    });
  };

  return (
    <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <TypewriterOnScroll
                text="[03] — Connect me"
  className="text-xl font-medium text-white"
            ></TypewriterOnScroll>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-tight">
            My Social Profiles
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            
            // CTA Card
            if (social.isCta) {
              return (
                <a
                  key={social.id}
                  href={social.link}
                  className="group bg-lime-400 rounded-3xl p-8 hover:bg-lime-500 hover:shadow-md transition-all duration-300"
                  style={{ cursor: hoveredCard === social.id ? 'none' : 'pointer' }}
                  onMouseEnter={() => setHoveredCard(social.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onMouseMove={handleMouseMove}
                >
                  <div className="flex flex-col justify-between h-48">
                    <h3 className="text-xl font-medium text-gray-900">
                      {social.platform}
                    </h3>
                    <div className="flex justify-end">
                      <IconComponent className="w-7 h-7 text-gray-900 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </a>
              );
            }
            
            // Standard social cards
            return (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl p-8 hover:shadow-md transition-all duration-300"
                style={{ cursor: hoveredCard === social.id ? 'none' : 'pointer' }}
                onMouseEnter={() => setHoveredCard(social.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={handleMouseMove}
              >
                <div className="flex flex-col justify-between h-48">
                  <h3 className="text-xl font-medium text-gray-900">
                    {social.platform}
                  </h3>
                  <div className="flex justify-end">
                    <div className="bg-lime-400 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Custom Oval Cursor */}
      {hoveredCard && (
        <div 
          className="custom-cursor fixed pointer-events-none z-50"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        >
          <div className="px-6 py-3 bg-lime-400 rounded-full shadow-lg shadow-lime-400/50">
            <span className="text-black font-semibold text-sm tracking-wide whitespace-nowrap">
              {hoveredCard === 5 ? 'CONTACT' : 'VISIT'}
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-cursor {
          transform: translate(-50%, -50%);
          will-change: left, top;
        }
      `}</style>
    </section>
  );
}
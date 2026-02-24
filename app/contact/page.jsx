'use client';

import { useState, useEffect, useRef } from 'react';
import { FaXTwitter, FaInstagram, FaBehance } from 'react-icons/fa6';
import { SiDribbble } from 'react-icons/si';
import { TypewriterOnScroll } from '@/components/common/TypeWritter';

// Custom Cursor Component
function CustomCursor({ activeIcon, position }) {
  if (!activeIcon) return null;

  const Icon = activeIcon;

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'opacity 0.15s ease',
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          border: '1.5px solid rgba(0,0,0,0.08)',
        }}
      >
        <Icon size={22} color="#111" />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [pricingModel, setPricingModel] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, { pricingModel });
    setFormData({ name: '', email: '', message: '' });
    setPricingModel(null);
  };

  const socialLinks = [
    { platform: 'Instagram', icon: FaInstagram, link: 'https://instagram.com' },
    { platform: 'Dribbble', icon: SiDribbble, link: 'https://dribbble.com' },
    { platform: 'Behance', icon: FaBehance, link: 'https://behance.net' },
  ];

  return (
    <section className="w-full min-h-screen bg-[#f5f5f5] font-sans pt-10">
      {/* Hide default cursor when custom cursor is active */}
      <style>{`
        .social-icon-hover:hover { cursor: none !important; }
      `}</style>

      <CustomCursor activeIcon={activeIcon} position={cursorPos} />

      <div className="font-body max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-7">

            {/* Tag + Heading */}
            <div>
              <TypewriterOnScroll
                text="[01] — Contact"
                className="text-xl font-medium text-black"
              />
              <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[1.05] text-[#111] m-0 font-display">
                Let's Talk.
              </h1>
              <p className="mt-4 text-[#666] text-sm leading-relaxed max-w-[340px]">
                I'm Rohan, a video editor and cinematographer passionate about crafting cinematic stories and immersive visual experiences.
              </p>
            </div>

            {/* Social Links Row (outside card) */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.platform}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[38px] h-[38px] rounded-full bg-[#f0f0ee] flex items-center justify-center text-[#444] no-underline transition-all hover:bg-black hover:text-white"
                    aria-label={`Visit my ${social.platform} profile`}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

              {/* ── Enhanced Email Card ── */}
              <div className="bg-[#111] rounded-[18px] p-7 flex flex-col gap-6 col-span-1 sm:col-span-2 lg:col-span-1"
                style={{ minHeight: '260px' }}>

                {/* Top row: attachment icon + dots */}
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 bg-[#f5f5f3] rounded-[10px] flex items-center justify-center text-[#333]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                    </svg>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-[#ddd]" />
                  </div>
                </div>

                {/* Social Icons inside card — with custom cursor on hover */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-hover w-9 h-9 rounded-full bg-[#222] flex items-center justify-center text-[#aaa] no-underline transition-all hover:bg-white hover:text-black"
                        aria-label={`Visit my ${social.platform} profile`}
                        onMouseEnter={() => {
                          setActiveIcon(() => social.icon);
                          setCursorVisible(true);
                        }}
                        onMouseLeave={() => {
                          setActiveIcon(null);
                          setCursorVisible(false);
                        }}
                      >
                        <Icon size={15} />
                      </a>
                    );
                  })}
                </div>

                {/* Label + Email */}
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#999] uppercase mb-1.5">
                    / Chat to me
                  </p>
                  <a
                    href="mailto:rohanwork953@gmail.com"
                    className="text-sm font-semibold text-white no-underline hover:underline"
                  >
                    rohanwork953@gmail.com
                  </a>
                </div>

              </div>
            </div>

            {/* Bio Blurb */}
            <div className="border-t border-[#ddd] pt-6">
              <p className="text-[#555] text-sm leading-relaxed">
                Beyond editing, I continuously explore the world of 3D and real-time environments in Unreal Engine, pushing my creative boundaries into virtual production and immersive visuals. Over time, I've worked on diverse creative projects — blending motion, sound, and storytelling to deliver compelling visual experiences.
              </p>
            </div>

          </div>

          {/* ── RIGHT COLUMN — Dark Panel ── */}
          <div className="bg-[#111] rounded-[24px] p-10 text-white">
            <h2 className="text-2xl font-bold mb-8 font-display">
              Get in touch
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div>
                <label htmlFor="name" className="text-xs font-medium text-[#999] mb-2 block font-body tracking-wide">
                  Your name*
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm font-body outline-none transition-colors focus:border-red-500 placeholder:text-gray-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-medium text-[#999] mb-2 block font-body tracking-wide">
                  E-mail*
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm font-body outline-none transition-colors focus:border-red-500 placeholder:text-gray-600"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-medium text-[#999] mb-2 block font-body tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm font-body outline-none transition-colors focus:border-red-500 placeholder:text-gray-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black text-base font-medium py-4.5 rounded-full border-none cursor-pointer transition-colors hover:bg-red-500 hover:text-white font-body mt-2"
              >
                Get in touch
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
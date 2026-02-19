'use client';

import { useState } from 'react';
import { FaXTwitter, FaInstagram, FaBehance } from 'react-icons/fa6';
import { SiDribbble } from 'react-icons/si';
import { TypewriterOnScroll } from '@/components/common/TypeWritter';

export default function ContactSection() {
  // ✅ Fixed: Removed TypeScript types, using standard JS inference
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // ✅ Fixed: Removed TypeScript types
  const [pricingModel, setPricingModel] = useState(null);

  // ✅ Fixed: Added 'e' parameter, removed TypeScript types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fixed: Added 'e' parameter, removed TypeScript types
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, { pricingModel });
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setPricingModel(null);
  };

  const socialLinks = [
    { platform: 'X', icon: FaXTwitter, link: 'https://twitter.com' },
    { platform: 'Instagram', icon: FaInstagram, link: 'https://instagram.com' },
    { platform: 'Dribbble', icon: SiDribbble, link: 'https://dribbble.com' },
    { platform: 'Behance', icon: FaBehance, link: 'https://behance.net' },
  ];

  return (
    <section className="w-full min-h-screen bg-[#f5f5f5] font-sans">
      {/* Font Imports */}
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style> */}

      <div className="font-body max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-7">

            {/* Tag + Heading */}
            <div>
              <TypewriterOnScroll
                          text="[01] — Contact"
                className="text-xl font-medium text-black"
                          >
              
                          </TypewriterOnScroll>
              
              <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[1.05] text-[#111] m-0 font-display">
                Let's Talk.
              </h1>
              
              <p className="mt-4 text-[#666] text-sm leading-relaxed max-w-[340px]">
                I'm Rohan, a video editor and cinematographer passionate about crafting cinematic stories and immersive visual experiences.
              </p>
            </div>

            {/* Social Links */}
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
              {/* Email Card */}
              <div className="bg-white rounded-[18px] p-7 flex flex-col gap-7">
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
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#999] uppercase mb-1.5">
                    / Chat to me
                  </p>
                  <a
                    href="mailto:rohanwork953@gmail.com"
                    className="text-sm font-semibold text-[#111] no-underline hover:underline"
                  >
                    rohanwork953@gmail.com
                  </a>
                </div>
              </div>

              {/* Book Call Card */}
              <div className="bg-[#111] rounded-[18px] p-7 flex flex-col gap-7">
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 bg-[#222] rounded-[10px] flex items-center justify-center text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                    </svg>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#666] uppercase mb-1.5">
                    / Book a call
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 bg-red-500 text-white text-sm font-medium px-4.5 py-3 rounded-full no-underline transition-colors hover:bg-red-600 group"
                  >
                    Schedule now
                    <svg className="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
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

              {/* Name */}
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
                  aria-label="Your name"
                />
              </div>

              {/* Email */}
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
                  aria-label="Your email address"
                />
              </div>

              {/* Project type */}
              <div>
                <label className="text-xs font-medium text-[#999] mb-2 block font-body tracking-wide">
                  Project type
                </label>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    className={`flex-1 bg-[#1e1e1e] border border-[#2a2a2a] text-gray-500 text-[11px] font-bold tracking-wide uppercase py-3.5 px-2.5 rounded-lg cursor-pointer transition-all font-display
                      ${pricingModel === 'short' ? 'bg-red-500 border-red-500 text-white' : 'hover:bg-red-500 hover:border-red-500 hover:text-white'}
                    `}
                    onClick={() => setPricingModel(pricingModel === 'short' ? null : 'short')}
                  >
                    Short-form
                  </button>
                  <button
                    type="button"
                    className={`flex-1 bg-[#1e1e1e] border border-[#2a2a2a] text-gray-500 text-[11px] font-bold tracking-wide uppercase py-3.5 px-2.5 rounded-lg cursor-pointer transition-all font-display
                      ${pricingModel === 'long' ? 'bg-red-500 border-red-500 text-white' : 'hover:bg-red-500 hover:border-red-500 hover:text-white'}
                    `}
                    onClick={() => setPricingModel(pricingModel === 'long' ? null : 'long')}
                  >
                    Long-form / Film
                  </button>
                </div>
              </div>

              {/* Message */}
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
                  aria-label="Your message"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-black text-base font-medium py-4.5 rounded-full border-none cursor-pointer transition-colors hover:bg-red-500 hover:text-white font-body mt-2"
                aria-label="Send your message"
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
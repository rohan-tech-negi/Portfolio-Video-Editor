'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaBehance } from 'react-icons/fa6';
import { SiDribbble } from 'react-icons/si';
import { TypewriterOnScroll } from '@/app/components/common/TypeWritter';

// ── YOUR WEB3FORMS ACCESS KEY ─────────────────────────────────────────────────
// Get it free at https://web3forms.com → Enter your Gmail → Copy key
const WEB3FORMS_KEY = "0973e84d-9e4e-498a-a720-4a1b6247a8d9";

// ── Animation Variants ────────────────────────────────────────────────────────

const ease = [0.25, 0.1, 0.25, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease } },
};

const leftColVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.2 } },
};

const leftItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
};

const rightColVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4, ease } },
};

const formContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
};

// Success message pop-in
const successVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, scale: 0.92, y: -10, transition: { duration: 0.3 } },
};

// ── Custom Cursor ─────────────────────────────────────────────────────────────

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
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        backgroundColor: 'white', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        border: '1.5px solid rgba(0,0,0,0.08)',
      }}>
        <Icon size={22} color="#111" />
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', videoType: '', budget: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [activeIcon, setActiveIcon] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Web3Forms submission — sends directly to your Gmail, no backend needed
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...formData,
          // Optional: customise the subject line in your Gmail inbox
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', videoType: '', budget: '' });
        // Reset back to idle after 4s so they can submit again
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socialLinks = [
    { platform: 'Instagram', icon: FaInstagram, link: 'https://instagram.com' },
    { platform: 'Dribbble',  icon: SiDribbble,  link: 'https://dribbble.com' },
    { platform: 'Behance',   icon: FaBehance,   link: 'https://behance.net' },
  ];

  const viewport = { once: true, amount: 0.3 };

  return (
    <motion.section
      className="w-full min-h-screen bg-[#f5f5f5] font-sans pt-10 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(245,245,245,0.5) 85%, rgba(245,245,245,0.9) 100%)` }}
      />

      <style>{`.social-icon-hover:hover { cursor: none !important; }`}</style>
      <CustomCursor activeIcon={activeIcon} position={cursorPos} />

      <div className="font-body max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            className="flex flex-col gap-7"
            variants={leftColVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Heading */}
            <motion.div variants={leftItemVariants}>
              <TypewriterOnScroll text="[03] — Contact" className="text-xl font-medium text-black" />
              <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[1.05] text-[#111] m-0 font-display">
                Let&apos;s Talk.
              </h1>
              <p className="mt-4 text-[#666] text-sm leading-relaxed max-w-[340px]">
                I&apos;m Rohan, a video editor and cinematographer passionate about crafting cinematic stories and immersive visual experiences.
              </p>
            </motion.div>

            {/* ✅ Contact Card — flex-col on mobile, flex-row on sm+ */}
            <motion.div
              variants={leftItemVariants}
              className="bg-[#111] rounded-[18px] p-6 sm:p-7 w-full"
            >
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-0">

                {/* LEFT side of card */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-between gap-5 sm:pr-7 sm:min-w-[160px]">
                  <div className="flex justify-between items-center w-full sm:w-auto">
                    {/* Paperclip icon */}
                    <div className="w-11 h-11 bg-[#f5f5f3] rounded-[10px] flex items-center justify-center text-[#333]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                      </svg>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="w-2 h-2 rounded-full bg-[#444]" />
                    </div>
                  </div>

                  {/* Social icons */}
                  <div className="flex gap-2.5 items-center">
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
                          onMouseEnter={() => setActiveIcon(() => social.icon)}
                          onMouseLeave={() => setActiveIcon(null)}
                        >
                          <Icon size={15} />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* ✅ Divider — horizontal on mobile, vertical on sm+ */}
                <div className="block sm:hidden h-px w-full bg-[#2a2a2a]" />
                <div className="hidden sm:block w-px bg-[#2a2a2a] self-stretch flex-shrink-0" />

                {/* RIGHT side of card */}
                <div className="flex flex-col justify-between sm:pl-7 flex-1 gap-4 sm:gap-0">
                  <div>
                    <p className="text-[11px] font-bold tracking-widest text-[#555] uppercase m-0">/ Contact Number</p>
                    <a
                      href="tel:+919354690290"
                      className="text-[11px] font-bold tracking-widest text-white uppercase mt-1 block hover:underline no-underline"
                    >
                      +91 9354690290
                    </a>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold tracking-widest text-[#555] uppercase mb-1">/ Chat to me</p>
                    <a href="mailto:rohanwork953@gmail.com" className="text-sm font-semibold text-white no-underline hover:underline">
                      rohanwork953@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Bio blurb */}
            <motion.div variants={leftItemVariants} className="border-t border-[#ddd] pt-6">
              <p className="text-[#555] text-sm leading-relaxed">
                Beyond editing, I continuously explore the world of 3D and real-time environments in Unreal Engine, pushing my creative boundaries into virtual production and immersive visuals. Over time, I&apos;ve worked on diverse creative projects — blending motion, sound, and storytelling to deliver compelling visual experiences.
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — Form ── */}
          <motion.div
            className="bg-[#111] rounded-[24px] p-7 sm:p-10 text-white"
            variants={rightColVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className="text-2xl font-bold mb-8 font-display">Get in touch</h2>

            {/* ✅ AnimatePresence swaps form ↔ success message */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  {/* Checkmark circle */}
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold">Message sent!</p>
                  <p className="text-sm text-[#999]">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  variants={formContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Name */}
                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="name" className="text-xs font-medium text-[#999] mb-2 block tracking-wide">
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
                      disabled={status === 'loading'}
                      className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm outline-none transition-colors focus:border-red-500 placeholder:text-gray-600 disabled:opacity-50"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="email" className="text-xs font-medium text-[#999] mb-2 block tracking-wide">
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
                      disabled={status === 'loading'}
                      className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm outline-none transition-colors focus:border-red-500 placeholder:text-gray-600 disabled:opacity-50"
                    />
                  </motion.div>

                  {/* Video Type */}
                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="videoType" className="text-xs font-medium text-[#999] mb-2 block tracking-wide">
                      Video Type*
                    </label>
                    <div className="relative">
                      <select
                        name="videoType"
                        id="videoType"
                        value={formData.videoType}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm outline-none transition-colors focus:border-red-500 disabled:opacity-50 appearance-none"
                      >
                        <option value="" disabled className="text-gray-500">Select video type</option>
                        <option value="Instagram reel">Instagram reel</option>
                        <option value="Commercial ads">Commercial ads</option>
                        <option value="Cinematic / Story telling">Cinematic / Story telling</option>
                        <option value="Podcast edit">Podcast edit</option>
                        <option value="Motion graphics">Motion graphics</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-[#555]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Budget */}
                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="budget" className="text-xs font-medium text-[#999] mb-2 flex items-center gap-1.5 tracking-wide">
                      Budget Range <span className="text-[#666] text-[10px] uppercase">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. $500 - $1000"
                      disabled={status === 'loading'}
                      className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm outline-none transition-colors focus:border-red-500 placeholder:text-gray-500 disabled:opacity-50"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="message" className="text-xs font-medium text-[#999] mb-2 block tracking-wide">
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
                      disabled={status === 'loading'}
                      className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-sm outline-none transition-colors focus:border-red-500 placeholder:text-gray-600 resize-none disabled:opacity-50"
                    />
                  </motion.div>

                  {/* ✅ Error state */}
                  {status === 'error' && (
                    <p className="text-red-400 text-xs text-center -mt-2">
                      Something went wrong. Please try again or email directly.
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    disabled={status === 'loading'}
                    className="w-full bg-white text-black text-base font-medium py-4 rounded-full border-none cursor-pointer transition-colors hover:bg-red-500 hover:text-white mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Sending…' : 'Get in touch'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
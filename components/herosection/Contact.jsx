'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { FaXTwitter, FaInstagram, FaBehance } from 'react-icons/fa6';
import { SiDribbble } from 'react-icons/si';

export default function AboutSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    // TODO: Add actual form submission logic (API call)
  };

  const socialLinks = [
    {
      platform: 'X',
      icon: FaXTwitter,
      link: 'https://twitter.com', // Fixed trailing spaces
    },
    {
      platform: 'Instagram',
      icon: FaInstagram,
      link: 'https://instagram.com', // Fixed trailing spaces
    },
    {
      platform: 'Dribbble',
      icon: SiDribbble,
      link: 'https://dribbble.com', // Fixed trailing spaces + spelling
    },
    {
      platform: 'Behance',
      icon: FaBehance,
      link: 'https://behance.net', // Fixed trailing spaces
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-lime-400" /> {/* Self-closing */}
          <span className="text-sm font-medium text-gray-600">
            Available for freelance work
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-gray-900 mb-16">
          About me
        </h1>

        {/* Two Column Layout with Sticky Left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Sticky */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {/* Profile Image Placeholder */}
            <div 
              className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mb-6" 
              aria-label="Profile placeholder"
            />

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.platform}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label={`Visit my ${social.platform} profile`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Email */}
            <a 
              href="mailto:hello@andrew.design" 
              className="text-xl font-semibold text-gray-900 mb-6 block hover:text-lime-500 transition-colors"
              aria-label="Send email to hello@andrew.design"
            >
              hello@andrew.design
            </a>

            {/* Short Intro */}
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              I'm Andrew, a passionate web designer with a love for creating
              visually stunning and user-friendly digital experiences.
            </p>

            {/* CTA Button - Fixed missing opening tag */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-gray-900 font-medium px-6 py-3 rounded-full transition-colors duration-300 w-fit group"
              aria-label="Book a consultation call"
            >
              Book a call
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>

          {/* Right Column - Scrollable Content */}
          <div className="flex flex-col space-y-16">
            {/* Main Bio Section */}
            <div>
              <p className="text-xl sm:text-2xl text-gray-900 leading-relaxed mb-6">
                Hi, I'm Andrew, a passionate web designer with a love for creating
                visually stunning experiences. With a strong background in design
                and front-end development, I specialize in crafting responsive
                websites that not only look great but also provide seamless
                interactions across all devices.
              </p>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                Over the years, I've had the opportunity to work with a diverse
                range of clients, from startups to established brands, helping
                them bring their visions to life online.
              </p>

              <p className="text-lg font-medium text-gray-900">
                Let's create something amazing together!
              </p>
            </div>

            {/* Contact Form Section */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-8">
                Let's get in touch
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all"
                    aria-label="Your name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all"
                    aria-label="Your email address"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Leave me a message"
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-all resize-none"
                    aria-label="Your message"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-full transition-colors duration-300"
                  aria-label="Send your message"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
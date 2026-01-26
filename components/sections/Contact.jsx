'use client';

import React from "react"

import { useState } from 'react';
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
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    {
      platform: 'X',
      icon: FaXTwitter,
      link: 'https://twitter.com',
    },
    {
      platform: 'Instagram',
      icon: FaInstagram,
      link: 'https://instagram.com',
    },
    {
      platform: 'Dribbble',
      icon: SiDribbble,
      link: 'https://dribbble.com',
    },
    {
      platform: 'Behance',
      icon: FaBehance,
      link: 'https://behance.net',
    },
  ];

  return (
    <section className="w-full bg-white">
      {/* About Me Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-lime-400"></div>
          <span className="text-sm font-medium text-gray-600">
            Available for freelance work
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-16">
          About me
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col">
            {/* Profile Section */}
            <div className="mb-12">
              {/* Profile Image */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mb-6 flex-shrink-0"></div>

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
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Email */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
                hello@andrew.design
              </h2>

              {/* Short Intro */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                I'm Andrew, a passionate web designer with a love for creating
                visually stunning and user-friendly digital experiences.
              </p>

              {/* CTA Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors duration-300 w-fit"
              >
                Book a call
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {/* Main Bio */}
            <p className="text-xl sm:text-2xl text-gray-900 font-light leading-relaxed mb-6">
              Hi, I'm Andrew, a passionate web designer with a love for creating
              visually stunning experiences. With a strong background in design
              and front-end development, I specialize in crafting responsive
              websites that not only look great but also provide interactions
              across all devices.
            </p>

            {/* Secondary Bio */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              Over the years, I've had the opportunity to work with a diverse
              range of clients, from startups to established brands, helping
              them bring their visions to life online.
            </p>

            {/* Closing Line */}
            <p className="text-lg font-medium text-gray-900">
              Let's create something amazing together!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-12">
          Let's get in touch
        </h2>

        <div className="max-w-2xl mx-auto bg-gray-50 rounded-3xl p-8 sm:p-12 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave me a message"
                required
                rows={6}
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-full transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

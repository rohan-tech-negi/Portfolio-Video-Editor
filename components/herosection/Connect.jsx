'use client';

import { Mail, ArrowRight } from 'lucide-react';
import { FaXTwitter, FaInstagram, FaBehance } from 'react-icons/fa6';
import { SiDribbble } from 'react-icons/si';

export default function ContactSection() {
  const socialLinks = [
    {
      id: 1,
      platform: 'Twitter/X',
      icon: FaXTwitter,
      link: 'https://twitter.com',
      color: 'bg-lime-400',
    },
    {
      id: 2,
      platform: 'Instagram',
      icon: FaInstagram,
      link: 'https://instagram.com',
      color: 'bg-lime-400',
    },
    {
      id: 3,
      platform: 'Dribble',
      icon: SiDribbble,
      link: 'https://dribbble.com',
      color: 'bg-lime-400',
    },
    {
      id: 4,
      platform: 'Behance',
      icon: FaBehance,
      link: 'https://behance.net',
      color: 'bg-lime-400',
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            <span className="text-sm font-medium text-gray-600">[06] — Contact me</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            I'm all over the <br className="hidden sm:block" />
            internet
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Social Cards */}
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-start h-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-8">
                    {social.platform}
                  </h3>
                  <div className={`${social.color} rounded-full p-4 mt-auto`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </a>
            );
          })}

          {/* CTA Card */}
          <a
            href="mailto:hello@example.com"
            className="md:col-span-2 bg-lime-400 rounded-2xl p-8 sm:p-12 hover:bg-lime-500 transition-colors duration-300 group cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-0">
                Get in touch
              </h2>
              <div className="text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

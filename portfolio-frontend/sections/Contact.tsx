"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { aboutAPI } from '@/lib/api';

export default function Contact() {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await aboutAPI.get();
        setAboutData(response.data);
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
      }
    };

    fetchAbout();
  }, []);

  return (
    <section id="contact" className="py-24 bg-transparent relative text-white border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 inline-block mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-[#0a0514] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder-gray-600"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-[#0a0514] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-[#0a0514] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder-gray-600 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-2"
              >
                <span>Send Message</span>
                <FiSend className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-10 pt-8 border-t border-white/10"
          >
            {aboutData?.email && (
              <a href={`mailto:${aboutData.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors group">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors border border-white/10 group-hover:border-purple-500/30">
                  <FiMail className="w-6 h-6" />
                </div>
                <span className="font-medium">{aboutData.email}</span>
              </a>
            )}
            
            {aboutData?.socialLinks?.github && (
              <a href={aboutData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors border border-white/10 group-hover:border-white/30">
                  <FiGithub className="w-6 h-6" />
                </div>
                <span className="font-medium">GitHub</span>
              </a>
            )}

            {aboutData?.socialLinks?.linkedin && (
              <a href={aboutData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-[#0A66C2] transition-colors group">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#0A66C2]/20 transition-colors border border-white/10 group-hover:border-[#0A66C2]/30">
                  <FiLinkedin className="w-6 h-6" />
                </div>
                <span className="font-medium">LinkedIn</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

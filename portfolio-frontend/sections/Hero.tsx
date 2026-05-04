"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { aboutAPI } from '@/lib/api';

export default function Hero() {
  const [name, setName] = useState('Vishal');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await aboutAPI.get();
        if (response.data.name) {
          setName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };
    fetchName();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Deep dark gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d0b3b] via-[#030014] to-[#030014] z-0"></div>
      
      {/* Decorative blurred lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">{name}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-300 mb-6">
            Full Stack Developer
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I build modern web applications with great user experiences. 
            Passionate about clean code, beautiful interfaces, and scalable architectures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all transform hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}


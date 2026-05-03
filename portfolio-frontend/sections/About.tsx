"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiLayout } from 'react-icons/fi';
import { aboutAPI, projectsAPI } from '@/lib/api';

export default function About() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, projectsRes] = await Promise.all([
          aboutAPI.get(),
          projectsAPI.getAll()
        ]);
        setAboutData(aboutRes.data);
        setProjectCount(projectsRes.data.length);
      } catch (err) {
        console.error('Failed to fetch about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section id="about" className="py-24 bg-transparent relative text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 inline-block">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Column - Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative h-80 w-80 sm:h-96 sm:w-96 rounded-2xl bg-[#0a0514] border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-500">
                  {aboutData?.name?.[0] || 'V'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-7"
          >
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I'm <span className="text-white font-semibold">{aboutData?.name || 'Vishal'}</span>, {aboutData?.bio || 'a passionate Full Stack Developer who loves building modern web applications. I specialize in React, Next.js, Node.js and MongoDB. I enjoy turning complex problems into simple, beautiful solutions.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group">
                <FiLayout className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold text-white mb-1">{projectCount}+</h3>
                <p className="text-sm text-gray-400">Projects</p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors group">
                <FiCode className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2 mt-1">React &<br/>Next.js</h3>
                <p className="text-sm text-gray-400">Frontend</p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group">
                <FiLayers className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2 mt-1">Full<br/>Stack</h3>
                <p className="text-sm text-gray-400">Development</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

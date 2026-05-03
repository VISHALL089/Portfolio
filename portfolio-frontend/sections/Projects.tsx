"use client";

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'Portfolio Web App',
    description: 'A full stack portfolio website with CMS admin panel built with Next.js, Node.js and MongoDB',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/VISHALL089',
    live: '#'
  },
  {
    title: 'E-Commerce Platform',
    description: 'A complete online store with product management, cart, and payment integration',
    tags: ['React', 'Express', 'MongoDB', 'Stripe'],
    github: 'https://github.com/VISHALL089',
    live: '#'
  },
  {
    title: 'Task Manager App',
    description: 'A productivity app with real-time updates, drag and drop, and team collaboration features',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/VISHALL089',
    live: '#'
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent relative text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 inline-block">
            My Projects
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 group"
            >
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-[#0a0514] rounded-xl mb-6 flex items-center justify-center border border-white/5 group-hover:border-purple-500/30 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="text-gray-600 font-medium z-10">Project Screenshot</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 bg-white/5 text-purple-300 rounded-full border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-6 mt-auto border-t border-white/5 pt-4">
                <a href={project.live} className="flex items-center space-x-2 text-sm font-semibold text-white hover:text-purple-400 transition-colors">
                  <FiExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiGit 
} from 'react-icons/si';
import { FiCode } from 'react-icons/fi';
import { skillsAPI } from '@/lib/api';

// Icon lookup table
const iconMap: Record<string, any> = {
  'React': { icon: SiReact, color: 'text-[#61DAFB]' },
  'Next.js': { icon: SiNextdotjs, color: 'text-white' },
  'Node.js': { icon: SiNodedotjs, color: 'text-[#339933]' },
  'Express': { icon: SiExpress, color: 'text-white' },
  'MongoDB': { icon: SiMongodb, color: 'text-[#47A248]' },
  'TypeScript': { icon: SiTypescript, color: 'text-[#3178C6]' },
  'JavaScript': { icon: SiJavascript, color: 'text-[#F7DF1E]' },
  'Tailwind CSS': { icon: SiTailwindcss, color: 'text-[#06B6D4]' },
  'Git': { icon: SiGit, color: 'text-[#F05032]' },
};

interface Skill {
  _id: string;
  name: string;
  category?: string;
  proficiency?: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll();
        setSkills(response.data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-transparent relative text-white border-t border-white/5">
        <div className="text-center text-gray-500">Loading skills...</div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 bg-transparent relative text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 inline-block">
            My Skills
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill) => {
            const iconConfig = iconMap[skill.name] || { icon: FiCode, color: 'text-purple-400' };
            const Icon = iconConfig.icon;

            return (
              <motion.div
                key={skill._id}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <Icon className={`w-14 h-14 mb-4 group-hover:scale-110 transition-transform duration-300 ${iconConfig.color}`} />
                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                {skill.category && (
                   <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{skill.category}</span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

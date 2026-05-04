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
  SiGit,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiFirebase,
  SiFigma
} from 'react-icons/si';
import { skillsAPI } from '@/lib/api';

const iconMap: { [key: string]: any } = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'MongoDB': SiMongodb,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  'Tailwind': SiTailwindcss,
  'Git': SiGit,
  'Python': SiPython,
  'Docker': SiDocker,
  'PostgreSQL': SiPostgresql,
  'Firebase': SiFirebase,
  'Figma': SiFigma
};

const defaultColor = 'text-white';
const colorMap: { [key: string]: string } = {
  'React': 'text-[#61DAFB]',
  'Node.js': 'text-[#339933]',
  'MongoDB': 'text-[#47A248]',
  'TypeScript': 'text-[#3178C6]',
  'JavaScript': 'text-[#F7DF1E]',
  'Tailwind CSS': 'text-[#06B6D4]',
  'Git': 'text-[#F05032]',
  'Python': 'text-[#3776AB]',
  'PostgreSQL': 'text-[#4169E1]',
};

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll();
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
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

  if (loading) return null;

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
            const Icon = iconMap[skill.name] || SiJavascript; // Default to JS icon if not found
            const colorClass = colorMap[skill.name] || defaultColor;

            return (
              <motion.div
                key={skill._id}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <Icon className={`w-14 h-14 mb-4 group-hover:scale-110 transition-transform duration-300 ${colorClass}`} />
                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                {skill.proficiency && (
                  <div className="w-full mt-4 bg-white/10 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-full"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


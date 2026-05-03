"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCode } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
}

const initialSkills: Skill[] = [
  { id: '1', name: 'React', category: 'Frontend', proficiency: 'Expert' },
  { id: '2', name: 'Next.js', category: 'Frontend', proficiency: 'Advanced' },
  { id: '3', name: 'Node.js', category: 'Backend', proficiency: 'Advanced' },
  { id: '4', name: 'Express', category: 'Backend', proficiency: 'Advanced' },
  { id: '5', name: 'MongoDB', category: 'Database', proficiency: 'Intermediate' },
  { id: '6', name: 'TypeScript', category: 'Frontend', proficiency: 'Advanced' },
  { id: '7', name: 'JavaScript', category: 'Frontend', proficiency: 'Expert' },
  { id: '8', name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Expert' },
  { id: '9', name: 'Git', category: 'Tools', proficiency: 'Advanced' }
];

export default function AdminSkills() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<{
    name: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
    proficiency: 'Expert' | 'Advanced' | 'Intermediate';
  }>({
    name: '',
    category: 'Frontend',
    proficiency: 'Intermediate'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setMounted(true);
    }
  }, [router]);

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setEditingId(skill.id);
      setFormData({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', category: 'Frontend', proficiency: 'Intermediate' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setSkills(skills.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setSkills([...skills, { ...formData, id: Date.now().toString() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex bg-[#030014] text-white">
      <AdminSidebar />

      <main className="flex-1 ml-64 min-h-screen flex flex-col p-8">
        <header className="flex justify-between items-center mb-10 mt-4">
          <h1 className="text-4xl font-bold text-white">Manage Skills</h1>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New Skill</span>
          </button>
        </header>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-[#0a0514] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all flex flex-col h-full group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                  <FiCode className="w-6 h-6" />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleOpenModal(skill)}
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
              <div className="flex justify-between items-center mt-auto pt-4">
                <span className="text-xs px-2.5 py-1 bg-white/5 text-gray-300 rounded-md border border-white/10">
                  {skill.category}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-md border ${
                  skill.proficiency === 'Expert' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' :
                  skill.proficiency === 'Advanced' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' :
                  'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                }`}>
                  {skill.proficiency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0514] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition-colors p-1">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <form id="skillForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" placeholder="e.g. React" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency Level</label>
                  <select required value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: e.target.value as any})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50">
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-end space-x-4 bg-[#0a0514]/50">
              <button type="button" onClick={handleCloseModal} className="px-6 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button type="submit" form="skillForm" className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-colors shadow-lg shadow-purple-600/20">
                {editingId ? 'Save Changes' : 'Create Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

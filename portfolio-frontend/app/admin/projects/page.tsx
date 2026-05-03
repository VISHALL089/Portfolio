"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  liveUrl: string;
  githubUrl: string;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Web App',
    description: 'A full stack portfolio website',
    techStack: 'Next.js, Node.js, MongoDB',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Online store with payments',
    techStack: 'React, Express, Stripe',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  }
];

export default function AdminProjects() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    githubUrl: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setMounted(true);
    }
  }, [router]);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', techStack: '', liveUrl: '', githubUrl: '' });
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
      setProjects(projects.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      setProjects([...projects, { ...formData, id: Date.now().toString() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex bg-[#030014] text-white">
      <AdminSidebar />

      <main className="flex-1 ml-64 min-h-screen flex flex-col p-8">
        <header className="flex justify-between items-center mb-10 mt-4">
          <h1 className="text-4xl font-bold text-white">Manage Projects</h1>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New Project</span>
          </button>
        </header>

        {/* Projects Table */}
        <div className="bg-[#0a0514] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-300 text-sm uppercase tracking-wider">
                <th className="px-6 py-5 font-medium">Title</th>
                <th className="px-6 py-5 font-medium">Tech Stack</th>
                <th className="px-6 py-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 font-medium text-white">{project.title}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.split(',').map(tech => (
                        <span key={tech} className="text-xs px-2 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right space-x-3">
                    <button 
                      onClick={() => handleOpenModal(project)}
                      className="inline-flex items-center justify-center p-2.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="inline-flex items-center justify-center p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500 text-lg">
                    No projects found. Add one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0514] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition-colors p-1">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="projectForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tech Stack (comma separated)</label>
                  <input required type="text" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                    <input type="url" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" placeholder="https://" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                    <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" placeholder="https://" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-end space-x-4 bg-[#0a0514]/50">
              <button type="button" onClick={handleCloseModal} className="px-6 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button type="submit" form="projectForm" className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-colors shadow-lg shadow-purple-600/20">
                {editingId ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

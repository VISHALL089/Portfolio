"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiCheckCircle } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminAbout() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: 'Vishal',
    role: 'Full Stack Developer',
    bio: "I'm Vishal, a passionate Full Stack Developer who loves building modern web applications. I specialize in React, Next.js, Node.js and MongoDB. I enjoy turning complex problems into simple, beautiful solutions.",
    email: 'crazyrock0106@gmail.com',
    githubUrl: 'https://github.com/VISHALL089',
    linkedinUrl: 'https://www.linkedin.com/in/vishal-masimade/',
    profileImageUrl: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setMounted(true);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex bg-[#030014] text-white">
      <AdminSidebar />

      <main className="flex-1 ml-64 min-h-screen flex flex-col p-8">
        <header className="flex justify-between items-center mb-10 mt-4">
          <h1 className="text-4xl font-bold text-white">Edit About Info</h1>
        </header>

        <div className="max-w-3xl">
          {showSuccess && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl flex items-center space-x-2 animate-pulse">
              <FiCheckCircle className="w-5 h-5" />
              <span>Changes saved successfully!</span>
            </div>
          )}

          <div className="bg-[#0a0514] border border-white/10 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title / Role</label>
                  <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea required rows={5} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                  <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                  <input type="url" value={formData.linkedinUrl} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image URL (Optional)</label>
                <input type="url" value={formData.profileImageUrl} onChange={e => setFormData({...formData, profileImageUrl: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" placeholder="https://" />
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-colors shadow-lg shadow-purple-600/20 disabled:opacity-70 transform hover:scale-[1.02]"
                >
                  <FiSave className="w-5 h-5" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiCheckCircle } from 'react-icons/fi';
import AdminSidebar from '@/components/AdminSidebar';
import { aboutAPI } from '@/lib/api';

export default function AdminAbout() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    resumeLink: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setMounted(true);
      fetchAbout();
    }
  }, [router]);

  const fetchAbout = async () => {
    try {
      const response = await aboutAPI.get();
      if (response.data && response.data.name) {
        setFormData({
          name: response.data.name || '',
          bio: response.data.bio || '',
          email: response.data.email || '',
          github: response.data.socialLinks?.github || '',
          linkedin: response.data.socialLinks?.linkedin || '',
          twitter: response.data.socialLinks?.twitter || '',
          resumeLink: response.data.resumeLink || ''
        });
      }
    } catch (err) {
      console.error('Failed to fetch about info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      name: formData.name,
      bio: formData.bio,
      email: formData.email,
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter
      },
      resumeLink: formData.resumeLink
    };

    try {
      await aboutAPI.update(payload);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      console.error('Failed to save about info:', err);
      alert(err.response?.data?.message || 'Failed to save about info');
    } finally {
      setIsSaving(false);
    }
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
            {loading ? (
              <div className="text-center text-gray-500 py-12">Loading about info...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea required rows={5} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                    <input type="url" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                    <input type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Twitter URL (Optional)</label>
                  <input type="url" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" placeholder="https://" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Resume Link (Optional)</label>
                  <input type="url" value={formData.resumeLink} onChange={e => setFormData({...formData, resumeLink: e.target.value})} className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50" placeholder="https://" />
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

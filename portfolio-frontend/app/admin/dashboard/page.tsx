"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiFolder, FiCode, FiUser, FiLogOut, FiPlus, FiEdit, FiTrash2, FiLayers, FiSettings, FiGrid, FiActivity, FiClock, FiZap, FiCheckCircle } from 'react-icons/fi'
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setMounted(true);
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex bg-[#030014] text-white">
      <AdminSidebar />

      <main className="flex-1 ml-64 min-h-screen flex flex-col p-8">
        <header className="mb-10 mt-4">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Vishal 👋</h1>
          <p className="text-gray-400 text-lg">Here's what's happening with your portfolio today.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#0a0514] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <FiLayers className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Projects</p>
                <h3 className="text-3xl font-bold mt-1 text-white">3</h3>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0514] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <FiCode className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Skills</p>
                <h3 className="text-3xl font-bold mt-1 text-white">9</h3>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0514] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <FiClock className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Last Updated</p>
                <h3 className="text-xl font-bold mt-1 text-white">{new Date().toLocaleDateString()}</h3>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0514] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-500/10 rounded-xl">
                <FiCheckCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Status</p>
                <h3 className="text-xl font-bold mt-1 text-emerald-400">Active</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/projects" className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/30 hover:bg-purple-600/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all group">
            <FiLayers className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-white">Manage Projects</h3>
            <p className="text-sm text-gray-400 mt-1">Add, edit or delete projects</p>
          </Link>

          <Link href="/admin/skills" className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 hover:bg-blue-600/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all group">
            <FiCode className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-white">Manage Skills</h3>
            <p className="text-sm text-gray-400 mt-1">Update your tech stack</p>
          </Link>

          <Link href="/admin/about" className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/30 hover:bg-emerald-600/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all group">
            <FiUser className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-white">Edit About</h3>
            <p className="text-sm text-gray-400 mt-1">Update your bio and info</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

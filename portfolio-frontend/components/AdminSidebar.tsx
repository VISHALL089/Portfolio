"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiGrid, FiLayers, FiCode, FiUser, FiLogOut } from 'react-icons/fi';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/admin/login');
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiGrid },
    { name: 'Projects', href: '/admin/projects', icon: FiLayers },
    { name: 'Skills', href: '/admin/skills', icon: FiCode },
    { name: 'About', href: '/admin/about', icon: FiUser },
  ];

  return (
    <aside className="w-64 bg-[#0a0514] border-r border-white/10 flex flex-col fixed h-full z-20">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Vishal
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'text-white bg-purple-600/20 border border-purple-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <link.icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full px-4 py-3 rounded-xl transition-all"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

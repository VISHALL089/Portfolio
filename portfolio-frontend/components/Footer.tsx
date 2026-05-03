import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative bg-transparent text-gray-400 py-8 border-t border-white/10 z-10">
      {/* Thin purple gradient line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-2xl font-bold text-white tracking-tight">
            Vishal<span className="text-purple-500">.</span>
          </div>
          
          <div className="text-sm font-medium">
            Built with Next.js, Node.js & MongoDB
          </div>

          <div className="flex items-center space-x-6">
            <a href="https://github.com/VISHALL089" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/vishal-masimade/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:scale-110 transition-all">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-300 hover:scale-110 transition-all">
              <FiTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="text-center text-xs mt-6 opacity-60">
          &copy; 2024 Vishal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

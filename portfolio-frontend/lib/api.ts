import axios from 'axios';

let API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-backend-z1kp.onrender.com';

// Normalize API_URL: We want it to be the base URL (e.g., http://localhost:5000 or https://...onrender.com)
// If it ends with /api, remove it so we can consistently use /api/... in our endpoints
if (API_URL.endsWith('/api')) {
  API_URL = API_URL.slice(0, -4);
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 responses globally (token expired/invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Don't redirect if we are already on the login page
      if (window.location.pathname !== '/admin/login') {
        localStorage.removeItem('token');
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
        window.location.href = '/admin/login';
      }

    }
    return Promise.reject(error);
  }
);


// ==================== AUTH ====================
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  register: (email: string, password: string) =>
    api.post('/api/auth/register', { email, password }),
};


// ==================== PROJECTS ====================
export const projectsAPI = {
  getAll: () => api.get('/api/projects'),
  create: (data: { title: string; description: string; technologies: string[]; liveLink?: string; githubLink?: string }) =>
    api.post('/api/projects', data),
  update: (id: string, data: { title: string; description: string; technologies: string[]; liveLink?: string; githubLink?: string }) =>
    api.put(`/api/projects/${id}`, data),
  delete: (id: string) => api.delete(`/api/projects/${id}`),
};

// ==================== SKILLS ====================
export const skillsAPI = {
  getAll: () => api.get('/api/skills'),
  create: (data: { name: string; category?: string; proficiency?: number }) =>
    api.post('/api/skills', data),
  update: (id: string, data: { name: string; category?: string; proficiency?: number }) =>
    api.put(`/api/skills/${id}`, data),
  delete: (id: string) => api.delete(`/api/skills/${id}`),
};

// ==================== ABOUT ====================
export const aboutAPI = {
  get: () => api.get('/api/about'),
  update: (data: { name: string; bio: string; email?: string; socialLinks?: { linkedin?: string; github?: string; twitter?: string }; resumeLink?: string }) =>
    api.put('/api/about', data),
};


export default api;

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
      localStorage.removeItem('token');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH ====================
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string) =>
    api.post('/auth/register', { email, password }),
};

// ==================== PROJECTS ====================
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  create: (data: { title: string; description: string; technologies: string[]; liveLink?: string; githubLink?: string }) =>
    api.post('/projects', data),
  update: (id: string, data: { title: string; description: string; technologies: string[]; liveLink?: string; githubLink?: string }) =>
    api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// ==================== SKILLS ====================
export const skillsAPI = {
  getAll: () => api.get('/skills'),
  create: (data: { name: string; category?: string; proficiency?: number }) =>
    api.post('/skills', data),
  update: (id: string, data: { name: string; category?: string; proficiency?: number }) =>
    api.put(`/skills/${id}`, data),
  delete: (id: string) => api.delete(`/skills/${id}`),
};

// ==================== ABOUT ====================
export const aboutAPI = {
  get: () => api.get('/about'),
  update: (data: { name: string; bio: string; email?: string; socialLinks?: { linkedin?: string; github?: string; twitter?: string }; resumeLink?: string }) =>
    api.put('/about', data),
};

export default api;

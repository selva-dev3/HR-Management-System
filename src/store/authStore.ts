import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/utils/permissions';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: '1',
  email: 'admin@hrms.local',
  name: 'Alex Morgan',
  role: 'super_admin',
  avatar: '',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      token: 'mock-jwt-token',
      isAuthenticated: true,
      isLoading: false,
      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 800));
          if (email && password.length >= 6) {
            let role: UserRole = 'super_admin';
            let name = 'Alex Morgan';

            const lowerEmail = email.toLowerCase();
            if (lowerEmail.startsWith('hr')) {
              role = 'hr_admin';
              name = 'Sarah Smith';
            } else if (lowerEmail.startsWith('manager')) {
              role = 'manager';
              name = 'John Doe';
            } else if (lowerEmail.startsWith('employee') || lowerEmail.startsWith('user')) {
              role = 'employee';
              name = 'Daniel Davis';
            } else if (lowerEmail.startsWith('auditor')) {
              role = 'auditor';
              name = 'Sophia Rodriguez';
            }

            const loggedInUser: User = {
              id: role === 'super_admin' ? '1' : `user-${role}`,
              email,
              name,
              role,
              avatar: '',
              isActive: true,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            };
            set({ user: loggedInUser, token: 'mock-jwt-token', isAuthenticated: true });
            return true;
          }
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

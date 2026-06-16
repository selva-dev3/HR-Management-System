import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

interface UIState {
  sidebarOpen: boolean;
  notifications: Notification[];
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  toggleTheme: () => void;
}

const DEFAULT_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'New leave request', message: 'John Doe requested 3 days of annual leave.', type: 'info', isRead: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Payslip generated', message: 'June payslips have been generated and sent.', type: 'success', isRead: false, createdAt: new Date().toISOString() },
  { id: '3', title: 'Document expiry', message: 'Sarah\'s passport expires in 30 days.', type: 'warning', isRead: true, createdAt: new Date().toISOString() },
];

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  notifications: DEFAULT_NOTIFICATIONS,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        { ...n, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...state.notifications,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next === 'dark');
      }
      return { theme: next };
    }),
}));

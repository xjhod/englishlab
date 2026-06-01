import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

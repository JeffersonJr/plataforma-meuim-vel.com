import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "meuimovel_user";

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "jefferson@exemplo.com": {
    password: "123456",
    user: {
      id: "u1",
      name: "Jefferson",
      email: "jefferson@exemplo.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
      favorites: ["p1", "p3"],
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setIsLoading(false);
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const record = DEMO_USERS[email.toLowerCase()];
    if (record && record.password === password) {
      persist(record.user);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = {
      id: `u_${Date.now()}`,
      name,
      email,
      favorites: [],
    };
    persist(newUser);
    return true;
  };

  const logout = () => persist(null);

  const toggleFavorite = (propertyId: string) => {
    if (!user) return;
    const favs = user.favorites.includes(propertyId)
      ? user.favorites.filter((id) => id !== propertyId)
      : [...user.favorites, propertyId];
    const updated = { ...user, favorites: favs };
    persist(updated);
  };

  const isFavorite = (propertyId: string) => !!user?.favorites.includes(propertyId);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

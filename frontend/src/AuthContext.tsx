import React, { createContext, useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import API from "./api";
import { mockAPI } from "./mockApi";
import { User, AuthModalState, AuthResponse } from "./types";
import { toast } from "sonner";
interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  authModal: AuthModalState;
  openAuthModal: (view?: "login" | "register") => void;
  closeAuthModal: () => void;
  oauthSignIn: (provider: string) => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<AuthModalState>({
    open: false,
    view: "login",
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Expose setUser for OAuth callback handler
  (AuthProvider as any).setUser = setUser;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (!storedToken) {
      setLoading(false);
      return;
    }
    
    // Use mock API
    mockAPI.auth.me(storedToken)
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      // Use mock API
      const data = await mockAPI.auth.login(email, password);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      if (data.refreshToken)
        localStorage.setItem("refreshToken", data.refreshToken);
      setUser(data.user);
      toast.success(
        `Welcome back${
          data.user?.name ? `, ${data.user.name.split(" ")[0]}` : ""
        }!`
      );
      return data;
    } catch (err: any) {
      toast.error(err.message || "Login failed");
      throw err;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    // Use mock API
    const data = await mockAPI.auth.register(name, email, password);
    toast.success(
      data.message || "Registration successful! You can now log in."
    );
    return data as any;
  };

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  setUser(null);
  setToken(null);
  toast.success("Logged out successfully");
  };

  const openAuthModal = (view: "login" | "register" = "login") =>
    setAuthModal({ open: true, view });
  const closeAuthModal = () => setAuthModal({ open: false });

  // OAuth: redirect to provider URLs if configured; otherwise inform the user.
  const oauthSignIn = async (provider: string): Promise<void> => {
    const urls: Record<string, string | undefined> = {
      Google: (import.meta as any).env?.VITE_OAUTH_GOOGLE_URL,
      GitHub: (import.meta as any).env?.VITE_OAUTH_GITHUB_URL,
    };
    const url = urls[provider];
    if (url) {
      // Close modal and redirect for real OAuth handled by backend
      closeAuthModal();
      window.location.href = url;
      toast.info(`Redirecting to ${provider}...`);
      return;
    }
    toast.error(`${provider} sign-in is not configured yet`);
    throw new Error("OAuth not configured");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        login,
        register,
        logout,
        authModal,
        openAuthModal,
        closeAuthModal,
        oauthSignIn,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

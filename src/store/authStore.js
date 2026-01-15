import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: !!localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await api.post("/auth/register", data);
    } catch (err) {
      set({ error: err.response?.data?.message || "Register failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const res = await api.post("/auth/login", data);
      set({
        user: res.data.user,
        accessToken: res.data.token.accessToken,
        refreshToken: res.data.token.refreshToken,
        isAuth: true,
      });

      localStorage.setItem("accessToken", res.data.token.accessToken);
      localStorage.setItem("refreshToken", res.data.token.refreshToken);
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  profile: null,

  logout: () => {
    
    set({ 
      user: null, 
      profile: null, 
      isAuth: false, 
      accessToken: null, 
      refreshToken: null 
    });
  
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    window.location.href = "/login";
  },

 
getProfile: async () => {
  try {

    set({ isLoading: true }); 
    const res = await api.get("/profile");
    set({ profile: res.data, isAuth: true });
  } catch (error) {
    console.error(error);
  
    if (error.response?.status === 401) {
      set({ isAuth: false, profile: null });
      localStorage.removeItem("accessToken");
    }
  } finally {
    set({ isLoading: false });
  }
},
}));

import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningIn: true,
  islogging: false,
  isUpdating: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      if (response.status === 200) {
        set({ authUser: response.data, isCheckingAuth: false });
      } else {
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/signup", formData, {
        withCredentials: true,
      });
      set({ authUser: response.data, isSigningIn: false });
    } catch (error) {
      console.error("Signup failed:", error);
      set({ isSigningIn: false });
    }
  },
}));

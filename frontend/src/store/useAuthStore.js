import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningIn: false,
  islogging: false,
  isUpdating: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check", {
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        set({ authUser: user, isCheckingAuth: false });
      } else {
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },
}));

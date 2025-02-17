import { create } from "zustand";

const ThemeStore = create((set) => ({
  themeColor: '#06dfb0',
  theme:false,
  chatBody:'#222831',
  body:false,
  setTheme: (e) => set({ theme:e }),
  setBody: (e) => set({ body:e }),
  setThemeColor: (color) => set((state) => ({ themeColor: color })),
  setChatBodyColor: (color) => set((state) => ({ chatBody: color })),
}));

export default ThemeStore;
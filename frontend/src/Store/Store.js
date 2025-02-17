import { create } from "zustand";

const userStore = create((set) => ({
  from: "",
  fromName: "",
  to: "",
  toName: "",
  verified:false,
  global:false,
  setGlobal:(e)=>set((state)=>({global:e})),
  setVerified:(e)=>set((state)=>({verified:e})),
  setFrom: (from) => set((state) => ({ from: from })),
  setFromName: (name) => set((state) => ({ fromName: name })),
  setTo: (to) => set((state) => ({ to: to })),
  setToName: (name) => set((state) => ({ toName: name })),
  //   inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default userStore;

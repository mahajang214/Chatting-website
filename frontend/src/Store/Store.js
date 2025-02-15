import { create } from "zustand";

const userStore = create((set) => ({
  from: "",
  fromName: "",
  to: "",
  toName: "",
  setFrom: (from) => set((state) => ({ from: from })),
  setFromName: (name) => set((state) => ({ fromName: name })),
  setTo: (to) => set((state) => ({ to: to })),
  setToName: (name) => set((state) => ({ toName: name })),
  //   inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default userStore;

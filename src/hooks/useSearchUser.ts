import { create } from 'zustand';


export const useSearchUser = create((set) => ({
  allUser: [],
  setAllUser: (allUser: []) => set({ allUser })
}))

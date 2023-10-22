import { create } from 'zustand';


const useSearchUser = create((set) => ({
  allUser: [],
  setAllUser: (allUser: []) => set({ allUser })
}))

const userSearchInput = create((set) => ({
  searchIp: '',
  setSearchIp: (searchIp: string) =>  set({ searchIp })
}))

export { useSearchUser, userSearchInput }

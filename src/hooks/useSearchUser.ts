import { create } from "zustand";

type SearchInput = {
  searchIp: string;
  setSearchIp: (searchIp: string) => void;
};

const useSearchUser = create((set) => ({
  allUser: [],
  setAllUser: (allUser: []) => set({ allUser }),
}));

const userSearchInput = create<SearchInput>((set) => ({
  searchIp: "",
  setSearchIp: (searchIp: string) => set({ searchIp }),
}));

export { useSearchUser, userSearchInput };

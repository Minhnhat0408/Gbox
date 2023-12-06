import { ProfilesType } from "@/types/supabaseTableType";
import { create } from "zustand";

type InvitePeople = {
    data: ProfilesType;
    selected: boolean;
}

type State = {
  isOpen: boolean;
  onClose: () => void;
   onOpen: () => void;
   loading: boolean;
    setLoading: (loading: boolean) => void;
  peopleList: InvitePeople[];
    setPeopleList: (peopleList: InvitePeople[]) => void;
    checkPeople: (index: number) => void;
    unCheckPeople: (index: number) => void;
};

export const useInviteFriendGroupChatModal = create<State>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  peopleList: [],
    checkPeople: (index) => {
      return set((state) => {
        const newPeopleList = [...state.peopleList];
        newPeopleList[index].selected = true;
        return { peopleList: newPeopleList };
      })
    },
    unCheckPeople: (index) => {
      return set((state) => {
        const newPeopleList = [...state.peopleList];
        newPeopleList[index].selected = false;
        return { peopleList: newPeopleList };
      })
    },
  setPeopleList: (peopleList) => set({ peopleList }),
    loading: false,
    setLoading: (loading) => set({ loading }),
}));

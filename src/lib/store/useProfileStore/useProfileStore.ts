import { UserProfileResponse } from "@/components/types/profile/profile";
import { create } from "zustand";

type ProfileState = {
  profile: UserProfileResponse | null;
  setProfile: (profile: UserProfileResponse) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));

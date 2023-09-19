import {create} from "zustand";
import {Accessory, AvatarProps, Eye, Face, Hair, Mouth, Outfit} from "@/lib/avatar/types";
import {ColorValue} from "react-native";

interface AvatarStore {
  avatar: AvatarProps,
  setAvatar: (avatar: AvatarProps) => void,
  setEyes: (eyes: Eye) => void,
  setFace: (face: Face) => void,
  setMouth: (mouth: Mouth) => void,
  setOutfit: (outfit: Outfit) => void,
  setColor: (color: ColorValue) => void,
  setAccessory: (accessory: Accessory) => void,
  setHair: (hair: Hair) => void,
}

const useAvatarStore = create<AvatarStore>((set) => ({
  avatar: {
    eye: "Angry",
    face: "Light",
    mouth: "Angry",
    outfit: "Outfit01",
    color: "#1d1d1d",
    accessory: "Cap",
    hair: "Hair01"
  },
  setAvatar: (avatar: AvatarProps) => set((state) => ({
    avatar: avatar
  })),
  setEyes: (eyes: Eye) => set((state) => ({
    avatar: {
      ...state.avatar,
      eye: eyes
    }
  })),
  setFace: (face: Face) => set((state) => ({
    avatar: {
      ...state.avatar,
      face: face
    }
  })),
  setMouth: (mouth: Mouth) => set((state) => ({
    avatar: {
      ...state.avatar,
      mouth: mouth
    }
  })),
  setOutfit: (outfit: Outfit) => set((state) => ({
    avatar: {
      ...state.avatar,
      outfit: outfit
    }
  })),
  setColor: (color: ColorValue) => set((state) => ({
    avatar: {
      ...state.avatar,
      color: color
    }
  })),
  setAccessory: (accessory: Accessory) => set((state) => ({
    avatar: {
      ...state.avatar,
      accessory: accessory
    }
  })),
  setHair: (hair: Hair) => set((state) => ({
    avatar: {
      ...state.avatar,
      hair: hair
    }
  })),
}))

export {
  AvatarStore,
  useAvatarStore,
}
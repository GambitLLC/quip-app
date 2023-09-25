import {ColorValue} from "react-native";
import {theme} from "@/util/Theme"
import {create} from "zustand";

interface Quip {
  name: string,
  description: string,
  color: ColorValue,
  imageSrc: string,
  bgColor: ColorValue,
}

const quips: Quip[] = [
  {
    name: "think",
    description: "Enjoy fun physics-based games from your favorite creators.",
    color: theme.colors.t1,
    imageSrc: "",
    bgColor: "#EEFDFF",
  },
  {
    name: "race",
    description: "Enjoy fun physics-based games from your favorite creators.",
    color: theme.colors.p2,
    imageSrc: "",
    bgColor: theme.colors.s6,
  },
  {
    name: "shoot",
    description: "Enjoy fun physics-based games from your favorite creators.",
    color: theme.colors.p1,
    imageSrc: "",
    bgColor: theme.colors.s5,
  },
]

const ValidQuipIDXs = [0, 1, 2] as const
type QuipIDX = typeof ValidQuipIDXs[number]

interface QuipStore {
  quipIdx: QuipIDX,
  setQuipIdx: (idx: QuipIDX) => void,
}

const useGameStore = create<QuipStore>((set) => ({
  quipIdx: 1,
  setQuipIdx: (idx: QuipIDX) => set((state) => ({
    quipIdx: idx
  }))
}))


export {
  quips,
  QuipStore,
  useGameStore,
  QuipIDX,
  ValidQuipIDXs
}

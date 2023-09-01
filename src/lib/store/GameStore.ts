import {ColorValue} from "react-native";
import {theme} from "@/util/Theme"

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


export {
  quips
}

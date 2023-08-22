import {StyleSheet} from "react-native";
import {theme} from "@/util/Theme"

const border = StyleSheet.create({
  quip: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.colors.s3,
  },
  debug: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
  }
})

export {
  border
}

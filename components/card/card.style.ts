import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  label: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 30,
    justifyContent: "space-between",
  },
  card: {
    width: width - 40,
    height: height / 3,
    borderRadius: 5,
  },
  history: {
    width: width - 40,
    height: height / 3,
    borderRadius: 5,
  },
  indicator: {
    flexDirection: "row",
  },
  circle: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF7235",
    marginRight: 5,
  },
});

export default styles;

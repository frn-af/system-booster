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
    padding: 20,
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
  currentTime: {
    flexGrow: 1,
    fontFamily: "Poppins",
    fontSize: 12,
    marginTop: 10,
  },
  cardLabel: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    marginTop: 10,
    color: "#FF7235",
  },
  cardUnit: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    color: "#FF7235",
  },
});

export default styles;

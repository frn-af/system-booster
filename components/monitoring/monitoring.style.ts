import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  timelabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  status: {
    fontFamily: "Poppins",
    fontSize: 14,
  },
  tapestatus: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 55,
    lineHeight: 60,
    paddingTop: 20,
  },
  sisteminfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  textlabel: {
    fontFamily: "Poppins",
    fontSize: 14,
    textTransform: "capitalize",
  },
  timeinfo: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
  },
});

export default styles;

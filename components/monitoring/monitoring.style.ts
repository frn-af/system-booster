import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
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
  button: {
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FF7235",
    marginTop: 20,
  },
  buttontext: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },
  input: {
    color: "#FF7235",
    fontSize: 20,
    width: 100,
    height: 50,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "PoppinsSemiBold",
    marginTop: 20,
  },
  historyTitle: {
    color: "#FF7235",
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    width: "80%",
    borderRadius: 10,
    height: 50,
    textAlign: "center",
    marginTop: 20,
  },
  modallabel: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;

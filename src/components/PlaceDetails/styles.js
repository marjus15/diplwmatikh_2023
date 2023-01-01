import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  chip: {
    margin: "5px 5px 5px 0",
  },
  ChargeName: {
    fontWeight: "400",
    fontFamily: "-apple-system",
    fontDisplay: "swap",
    textAlign: "center",
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedCard: {
    transition: "0.3s",
  },
  title: {
    align: "center",
    color: "red",
  },
}));

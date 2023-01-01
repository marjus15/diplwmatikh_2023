import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    background: "rgb(28, 27, 27)",
  },
  title: {
    cursor: "pointer",
    color: "white",
    "&:hover": {
      color: "aqua",
    },
    display: "inline",
    [theme.breakpoints.up("sm")]: {
      display: "inline",
    },
    marginLeft: "1%",
  },
}));

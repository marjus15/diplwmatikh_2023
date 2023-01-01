import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginBottom: "30px",
    display: "block",
  },
  cardBattery: {
    width: "50%",
    marginLeft: "1rem",
  },
  autocompleteBoxes: {
    marginTop: "1rem",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  intermedited: {
    marginTop: "1rem",

    marginBottom: "1rem",
  },
  dropdowns: {
    width: "80%",
    marginLeft: "10%",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: "2rem",
  },
  root: {
    width: "70%",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: "2rem",
  },
  inputDropdowns: {
    margintop: "2rem",
    marginBottom: "2rem",
    display: "block",
  },
  inputGroup: {
    marginBottom: "2rem",
  },
  label: {
    marginBottom: "0.8rem",
    fontWeight: "600",
  },
  buttonCalculate: {
    margintop: "10rem",
  },
  labelRange: {
    fontWeight: "600",
    marginBottom: "2.5rem",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "75vh",
    overflow: "auto",
  },
  logo: {
    width: "20%",
    marginLeft: "40%",
    marginBottom: "20px",
  },
  cards: {
    display: "flex",
  },
  card: {
    width: "50%",
    margin: "auto",
    transition: "0.3s",
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    // "&:hover": {
    //   boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    // },
  },
  MuiAvatar: {
    color: "#fafafa",
    backgroundColor: "#2a9d8f",
  },
  subheading: {
    lineHeight: 1.8,
  },
  filterCard: {
    marginLeft: "10%",
    width: "80%",
  },
  toggle: {
    fontFamily: `'Raleway', sans-serif`,
    fontSize: ".8rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    "&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)": {
      borderRadius: "10px",
    },
    "&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)": {
      borderRadius: "10px",
      border: "1px solid rgba(0, 0, 0, 0.12)",
    },
    "&.Mui-selected": {
      borderRadius: "10px",
      background: "#00ffff",
      color: "black",
    },
    "&.MuiToggleButton-root": {
      "&:hover": {
        background: "#00ffff",
        color: "black",
      },
    },
  },
}));

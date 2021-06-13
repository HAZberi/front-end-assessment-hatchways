import { createMuiTheme } from "@material-ui/core/styles";

const whitesmoke = "#f5f5f5";
const white = "#fff";
const black = "#000";
const grey = "#696969"
const theme = createMuiTheme({
  palette: {
    common: {
      whitesmoke: `${whitesmoke}`,
    },
    primary: {
      main: `${white}`,
    },
    secondary: {
      main: `${black}`,
    },
  },
  typography: {
    h3: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: `${grey}`,
    },
    expandButton: {
      color: `${black}`,
      border: "none",
      opacity: 0.7,
      "&:hover": {
        opacity: 1,
      },
    },
  },
});

export default theme;
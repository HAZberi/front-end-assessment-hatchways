import { createMuiTheme } from "@material-ui/core/styles";

const whitesmoke = "#f5f5f5";
const white = "#fff";
const black = "#000";
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
    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.5,
      color: `${black}`,
    },
    body1: {
      fontFamily: "Raleway",
      fontSize: "1rem",
      fontWeight: 300,
      color: `${black}`,
    },
  },
  overrides: {
    MuiInput: {
      root: {
        fontWeight: 400,
        paddingBottom: "0.5rem",
        fontSize: "1.25rem",
      },
    },
    MuiChip: {
      root: {
        "& .MuiChip-label": {
          padding: 0,
        },
      },
    },
  },
});

export default theme;

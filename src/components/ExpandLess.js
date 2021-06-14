import React from "react";
import { IconButton } from "@material-ui/core";
import { RemoveRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_) => ({
  iconButtonStyles: {
    opacity: 0.4,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
      opacity: 1,
    },
  },
  iconStyles: {
      fontSize: "3.5rem"
  }
}));

const ExpandLess = ({ handleClickEvent }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="expand more button"
      onClick={handleClickEvent}
      className={classes.iconButtonStyles}
      disableFocusRipple
      disableRipple
    >
      <RemoveRounded color="secondary" className={classes.iconStyles} />
    </IconButton>
  );
};

export default ExpandLess;

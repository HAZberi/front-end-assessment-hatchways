import React, { useState } from "react";
import {
  Typography,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TestList from "./TestList";
import ExpandMore from "./ExpandMore";
import ExpandLess from "./ExpandLess";
import calculateAverage from "../helpers/calculateAvg";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(15),
    width: theme.spacing(15),
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: `rgba(0, 0, 0, 0.25)`,
    margin: theme.spacing(2),
    marginRight: theme.spacing(5),
  },
  infoContainer: {
    marginLeft: "1rem",
    marginBottom: theme.spacing(2),
  },
}));

const StudentCard = ({ data }) => {
  const classes = useStyles();
  const { firstName, lastName, email, company, skill, pic, grades } = data;
  const gradeAverage = calculateAverage(grades);
  const [open, setOpen] = useState(false);
  const handleListItemExpansion = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={pic} alt="student-avatar" className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="h1">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</Typography>
          <Grid container direction="column" className={classes.infoContainer}>
            <Grid item>
              <Typography variant="body1">Email: {email}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Comapany: {company}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Skill: {skill}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Average: {gradeAverage}</Typography>
            </Grid>
            <Grid item>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <TestList grades={grades} />
              </Collapse>
            </Grid>
          </Grid>
        </ListItemText>
        {open ? (
          <ExpandLess handleClickEvent={handleListItemExpansion} />
        ) : (
          <ExpandMore handleClickEvent={handleListItemExpansion} />
        )}
      </ListItem>
      <Divider light />
    </>
  );
};

export default StudentCard;

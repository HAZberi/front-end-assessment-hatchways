import React from "react";
import {
  Typography,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import calculateAverage from "../helpers/calculateAvg";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(15),
    width: theme.spacing(15),
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: `rgba(0, 0, 0, 0.25)`,
    margin: theme.spacing(2),
    marginRight: theme.spacing(5)
  },
  infoContainer: {
      marginLeft: "1rem",
  }
}));

const StudentCard = ({ data }) => {
  const classes = useStyles();
  const { firstName, lastName, email, company, skill, pic, grades } = data;
  const gradeAverage = calculateAverage(grades);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={pic} alt="avatar" className={classes.avatar} />
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
          </Grid>
        </ListItemText>
      </ListItem>
      <Divider light />
    </>
  );
};

export default StudentCard;

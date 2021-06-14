import React from "react";
import { makeStyles } from "@material-ui/core";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  testList: {
    marginLeft: theme.spacing(26),
    marginBottom: theme.spacing(4),
  },
  testListItem: {
    margin: 0,
    padding: 0,
  },
  listItemText: {
    margin: 0,
    padding: 0,
  },
  textStyles1: {
    display: "inline",
  },
  textStyles2: {
    display: "inline",
    marginLeft: "1.5rem",
  },
}));

const TestList = ({ grades }) => {
  const classes = useStyles();
  return (
    <List component="div" disablePadding className={classes.testList}>
      {grades.map((grade, i) => (
        <ListItem key={i} className={classes.testListItem}>
          <ListItemText className={classes.listItemText}>
            <Typography
              variant="body1"
              className={classes.textStyles1}
            >{`Test ${i + 1}:`}</Typography>
            <Typography
              variant="body1"
              className={classes.textStyles2}
            >{`${grade}%`}</Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default TestList;

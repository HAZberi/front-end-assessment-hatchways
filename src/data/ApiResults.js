import React, { useState, useEffect } from "react";
import hatchwaysApi from "../api/hatchways";
import StudentCard from "../components/StudentCard";
import { Grid, Paper, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBackground: {
    backgroundColor: theme.palette.common.whitesmoke,
    width: "100%",
    height: "100%",
  },
  dataContainer: {
    marginBottom: "7vh",
    marginTop: "7vh",
    maxHeight: "86vh",
    width: "70%",
    overflowY: "scroll",
    borderRadius: "10px",
  },
}));

const ApiResults = () => {
  //To access Styles
  const classes = useStyles();
  //React States
  //We are not using Redux or Flux since state management is simple
  //and app's component architecture is relatively flat.
  const [students, setStudents] = useState([]);

  const getStudentData = async () => {
    try {
      const response = await hatchwaysApi.get("/assessment/students");
      setStudents(response.data.students);
      //console.log(response.data);
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <Grid container className={classes.appBackground}>
      <Grid item container direction="column" alignItems="center">
        <Paper
          variant="elevation"
          elevation={2}
          className={classes.dataContainer}
        >
          <List>
            {students.map((student) => (
              <StudentCard key={student.id} data={student} />
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ApiResults;

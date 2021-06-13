import React, { useState, useEffect } from "react";
import hatchwaysApi from "../api/hatchways";
import StudentCard from "../components/StudentCard";
import { Grid, Paper, List, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBackground: {
    backgroundColor: theme.palette.common.whitesmoke,
    width: "100%",
    height: "100vh",
  },
  dataContainer: {
    marginBottom: "7vh",
    marginTop: "7vh",
    maxHeight: "86vh",
    width: "70%",
    overflowY: "scroll",
    borderRadius: "10px",
  },
  inputField: {
    paddingLeft: "1rem",
    width: "96.5%",
    opacity: 0.6,
  },
}));

const ApiResults = () => {
  //To access Styles
  const classes = useStyles();
  //React States
  //We are not using Redux or Flux since state management is simple
  //and app's component architecture is relatively flat.
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState(students);

  const getStudentData = async () => {
    try {
      const response = await hatchwaysApi.get("/assessment/students");
      setStudents(response.data.students);
      setFilteredData(response.data.students);
    } catch (err) {
      //console.log(err);
    }
  };

  const searchByNameHandler = (e) => {
    const value = e.target.value;
    //console.log(value);
    //console.log(students);
    if (!value) {
      setFilteredData(students);
      return null;
    }
    const filterNamesByValue = (data = [], value = "") => {
      const filterDataByName = data.filter((student) => {
        if (
          student.firstName.toLowerCase().includes(value) ||
          student.lastName.toLowerCase().includes(value)
        )
          return true;
        return false;
      });
      return filterDataByName;
    };
    const getFilteredData = filterNamesByValue(students, value);
    console.log(getFilteredData);
    setFilteredData(getFilteredData);
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
          <TextField
            id="search-by-name"
            className={classes.inputField}
            placeholder="Search by name"
            margin="normal"
            color="secondary"
            onChange={searchByNameHandler}
            fullWidth
          />
          <List>
            {filteredData.map((student) => (
              <StudentCard key={student.id} data={student} />
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ApiResults;

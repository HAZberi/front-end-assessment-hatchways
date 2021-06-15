//React Imports
import React, { useState, useEffect, useCallback, useRef } from "react";

//Material-UI Imports
import { Grid, Paper, List, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Native Helpers and Components
import hatchwaysApi from "./api/hatchways";
import StudentCard from "./components/StudentCard";
import addTagsField from "./helpers/addTagsField";
import pushNewTag from "./helpers/pushNewTag";
import filterNamesByValue from "./helpers/filterNamesByValue";
import filterTagsByValue from "./helpers/filterTagsByValue";

//Style Definitions
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

//App Component Definition
const App = () => {
  //Access Styles
  const classes = useStyles();

  //Not using Redux or Flux since state management is simple
  //and app's component architecture is relatively flat.
  const [students, setStudents] = useState([]);
  const [filteredDataByName, setFilteredDataByName] = useState([]);
  const [filteredDataByTag, setFilteredDataByTag] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  //Tracking change in search values throughout the app
  const tagSearchValue = useRef("");
  const nameSearchValue = useRef("");

  //Getting and Transforming Api Data for the app with basic error handling
  const getStudentData = async (createTagsField) => {
    try {
      const response = await hatchwaysApi.get("/assessment/students");
      const transformedData = createTagsField(response.data.students);
      setStudents(transformedData);
      setFilteredData(transformedData);
    } catch (err) {
      console.error(`Please check your internet connection!! ${err}`);
    }
  };

  //Create New Tags when user submits a tag
  const addNewTag = (id, newTag) => {
    const updatedStudentData = pushNewTag(id, newTag, students);
    setStudents(updatedStudentData);
    setFilteredData(updatedStudentData);

    //A condition to make sure user can enter tags on filtered data by tag
    if (tagSearchValue.current !== "") {
      const getFilteredDatabyTags = filterTagsByValue(
        updatedStudentData,
        tagSearchValue.current
      );
      setFilteredDataByTag(getFilteredDatabyTags);
    }

    //A condition to make sure user can enter tags on filtered data by name
    if (nameSearchValue.current !== "") {
      const getFilteredDatabyNames = filterNamesByValue(
        updatedStudentData,
        nameSearchValue.current
      );
      setFilteredDataByName(getFilteredDatabyNames);
    }
  };

  //Combine the results of Name and Tag Filters
  const combineFilters = useCallback(() => {
    const combinedFilterResults = [...filteredDataByName, ...filteredDataByTag];

    //A Nested Condition to handle special test cases
    if (filteredDataByName.length === 0 || filteredDataByTag.length === 0) {
      if (tagSearchValue.current !== "" && nameSearchValue.current !== "") {
        setFilteredData([]);
        return;
      }
      setFilteredData(combinedFilterResults);
      return;
    }

    //A Recipe to find common objects in an array
    const studentIds = combinedFilterResults.map((student) => student.id);
    const filtered = combinedFilterResults.filter((student, index) =>
      studentIds.includes(student.id, index + 1)
    );

    setFilteredData(filtered);
  }, [filteredDataByName, filteredDataByTag]);

  //Search by name input handler definition
  const searchByNameHandler = (e) => {
    const value = e.target.value;

    //Tracking search value to control "combineFilter" calls by useEffect
    nameSearchValue.current = value;

    //A condition to handle when input gets empty
    if (!value) {
      setFilteredDataByName([]);
      return null;
    }

    //Filter data by input
    const getFilteredData = filterNamesByValue(students, value);
    setFilteredDataByName(getFilteredData);
  };

  //Search by tag input handler definition
  const searchByTagHandler = (e) => {
    const value = e.target.value;

    //Tracking search value to control "combineFilter" calls by useEffect
    tagSearchValue.current = value;

    //A condition to handle when input gets empty
    if (!value) {
      setFilteredDataByTag([]);
      return null;
    }

    //Filter data by input
    const getFilteredData = filterTagsByValue(students, value);
    setFilteredDataByTag(getFilteredData);
  };

  //To handle data filtering based on input
  useEffect(() => {
    if (tagSearchValue.current !== "" || nameSearchValue.current !== "") {
      combineFilters();
      return;
    }
    setFilteredData(students);
  }, [filteredDataByTag, filteredDataByName, combineFilters, students]);

  //To get the data from Hatchways API
  useEffect(() => {
    getStudentData(addTagsField);
  }, []);

  return (
    //App Component Structure
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
          <TextField
            id="search-by-tag"
            className={classes.inputField}
            placeholder="Search by tag"
            margin="normal"
            color="secondary"
            onChange={searchByTagHandler}
            fullWidth
          />
          <List>
            {filteredData.map((student) => (
              <StudentCard
                key={student.id}
                data={student}
                createNewTag={addNewTag}
              />
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default App;

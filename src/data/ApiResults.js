import React, { useState, useEffect, useCallback } from "react";
import hatchwaysApi from "../api/hatchways";
import StudentCard from "../components/StudentCard";
import addTagsField from "../helpers/addTagsField";
import pushNewTag from "../helpers/pushNewTag";
import filterNamesByValue from "../helpers/filterNamesByValue";
import filterTagsByValue from "../helpers/filterTagsByValue";
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
  //We are not using Redux or Flux since state management is simple
  //and app's component architecture is relatively flat.
  const [students, setStudents] = useState([]);
  const [filteredDataByName, setFilteredDataByName] = useState([]);
  const [filteredDataByTag, setFilteredDataByTag] = useState([]);
  const [filteredData, setFilteredData] = useState(students);

  const getStudentData = async (createTagsField) => {
    try {
      const response = await hatchwaysApi.get("/assessment/students");
      const transformedData = createTagsField(response.data.students);
      //console.log(transformedData);
      setStudents(transformedData);
      setFilteredData(transformedData);
    } catch (err) {
      console.error(`Please check your internet connection!! ${err}`);
    }
  };

  const addNewTag = (id, newTag) => {
    const updatedStudentData = pushNewTag(id, newTag, students);
    //console.log(updatedStudentData);
    setStudents(updatedStudentData);
    setFilteredData(updatedStudentData);
    console.log(filteredData);
  };

  const combineFilters = useCallback(() => {
      console.log(filteredDataByName);
      console.log(filteredDataByTag);
    const combinedFilterResults = [...filteredDataByName, ...filteredDataByTag];
    if (filteredDataByName.length === 0){
        setFilteredData(combinedFilterResults);
        return
    }
    if (filteredDataByTag.length === 0){
        setFilteredData(combinedFilterResults);
        return
    }
    const studentIds = combinedFilterResults.map((student) => student.id);
    const filtered = combinedFilterResults.filter(
      (student, index) => studentIds.includes(student.id, index + 1)
    );

    // Array.filter() removes all duplicate objects by checking if the previously mapped id-array
    // includes the current id ({id} destructs the object into only its id). To only filter out actual duplicates,
    // it is using Array.includes()'s second parameter fromIndex with index + 1 which will ignore the current object and all previous.
    // Since every iteration of the filter callback method will only search the array beginning at the
    // current index + 1, this also dramatically reduces the runtime because only objects not previously
    // filtered get checked.
    // This obviously also works for any other key that is not called id or even multiple or all keys.
    console.log(filtered);
    setFilteredData(filtered);
  },[filteredDataByName, filteredDataByTag]);

  const searchByNameHandler = (e) => {
    const value = e.target.value;
    //console.log(value);
    //console.log(students);
    if (!value) {
      setFilteredData(students);
      return null;
    }
    const getFilteredData = filterNamesByValue(students, value);
    console.log(getFilteredData);
    setFilteredDataByName(getFilteredData);
    //combineFilters();
  };

  const searchByTagHandler = (e) => {
    const value = e.target.value;
    if (!value) {
      setFilteredData(students);
      //console.log(filteredDataByTag);
      return null;
    }

    const getFilteredData = filterTagsByValue(students, value);
    console.log(getFilteredData);
    setFilteredDataByTag(getFilteredData);
    //console.log(filteredDataByTag);
    //combineFilters();
  };

  useEffect(()=>{
    combineFilters();
  },[filteredDataByTag, filteredDataByName, combineFilters])

  useEffect(() => {
    getStudentData(addTagsField);
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

export default ApiResults;

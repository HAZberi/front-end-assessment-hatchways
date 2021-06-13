import React from "react";
import { Typography } from "@material-ui/core";
import calculateAverage from "../helpers/calculateAvg";
import capitalize from "../helpers/capitalize";

const StudentCard = ({ data }) => {
  const { firstName, lastName, email, company, skill, pic, grades } = data;
  const gradeAverage = calculateAverage(grades);
  return (
    <div>
      <img src={pic} alt="avatar" />
      <Typography variant="h3">{`${capitalize(firstName)} ${capitalize(lastName)}`}</Typography>
      <div>
        <p>Email: {email}</p>
        <p>Comapany: {company}</p>
        <p>Skill: {skill}</p>
        <p>Average: {gradeAverage}</p>
      </div>
      <br />
    </div>
  );
};

export default StudentCard;

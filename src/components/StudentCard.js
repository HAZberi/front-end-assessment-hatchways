import React from "react";
import calculateAverage from "../helpers/calculateAvg";
import capitalize from "../helpers/capitalize";

const StudentCard = ({ data }) => {
  const { firstName, lastName, email, company, skill, pic, grades } = data;
  const gradeAverage = calculateAverage(grades);
  return (
    <div>
      <img src={pic} alt="avatar" />
      <h3>{`${capitalize(firstName)} ${capitalize(lastName)}`}</h3>
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

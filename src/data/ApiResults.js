import React, { useState, useEffect } from "react";
import hatchwaysApi from "../api/hatchways";
import StudentCard from "../components/StudentCard"

const ApiResults = () => {
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
    <div>
      {students.map((student) => (
          <StudentCard key={student.id} data={student} />
      ))}
    </div>
  );
};

export default ApiResults;

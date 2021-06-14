const pushNewTag = (id, newTag, data) => {
  const findStudent = data.find((student) => student.id === id);
  const findStudentIndex = data.findIndex((student) => student.id === id);
  findStudent.tags.push(newTag);
  data[findStudentIndex] = findStudent;
  return data;
};

export default pushNewTag;

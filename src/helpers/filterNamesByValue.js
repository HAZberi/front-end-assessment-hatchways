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

export default filterNamesByValue;

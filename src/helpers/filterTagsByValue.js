const filterTagsByValue = (data = [], value = "") => {
  const filterDataByTag = data
    .filter((student) => student.tags.length !== 0)
    .map((studentWithTags) => {
      const filteredTagArr = studentWithTags.tags.filter((tag) =>
        tag.toLowerCase().includes(value)
      );
      if (filteredTagArr.length !== 0) return studentWithTags;
      return null;
    })
    .filter((student) => student !== null);
  return filterDataByTag;
};

export default filterTagsByValue;

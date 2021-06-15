const addTagsField = (data) => {
  const dataWithTags = data.map((item) => {
    item.tags = [];
    return item;
  });
  return dataWithTags;
};

export default addTagsField;

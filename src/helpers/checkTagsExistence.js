const checkTagsExistence = (data) => {
    return data.some(student => student.tags.length !== 0)
}
//returns "true" if tags exist  in the data



export default checkTagsExistence;
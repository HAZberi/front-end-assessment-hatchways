//Used for Task1 only
const capitalize = (str) => {
  const lowerCase = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lowerCase.slice(1);
};
export default capitalize;

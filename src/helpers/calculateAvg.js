const calculateAverage = (array) => {
  //Transforming array to make sure we are working with NUMBERS
  const transformArray = array.map((el) => +el);
  //Use JS native reduce function to calculate average on transformed array
  const arrAvg =
    transformArray.reduce((a, b) => a + b, 0) / transformArray.length;
  return arrAvg;
};

export default calculateAverage;

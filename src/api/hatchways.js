import axios from "axios";

//Create Base Api Url
export default axios.create({
  baseURL: "https://www.hatchways.io/api",
});

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"; 

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: `${API_URL}`
  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {throw err;};

const uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};
 
export default {uploadImage,};
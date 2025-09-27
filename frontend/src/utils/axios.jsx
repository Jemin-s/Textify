import axios from "axios";

const instance = axios.create({
  baseURL: "https://textify-backend-latest.onrender.com",
});

export default instance;


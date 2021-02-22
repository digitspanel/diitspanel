import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://digitspanel.herokuapp.com"
});

export default instance;
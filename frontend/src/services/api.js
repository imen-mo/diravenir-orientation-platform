import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8084/api",
});

export default API;

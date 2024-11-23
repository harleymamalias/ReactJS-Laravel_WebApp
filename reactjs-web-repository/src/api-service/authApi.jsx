import axios from 'axios';

const BASE_API_URL = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

BASE_API_URL.interceptors.request.use((req)=> {
    const authToken = localStorage.getItem('token');
    if(authToken) {
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
});

export const registerUser = (userData) => BASE_API_URL.post("/register", userData);
export const loginUser = (userData) => BASE_API_URL.post("/login", userData);
export const logoutUser = () => BASE_API_URL.post("/logout");

export default BASE_API_URL;
import axios from "axios";  

const authApiInstance = axios.create({
    baseURL: "http://localhost:5000/api/auth",  // Replace with your backend URL
    withCredentials: true,
}); 

export async function registerUser({email , contact, password, fullname}) {

    const response = await authApiInstance.post("/register", {
        email,
        contact,
        password,
        fullname,
        isSeller
    });     
    return response.data;
}
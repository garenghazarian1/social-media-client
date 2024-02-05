import React, { createContext, useState, useContext,  useEffect } from 'react';
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import {baseUrl} from "../config/api"

 export const AuthContext = createContext();
 export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({username: "",_id: ""}); // Added user state
    //console.log("🚀 ~ AuthContextProvider ~ user:", user)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    

//SAVE USERNAME IN LOCAL STORAGE *************************
    useEffect(() => {
        const storedUserData = localStorage.getItem("user"); // Get the user data from localStorage
        const userData = storedUserData ? JSON.parse(storedUserData) : null; // Safely parse the stored user data
    
        if (userData && userData._id) {
            setUser(userData);
        } else {
            setUser(""); // This line is implied, as setUser isn't called if userData is invalid.
        }
    }, []);

    // FUNCTION TO REGISTER A USER *******************
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        const body = {
            name,
            username,
            password
        };
            //console.log("body", body)
         try {
             const response = await axios.post(`${baseUrl}/auth/register`, body);
             //console.log("🚀 ~ handleSubmit ~ response:", response.data);
             if (response.data.success)
             navigate("/login"); 
         } catch (error) {
             console.error("Error in registration:", error);
         }
    };
// FUNCTION TO LOGIN A USER *******************
    const handleLoginSubmit = async(event) => {
        event.preventDefault();
        const body = {
            username,
            password,
        };

       const response = await axios.post(`${baseUrl}/auth/login`,{username, password})
       //console.log("🚀 ~ handleSubmit ~ response:", response)
       if (response.data.success)
       setUser(response.data.user)
    //console.log("response", response.data)
       localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/");
    };
    
// FUNCTION TO LOGOUT A USER *******************
    const handleLogout = () => {
        
        setUser(null); // Reset user state
        localStorage.removeItem("user"); // Clear user data from localStorage
        navigate("/"); // Navigate to the home page
    };

    return (
        <AuthContext.Provider value={{user, setUser, username, setUsername, password, setPassword, navigate, handleRegisterSubmit, handleLoginSubmit, name, setName, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;



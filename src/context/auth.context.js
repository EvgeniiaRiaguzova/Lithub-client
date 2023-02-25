import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API_URL =/*process.env.REACT_APP_API_URL || */ "http://localhost:5005";
 
const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const storeToken = (token) => { 
    localStorage.setItem('authToken', token );
  }
 
  const authenticateUser = () => {           //  <==  ADD  
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${API_URL}/api/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that JWT token is valid  
        const user = response.data;
       // Update state variables        
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);  
            
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }
 
  const removeToken = () => {                    
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }
 
 
  const logOutUser = () => {                      
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
    navigate("/")
  }  
  
const value ={ isLoggedIn, isLoading, user,
  storeToken, authenticateUser, logOutUser, setUser ,removeToken }
  
  useEffect(() => {                                                  
    authenticateUser();
  }, []);
console.log(user)
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper , AuthContext };
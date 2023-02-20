import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
 
function IsAuthor ({ children } ) {
  
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
 
  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;
 
  if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  } else {
    // If the user is author, allow to see the page 
  
     return user.status === "Author" && children
  }
}
 
export default IsAuthor;
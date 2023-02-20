import React from "react";
import { useContext} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";


function UserProfilePage(props) {
    const navigate = useNavigate()
    const storedToken = localStorage.getItem('authToken');
    const {user, logOutUser} = useContext(AuthContext);
    console.log("the authenticater" , user)
    const deleteUser = () => {                    
        // Make a DELETE request to delete user
        axios
          .delete(`${API_URL}/api/users/delete`, { headers: { Authorization: `Bearer ${storedToken}`} }) 
          .then(() => {
            // Once the delete request is resolved successfully
            // navigate back to the SignUpPage.
        
            logOutUser()
              navigate("/signup");
          })
          .catch((err) => console.log(err));
      };  

  return (
<div>
       {user && 
        <div className="UserProfilePage">

      <h1>Welcome, {user.username}</h1> {/*is this right or I should do {authenticateUser.username} ?*/}
      <img className="UserProfileImg" alt="User profile"
             src={user.profileImage}/>
      <p>Status: {user.status}</p>
      <p>About you: {user.bio}</p>
      <br></br>
      <Link to="/users/edit"> {/*not sure about endpoint*/}
             <button>Edit your profile</button></Link>
      
      <button onClick={deleteUser}>Delete your profile</button>
      
      <br></br>
      <h5>Your books:</h5>
      <br></br>


       <br></br>
       <button>Add new book</button>


       
     
    </div>
    }
</div>
 
    
  )
}
 
export default UserProfilePage;
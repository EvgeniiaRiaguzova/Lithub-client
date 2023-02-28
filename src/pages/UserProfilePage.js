import React from "react";
import { useContext, useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
const API_URL = /*process.env.REACT_APP_API_URL || */ "http://localhost:5005";


function UserProfilePage(props) {
    const navigate = useNavigate()
    const storedToken = localStorage.getItem('authToken');
    const [theUserProfile , setTheUserProfile] = useState("")
    const {user, logOutUser} = useContext(AuthContext);
  

   {/*  const theUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${storedToken}`}})
       // console.log("the response.data from", response.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      theUser()
    }, [])
*/}
    console.log("the user profile", theUserProfile)
   
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
      
      //desplay UserBookList

        const [books, setBooks] = useState([]);

        const getUserBookList = () => {
        const storedToken = localStorage.getItem('authToken')
        
            axios
            .get(`${API_URL}/api/books`, { headers: { Authorization: `Bearer ${storedToken}`}})
            .then((response) => {response.data.map((book) => {
              return (
              book.author === user.username && setBooks(response.data))})
            })
        }
        
        useEffect(() => {
            getUserBookList()
        }, [books] );
   

  return (
<div>
       {user && 
        <div className="UserProfilePage">
             <img className="UserProfileImg" alt="User profile"
                  src={user.profileImage}/>
        <div className="UserInfo">
            <h1> <strong>Welcome, {user.username} </strong>!</h1> 
            <p> <strong>Status:</strong> {user.status}</p>
            <p><strong>About you:</strong> {user.bio}</p>
            <br></br>
            <div className="UserButtons">
            <Link to="/users/edit"> 
            <button className="PageButton">Edit your profile</button></Link>
            <button className="PageButton" onClick={deleteUser}>Delete your profile</button>
            </div>
            <br></br>
        </div>
      { user.status === "Author"
   && <div className="UserInfo">
      <h4 id="urBooks">Your books:</h4>
    
     {user.books?.map((book)=>{
        return (
          <ul>
            <li key={book._id}><Link className="BookLink" to={`/bookpage/${book._id}`}>{book.title}</Link></li>
            
          </ul>
        )
      })}
      <br></br>
       <Link to="/addbooks"><button className="PageButton">Add new Book</button></Link>

       </div>
}

       
     
    </div>
    }
</div>
 
    
  )
}
 
export default UserProfilePage;
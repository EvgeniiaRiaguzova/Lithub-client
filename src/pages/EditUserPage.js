import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { useContext } from "react";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"; 

function EditUserPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user, setUser} = useContext(AuthContext);
  console.log("the authenticater" , user)

  const navigate = useNavigate();

   useEffect(() => {  
    axios.get(`${API_URL}/api/users/edit`)
      .then((response) => {
        
        const foundUser = response.data;
        setUsername(foundUser.username);
        setEmail(foundUser.email);
        setPassword(foundUser.password);
        setBio(foundUser.bio);
        setPassword(foundUser.password);
        setProfileImage(foundUser.profileImage);
        setStatus(foundUser.status);

        navigate('/profilePage');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
      //eslint-disable-next-line  
    }, [user._id]);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const storedToken = localStorage.getItem('authToken');
      if(profileImage === "" ){
       setProfileImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png")
      }
      const requestBody = {username, email, password, bio, 
                           profileImage , status};
            console.log(requestBody)
             // Make a PUT request to update the user
    axios
    .put(`${API_URL}/api/users/edit`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => { 
      // Once the request is resolved successfully and the user
      // is updated we navigate back to the UserProfilePage
      console.log(' put response data', response.data)
      setUser(response.data)
      navigate(`/profilePage`) 
    }
    );
      }
  return (
<div className="EditUserPage">
      <h1>Edit your profile</h1>
 
      <form onSubmit={handleFormSubmit}>
      <label>Username:</label>
        <input 
          type="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
 
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
        <label>About me:</label>
        <input 
          type="textarea"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          cols="30" 
          rows="3"
        />
         <label>Your profile image:</label>
       <input 
          type="text" //type="file" ??
          name="profileImage"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        /> 

         <label>Your status:</label>
         <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
         <option value=" " ></option>
         <option value="Reader">Reader</option>
         <option value="Author">Author</option>
         </select>
         
        <button type="submit">Edit</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
    </div>
  )
}
   
  export default EditUserPage;
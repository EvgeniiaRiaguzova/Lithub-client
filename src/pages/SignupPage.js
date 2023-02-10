import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 
const API_URL = "http://localhost:5005";
 
 
function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState("");
  const [books, setBooks] = useState([{}]);
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleBio = (e) => setBio(e.target.value);
  const handleProfileImage = (e) => setProfileImage(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  //const handleBooks = (e) => setBooks(e.target.value);
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password, bio, profileImage, status, books };
 
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
 
  
  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
 
      <form onSubmit={handleSignupSubmit}>
      <label>Username:</label>
        <input 
          type="username"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 
        <label>About me:</label>
        <input 
          type="textarea"
          name="bio"
          value={bio}
          onChange={handleBio}
          cols="30" 
          rows="3"
        />
         <label>Your profile image:</label>
        <input 
          type="text" //type="file" ??
          name="profileImage"
          value={profileImage}
          onChange={handleProfileImage}
        />

         <label>Your status:</label>
         <select name="status" value={status} onChange={handleStatus}>
         <option value="reader">Reader</option>
         <option value="author">Author</option>
         </select>
         
        <button type="submit">Sign Up</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}
 
export default SignupPage;
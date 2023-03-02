import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../api/service";
import { FileUpload } from "../components/FileUpload";
 
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
 
 
function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState("");
  
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleBio = (e) => setBio(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  
  
{/********* this method handles the file upload ********
const handleFileUpload = (e) => {
  const uploadData = new FormData();
  uploadData.append("ProfileImage", e.target.files[0]);

  service
    .uploadImage(uploadData)
    .then(response => {
      setProfileImage(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
};
*/} 

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    if(profileImage === "" ){
     setProfileImage("./assets/default-user-pic.png")
    }
    const requestBody = {username, email, password, bio, profileImage, status };
 
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/api/auth/signup`, requestBody)
      .then((response) => {
        console.log(response)
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

      <div className="FormBlock">
      <label>Username:</label>
        <input 
          type="username"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        </div>

        <div className="FormBlock">
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
         </div>

         <div className="FormBlock">
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
         </div>

         <div className="FormBlock">
        <label>About me:</label>
        <input 
          type="textarea"
          name="bio"
          value={bio}
          onChange={handleBio}
          cols="30" 
          rows="3"
        />
         </div>

         <div className="FormBlock">
           <label>Your profile image:</label>
           <FileUpload setProfileImage={setProfileImage} />
         </div>

         <div className="FormBlock">
           <label>Your status:</label>
           <select name="status" value={status} onChange={handleStatus}>
            <option value=" " ></option>
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
           </select>
         </div>

         <button className="PageButton" type="submit">Sign Up</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 <br></br>
         <div id="HaveAccount">
           <p>Already have account?</p>
           <Link to={"/login"}>Login</Link>
         </div>
    </div>
  )
}
 

export default SignupPage;
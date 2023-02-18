import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../context/auth.context"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"; 

 
function NewBook() {
    const { book, setUser, removeToken, storeToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [gerne, setGerne] = useState("");
    const handleFileUpload = (e) => {
    const uploadData = new FormData();

        uploadData.append("image", e.target.files[0]);
        axios.post(`${API_URL}/api/upload`, uploadData)
          .then(response => {
            setImage(response.data.image);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };
    
    const handleSubmit =  (e) => {
        e.preventDefault();
    
        const storedToken = localStorage.getItem('authToken');
        const addBook = {
            title,  description, image, author, gerne
        }

        axios
        .post(`${API_URL}/api/books`, addBook, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then( async (response) => {
          const authToken = response.data.authToken;
          const updatedUser = response.data.updatedUser;
          await removeToken()
          await storeToken(authToken)
          await setUser(updatedUser)
          setTitle(''); setImage(''); setDescription(''); setAuthor(''); setGerne(''); 
          navigate("/books");
        });
    };

    return (  
    <div>
        <div>
          <h2>Add your Books details</h2>
        <form onSubmit={handleSubmit}>

                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} name="title" placeholder='Title'/>
                <br/>
                <textarea type="text" value={description} onChange={(e)=> setDescription(e.target.value)} name="description" placeholder='Description'></textarea>
                <br/>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} name="author" placeholder='Author'/>
                <br/>
                <input type="text" value={gerne} onChange={(e) => setGerne(e.target.value)} name="gerne" placeholder='Gerne'/>
                <br/>
                
                {book && book.image && <img src={book.image} alt={"book_image"} style={{width: '300px', height: '300px'}} />}
                <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => handleFileUpload(e)} name="image" placeholder='Image'/>
                </form>
                <br/>
          <div>
             <button type="submit">Add New Book</button>
          </div>
            </form>
        </div>    
    </div>
  )
  }


export default NewBook;
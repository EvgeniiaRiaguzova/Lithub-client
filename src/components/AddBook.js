import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"; 

 
function NewBook() {
  const { book, setUser, removeToken, storeToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [bookImage, setBookImage] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [content, setContent] = useState("");
  /*
with useState("") => you're telling that the value of "gerne" it's a empty string
setGerne it's a function that you use to change the state of gerne



  */


    /*
1º axios.post(`${API_URL}/api/upload` it's not created on the backend - inside of index route in server
2º check on the Mongo Atlas if the Author is the ID of the user


    */
    const handleFileUpload = (e) => {
    const uploadData = new FormData();

        uploadData.append("image", e.target.files[0]);
        axios.post(`${API_URL}/api/upload`, uploadData)
          .then(response => {
            setBookImage(response.data.image);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };
    
    const handleSubmit =  (e) => {
        e.preventDefault();
    
    
        const storedToken = localStorage.getItem('authToken');
        const addBook = {
            title, description, genre, bookImage, content
        }

        axios
        .post(`${API_URL}/api/books`, addBook, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then( async (response) => {
          const authToken = response.data/*.authToken;*/
          const updatedUser = response.data.user
          
       
          await setUser(updatedUser)
          
          setTitle(''); 
          setBookImage(''); 
          setDescription(''); 
          setAuthor(''); 
          setGenre(''); 
          setDescription('');
          setContent('');
          navigate("/profilePage");
        });
    };

    return (  
        <div className='AddBookPage'>
          <h1>Add your book details</h1>
          <form className='AddBookForm' onSubmit={handleSubmit}>
           <div className="FormBlock">   
              <label>Title:</label>
                <input type="text" value={title} name="title" 
                onChange={(e)=> setTitle(e.target.value)}/>
           </div>

           <div className="FormBlock">
                <label>Genre:</label>
                <input type="text" value={genre} name="genre"
                onChange={(e) => setGenre(e.target.value)} />
           </div>

           <div className="FormBlock">
                <label className='TextareaLabel'>Short <br></br> description:</label>
                <textarea type="text" value={description} 
                  onChange={(e)=> setDescription(e.target.value)}
                  name="description"></textarea>
           </div>

                {/*{book && book.image && <img src={book.image} alt={"book_image"} style={{width: '300px', height: '300px'}} />}
                <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => handleFileUpload(e)} name="bookImage" placeholder='Image'/>
                </form>
                <br/>
                */}
             
           <div className="FormBlock">
                <label>Content:</label>
                <textarea type="text" value={content} name="content"
                onChange={(e)=> setContent(e.target.value)}/>
           </div>
                
           <button className="PageButton" type="submit">
                   Add New Book</button>
                
            </form>
        </div>    
  )
  }


export default NewBook;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/auth.context"
import {useContext} from 'react';
import { Link } from 'react-router-dom';
 

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"; 
 
function EditBook(props) {
    const { book, removeToken, storeToken, setUser} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [content, setContent] = useState("");
    const handleFileUpload = (e) => {
    const uploadData = new FormData();

        uploadData.append("image", e.target.files[0]);
     
        axios.post(`${API_URL}/upload`, uploadData)
          .then(response => {
            setImage(response.data.image);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };


  const { bookId } = useParams();  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem('authToken');
    const updatedBook = {title, image, description, genre, author, content}

    axios.put(`${API_URL}/api/books/${bookId}`, updatedBook,{ headers: { Authorization: `Bearer ${storedToken}`}} )
        .then(async (response) => {
          const authToken = response.data.authToken;
          const updatedUser = response.data.updatedUser;
          await removeToken()
          await storeToken(authToken)
          await setUser(updatedUser)
        navigate(`/books/`)
      })
        .catch(err => console.log(err))
  }

  const deleteBook = () => {   
    const storedToken = localStorage.getItem('authToken');                 
    axios
      .delete(`${API_URL}/api/books/${bookId}`,{ headers: { Authorization: `Bearer ${storedToken}`}})
      .then(async (response) => {
        const authToken = response.data.authToken;
        const updatedUser = response.data.updatedUser;
        await removeToken()
        await storeToken(authToken)
        await setUser(updatedUser)
      navigate(`/books/`)
    })
      .catch((err) => console.log(err));
  };  

   useEffect(() => {  
    const storedToken = localStorage.getItem('authToken');

     axios
       .get(`${API_URL}/api/books/${bookId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
       .then((response) => {

         const oneBook = response.data;
         setTitle(oneBook.title);
         setImage(oneBook.image);
         setDescription(oneBook.description);
         setAuthor(oneBook.author);
         setGenre(oneBook.genre);
         setContent(oneBook.content);
       })
       .catch((error) => console.log(error));
     
   }, [bookId]);
  
  return (
    <div>
      <h3>Edit the Book</h3>
      <form onSubmit={handleSubmit}>

                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} name="title" placeholder='Title'/>
                <br/>
                <textarea type="text" value={description} onChange={(e)=> setDescription(e.target.value)} name="description" placeholder='Description'></textarea>
                <br/>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} name="author" placeholder='Author'/>
                <br/>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} name="genre" placeholder='Genre'/>
                <br/>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} name="content" placeholder='Content'/>
                <br/>
                
               

                {book && book.image && <img src={book.image} alt={"book_image"} style={{width: '300', height: '300px'}} />}
                <input type="file" onChange={(e) => handleFileUpload(e)} name="image" placeholder='Image'/>
                <br/>
              <div>
                { image !== "" && <input type="submit" value="Submit" />}
              </div>
              <br/>
              <Link to="/books"><button >Back to books</button></Link>
              </form>
              <br/>
              <p>Or</p>
              <button onClick={deleteBook}>Delete Book</button>
        </div>
  );
}
 
export default EditBook;                                                            
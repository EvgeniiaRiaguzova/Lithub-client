import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"; 
 
const imgURL = "https://cdn.vectorstock.com/i/preview-1x/59/63/realistic-open-book-literary-work-vector-21925963.jpg";

function BookPage() {
const [book, setBook] = useState({});

const {bookId}=useParams()

const [comment, setComment] = useState('')
const [isLoading , setIsLoading] = useState(true)

const getOneBook = () => {
    const storedToken = localStorage.getItem('authToken')

    axios
    .get(`${API_URL}/api/books/${bookId}`, { headers: { Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
    setBook(response.data);
    setIsLoading(false)
    })
}
const handleSubmit = (e) => {
    e.preventDefault()
    const storedToken = localStorage.getItem('authToken');
    
    axios
    .post(`${API_URL}/api/comments/comments/${bookId}`, {comment}, { headers: { Authorization: `Bearer ${storedToken}`}})
    .then(() => {
        getOneBook()
        setComment('')
    })
}
    useEffect(() => {
        getOneBook();
      // eslint-disable-next-line  
    }, [] );

    if(isLoading){
        return <p>Loading</p>
    }

return (
    <div className='AddBookPage'>
    <div>
    <h4>Title: {book.title}</h4>
    <img src={imgURL}  alt="book" style={{ width: '200',  height: '300px'}}/>
    <br/>
        <ul className="FormBlock">
            <li>Description: {book.description}</li>
            <li>Author: {book.author.username}</li>

            <li>Gerne: {book.gerne}</li>
            <li>Content: {book.content}</li>

        
         
{/*<li>Author: {book.author? ((author)=>{
        return (
          <div>
          <h4 key={user._id}>{user.username}</h4>
          </div>
        )
      })} </li>
        */}
           

        </ul>                    
        <div>
        <div>        
        <br/>
        <Link to="/books"><button className="PageButton">Back to books list</button></Link>
        {book &&  (<Link to={`/books/edit/${book._id}`}><button className="PageButton">Edit BOOK</button></Link>)}
        </div> 
        </div>
        <form onSubmit={handleSubmit}>
        <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} name="comment" placeholder='Comment'></textarea>
        <span className="name">{book.name}</span>
        <button className="PageButton" type="submit">Create comment</button>
        </form>
        <div>
        

        <div>
 {book.comments && book.comments.map(comment => {

            return (
            <div  key ={comment._id} > {comment.author.username}  : {comment.comment}</div>
            
        )
    })
    }   
        </div>
        </div>                    
    </div>
    </div>          
)
}

export default BookPage;
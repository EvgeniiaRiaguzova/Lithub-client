import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005"; 
 


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
    const storedToken = localStorage.getItem('authToken')
    axios
    .post(`${API_URL}/comments`, {comment, book: bookId}, { headers: { Authorization: `Bearer ${storedToken}`}})
    .then(() => {
        getOneBook()
        setComment('')
    })
}
    useEffect(() => {
        getOneBook();
    }, [] );

    if(isLoading){
        return <p>Loading</p>
    }

return (
    <div>
    <div>
    <h4>Title: {book.title}</h4>
    <img src={book.image}  alt="book" style={{ width: '300',  height: '300px'}}/>
    <br/>
        <ul>
            <li>Description: {book.description}</li>
            <li>Author: {book.author}</li>
            <li>Gerne: {book.gerne}</li>
            <li>Contence: {book.contence}</li>
        </ul>                    
        <div>
        <div>        
        <br/>
        <Link to="/books"><button>Back to books list</button></Link>
        {book &&  (<Link to={`/books/edit/${book._id}`}><button>Edit BOOK</button></Link>)}
        </div> 
        </div>
        <form onSubmit={handleSubmit}>
        <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} name="comment" placeholder='Comment'></textarea>
        <button type="submit">Create comment</button>
        </form>
        <div>
        <div>
        {book.comments && book.comments.map(comment => {
            return (
                <div>{comment.user.username} - {comment.comment}</div>
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
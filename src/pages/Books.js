
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddBook from "../components/AddBook";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
 

function Books() {
const [books, setBooks] = useState([]);
const getBookList = () => {
const storedToken = localStorage.getItem('authToken')

    axios
    .get(`${API_URL}/api/books`, { headers: { Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
    setBooks(response.data);
    })
}

useEffect(() => {
    getBookList();
}, [] );


return (
    <div>  
        <div> <AddBook />
        {books.map((book) => {
            return(
                    <div key={book._id}>
                    <div style={{maxWidth: '540px'}}>
                        <div>
                            <div>
                            <img src={book.image} alt="book"   style={{ width: '200px', height: '200px'}}/>
        
                            </div>
                            <div>
                            <div>
                                <h5>
                                <Link to={`/bookpage/${book._id}`}>Go to read the book<br/>{book.title}</Link></h5>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
  )                            
}

export default Books;
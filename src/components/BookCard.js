import { Link } from "react-router-dom";

function BookCard ( {  title, description, _id, author, genre, content } ) {
  
  return (
    <div className="BookCard card">
      <Link to={`/api/books/${_id}`}>
        <h3>{title}</h3>
        <h3>{author}</h3>
        <h3>{genre}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <p>{content} </p>
    </div>
  );
}
 
export default BookCard;
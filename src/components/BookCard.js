import { Link } from "react-router-dom";

function BookCard ( {  title, description, _id, author, gerne, contense } ) {
  
  return (
    <div className="BookCard card">
      <Link to={`/api/books/${_id}`}>
        <h3>{title}</h3>
        <h3>{author}</h3>
        <h3>{gerne}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <p>{contense} </p>
    </div>
  );
}
 
export default BookCard;
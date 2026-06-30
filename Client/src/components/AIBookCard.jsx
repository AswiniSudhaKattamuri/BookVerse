import { useNavigate } from "react-router-dom";
import "./AIBookCard.css";

function AIBookCard({ book }) {

  const navigate = useNavigate();

  return (

    <div className="ai-book-card">

      <img
        src={book.image}
        alt={book.title}
      />

      <div className="ai-book-info">

        <h4>{book.title}</h4>

        <p>{book.author}</p>

        <h3>₹{book.price}</h3>

        <button
          onClick={() =>
            navigate(`/book/${book._id}`)
          }
        >
          View Book
        </button>

      </div>

    </div>

  );

}

export default AIBookCard;
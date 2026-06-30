import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookCard from "../components/BookCard";
import Sidebar from "../components/Sidebar";
import "./Home.css";

import { useBooks } from "../viewmodels/useBooks";
import { useAIBooks } from "../context/AIBookContext";

function Home() {

  const {
    books,
    filters,
    setFilters,
  } = useBooks();

  const {
    aiBooks,
    setAiBooks,
  } = useAIBooks();

  const remainingBooks = books.filter(
    (book) =>
      !aiBooks.some(
        (aiBook) => aiBook._id === book._id
      )
  );

  return (
    <div>

      <Navbar />

      <Hero />

      <div className="content-layout">

        <Sidebar
          filters={filters}
          setFilters={setFilters}
        />

        <div className="books-container">

          {aiBooks.length > 0 && (

            <>
              <div className="ai-header">

                <div>

                  <h2>🤖 Recommended For You</h2>

                  <p>
                    Based on your conversation with
                    BookVerse AI.
                  </p>

                </div>

                <button
                  className="clear-filter-btn"
                  onClick={() => setAiBooks([])}
                >
                  ✨ Clear Recommendations
                </button>

              </div>

              <div className="books-grid">

                {aiBooks.map((book) => (

                  <BookCard
                    key={book._id}
                    book={book}
                  />

                ))}

              </div>

            </>

          )}

         {remainingBooks.length > 0 && (

  <div className="explore-section">

    {aiBooks.length > 0 && (
      <div className="section-divider">
        Continue Browsing
      </div>
    )}

    <div className="explore-header">

      <h2 className="section-title">

        {aiBooks.length > 0
          ? "📚 Explore More Books"
          : "🔥 Trending Books"}

      </h2>

      {aiBooks.length > 0 && (
        <p>
          Continue exploring our complete collection.
        </p>
      )}

    </div>

    <div className="books-grid">

      {remainingBooks.map((book) => (

        <BookCard
          key={book._id}
          book={book}
        />

      ))}

    </div>

  </div>

)}

        </div>

      </div>

    </div>
  );
}

export default Home;
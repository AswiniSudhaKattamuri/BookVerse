import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookCard from "../components/BookCard";
import "./Home.css";
import { useBooks } from "../viewmodels/useBooks";
import Sidebar from "../components/Sidebar";
function Home() {
  const { books } = useBooks();
  console.log(books); 

  return (
    <div>
      <Navbar />
      <Hero />
<div className="content-layout">
  <Sidebar />

  <div className="books-container">
    <h2 className="section-title">🔥 Trending Books</h2>

    <div className="books-grid">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  </div>
</div>
    </div>
  );
}

export default Home;
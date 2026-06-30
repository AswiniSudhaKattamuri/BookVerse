import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookCard from "../components/BookCard";
import "./Home.css";
import { useBooks } from "../viewmodels/useBooks";
import Sidebar from "../components/Sidebar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
function Home() {
  const {
  books,
  filters,
  setFilters,
} = useBooks();
  console.log(books); 

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
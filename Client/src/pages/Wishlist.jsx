import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import WishlistSidebar from "../components/WishlistSidebar";
import { getWishlist } from "../services/wishlistService";
import "./Wishlist.css";

function Wishlist() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      setBooks(data.wishlist?.books || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-layout">
        {/* Left Sidebar */}
        <WishlistSidebar />

        {/* Right Content */}
        <div className="wishlist-content">
          <h2 className="wishlist-heading">
            ❤️ My Wishlist ({books.length})
          </h2>

          {books.length === 0 ? (
            <div className="empty-wishlist">
              <h3>Your wishlist is empty.</h3>
              <p>Add your favorite books to see them here.</p>
            </div>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  isWishlistPage={true}
                  onRemove={() => {
                    setBooks((prev) =>
                      prev.filter((b) => b._id !== book._id)
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
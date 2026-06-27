import { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";

export function useBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data.books);
    } catch (error) {
      console.error(error);
    }
  };

  return { books, fetchBooks };
}
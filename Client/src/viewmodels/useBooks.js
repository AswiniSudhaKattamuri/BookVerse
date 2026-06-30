import { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";

export function useBooks() {

  const [books, setBooks] = useState([]);

  const [filters, setFilters] = useState({

    search: "",

    category: "",

    minPrice: "",

    maxPrice: "",

  });

  useEffect(() => {

    fetchBooks();

  }, [filters]);

  const fetchBooks = async () => {

    try {

      const data = await getAllBooks(filters);

      setBooks(data.books);

    } catch (error) {

      console.log(error);

    }

  };

  return {

    books,

    filters,

    setFilters,

  };

}

import { useState, useEffect } from "react";
import BookItem from "../../interfaces/bookTypes";
import { searchBooks } from "../../api/bookService";

export function useBooks(query: string) {
  const [books, setBooks] = useState<BookItem[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query.trim()) return;
      const results = await searchBooks(query);
      setBooks(results || []);
    };

    fetchBooks();
  }, [query]);

  return books;
}

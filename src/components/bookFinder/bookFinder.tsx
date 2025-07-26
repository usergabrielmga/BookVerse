import { useState, useEffect } from 'react';
import './bookFinder.css';
import { Link } from 'react-router-dom';
import LoaderLivro from '../loader/loader';



interface Book {
    key: string; 
    title: string;
    author_name?: string[];
    cover_i?: number;
    description?: string; 
}

interface CarouselProps {
    req: string;
}


function useBooks(query: string): Book[] {
    const [books, setBooks] = useState<Book[]>([]);
    

    useEffect(() => {
        const fetchBooksAndDescriptions = async () => {
            if (!query) {
                setBooks([]);
                return;
            }

            try {
                
                const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
                const searchResponse = await fetch(searchUrl);
                const searchData = await searchResponse.json();

                if (searchData && searchData.docs) {
                    
                    const initialBooks = searchData.docs
                        .filter((doc: any) => doc.cover_i)
                        .slice(0, 16)
                        .map((doc: any) => ({
                            key: doc.key, 
                            title: doc.title,
                            author_name: doc.author_name,
                            cover_i: doc.cover_i,
                            
                        }));

                    
                    const booksWithDescriptions = await Promise.all(
                        initialBooks.map(async (book: Book) => {
                            if (book.key) {
                            
                                const workUrl = `https://openlibrary.org${book.key}.json`;
                                try {
                                    const workResponse = await fetch(workUrl);
                                    const workData = await workResponse.json();
                                    let descriptionText: string | undefined;

                                  
                                    if (workData.description) {
                                        if (typeof workData.description === 'string') {
                                            descriptionText = workData.description;
                                        } else if (typeof workData.description === 'object' && workData.description.value) {
                                            descriptionText = workData.description.value;
                                        }
                                    }

                                    return { ...book, description: descriptionText };
                                } catch (error) {
                                    console.error(`Erro ao buscar descrição para ${book.title}:`, error);
                                    return { ...book, description: 'Descrição não disponível.' };
                                }
                            }
                            return book;
                        })
                    );

                    setBooks(booksWithDescriptions);
                }
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
                setBooks([]);
            }
        };

        fetchBooksAndDescriptions();
    }, [query]);

    return books;
}



function BookFinder({ req }: CarouselProps) {
    const books = useBooks(req); 
     const [loading, setLoading] = useState(true);
     

     useEffect(() => {
    if (books.length > 0) {
      setLoading(false);
        }
    }, [books]);

    function getCoverUrl(cover_i?: number): string {
        return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : '';
    }


    return loading ? <span className='loader'><div className="loader-circle"></div></span>  : (
        <div className="container-finder">
            <h1> {req}: </h1>
            <div className="content-finder-books">
                {books.map((book) => (
                    <div key={`book-${book.key}`} className="book-view-info">
                        <div className='content-view'>
                            <div className='field-img-book'>
                                <img className='book-image' src={getCoverUrl(book.cover_i)} alt={book.title} />
                            </div>
        
                            <div className='field-description-book'>
                                <h2> {book.title} </h2>
                                {book.description && book.description !== "Descrição não disponível." && (
                                <p>
                                    {book.description.length > 120
                                    ? `${book.description.slice(0, 500)}...`
                                    : book.description}
                                </p>
                                )}
                                <p className='description-actor'>Autor(a) {book.author_name?.join(", ")} </p>
                                <Link
                                    to='/visualizar/livro'
                                    state={{
                                        bookKey: book.key,
                                        bookCover_i: book.cover_i,
                                        bookTitle: book.title,
                                        bookDescription: book.description,
                                        bookAuthor_name: book.author_name
                                    }}
                                    className="btn-view"
                                    >
                                    Visualizar mais
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default BookFinder;
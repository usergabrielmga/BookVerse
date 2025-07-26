import './favorites.css'
import { useEffect, useState } from "react";
import BookItem from "../../interfaces/bookTypes";
import { useFavoriteBooks } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom';




function Favorites() {
    const { removeFavorite, addFavorite } = useFavoriteBooks();

    const [ booksFav, setBookFav ] = useState<BookItem[]>([])
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);


    useEffect(() => {
        const getBookLocal = () => {
            try {
                const res = localStorage.getItem('@favorites')
                
                if(res) {
                    const parsed = JSON.parse(res) as BookItem[]
                    setBookFav(parsed)

                } else {
                    setBookFav([])
                }
            } catch {
                console.log('não há livros salvos.')
            }
            
            
        }

        getBookLocal()
    }, [removeFavorite, addFavorite])



    function getCoverUrl(cover_i?: number): string {
        return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : '';
    }


    console.log(booksFav)

    return(
        <div  className="grid-books-fav">
          {booksFav.filter(book => book.cover_i).slice(0, 12).map(book => {
            return (
                
                    <div key={book.key} className="book-card-fav">
                        <div style={{ position: 'relative', display: 'inline-block', right: '-80px' }}>
                            <img
                            src="https://cdn-icons-png.flaticon.com/512/512/512142.png"
                            alt="menu"
                            style={{ width: '24px', cursor: 'pointer' }}
                            onClick={() => setOpenMenuId(openMenuId === book.key ? null : book.key)}
                            />

                            {openMenuId === book.key && (
                            <div style={{
                                position: 'absolute',
                                top: '30px',
                                right: '0',
                                backgroundColor: '#fff',
                                border: '1px solid black',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                zIndex: 10,
                                color: 'black',
                                fontFamily: 'inter',
                                fontSize: '14px'
                            }}>
                                <div style={{ padding: '8px', cursor: 'pointer' }} onClick={() => removeFavorite(book.key)}>
                                Remover
                                </div>
                                <div style={{ padding: '8px', cursor: 'pointer' }} onClick={() => console.log('visualizar')}>
                                <Link
                                    to='/visualizar/livro'
                                    state={{
                                        bookKey: book.key,
                                        bookCover_i: book.cover_i,
                                        bookTitle: book.title,
                                        bookDescription: book.description,
                                        bookAuthor_name: book.author_name
                                    }}
                                    className=""
                                      style={{ color: 'black' }}
                                    >
                                    Visualizar
                                </Link>
                                </div>
                            </div>
                            )}
                        </div>

                        <img className="book-image-fav" src={getCoverUrl(book.cover_i)} alt="" />
                        <p className='description'>{book.title}</p>
                        </div>
              
            );
          })}
        </div>
    )
}

export default Favorites;
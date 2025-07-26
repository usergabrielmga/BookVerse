import { useState, useEffect, useRef } from 'react';
import { useBooks } from '../useBooks/useBooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useFavoriteBooks } from '../../context/FavoritesContext';
import AddFavorite from '../../imgs/imgs/addFavorite.png'
import AddFavoriteActive from '../../imgs/imgs/addFavoriteActive.png'
import { useNavigate } from 'react-router-dom';


import './carousel.css';
import 'swiper/swiper-bundle.css';
import LoaderLivro from '../loader/loader';

interface CarouselProps {
  req: string;
}

function Carousel({ req }: CarouselProps) {
  const books = useBooks(req);
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteBooks();
  const navigate = useNavigate();

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 790);
  const [loading, setLoading] = useState(true);


  function getCoverUrl(cover_i?: number): string {
    return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : '';
  }

    useEffect(() => {
    if (books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  return loading ? <LoaderLivro/> : (

    <div className='carousel'>
      <h2>Seção de {req}</h2>

      {isMobile ? (
        <div className="grid-books">
          {books.filter(book => book.cover_i).slice(0, 12).map(book => {
            const favorito = isFavorite(book.key); 
            return (
              <div key={book.key} className="book-card">
                <img className='book-image' src={getCoverUrl(book.cover_i)} alt={book.title} />
                <button onClick={() => favorito ? removeFavorite(book.key) : addFavorite(book)}>
                  {favorito ? 'Remover dos Favoritos' : 'Favoritar'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='content-carousel'>
          <div className="custom-nav">
            <div ref={prevRef} className="swiper-button-prev-custom"><i className="ri-arrow-left-s-line"></i></div>
            <div ref={nextRef} className="swiper-button-next-custom"><i className="ri-arrow-right-s-line"></i></div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation) {
                const nav = swiper.params.navigation as any;
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              320: { slidesPerView: 2 },
              790: { slidesPerView: 3 },
              1130: { slidesPerView: 4 },
            }}
          >
            {books.filter(book => book.cover_i).map(book => {
              const favorito = isFavorite(book.key); 
              return (
                <SwiperSlide key={book.key} >
                  <div className="book-card"
                    onClick={() =>
                      navigate("/visualizar/livro", {
                        state: {
                          bookKey: book.key,
                          bookCover_i: book.cover_i,
                          bookTitle: book.title,
                          bookDescription: book.description,
                          bookAuthor_name: book.author_name,
                        },
                      })
                    }
                    style={{ position: 'relative', cursor: 'pointer' }}
                  >
                  
                    <button className='btn-add-favorite' onClick={(e) => {favorito ? removeFavorite(book.key) : addFavorite(book); e.stopPropagation();}}>
                      <img 
                        src={favorito ? AddFavoriteActive : AddFavorite} 
                        alt="Favorito" 
                        style={{ width: '24px', height: '24px'}}
                      />
                    </button>
                    <img className='book-image' src={getCoverUrl(book.cover_i)} alt={book.title} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Carousel;

// ViewMore.tsx
import './viewMore.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Importar useState e useEffect
import LoaderLivro from '../loader/loader'; // Se for usar um loader para a descrição

function ViewMore() {
    const location = useLocation();
    // Desestruturamos e fornecemos um objeto vazio como fallback
    const { bookKey, bookTitle, bookCover_i, bookAuthor_name } = location.state || {};

    const [bookDescription, setBookDescription] = useState<string | undefined>(undefined);
    const [isLoadingDescription, setIsLoadingDescription] = useState(true); // Estado de carregamento para A DESCRIÇÃO

    // Efeito para buscar a descrição APENAS quando a página ViewMore é acessada
    useEffect(() => {
        const fetchDescription = async () => {
            if (!bookKey) {
                setBookDescription('Descrição não disponível. (Chave do livro ausente)');
                setIsLoadingDescription(false);
                return;
            }

            setIsLoadingDescription(true); // Começa a carregar a descrição
            try {
                const workUrl = `https://openlibrary.org${bookKey}.json`; // Use o bookKey para buscar
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
                setBookDescription(descriptionText || 'Descrição não disponível.');
            } catch (error) {
                console.error(`Erro ao buscar descrição para ${bookTitle || bookKey}:`, error);
                setBookDescription('Erro ao carregar descrição.'); // Mensagem de erro para o usuário
            } finally {
                setIsLoadingDescription(false); // Finaliza o carregamento da descrição
            }
        };

        fetchDescription();
    }, [bookKey, bookTitle]); // Re-executa se a chave do livro mudar (raro para ViewMore)

    function getCoverUrl(cover_i?: number): string {
        return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : '';
    }

    return(
        <div>
            <div key={`book-${bookKey}`} className="book__card">
                <div className="book-card__content">
                    <div className="book-card__image-container">
                    <img
                        className="book-card__image"
                        src={getCoverUrl(bookCover_i)}
                        alt={bookTitle}
                    />
                    </div>

                    <div className="book-card__info">
                    <h2 className="book-card__title">{bookTitle}</h2>

                    {isLoadingDescription ? (
                        <p className="book-card__description-loading">Carregando descrição...</p> // Exibe um loader
                    ) : (
                        // Exibe a descrição se carregada, ou a mensagem de não disponível/erro
                        <p className="book-card__description">
                            {bookDescription || 'Descrição não disponível.'}
                        </p>
                    )}

                    <p className="book-card__author">
                        Autor(a): {bookAuthor_name?.join(", ")}
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewMore;
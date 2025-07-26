import './rodape.css'
import Search from './../../imgs/imgs/Search.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Rodape() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');

       const handleSearch = () => {
        if (input.trim()) {
            navigate(`/buscar/${encodeURIComponent(input.trim())}`);
            setInput('')
        }
    };

    return(
        <div className='rodape'>
            <div className='field-rodape-info'>
                <div className='nav-rodape'>
                    <div className='pages-rodape'>
                        <h2>Navegações</h2>
                        <a href='/'>Inicio</a>
                        <a href='/cience'>Ciência</a>
                        <a href='/biology'>Biologia</a>
                        <a href='/geography'>Geografia</a>
                        <a href='/mathematics'>Matemática</a>
                    </div>

                    <div className='links'>
                        <h2>Links Úteis</h2>
                        <a href='/visualizar/favoritos'>Favoritos</a>
                        <a>Dark/Light</a>
                    </div>

                    <div className='category-books'>
                        <h2>Categorias de Livros</h2>
                        <a href='/fiction'>Ficção</a>
                        <a href='/adventure'>Aventura</a>
                        <a href='/short-stories'>Contos / Crônicas</a>
                        <a href='/mystery'>Mistério</a>
                    </div>
                    
                </div>

                <div className='nav-rodape-about'>
                    <div className='about-rodape'>
                        <h2>Sobre</h2>
                        <p>O seu site é uma plataforma de recomendações de livros focada principalmente em tecnologia.
                            Ele apresenta uma introdução inicial sobre o projeto e exibe descrições detalhadas dos livros
                            recomendados. O objetivo é ajudar os usuários a encontrar boas leituras na área de tecnologia,
                            oferecendo informações relevantes e organizadas de forma intuitiva. Além disso, o site conta com
                            um design bem elaborado e uma página para salvar livros favoritos.
                        </p>
                        <div className='content-input-text-search'>
                            <input className='quick-search' type="text" name="" id="" placeholder='Busca rapida'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button onClick={handleSearch} className='btn-search-rodape'><img src={Search} alt="" /></button>
                        </div>
                    </div>
                </div>

                <div className='rodape-bottom'>
                    <p>Desenvolvido por Gabriel Da Silva Freitas</p>
                    <p>© 2025 Meu Blog de Livros. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    )
}

export default Rodape;
import './fieldSearch.css'
import LogoSearch from '../../imgs/imgs/Search.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type FieldSearchProps = {
    onClose: () => void;
}

function FieldSearch({ onClose }: FieldSearchProps) {
    const navigate = useNavigate();
    const [input, setInput] = useState('');


    const handleSearch = () => {
        if (input.trim()) {
            navigate(`/buscar/${encodeURIComponent(input.trim())}`);
            onClose(); // Fecha o modal de busca, se necessário
        }
    };

    return(
        <div className="field_search">
            <div className='search-bar'>
                <input type="text" placeholder='Digite seu livro desejado...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}><img src={LogoSearch} alt="" /></button>
            </div>

            <div className='close_btn' onClick={onClose}>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default FieldSearch;
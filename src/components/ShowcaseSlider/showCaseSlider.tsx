import './showCaseSlider.css';
import BookIntroFirst from '../../imgs/imgs/book-intro (1).jpg'
import BookIntroThree from '../../imgs/imgs/book-intro (2).jpg'
import BookIntroSecund from '../../imgs/imgs/book-intro (3).jpg'

function CaseSlider() {

   
    return(
        <div className='content_show_case_slider'>
            <div className='tech_slogan'>
                <h1 className='title'>Explore o Futuro com Nossas Recomendações Tech!</h1>
                <p>A tecnologia está sempre evoluindo, e nada melhor do que um bom livro para se manter atualizado e inspirado. Seja inteligência artificial, programação, segurança digital ou inovação.</p>
            </div>

            <div className='intro_slider'>
                <div className="book-intro" id='book-intro-first'>
                    <img src={BookIntroFirst} alt="" />
                </div>
                <div className="book-intro" id='book-intro-secund'>
                    <img src={BookIntroSecund} alt="" />
                </div>
                <div className="book-intro" id='book-intro-three'>
                    <img src={BookIntroThree} alt="" />
                </div>
            </div>
        </div>
    )
}


export default CaseSlider;
import Carousel from "../../components/carousel/carousel";
import CaseSlider from "../../components/ShowcaseSlider/showCaseSlider";


function Home() {
    return ( 
        <div className="home-container">
            <CaseSlider/>
            <Carousel req={'Historias'} />
            <Carousel req={'Ficção'} />
            <Carousel req={'Romance'} />
            <Carousel req={'Drama'} />
        </div>
    )
}

export default Home;
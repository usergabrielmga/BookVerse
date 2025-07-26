import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/home/home'
import BookFinderWrapper from './components/bookFinder/bookFinderWrapper/bookFinderWrapper';
import Layout from './layout/layout';
import ViewMore from './components/viewMore/viewMore';
import { FavoriteBooksProvider } from './context/FavoritesContext';
import Favorites from './pages/favorites/favorites';
import BookFinder from './components/bookFinder/bookFinder';
import { ThemeProvider } from './interfaces/ThemeContext';


function App() {
  
  return (
    <ThemeProvider>
    <FavoriteBooksProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cience" element={<BookFinder key="cience" req={'ciencia'} />} />
            <Route path='/biology' element={<BookFinder key="biology" req={'biologia'} />} />
            <Route path='/geography' element={<BookFinder key="geography" req={'geografia'} />} />
            <Route path='/mathematics' element={<BookFinder key="mathematics" req={'matematica'} />} />
            <Route path="/fiction" element={<BookFinder key="fiction" req={'ficcao'} />} />
            <Route path="/adventure" element={<BookFinder key="adventure" req={'aventura'} />} />
            <Route path="/short-stories" element={<BookFinder key="short-stories" req={'contos'} />} />
            <Route path="/mystery" element={<BookFinder key="mystery" req={'misterio'} />} />
            <Route path="/buscar/:query" element={<BookFinderWrapper />} />
            <Route path='/visualizar/livro' element={<ViewMore/>} />
            <Route path='/visualizar/favoritos' element={<Favorites/>} /> 
        </Route>
      </Routes>
    </Router>
    </FavoriteBooksProvider>
    </ThemeProvider>
  )
}

export default App;

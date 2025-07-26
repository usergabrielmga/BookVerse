import "./header.css"
import { Link } from "react-router-dom"
import Logo from './../../imgs/imgs/logo_principal.png'
import Search from './../../imgs/imgs/Search.png'
import Favorite from './../../imgs/imgs/Favorite.png'
import Dark from './../../imgs/imgs/dark.png'
import Light from './../../imgs/imgs/light.png'
import FieldSearch from "../../components/fieldSearcher/field-search"
import { useState, useEffect } from "react"
import { useTheme } from "../../interfaces/ThemeContext"

function Header() {

    const [showSearch, setShowSearch] = useState(false)
    const { isDarkMode, toggleTheme } = useTheme();

    const toggleSearch = () => {
        setShowSearch(prev => !prev)
        console.log(setShowSearch)
    }

    useEffect(() => {
        if(showSearch) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
        
    },[showSearch])

    return(
        <>
            <div className="header">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>

                <div className="nav_main">
                    <div className="content_nav">
                        <ul>
                            <li>
                                <Link to='/'>inicio</Link>
                            </li>
                            <li>
                                <Link to='/cience'>Ciência</Link>
                            </li>
                            <li>
                                <Link to='/biology'>Biologia</Link>
                            </li>
                            <li>
                                <Link to='/geography'>Geografia</Link>
                            </li>
                            <li>
                                <Link to='/mathematics'>Matemática</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="content_search">
                        <div className="nav_icons" onClick={toggleSearch}>
                            <img src={Search} alt=""/>
                        </div>
                        <Link to='/visualizar/favoritos' className="nav_icons">
                            <img src={Favorite} alt="" />
                        </Link>
                        <div onClick={toggleTheme} className="nav_icons">
                            <img src={isDarkMode ? Light : Dark} alt="" className="theme-icon"  />
                        </div>
                    </div>
                </div>

                 {showSearch && (
                <>
                    <div className="overlay" onClick={toggleSearch}></div>
                    <FieldSearch onClose={toggleSearch}/>
                </>
                )}
            </div>
        </>
    )
}

export default Header;
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import './Header.css'

function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { language, toggleLanguage } = useLanguage()

  const handleLangToggle = (e) => {
    e.preventDefault()
    toggleLanguage()
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo-link">
            <h1 className="header-logo">atelier ah</h1>
          </Link>
        </div>
        {/* 모바일용 언어 토글 (600px 이하에서만 표시) */}
        <a 
          href="#lang" 
          className="header-lang-toggle-mobile"
          onClick={handleLangToggle}
        >
          {language}
        </a>
        <nav className={`header-nav ${isHome ? 'header-nav-home' : 'header-nav-other'}`}>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'active' : ''}
          >
            about
          </Link>
          <Link 
            to="/works" 
            className={location.pathname.startsWith('/works') ? 'active' : ''}
          >
            works
          </Link>
          <Link 
            to="/press" 
            className={location.pathname.startsWith('/press') ? 'active' : ''}
          >
            press
          </Link>
          <Link 
            to="/contact" 
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            contact
          </Link>
          {/* 데스크탑용 언어 토글 (600px 초과에서만 표시) */}
          <a 
            href="#lang" 
            className="header-lang-toggle"
            onClick={handleLangToggle}
          >
            {language}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header


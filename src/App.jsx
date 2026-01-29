import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { MobileProvider } from './contexts/MobileContext'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import ProjectDetail from './pages/ProjectDetail'
import Press from './pages/Press'
import PressDetail from './pages/PressDetail'
import Contact from './pages/Contact'
import Admin from './admin/Admin'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <MobileProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:id" element={<ProjectDetail />} />
              <Route path="/press" element={<Press />} />
              <Route path="/press/:id" element={<PressDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/works" element={<Admin />} />
              <Route path="/admin/press" element={<Admin />} />
              <Route path="/admin/home" element={<Admin />} />
              <Route path="/admin/about" element={<Admin />} />
              <Route path="/admin/contact" element={<Admin />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </MobileProvider>
    </AuthProvider>
  )
}

export default App

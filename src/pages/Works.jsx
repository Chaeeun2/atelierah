import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FadeInUp from '../components/FadeInUp'
import { projects } from '../data/projects'
import './Works.css'

function Works() {
  const navigate = useNavigate()
  const { language } = useLanguage()

  // 페이지 타이틀 설정
  useEffect(() => {
    document.title = 'works - 아틀리에 아 atelier ah'
  }, [])

  return (
    <div className="works">
      <Header />

      <div className="works-container">
        <FadeInUp className="works-grid">
          {[...projects].reverse().map((project, index) => {
            const currentCategory = language === 'ko' ? project.category.ko : project.category.en
            const isOngoing = currentCategory.toLowerCase() === 'ongoing'
            
            return (
              <FadeInUp 
                key={project.id} 
                className={`works-item ${isOngoing ? 'works-item-ongoing' : ''}`}
                delay={index * 100}
              >
                <div 
                  className="works-image-wrapper"
                  onClick={!isOngoing ? () => navigate(`/works/${project.id}`) : undefined}
                  style={{ cursor: isOngoing ? 'default' : 'pointer' }}
                >
                  <img 
                    src={project.images.thumbnail} 
                    alt={language === 'ko' ? project.title.ko : project.title.en}
                    className="works-image"
                  />
                </div>
                <div className={`works-caption works-caption-${language} ${isOngoing ? 'works-caption-ongoing' : ''}`}>
                  <span className="works-title">
                    {language === 'ko' ? project.title.ko : project.title.en}
                  </span>
                  <span className="works-category">
                    {language === 'ko' ? project.category.ko : project.category.en}, {project.year} 
                  </span>
                </div>
              </FadeInUp>
            )
          })}
        </FadeInUp>
      </div>

      <Footer />
    </div>
  )
}

export default Works


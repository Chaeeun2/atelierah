import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FadeInUp from '../components/FadeInUp'
import { getProjects } from '../services/worksService'
import './Works.css'

function Works() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    document.title = 'works - atelier ah'
  }, [])

  // Firebase에서 프로젝트 데이터 불러오기
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('프로젝트 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <div className="works">
        <Header />
        <div className="works-container">
        </div>
      </div>
    )
  }

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
                    {language === 'ko' 
                      ? (project.thumbnailTitle?.ko || project.title.ko) 
                      : (project.thumbnailTitle?.en || project.title.en)}
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


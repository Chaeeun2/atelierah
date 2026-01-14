import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FadeInUp from '../components/FadeInUp'
import { pressItems } from '../data/press'
import './Press.css'

function Press() {
  const navigate = useNavigate()
  const { language } = useLanguage()

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    document.title = 'press - atelier ah'
  }, [])

  const handlePressClick = (item) => {
    if (item.type === 'detail') {
      // 상세페이지로 이동
      navigate(`/press/${item.id}`)
    } else if (item.type === 'link' && item.link) {
      // 외부 링크로 이동
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  const isClickable = (item) => {
    return item.type === 'detail' || (item.type === 'link' && item.link)
  }

  return (
    <div className="press">
      <Header />

      <div className="press-container">
        <FadeInUp className="press-grid">
          {[...pressItems].reverse().map((item, index) => (
            <FadeInUp 
              key={item.id} 
              className="press-item"
              delay={index * 100}
            >
              <div 
                className="press-item-content"
                onClick={() => handlePressClick(item)}
                style={{ cursor: isClickable(item) ? 'pointer' : 'default' }}
              >
                <div className="press-image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.media}
                    className="press-image"
                  />
                </div>
                <div className="press-caption">
                  <span className="press-media">{item.media}</span>
                  <span className="press-project">
                    {language === 'ko' ? item.project.ko : item.project.en}
                  </span>
                </div>
              </div>
            </FadeInUp>
          ))}
        </FadeInUp>
      </div>

      <Footer />
    </div>
  )
}

export default Press

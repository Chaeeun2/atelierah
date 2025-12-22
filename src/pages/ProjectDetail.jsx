import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import FadeInUp from '../components/FadeInUp'
import ImageSlider from '../components/ImageSlider'
import { projects } from '../data/projects'
import './ProjectDetail.css'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [expandedDescriptions, setExpandedDescriptions] = useState({})

  const project = projects.find(p => p.id === parseInt(id))

  // 페이지 타이틀 설정
  useEffect(() => {
    if (project) {
      document.title = `${project.title.en} - 아틀리에 아 atelier ah`
    }
  }, [project])

  if (!project) {
    return (
      <div className="project-detail">
        <Header />
        <div className="project-detail-container">
          <p>Project not found</p>
        </div>
      </div>
    )
  }

  const currentTitle = language === 'ko' ? project.title.ko : project.title.en
  const content = project.content || []

  // 섹션 렌더링 함수
  const renderContentSection = (section, index) => {
    switch (section.type) {
      case 'slider':
        const sliderImages = (project.images.slider || []).map((img, imgIndex) => ({
          id: imgIndex + 1,
          src: img,
          alt: `${currentTitle} - Image ${imgIndex + 1}`
        }))
        const mobileSketchImage = project.images.sketch?.[0]
        return (
          <>
            <FadeInUp key={`slider-${index}`} className="project-detail-main-slider">
              <ImageSlider 
                images={sliderImages}
                autoPlayInterval={section.autoPlayInterval || 8000}
                className="project-detail-main-slider-component"
              />
            </FadeInUp>
            {mobileSketchImage && (
              <FadeInUp key={`mobile-sketch-${index}`} className="project-detail-mobile-sketch">
                <img 
                  src={mobileSketchImage}
                  alt={`${currentTitle} - Sketch`}
                  className="project-detail-mobile-sketch-image"
                />
              </FadeInUp>
            )}
          </>
        )

      case 'description':
        const descriptionDelay = 200
        const descriptionKey = `description-${index}`
        const isExpanded = expandedDescriptions[descriptionKey] || false
        const descriptionText = language === 'ko' ? section.text.ko : section.text.en
        
        const handleToggle = (e) => {
          const textElement = e.currentTarget.parentElement.querySelector('.project-detail-description-text')
          const wasExpanded = expandedDescriptions[descriptionKey] || false
          
          if (wasExpanded) {
            // 접을 때: 먼저 max-height를 줄이고, transition이 끝난 후에 -webkit-line-clamp 적용
            textElement.style.display = 'block'
            textElement.style.webkitLineClamp = 'unset'
            
            setTimeout(() => {
              textElement.style.maxHeight = '3.6em'
              
              setTimeout(() => {
                textElement.style.display = '-webkit-box'
                textElement.style.webkitLineClamp = '2'
              }, 500) // transition 시간과 동일
            }, 10)
          } else {
            // 펼칠 때: 먼저 -webkit-line-clamp를 제거하고, 그 다음 max-height 증가
            textElement.style.display = 'block'
            textElement.style.webkitLineClamp = 'unset'
            setTimeout(() => {
              textElement.style.maxHeight = '2000px'
            }, 10)
          }
          
          setExpandedDescriptions(prev => ({
            ...prev,
            [descriptionKey]: !prev[descriptionKey]
          }))
        }
        
        return (
            <FadeInUp key={`description-${index}`} className="project-detail-description" delay={descriptionDelay}>
                <div className="project-detail-description-spacer"></div>
            <div className="project-detail-description-wrapper">
              <button 
                className={`project-detail-description-toggle ${isExpanded ? 'expanded' : ''}`}
                onClick={handleToggle}
              >
                <img 
                  src="https://pub-4b716c374bc747948e9ac588042939de.r2.dev/toggle.png" 
                  alt="toggle"
                  className="project-detail-description-toggle-icon"
                />
              </button>
              <div 
                className={`project-detail-description-text project-detail-description-text-${language} ${isExpanded ? 'expanded' : ''}`}
              >
                {descriptionText}
              </div>
            </div>
          </FadeInUp>
        )

      case 'info':
        const currentCategory = language === 'ko' ? project.category.ko : project.category.en
        const labelMap = {
          completion: language === 'ko' ? 'completion' : 'completion',
          usage: language === 'ko' ? 'usage' : 'usage',
          projectArea: language === 'ko' ? 'project area' : 'project area',
          location: language === 'ko' ? 'location' : 'location',
          client: language === 'ko' ? 'client' : 'client',
          design: language === 'ko' ? 'design' : 'design',
          photo: language === 'ko' ? 'photo' : 'photo'
        }
        
        // sketch 이미지 사용
        const sketchImages = project.images.sketch || []
        const firstImage = sketchImages[0]
        const restImages = sketchImages.slice(1)
        
        return (
          <FadeInUp key={`info-${index}`} className="project-detail-info">
            <div className="project-detail-info-grid">
              <div 
                className="project-detail-info-sketch-column"
                onMouseEnter={(e) => {
                  const expandEl = e.currentTarget.querySelector('.project-detail-info-sketch-expand')
                  const infoEl = e.currentTarget.closest('.project-detail-info')
                  if (expandEl && infoEl) {
                    infoEl.style.marginBottom = `${60 + expandEl.scrollHeight}px`
                  }
                }}
                onMouseLeave={(e) => {
                  const infoEl = e.currentTarget.closest('.project-detail-info')
                  if (infoEl) {
                    infoEl.style.marginBottom = '60px'
                  }
                }}
              >
                <img 
                  src={firstImage}
                  alt={`${currentTitle} - Sketch 1`}
                  className="project-detail-info-sketch-first"
                />
                {restImages.length > 0 && (
                  <div className="project-detail-info-sketch-expand">
                    {restImages.map((image, imgIndex) => (
                      <img 
                        key={imgIndex}
                        src={image}
                        alt={`${currentTitle} - Sketch ${imgIndex + 2}`}
                        className="project-detail-info-sketch-rest"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className={`project-detail-info-text project-detail-info-text-${language}`}>
                <h2 className="project-detail-info-title">{currentTitle}</h2>
                <p className="project-detail-info-category">{currentCategory} project</p>
                
                <div className="project-detail-info-group">
                  {['completion', 'usage', 'projectArea', 'location'].map((key) => {
                    if (!section.details[key]) return null
                    const value = section.details[key]
                    return (
                      <div key={key} className="project-detail-info-item">
                        <span className="project-detail-info-label">
                          {labelMap[key]} :
                        </span>
                        <span className="project-detail-info-value">
                          {language === 'ko' ? value.ko : value.en}
                        </span>
                      </div>
                    )
                  })}
                </div>
                
                <div className="project-detail-info-group">
                  {['client', 'design', 'photo'].map((key) => {
                    if (!section.details[key]) return null
                    const value = section.details[key]
                    return (
                      <div key={key} className="project-detail-info-item">
                        <span className="project-detail-info-label">
                          {labelMap[key]} :
                        </span>
                        <span className="project-detail-info-value">
                          {language === 'ko' ? value.ko : value.en}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </FadeInUp>
        )

      case 'layout':
        const layoutImages = project.images.layout || []
        if (layoutImages.length === 0) return null
        
        const layoutSliderImages = layoutImages.map((img, imgIndex) => ({
          id: imgIndex + 1,
          src: img,
          alt: `${currentTitle} - Layout ${imgIndex + 1}`
        }))
        
        return (
          <FadeInUp key={`layout-${index}`} className="project-detail-layout">
            <div className="project-detail-layout-grid">
              <div className="project-detail-layout-empty"></div>
              <div className="project-detail-layout-content">
                {layoutImages.length === 1 ? (
                  <img 
                    src={layoutImages[0]} 
                    alt={`${currentTitle} - Layout`}
                    className="project-detail-layout-image"
                  />
                ) : (
                  <ImageSlider 
                    images={layoutSliderImages}
                    autoPlayInterval={section.autoPlayInterval || 8000}
                    className="project-detail-layout-slider"
                  />
                )}
              </div>
            </div>
          </FadeInUp>
        )

      case 'images':
        const columns = section.columns || 2
        // section.images에 직접 지정된 이미지 사용
        const sectionImages = section.images || []
        if (sectionImages.length === 0) return null
        
        return (
          <FadeInUp key={`images-${index}`} className="project-detail-images">
            <div className={`project-detail-images-grid project-detail-images-grid-${columns}`}>
              {sectionImages.map((image, imgIndex) => (
                <div key={imgIndex} className="project-detail-image-wrapper">
                  <img 
                    src={image} 
                    alt={`${currentTitle} - Image ${imgIndex + 1}`}
                    className="project-detail-image"
                  />
                </div>
              ))}
            </div>
          </FadeInUp>
        )

      default:
        return null
    }
  }

  return (
    <div className="project-detail">
      <Header />

      <div className="project-detail-container">
        {content.map((section, index) => renderContentSection(section, index))}
      </div>

      <footer className="project-detail-footer">
        <p>©2025 by atelier ah</p>
      </footer>
    </div>
  )
}

export default ProjectDetail


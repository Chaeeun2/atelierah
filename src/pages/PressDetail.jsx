import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FadeInUp from '../components/FadeInUp'
import ImageSlider from '../components/ImageSlider'
import { getPressItem } from '../services/pressService'
import './PressDetail.css'

function PressDetail() {
  const { id } = useParams()
  const { language } = useLanguage()
  const [expandedDescriptions, setExpandedDescriptions] = useState({})
  const [pressItem, setPressItem] = useState(null)
  const [loading, setLoading] = useState(true)

  // Firebase에서 프레스 데이터 로드
  useEffect(() => {
    async function loadPressData() {
      setLoading(true)
      let fetchedItem = null
      try {
        // ID로 직접 시도
        fetchedItem = await getPressItem(id)
        // 못 찾으면 press_ prefix로 시도
        if (!fetchedItem && !isNaN(id)) {
          fetchedItem = await getPressItem(`press_${id}`)
        }
        setPressItem(fetchedItem)
      } catch (error) {
        // error handling
      } finally {
        setLoading(false)
      }
    }
    loadPressData()
  }, [id])

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    if (pressItem) {
      document.title = `${pressItem.project.en} - atelier ah`
    }
  }, [pressItem])

  if (loading) {
    return (
      <div className="press-detail">
        <Header />
        <div className="press-detail-container">
        </div>
      </div>
    )
  }

  if (!pressItem || pressItem.type !== 'detail') {
    return (
      <div className="press-detail">
        <Header />
        <div className="press-detail-container">
          <p>Press not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const currentProject = language === 'ko' ? pressItem.project.ko : pressItem.project.en
  const originalContent = pressItem.content || []

  // description과 info 순서 변경: info를 description 앞으로
  const content = [...originalContent].sort((a, b) => {
    const order = { hero: 0, info: 1, description: 2, images: 3 }
    return (order[a.type] ?? 99) - (order[b.type] ?? 99)
  })

  // 섹션 렌더링 함수
  const renderContentSection = (section, index) => {
    switch (section.type) {
      case 'hero':
        const heroImages = (section.images || []).map((img, imgIndex) => ({
          id: imgIndex + 1,
          src: img,
          alt: `${currentProject} - Image ${imgIndex + 1}`
        }))

        return (
          <FadeInUp key={`hero-${index}`} className="press-detail-main-slider">
            <ImageSlider
              images={heroImages}
              autoPlayInterval={section.autoPlayInterval || 8000}
              className="press-detail-main-slider-component"
            />
          </FadeInUp>
        )

      case 'description':
        const descriptionKey = `description-${index}`
        const isExpanded = expandedDescriptions[descriptionKey] || false
        const descriptionText = language === 'ko' ? section.text.ko : section.text.en

        const handleToggle = (e) => {
          const textElement = e.currentTarget.parentElement.querySelector('.press-detail-description-text')
          const wasExpanded = expandedDescriptions[descriptionKey] || false

          if (wasExpanded) {
            textElement.style.display = 'block'
            textElement.style.webkitLineClamp = 'unset'

            setTimeout(() => {
              textElement.style.maxHeight = '7.2em'

              setTimeout(() => {
                textElement.style.display = '-webkit-box'
                textElement.style.webkitLineClamp = '4'
              }, 500)
            }, 10)
          } else {
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
          <FadeInUp key={`description-${index}`} className="press-detail-description" delay={200}>
            <div className="press-detail-description-spacer"></div>
            <div className="press-detail-description-wrapper">
              <button
                className={`press-detail-description-toggle ${isExpanded ? 'expanded' : ''}`}
                onClick={handleToggle}
              >
                <img
                  src="https://pub-4b716c374bc747948e9ac588042939de.r2.dev/toggle.png"
                  alt="toggle"
                  className="press-detail-description-toggle-icon"
                />
              </button>
              <div
                className={`press-detail-description-text press-detail-description-text-${language} ${isExpanded ? 'expanded' : ''}`}
                onClick={handleToggle}
              >
                {descriptionText}
              </div>
            </div>
          </FadeInUp>
        )

      case 'info':
        const labelMap = {
          projectName: language === 'ko' ? 'project' : 'project',
          media: language === 'ko' ? 'media' : 'media',
          published: language === 'ko' ? 'published' : 'published'
        }

        return (
          <FadeInUp key={`info-${index}`} className="press-detail-info">
            <div className="press-detail-info-content">
              <h2 className="press-detail-info-title">{currentProject}</h2>

              <div className="press-detail-info-group">
                {['media', 'published'].map((key) => {
                  if (!section.details[key]) return null
                  const value = section.details[key]
                  return (
                    <div key={key} className="press-detail-info-item">
                      <span className="press-detail-info-label">
                        {labelMap[key]} :
                      </span>
                      <span className="press-detail-info-value">
                        {language === 'ko' ? value.ko : value.en}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeInUp>
        )

      case 'images':
        const columns = section.columns || 2
        const sectionImages = section.images || []
        if (sectionImages.length === 0) return null

        return (
          <FadeInUp key={`images-${index}`} className="press-detail-images">
            <div className={`press-detail-images-grid press-detail-images-grid-${columns}`}>
              {sectionImages.map((image, imgIndex) => (
                <div key={imgIndex} className="press-detail-image-wrapper">
                  <img
                    src={image}
                    alt={`${currentProject} - Image ${imgIndex + 1}`}
                    className="press-detail-image"
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
    <div className="press-detail">
      <Header />

      <div className="press-detail-container">
        {content.map((section, index) => renderContentSection(section, index))}
      </div>

      <Footer />
    </div>
  )
}

export default PressDetail

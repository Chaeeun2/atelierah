import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FadeInUp from '../components/FadeInUp'
import ImageSlider from '../components/ImageSlider'
import { getProject } from '../services/worksService'
import './ProjectDetail.css'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [expandedDescriptions, setExpandedDescriptions] = useState({})
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Firebase에서 프로젝트 데이터 불러오기
  useEffect(() => {
    async function loadProject() {
      try {
        // URL이 숫자(1, 2)인 경우 project_1 형식으로 변환
        // URL이 이미 project_1 형식인 경우 그대로 사용
        const projectId = id.startsWith('project_') ? id : `project_${id}`
        const data = await getProject(projectId)
        setProject(data)
      } catch (error) {
        console.error('프로젝트 로드 실패:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [id])

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    if (project) {
      document.title = `${project.title?.en || 'Project'} - atelier ah`
    }
  }, [project])

  if (loading) {
    return (
      <div className="project-detail">
        <Header />
        <div className="project-detail-container">
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="project-detail">
        <Header />
        <div className="project-detail-container">
          <p>Project not found</p>
        </div>
        <Footer />
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
        // 모바일용 스케치 슬라이더 이미지
        const mobileSketchImages = (project.images.sketch || []).map((img, imgIndex) => ({
          id: imgIndex + 1,
          src: img,
          alt: `${currentTitle} - Sketch ${imgIndex + 1}`
        }))

        // 영상 모드인 경우
        if (section.mediaType === 'video' && section.videoSrc) {
          return (
            <React.Fragment key={`slider-${index}`}>
              <FadeInUp className="project-detail-main-slider">
                <div className="project-detail-video-container">
                  <video
                    src={section.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="project-detail-video"
                  />
                </div>
              </FadeInUp>
              {mobileSketchImages.length > 0 && (
                <FadeInUp className="project-detail-mobile-sketch">
                  <ImageSlider
                    images={mobileSketchImages}
                    autoPlayInterval={5000}
                    className="project-detail-mobile-sketch-slider"
                  />
                </FadeInUp>
              )}
            </React.Fragment>
          )
        }

        // 이미지 모드 (기본)
        return (
          <React.Fragment key={`slider-${index}`}>
            <FadeInUp className="project-detail-main-slider">
              <ImageSlider
                images={sliderImages}
                autoPlayInterval={section.autoPlayInterval || 8000}
                className="project-detail-main-slider-component"
              />
            </FadeInUp>
            {mobileSketchImages.length > 0 && (
              <FadeInUp className="project-detail-mobile-sketch">
                <ImageSlider
                  images={mobileSketchImages}
                  autoPlayInterval={5000}
                  className="project-detail-mobile-sketch-slider"
                />
              </FadeInUp>
            )}
          </React.Fragment>
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
          construction: language === 'ko' ? 'construction' : 'construction',
          photo: language === 'ko' ? 'photo' : 'photo'
        }

        // 값이 있는지 확인하는 헬퍼 함수
        const hasValue = (value) => {
          if (!value) return false
          const val = language === 'ko' ? value.ko : value.en
          return val && val.trim() !== ''
        }

        // sketch 이미지 사용
        const sketchImages = project.images.sketch || []
        const firstImage = sketchImages[0]
        const restImages = sketchImages.slice(1)

        // description 통합
        const descriptionKey = `info-description-${index}`
        const isExpanded = expandedDescriptions[descriptionKey] || false
        const descriptionText = section.description
          ? (language === 'ko' ? section.description.ko : section.description.en)
          : null

        const handleToggle = (e) => {
          const textElement = e.currentTarget.parentElement.querySelector('.project-detail-description-text')
          const wasExpanded = expandedDescriptions[descriptionKey] || false

          if (wasExpanded) {
            textElement.style.display = 'block'
            textElement.style.webkitLineClamp = 'unset'

            setTimeout(() => {
              textElement.style.maxHeight = '12.6em'

              setTimeout(() => {
                textElement.style.display = '-webkit-box'
                textElement.style.webkitLineClamp = '7'
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

        // 스케치 이미지 슬라이더용 데이터
        const sketchSliderImages = sketchImages.map((img, imgIndex) => ({
          id: imgIndex + 1,
          src: img,
          alt: `${currentTitle} - Sketch ${imgIndex + 1}`
        }))

        return (
          <React.Fragment key={`info-${index}`}>
            {/* 모바일용 description - 별도 요소로 분리 */}
            {descriptionText && (
              <FadeInUp className="project-detail-description-mobile">
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
                    onClick={handleToggle}
                  >
                    {descriptionText}
                  </div>
                </div>
              </FadeInUp>
            )}

            {/* info 섹션 (데스크탑: 스케치+info+description / 모바일: info만) */}
            <FadeInUp className="project-detail-info">
              <div className="project-detail-info-grid">
                <div className="project-detail-info-sketch-column">
                  <ImageSlider
                    images={sketchSliderImages}
                    autoPlayInterval={5000}
                    className="project-detail-sketch-slider"
                  />
                </div>
                <div className="project-detail-info-container">
                  <div className={`project-detail-info-text project-detail-info-text-${language}`}>
                    <h2 className="project-detail-info-title">{currentTitle}</h2>
                    <p className="project-detail-info-category">{currentCategory} project</p>
                    <div className="project-detail-info-group">
                      {['completion', 'usage', 'projectArea', 'location'].map((key) => {
                        if (!hasValue(section.details[key])) return null
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
                      {['client', 'design', 'construction', 'photo'].map((key) => {
                        if (!hasValue(section.details[key])) return null
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
                  {/* 데스크탑용 description - info 안에 포함 */}
                  {descriptionText && (
                    <div className="project-detail-info-description">
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
                        onClick={handleToggle}
                      >
                        {descriptionText}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeInUp>
          </React.Fragment>
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

      case 'detail':
        // Admin에서 저장한 상세이미지 (rows 형식)
        const detailRows = section.rows || []
        if (detailRows.length === 0) return null

        return (
          <React.Fragment key={`detail-${index}`}>
            {detailRows.map((row, rowIndex) => {
              const rowImages = row.images || []
              if (rowImages.length === 0) return null

              const rowColumns = rowImages.length // 이미지 개수에 따라 컬럼 수 결정

              return (
                <FadeInUp key={`detail-row-${rowIndex}`} className="project-detail-images">
                  <div className={`project-detail-images-grid project-detail-images-grid-${rowColumns}`}>
                    {rowImages.map((image, imgIndex) => (
                      <div key={imgIndex} className="project-detail-image-wrapper">
                        <img
                          src={image}
                          alt={`${currentTitle} - Detail ${rowIndex + 1}-${imgIndex + 1}`}
                          className="project-detail-image"
                        />
                      </div>
                    ))}
                  </div>
                </FadeInUp>
              )
            })}
          </React.Fragment>
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

      <Footer />
    </div>
  )
}

export default ProjectDetail


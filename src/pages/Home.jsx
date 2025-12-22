import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import FadeInUp from '../components/FadeInUp'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  
  // 모바일 슬라이더 상태 (ImageSlider와 동일한 로직)
  const [mobileSlide, setMobileSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // 페이지 타이틀 설정
  useEffect(() => {
    document.title = '아틀리에 아 atelier ah'
  }, [])

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    const removeTimer = setTimeout(() => {
      setShowSplash(false)
    }, 2500) // 페이드아웃 애니메이션 시간(0.5s) 포함

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])
  // Horizontal Line 이미지
  // 절대경로(전체 URL)를 입력하세요
  // 예: 'https://example.com/images/horizontal-line.jpg'
  const horizontalLineImage = "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/main_00.jpg"

  // 슬라이더 이미지 데이터
  // 이미지를 추가하려면 아래 src 속성에 절대경로(전체 URL)를 입력하세요
  // 예: 'https://example.com/images/image1.jpg'
  const sliderImages = [
    { id: 1, src: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_01.jpg", alt: 'Building exterior with vines' },
    { id: 2, src: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_01.jpg", alt: 'Interior hallway' },
    { id: 3, src: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_03.jpg", alt: 'Abstract green squares' },
    { id: 4, src: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_01.jpg", alt: 'Abstract painting' },
    { id: 5, src: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_02.jpg", alt: 'Cafe interior' },
    { id: 6, src: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_01.jpg", alt: 'Cafe interior' },
  ]

  // 프로젝트 데이터
  // 각 프로젝트는 sketch와 photo를 가지고 있음
  // 어드민에서 프로젝트별로 스케치와 대표사진을 삽입할 예정
  const projects = [
    { id: 1, sketch: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_91.jpg", photo: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_01.jpg", title: 'Project 1' },
    { id: 2, sketch: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_91.jpg", photo: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_03.jpg", title: 'Project 2' },
    { id: 3, sketch: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_91.jpg", photo: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_01.jpg", title: 'Project 3' },
    { id: 4, sketch: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_91.jpg", photo: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_02.jpg", title: 'Project 4' },
    { id: 5, sketch: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_91.jpg", photo: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_01.jpg", title: 'Project 5' },
  ]

  // 프로젝트 데이터를 그리드용 이미지 배열로 변환
  // 패턴: sketch - photo / photo - sketch / sketch - photo / photo - sketch
  const images = projects.flatMap((project, index) => {
    const isEvenRow = index % 2 === 0
    // 짝수 행(0, 2, 4...): sketch - photo
    // 홀수 행(1, 3, 5...): photo - sketch
    if (isEvenRow) {
      return [
        { id: `${project.id}-sketch`, src: project.sketch, alt: `${project.title} - Sketch`, type: 'sketch', projectId: project.id },
        { id: `${project.id}-photo`, src: project.photo, alt: `${project.title} - Photo`, type: 'photo', projectId: project.id },
      ]
    } else {
      return [
        { id: `${project.id}-photo`, src: project.photo, alt: `${project.title} - Photo`, type: 'photo', projectId: project.id },
        { id: `${project.id}-sketch`, src: project.sketch, alt: `${project.title} - Sketch`, type: 'sketch', projectId: project.id },
      ]
    }
  })

  // 모바일 슬라이더 - 무한 루프를 위한 배열 복제
  const slideCount = projects.length
  const infiniteProjects = [...projects, ...projects, ...projects]
  const autoPlayInterval = 8000
  
  // 초기 슬라이드 위치 설정 (중간에서 시작)
  useEffect(() => {
    setMobileSlide(slideCount)
  }, [slideCount])

  // 자동 슬라이드
  useEffect(() => {
    if (!isAutoPlaying || isDragging || slideCount === 0) return

    const interval = setInterval(() => {
      setMobileSlide((prev) => {
        const next = prev + 1
        if (next >= slideCount * 2) {
          setTimeout(() => {
            setIsTransitioning(false)
            setMobileSlide(slideCount)
            setTimeout(() => setIsTransitioning(true), 50)
          }, 1000)
          return next
        }
        return next
      })
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [slideCount, isAutoPlaying, isDragging])

  // 마우스 다운 이벤트
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.pageX)
    setCurrentX(e.pageX)
  }

  // 전역 마우스 이벤트
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      setCurrentX(e.pageX)
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging) return
      
      const diff = startX - currentX
      const threshold = 80

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // 다음 슬라이드
          const next = mobileSlide + 1
          if (next >= slideCount * 2) {
            setIsTransitioning(false)
            setMobileSlide(slideCount)
            setTimeout(() => setIsTransitioning(true), 50)
          } else {
            setMobileSlide(next)
          }
        } else {
          // 이전 슬라이드
          const prev = mobileSlide - 1
          if (prev < slideCount) {
            setIsTransitioning(false)
            setMobileSlide(slideCount * 2 - 1)
            setTimeout(() => setIsTransitioning(true), 50)
          } else {
            setMobileSlide(prev)
          }
        }
      }

      setIsDragging(false)
      // 드래그 종료 후 2초 뒤 자동 재생 재개
      setTimeout(() => {
        setIsAutoPlaying(true)
      }, 2000)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, startX, currentX, mobileSlide, slideCount])

  // 터치 이벤트
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.touches[0].pageX)
    setCurrentX(e.touches[0].pageX)
  }

  // 전역 터치 이벤트
  useEffect(() => {
    const handleGlobalTouchMove = (e) => {
      if (!isDragging) return
      setCurrentX(e.touches[0].pageX)
    }

    const handleGlobalTouchEnd = () => {
      if (!isDragging) return
      
      const diff = startX - currentX
      const threshold = 80

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // 다음 슬라이드
          const next = mobileSlide + 1
          if (next >= slideCount * 2) {
            setIsTransitioning(false)
            setMobileSlide(slideCount)
            setTimeout(() => setIsTransitioning(true), 50)
          } else {
            setMobileSlide(next)
          }
        } else {
          // 이전 슬라이드
          const prev = mobileSlide - 1
          if (prev < slideCount) {
            setIsTransitioning(false)
            setMobileSlide(slideCount * 2 - 1)
            setTimeout(() => setIsTransitioning(true), 50)
          } else {
            setMobileSlide(prev)
          }
        }
      }

      setIsDragging(false)
      // 드래그 종료 후 2초 뒤 자동 재생 재개
      setTimeout(() => {
        setIsAutoPlaying(true)
      }, 2000)
    }

    if (isDragging) {
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: true })
      document.addEventListener('touchend', handleGlobalTouchEnd)
    }

    return () => {
      document.removeEventListener('touchmove', handleGlobalTouchMove)
      document.removeEventListener('touchend', handleGlobalTouchEnd)
    }
  }, [isDragging, startX, currentX, mobileSlide, slideCount])


  return (
    <div className="home">
      {showSplash && (
        <div className={`home-splash ${fadeOut ? 'fade-out' : ''}`}>
          <h1 className="home-splash-text">atelier ah</h1>
        </div>
      )}
      <Header />

      <FadeInUp 
        className="home-main-container"
        onClick={showSplash ? undefined : () => navigate('/about')}
        style={{ cursor: showSplash ? 'default' : 'pointer' }}
      >
        <div></div>

        {/* Horizontal Line */}
        <FadeInUp className="home-horizontal-line">
          {horizontalLineImage ? (
            <img src={horizontalLineImage} alt="horizontal line" className="home-horizontal-line-img" />
          ) : (
            <div className="home-horizontal-line-placeholder">
              <span>horizontal line image</span>
            </div>
          )}
        </FadeInUp>

        {/* Description Text */}
        <FadeInUp className="home-description" delay={300}>
          <p>simple horizontal totality through which all this goes</p>
        </FadeInUp>
      </FadeInUp>

      {/* Image Slider */}
      <FadeInUp>
        <ImageSlider 
          images={sliderImages}
          autoPlayInterval={8000}
          className="home-slider"
        />
      </FadeInUp>

      {/* Image Grid - 데스크탑용 */}
      <FadeInUp className="home-image-grid">
        {images.map((image) => (
          <FadeInUp 
            key={image.id}
            className={`home-image-item home-image-item-${image.type}`}
          >
            {image.src ? (
              <img src={image.src} alt={image.alt} />
            ) : (
              <div className="home-image-placeholder">
                <span>{image.alt}</span>
              </div>
            )}
          </FadeInUp>
        ))}
      </FadeInUp>

      {/* Mobile Slider - 모바일용 */}
      <div 
        className="home-mobile-slider"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="home-mobile-slider-wrapper"
          style={{
            transform: `translateX(calc(-${mobileSlide * 60}vw + ${isDragging ? (currentX - startX) : 0}px))`,
            transition: isDragging || !isTransitioning ? 'none' : 'transform 1s ease-in-out'
          }}
        >
          {infiniteProjects.map((project, index) => (
            <div key={`${project.id}-${index}`} className="home-mobile-slide">
              <div className="home-mobile-slide-inner">
                <div className="home-mobile-slide-sketch">
                  <img src={project.sketch} alt={`${project.title} - Sketch`} />
                </div>
                <div className="home-mobile-slide-photo">
                  <img src={project.photo} alt={`${project.title} - Photo`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
        <footer className="home-footer">
          <p>©2023 by atelier ah</p>
        </footer>
    </div>
  )
}

export default Home

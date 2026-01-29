import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'
import FadeInUp from '../components/FadeInUp'
import { getHomeData, defaultHomeData } from '../services/homeService'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [showSplash, setShowSplash] = useState(true)
  const [textFadeIn, setTextFadeIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  // 모바일 슬라이더 상태 (ImageSlider와 동일한 로직)
  const [mobileSlide, setMobileSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Firebase에서 가져온 이미지 데이터
  const [homeData, setHomeData] = useState(null)

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    document.title = 'atelier ah'
  }, [])

  // Firebase에서 Home 데이터 불러오기
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHomeData()
        setHomeData(data)
      } catch (error) {
        console.error('Home 데이터 로드 실패:', error)
        setHomeData(defaultHomeData)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    // 0.5초 후 텍스트 페이드인
    const textFadeInTimer = setTimeout(() => {
      setTextFadeIn(true)
    }, 500)

    // 3초 후 텍스트와 배경 함께 페이드아웃
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 3000)

    const removeTimer = setTimeout(() => {
      setShowSplash(false)
    }, 3600) // 페이드아웃 애니메이션 시간(0.6s) 포함

    return () => {
      clearTimeout(textFadeInTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  // Horizontal Line 이미지
  const horizontalLineImage = "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/main_00.jpg"

  // 슬라이더 이미지 데이터 (Firebase에서 가져온 데이터 사용)
  const sliderImages = (homeData?.sliderImages || defaultHomeData.sliderImages).map((img, index) => ({
    id: img.id || index + 1,
    src: img.src,
    alt: `Slider image ${index + 1}`,
    link: img.link
  }))

  // 프로젝트 이미지 데이터 (스케치 + 포토 통합)
  const projects = (homeData?.projectImages || defaultHomeData.projectImages).map((item, index) => ({
    id: item.id || index + 1,
    sketch: item.sketchSrc,
    sketchLink: item.link || null,
    photo: item.photoSrc,
    photoLink: item.link || null,
    title: `Project ${index + 1}`
  }))

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
          <h1 className={`home-splash-text ${textFadeIn ? 'text-fade-in' : ''}`}>simple horizontal totality through which all this goes</h1>
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

        {/* Description Text (Firebase에서 불러옴) */}
        <FadeInUp className="home-description" delay={300}>
          {/* PC용 텍스트 */}
          <p className="home-description-pc">{homeData?.sloganPc || defaultHomeData.sloganPc}</p>
          {/* 모바일용 텍스트 */}
          <p className="home-description-mobile">{homeData?.sloganMobile || defaultHomeData.sloganMobile}</p>
        </FadeInUp>
      </FadeInUp>

      {/* Image Slider or Video */}
      <FadeInUp>
        {homeData?.sliderType === 'video' && homeData?.sliderVideoUrl ? (
          <div className="home-video-slider">
            <div className="home-video-container">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(homeData.sliderVideoUrl)}?autoplay=1&mute=1&loop=1&playlist=${extractYouTubeId(homeData.sliderVideoUrl)}&playsinline=1&controls=0`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <ImageSlider
            images={sliderImages}
            autoPlayInterval={8000}
            className="home-slider"
          />
        )}
      </FadeInUp>

      {/* Image Grid - 데스크탑용 */}
      <FadeInUp className="home-image-grid">
        {projects.map((project) => (
          <FadeInUp
            key={project.id}
            className="home-image-row"
          >
            <div
              className="home-image-item home-image-item-sketch"
              onClick={() => project.sketchLink && navigate(project.sketchLink)}
              style={{ cursor: project.sketchLink ? 'pointer' : 'default' }}
            >
              <img src={project.sketch} alt={`${project.title} - Sketch`} />
            </div>
            <div
              className="home-image-item home-image-item-photo"
              onClick={() => project.photoLink && navigate(project.photoLink)}
              style={{ cursor: project.photoLink ? 'pointer' : 'default' }}
            >
              <img src={project.photo} alt={`${project.title} - Photo`} />
            </div>
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
            <div
              key={`${project.id}-${index}`}
              className="home-mobile-slide"
              onClick={(e) => {
                // 드래그가 아닌 클릭일 때만 링크 이동 (이동 거리 10px 이하)
                if (Math.abs(startX - currentX) < 10 && project.photoLink) {
                  navigate(project.photoLink)
                }
              }}
            >
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

      <Footer />
    </div>
  )
}

// YouTube URL에서 video ID 추출
function extractYouTubeId(url) {
  if (!url) return ''

  // youtu.be 형식
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return shortMatch[1]

  // youtube.com/watch?v= 형식
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (longMatch) return longMatch[1]

  // youtube.com/embed/ 형식
  const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]+)/)
  if (embedMatch) return embedMatch[1]

  return ''
}

export default Home

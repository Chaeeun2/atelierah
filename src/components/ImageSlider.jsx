import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ImageSlider.css'

// 스켈레톤 이미지 컴포넌트
function SkeletonImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`slider-skeleton-wrapper ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}>
      {!isLoaded && !hasError && <div className="slider-skeleton-box" />}
      {hasError && <div className="slider-skeleton-error" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ opacity: isLoaded && !hasError ? 1 : 0 }}
      />
    </div>
  )
}

// 유튜브 URL을 embed URL로 변환 (자동재생, 음소거, 반복)
function getYouTubeEmbedUrl(url) {
  if (!url) return null
  
  let videoId = null
  
  // youtube.com/watch?v=VIDEO_ID 형식
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) {
    videoId = watchMatch[1]
  }
  
  // youtu.be/VIDEO_ID 형식
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) {
    videoId = shortMatch[1]
  }
  
  // 이미 embed URL인 경우
  const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/)
  if (embedMatch) {
    videoId = embedMatch[1]
  }
  
  if (!videoId) return null
  
  // 자동재생, 음소거, 반복, 컨트롤 숨김 파라미터 추가
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&controls=0`
}

function ImageSlider({ images = [], videoUrl = '', autoPlayInterval = 8000, className = '', onSlideClick }) {
  const navigate = useNavigate()
  
  // 영상이 있으면 영상만 표시 (이미지 무시)
  const embedUrl = getYouTubeEmbedUrl(videoUrl)
  const slides = embedUrl 
    ? [{ id: 'video', type: 'video', embedUrl }]
    : images

  const slideCount = slides.length
  const isSingleImage = slideCount <= 1
  
  // 무한 루프를 위해 슬라이드 배열 복제 (1장일 때는 복제하지 않음)
  const infiniteSlides = isSingleImage ? slides : [...slides, ...slides, ...slides]

  const [currentSlide, setCurrentSlide] = useState(isSingleImage ? 0 : slideCount) // 중간 위치에서 시작 (1장일 때는 0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const dragDistance = useRef(0)

  // 슬라이드 수가 변경될 때 currentSlide 재설정
  useEffect(() => {
    if (isSingleImage) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(slideCount)
    }
  }, [slideCount, isSingleImage])

  // 자동 슬라이드 (드래그 중이 아닐 때만, 1장일 때는 비활성화)
  useEffect(() => {
    if (!isAutoPlaying || isDragging || slideCount === 0 || isSingleImage) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1
        // 마지막 슬라이드 다음으로 넘어갈 때는 transition 없이 중간으로 이동
        if (next >= slideCount * 2) {
          // transition 완료 후 중간으로 이동
          setTimeout(() => {
            setIsTransitioning(false)
            setCurrentSlide(slideCount)
            setTimeout(() => setIsTransitioning(true), 50)
          }, 1000)
          return next
        }
        return next
      })
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [slideCount, isAutoPlaying, isDragging, autoPlayInterval])

  // 마우스 다운 이벤트
  const handleMouseDown = (e) => {
    if (isSingleImage) return // 1장일 때는 드래그 비활성화
    e.preventDefault()
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.pageX)
    setCurrentX(e.pageX)
    dragDistance.current = 0
  }

  // 전역 마우스 이동 이벤트
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      setCurrentX(e.pageX)
      dragDistance.current = Math.abs(startX - e.pageX)
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging) return
      
      const diff = startX - currentX
      const threshold = 80 // 최소 드래그 거리

      if (Math.abs(diff) > threshold && !isSingleImage) {
        if (diff > 0) {
          // 오른쪽으로 드래그 (다음 슬라이드)
          const next = currentSlide + 1
          setCurrentSlide(next)
          
          // 마지막 슬라이드를 넘어가면 애니메이션 후 중간으로 이동
          if (next >= slideCount * 2) {
            setTimeout(() => {
              setIsTransitioning(false)
              setCurrentSlide(slideCount)
              setTimeout(() => setIsTransitioning(true), 50)
            }, 1000) // 트랜지션 시간(1s)과 동일
          }
        } else {
          // 왼쪽으로 드래그 (이전 슬라이드)
          const prev = currentSlide - 1
          setCurrentSlide(prev)
          
          // 첫 번째 슬라이드 이전으로 가면 애니메이션 후 중간으로 이동
          if (prev < slideCount) {
            setTimeout(() => {
              setIsTransitioning(false)
              setCurrentSlide(slideCount * 2 - 1)
              setTimeout(() => setIsTransitioning(true), 50)
            }, 1000) // 트랜지션 시간(1s)과 동일
          }
        }
      }

      setIsDragging(false)
      // 드래그가 끝난 후 2초 뒤에 자동 재생 재개
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
  }, [isDragging, startX, currentX, currentSlide, slideCount, isSingleImage])

  // 터치 이벤트 (모바일 지원)
  const handleTouchStart = (e) => {
    if (isSingleImage) return // 1장일 때는 드래그 비활성화
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.touches[0].pageX)
    setCurrentX(e.touches[0].pageX)
    dragDistance.current = 0
  }

  // 전역 터치 이벤트
  useEffect(() => {
    const handleGlobalTouchMove = (e) => {
      if (!isDragging) return
      setCurrentX(e.touches[0].pageX)
      dragDistance.current = Math.abs(startX - e.touches[0].pageX)
    }

    const handleGlobalTouchEnd = () => {
      if (!isDragging) return
      
      const diff = startX - currentX
      const threshold = 80

      if (Math.abs(diff) > threshold && !isSingleImage) {
        if (diff > 0) {
          // 오른쪽으로 드래그 (다음 슬라이드)
          const next = currentSlide + 1
          setCurrentSlide(next)
          
          // 마지막 슬라이드를 넘어가면 애니메이션 후 중간으로 이동
          if (next >= slideCount * 2) {
            setTimeout(() => {
              setIsTransitioning(false)
              setCurrentSlide(slideCount)
              setTimeout(() => setIsTransitioning(true), 50)
            }, 1000)
          }
        } else {
          // 왼쪽으로 드래그 (이전 슬라이드)
          const prev = currentSlide - 1
          setCurrentSlide(prev)
          
          // 첫 번째 슬라이드 이전으로 가면 애니메이션 후 중간으로 이동
          if (prev < slideCount) {
            setTimeout(() => {
              setIsTransitioning(false)
              setCurrentSlide(slideCount * 2 - 1)
              setTimeout(() => setIsTransitioning(true), 50)
            }, 1000)
          }
        }
      }

      setIsDragging(false)
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
  }, [isDragging, startX, currentX, currentSlide, slideCount, isSingleImage])
  
  // 슬라이드 클릭 핸들러 (드래그가 아닌 클릭일 때만)
  const handleSlideClick = (slide) => {
    // 드래그 거리가 10px 이하일 때만 클릭으로 인식
    if (dragDistance.current < 10 && slide.link) {
      if (onSlideClick) {
        onSlideClick(slide.link)
      } else if (navigate) {
        navigate(slide.link)
      }
    }
  }

  if (slideCount === 0) {
    return null
  }

  return (
    <div className={`image-slider ${className}`}>
      <div 
        className={`image-slider-container ${className ? `${className}-container` : ''}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isSingleImage ? 'default' : (isDragging ? 'grabbing' : 'grab') }}
      >
        <div 
          className="image-slider-wrapper"
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${isDragging ? (currentX - startX) : 0}px))`,
            transition: isDragging || !isTransitioning ? 'none' : 'transform 1s ease-in-out'
          }}
        >
          {infiniteSlides.map((slide, index) => (
            <div 
              key={`${slide.id}-${index}`} 
              className="image-slider-item"
              onClick={() => handleSlideClick(slide)}
              style={{ cursor: slide.link ? 'pointer' : 'default' }}
            >
              {slide.type === 'video' ? (
                <iframe
                  src={slide.embedUrl}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="image-slider-video"
                />
              ) : slide.src ? (
                <SkeletonImage src={slide.src} alt={slide.alt} />
              ) : (
                <div className="image-slider-placeholder">
                  <span>{slide.alt}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="image-slider-indicators">
        <span className="image-slider-counter">
          {(currentSlide % slideCount) + 1} / {slideCount}
        </span>
      </div>
    </div>
  )
}

export default ImageSlider



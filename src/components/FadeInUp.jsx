import { useRef, useEffect, useState } from 'react'
import './FadeInUp.css'

function FadeInUp({ children, className = '', delay = 0, threshold = 0.1, ...restProps }) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // 초기 렌더링 후 transition 활성화
  useEffect(() => {
    // 약간의 지연을 두어 초기 상태가 먼저 적용되도록
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isReady) return

    const observerOptions = {
      threshold: threshold,
      rootMargin: '0px 0px 0px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // delay가 있으면 지연 후 애니메이션 시작
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          // 한 번만 애니메이션되도록 observer 해제
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
      observer.disconnect()
    }
  }, [delay, threshold, isReady])

  return (
    <div 
      ref={elementRef}
      className={`fade-in-up ${isReady ? 'ready' : ''} ${isVisible ? 'visible' : ''} ${className}`}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default FadeInUp


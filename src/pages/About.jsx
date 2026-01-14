import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import FadeInUp from '../components/FadeInUp'
import './About.css'

// 이미지 이동 퍼센테이지 설정 (step당 이동량)
const IMAGE_TRANSLATE_DESKTOP = 22 // 데스크톱: step당 22% 이동
const IMAGE_TRANSLATE_MOBILE = 23  // 모바일: step당 30% 이동 (조절 가능)

function About() {
  const imageSectionRef = useRef(null)
  const spacerRef = useRef(null)
  const [imageStep, setImageStep] = useState(0) // 0: 왼쪽 끝, 1: 가운데, 2: 오른쪽 끝
  const [isMobile, setIsMobile] = useState(false)
  const { language } = useLanguage()

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    document.title = 'about - atelier ah'
  }, [])

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!spacerRef.current) return

      const spacer = spacerRef.current
      const spacerTop = spacer.offsetTop
      const spacerHeight = spacer.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      // spacer가 화면에 들어오기 시작하는 지점
      const startScroll = spacerTop - windowHeight
      // spacer가 화면에서 완전히 나가는 지점
      const endScroll = spacerTop + spacerHeight

      // 스크롤 진행도 계산 (0 ~ 1)
      let progress = 0
      if (scrollY >= startScroll && scrollY <= endScroll) {
        progress = (scrollY - startScroll) / (endScroll - startScroll)
        progress = Math.max(0, Math.min(1, progress)) // 0과 1 사이로 제한
      } else if (scrollY > endScroll) {
        progress = 1
      }

      // 진행도를 0, 1, 2 단계로 변환
      // 0 ~ 0.33: step 0
      // 0.33 ~ 0.66: step 1
      // 0.66 ~ 1: step 2
      let step = 0
      if (progress >= 0.66) {
        step = 2
      } else if (progress >= 0.33) {
        step = 1
      } else {
        step = 0
      }

      setImageStep(step)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 계산

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 단계에 따라 이미지 위치 계산 (모바일/데스크톱 구분)
  const translateAmount = isMobile ? IMAGE_TRANSLATE_MOBILE : IMAGE_TRANSLATE_DESKTOP
  const imageTranslateX = -imageStep * translateAmount

  // Description 텍스트 데이터 (국문/영문, 데스크톱/모바일)
  const descriptions = [
    { 
      id: 1, 
      ko: `"Ah"란 원초적인 아름다움을 마주했을 때,
존재와 인식이 일치하는 순간에 터져 나오는 감탄사라 말한다.
그것은 이성과 감성이 교차하는 지점이며, 논리를 넘어선 찰나의 질서를 만들어낸다.`,
      ko_mobile: `"Ah"란 원초적인 아름다움을 마주했을 때,
존재와 인식이 일치하는 순간에 터져 나오는 감탄사라 말한다.
그것은 이성과 감성이 교차하는 지점이며,
논리를 넘어선 찰나의 질서를 만들어낸다.`,
      en: `"Ah" refers to an exclamation that explodes at the moment
when existence and perception coincide when facing raw beauty.
It is the point where reason and emotion intersect, creating a momentary order beyond logic.`,
      en_mobile: `"Ah" refers to an exclamation that explodes at the moment
when existence and perception coincide when facing raw beauty.
It is the point where reason and emotion intersect,
creating a momentary order beyond logic.`
    },
    { 
      id: 2, 
      ko: `atelier ah는 이러한 'Ah'의 순간으로부터 출발한다.
순수한 이미지의 파동과 공간에 내재된 분위기 사이를 잇는 하나의 수평적 언어로서 존재한다.`,
      ko_mobile: `atelier ah는 이러한 'Ah'의 순간으로부터 출발한다.
순수한 이미지의 파동과 공간에 내재된 분위기 사이를 잇는
하나의 수평적 언어로서 존재한다.`,
      en: `Atelier ah begins from this moment of "Ah."
It exists as a horizontal language, connecting the waves of pure images with the atmosphere inherent in space.`,
      en_mobile: `Atelier ah begins from this moment of "Ah."
It exists as a horizontal language, connecting the waves of
pure images with the atmosphere inherent in space.`
    },
    { 
      id: 3, 
      ko: `우리는 공간의 본래적 장소성과 사물, 인간, 형태, 소리, 색, 그리고 그들 사이의 관계를
솔직하게 마주하며, 고유한 의미와 이야기의 질서를 구축하고자 한다.`,
      ko_mobile: `우리는 공간의 본래적 장소성과 사물, 인간, 형태, 소리, 색,
      그리고 그들 사이의 관계를 솔직하게 마주하며,
      고유한 의미와 이야기의 질서를 구축하고자 한다.`,
      en: `We honestly confront the inherent placeness of space, objects, people, shapes, sounds, colors,
and the relationship between them, and seek to establish a unique order of meaning and narrative.`,
      en_mobile: `We honestly confront the inherent placeness of
      space, objects, people, shapes, sounds, colors,
and the relationship between them, and seek to establish
a unique order of meaning and narrative.`
    },
  ]

  // 현재 언어와 디바이스에 맞는 텍스트 가져오기
  const getDescriptionText = (desc) => {
    if (isMobile) {
      return language === 'ko' ? desc.ko_mobile : desc.en_mobile
    }
    return language === 'ko' ? desc.ko : desc.en
  }

  return (
    <div className="about">
      <Header />
      
      {/* 스크롤 이미지 섹션 */}
      <div className="about-image-section-wrapper">
        <div ref={imageSectionRef} className="about-image-section">
          <FadeInUp className="about-image-container">
            <img 
              src="https://pub-4b716c374bc747948e9ac588042939de.r2.dev/about_00.jpg"
              alt="About"
              className="about-scroll-image"
              style={{
                transform: `translateX(${imageTranslateX}%)`
              }}
            />
          </FadeInUp>
          
          {/* Description 텍스트 */}
          <FadeInUp className="about-description-container" delay={300}>
            {descriptions.map((desc, index) => (
              <div
                key={desc.id}
                className={`about-description about-description-${language} ${imageStep === index ? 'active' : ''}`}
              >
                {getDescriptionText(desc)}
              </div>
            ))}
          </FadeInUp>
        </div>
      </div>
      
      {/* 가상 스크롤 공간 */}
      <div ref={spacerRef} className="about-spacer"></div>
    </div>
  )
}

export default About


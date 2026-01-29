import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import FadeInUp from '../components/FadeInUp'
import { getAboutData, defaultAboutData } from '../services/aboutService'
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
  
  // Firebase에서 가져온 텍스트 데이터
  const [aboutData, setAboutData] = useState(null)

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    document.title = 'about - atelier ah'
  }, [])

  // Firebase에서 About 데이터 불러오기
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAboutData()
        setAboutData(data)
      } catch (error) {
        console.error('About 데이터 로드 실패:', error)
        setAboutData(defaultAboutData)
      }
    }
    loadData()
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

  // 3개 문단 데이터 가져오기 (Firebase 데이터 사용)
  const getDescriptions = () => {
    const data = aboutData || defaultAboutData
    return [
      {
        id: 1,
        text: language === 'ko' 
          ? (isMobile ? data.paragraph1?.koMobile : data.paragraph1?.koPc)
          : (isMobile ? data.paragraph1?.enMobile : data.paragraph1?.enPc)
      },
      {
        id: 2,
        text: language === 'ko'
          ? (isMobile ? data.paragraph2?.koMobile : data.paragraph2?.koPc)
          : (isMobile ? data.paragraph2?.enMobile : data.paragraph2?.enPc)
      },
      {
        id: 3,
        text: language === 'ko'
          ? (isMobile ? data.paragraph3?.koMobile : data.paragraph3?.koPc)
          : (isMobile ? data.paragraph3?.enMobile : data.paragraph3?.enPc)
      }
    ]
  }

  const descriptions = getDescriptions()

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
          
          {/* Description 텍스트 - 스크롤에 따라 3단계로 변경 */}
          <FadeInUp className="about-description-container" delay={300}>
            {descriptions.map((desc, index) => (
              <div
                key={desc.id}
                className={`about-description about-description-${language} ${imageStep === index ? 'active' : ''}`}
              >
                {desc.text}
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


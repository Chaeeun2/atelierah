import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FadeInUp from '../components/FadeInUp'
import './Contact.css'

function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    document.title = 'contact - atelier ah'
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: DB 연동 시 이 부분에 API 호출 추가
    console.log('Form submitted:', formData)
    
    // 임시로 1초 후 완료 처리
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      })
      alert(language === 'ko' ? '메시지가 전송되었습니다.' : 'Message sent successfully.')
    }, 1000)
  }

  const content = {
    ko: {
      description: `atelier ah는 'Ah'의 순간으로부터 출발한다.
순수한 이미지의 파동과 공간에 내재된 분위기 사이를 잇는
하나의 수평적 언어로서 존재한다.`,
      contact: {
        email: {
          text: 'info@atelierah.com',
          href: 'mailto:info@atelierah.com'
        },
        instagram: {
          text: 'instagram @atelierah_official',
          href: 'https://www.instagram.com/atelierah_official'
        },
        address: '18-1, Jeongneung-ro 10ra-gil, Seongbuk-gu, Seoul, Republic of Korea'
      },
      form: {
        name: 'name',
        phone: 'phone number',
        email: 'email',
        message: 'message',
        send: 'send'
      }
    },
    en: {
      description: `atelier ah begins from moments of 'Ah'.
It exists as a horizontal language connecting the waves of pure imagery
and the atmosphere inherent in space.`,
      contact: {
        email: {
          text: 'info@atelierah.com',
          href: 'mailto:info@atelierah.com'
        },
        instagram: {
          text: 'instagram @atelierah_official',
          href: 'https://www.instagram.com/atelierah_official'
        },
        address: '18-1, Jeongneung-ro 10ra-gil, Seongbuk-gu, Seoul, Republic of Korea'
      },
      form: {
        name: 'name',
        phone: 'phone number',
        email: 'email',
        message: 'message',
        send: 'send'
      }
    }
  }

  const currentContent = content[language]

  return (
    <div className="contact">
      <Header />

      <div className="contact-container">
        <div className="contact-grid">
          {/* 왼쪽: 설명 및 연락처 */}
          <FadeInUp className="contact-left">
            <div className={`contact-description contact-description-${language}`}>
              {currentContent.description}
            </div>
            
            <div className="contact-info">
              <a 
                href={currentContent.contact.email.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentContent.contact.email.text}
              </a>
              <a 
                href={currentContent.contact.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentContent.contact.instagram.text}
              </a>
              <p>{currentContent.contact.address}</p>
            </div>
          </FadeInUp>

          {/* 오른쪽: 컨택 폼 */}
          <FadeInUp className="contact-right" delay={200}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <label htmlFor="name">{currentContent.form.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="phone">{currentContent.form.phone}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="email">{currentContent.form.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="message">{currentContent.form.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="8"
                  required
                />
              </div>

              <div className="contact-form-submit">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '...' : currentContent.form.send}
                </button>
              </div>
            </form>
          </FadeInUp>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact


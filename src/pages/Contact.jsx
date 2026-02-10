import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import emailjs from '@emailjs/browser'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FadeInUp from '../components/FadeInUp'
import { getContactInfo, addInquiry, defaultContactInfo } from '../services/contactService'
import './Contact.css'

// EmailJS 설정
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function Contact() {
  const { language } = useLanguage()
  const [contactInfo, setContactInfo] = useState(defaultContactInfo)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  // 페이지 타이틀 설정 (브라우저 탭용 - 영문만)
  useEffect(() => {
    document.title = 'contact - atelier ah'
  }, [])

  // Firebase에서 Contact 정보 로드
  useEffect(() => {
    async function loadContactData() {
      try {
        const data = await getContactInfo()
        setContactInfo(data)
      } catch (error) {
        // error handling
      } finally {
        setLoading(false)
      }
    }
    loadContactData()
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

    try {
      // Firebase에 문의 저장
      await addInquiry(formData)

      // EmailJS로 이메일 전송
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            timestamp: new Date().toLocaleString('ko-KR', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            contact_name: formData.name,
            phone_number: formData.phone || '(미입력)',
            email: formData.email,
            inquiry_content: formData.message
          },
          EMAILJS_PUBLIC_KEY
        )
      }

      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      })
      alert(language === 'ko' ? '메시지가 전송되었습니다.' : 'Message sent successfully.')
    } catch (error) {
      alert(language === 'ko' ? '전송에 실패했습니다. 다시 시도해주세요.' : 'Failed to send. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = {
    ko: {
      description: contactInfo.description?.ko || defaultContactInfo.description.ko,
      contact: {
        email: {
          text: contactInfo.email || defaultContactInfo.email,
          href: `mailto:${contactInfo.email || defaultContactInfo.email}`
        },
        instagram: {
          text: `instagram ${contactInfo.instagram?.id || defaultContactInfo.instagram.id}`,
          href: contactInfo.instagram?.url || defaultContactInfo.instagram.url
        },
        address: contactInfo.address?.ko || defaultContactInfo.address.ko
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
      description: contactInfo.description?.en || defaultContactInfo.description.en,
      contact: {
        email: {
          text: contactInfo.email || defaultContactInfo.email,
          href: `mailto:${contactInfo.email || defaultContactInfo.email}`
        },
        instagram: {
          text: `instagram ${contactInfo.instagram?.id || defaultContactInfo.instagram.id}`,
          href: contactInfo.instagram?.url || defaultContactInfo.instagram.url
        },
        address: contactInfo.address?.en || defaultContactInfo.address.en
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

  if (loading) {
    return (
      <div className="contact">
        <Header />
        <div className="contact-container">
        </div>
      </div>
    )
  }

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

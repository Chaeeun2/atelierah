import { useState, useEffect } from 'react'
import {
    getContactInfo, saveContactInfo, getInquiries, deleteInquiry, defaultContactInfo
} from '../../services/contactService'

function AdminContact() {
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('inquiries')

    // Contact 정보 상태
    const [contactInfo, setContactInfo] = useState(defaultContactInfo)
    const [infoSaving, setInfoSaving] = useState(false)

    // 문의사항 상태
    const [inquiries, setInquiries] = useState([])
    const [inquiriesLoading, setInquiriesLoading] = useState(false)

    useEffect(() => {
        loadContactInfo()
        if (activeTab === 'inquiries') {
            loadInquiries()
        }
    }, [activeTab])

    // Contact 정보 로드
    async function loadContactInfo() {
        try {
            setLoading(true)
            const data = await getContactInfo()
            setContactInfo(data)
        } catch (error) {
            console.error('Contact 정보 로딩 실패:', error)
        } finally {
            setLoading(false)
        }
    }

    // 문의사항 목록 로드
    async function loadInquiries() {
        try {
            setInquiriesLoading(true)
            const data = await getInquiries()
            setInquiries(data)
        } catch (error) {
            console.error('문의사항 로딩 실패:', error)
        } finally {
            setInquiriesLoading(false)
        }
    }

    // Contact 정보 저장
    async function handleSaveContactInfo() {
        try {
            setInfoSaving(true)
            await saveContactInfo(contactInfo)
            alert('Contact 정보가 저장되었습니다.')
        } catch (error) {
            console.error('Contact 정보 저장 실패:', error)
            alert('저장에 실패했습니다: ' + error.message)
        } finally {
            setInfoSaving(false)
        }
    }

    // Contact 정보 입력 처리
    const handleContactInfoChange = (field, value, subField = null) => {
        if (subField) {
            setContactInfo(prev => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    [subField]: value
                }
            }))
        } else {
            setContactInfo(prev => ({
                ...prev,
                [field]: value
            }))
        }
    }

    // 문의사항 삭제
    async function handleDeleteInquiry(inquiryId) {
        if (!window.confirm('이 문의사항을 삭제하시겠습니까?')) return

        try {
            await deleteInquiry(inquiryId)
            setInquiries(prev => prev.filter(i => i.id !== inquiryId))
        } catch (error) {
            console.error('문의사항 삭제 실패:', error)
            alert('삭제에 실패했습니다.')
        }
    }

    // 날짜 포맷팅
    const formatDate = (dateValue) => {
        if (!dateValue) return '-'

        try {
            let date
            if (dateValue && typeof dateValue === 'object' && dateValue.toDate) {
                date = dateValue.toDate()
            } else {
                date = new Date(dateValue)
            }

            if (isNaN(date.getTime())) return '-'

            return date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch (error) {
            return '-'
        }
    }

    if (loading) {
        return (
            <div className="admin-content-main">
                <p>로딩 중...</p>
            </div>
        )
    }

    return (
        <div className="admin-content-main admin-contact-page">
            {/* 탭 */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inquiries')}
                >
                    문의 관리 ({inquiries.length})
                </button>
                <button
                    className={`admin-tab ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}
                >
                    정보 관리
                </button>
            </div>

            {/* 문의 관리 탭 */}
            {activeTab === 'inquiries' && (
                <div className="admin-home-section">
                    {/* 섹션 헤더 */}
                    <div className="admin-section-header">
                        <h2 className="admin-section-title">문의사항 목록</h2>
                    </div>

                    {/* 문의사항 목록 */}
                    {inquiriesLoading ? (
                        <p>로딩 중...</p>
                    ) : inquiries.length === 0 ? (
                        <div className="admin-empty-state">
                            <p>등록된 문의사항이 없습니다.</p>
                        </div>
                    ) : (
                        <div className="admin-inquiries-list">
                            {inquiries.map((inquiry) => (
                                <div key={inquiry.id} className="admin-inquiry-card">
                                    <div className="admin-inquiry-content">
                                        <div className="admin-inquiry-fields">
                                            <div className="admin-inquiry-row">
                                                <span className="admin-inquiry-label">이름</span>
                                                <span className="admin-inquiry-value">{inquiry.name}</span>
                                            </div>
                                            <div className="admin-inquiry-row">
                                                <span className="admin-inquiry-label">이메일</span>
                                                <span className="admin-inquiry-value">{inquiry.email}</span>
                                            </div>
                                            <div className="admin-inquiry-row">
                                                <span className="admin-inquiry-label">연락처</span>
                                                <span className="admin-inquiry-value">{inquiry.phone || '-'}</span>
                                            </div>
                                            <div className="admin-inquiry-row">
                                                <span className="admin-inquiry-label">내용</span>
                                            </div>
                                        </div>
                                        <div className="admin-inquiry-actions">
                                            <span className="admin-inquiry-date">{formatDate(inquiry.createdAt)}</span>
                                            <button
                                                className="admin-button admin-button-small admin-button-danger"
                                                onClick={() => handleDeleteInquiry(inquiry.id)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                    <div className="admin-inquiry-message">
                                        {inquiry.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 정보 관리 탭 */}
            {activeTab === 'info' && (
                <div className="admin-home-section">
                    {/* 섹션 헤더 */}
                    <div className="admin-section-header">
                        <h2 className="admin-section-title" style={{ marginBottom: '10px' }}>Contact 정보</h2>
                        <div className="admin-header-controls">
                            <button
                                className="admin-button admin-button-primary admin-save-btn"
                                onClick={handleSaveContactInfo}
                                disabled={infoSaving}
                            >
                                {infoSaving ? '저장 중...' : '변경사항 저장'}
                            </button>
                        </div>
                    </div>

                    {/* Contact 정보 폼 */}
                    <div className="admin-contact-info-form">
                        {/* 주소 */}
                        <div className="admin-contact-section">
                            <h3 className="admin-contact-section-title">주소</h3>
                            <div className="admin-contact-field-row">
                                <div className="admin-contact-field">
                                    <label>국문</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={contactInfo.address?.ko || ''}
                                        onChange={(e) => handleContactInfoChange('address', e.target.value, 'ko')}
                                        placeholder="서울특별시 성북구 창경궁로 43길 41"
                                    />
                                </div>
                                <div className="admin-contact-field">
                                    <label>영문</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={contactInfo.address?.en || ''}
                                        onChange={(e) => handleContactInfoChange('address', e.target.value, 'en')}
                                        placeholder="41, Changgyeonggung-ro 43-gil, Seongbuk-gu, Seoul, South Korea"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 연락처 정보 */}
                        <div className="admin-contact-section">
                            <h3 className="admin-contact-section-title">연락처 정보</h3>
                            <div className="admin-contact-field">
                                <label>이메일</label>
                                <input
                                    type="email"
                                    className="admin-input"
                                    value={contactInfo.email || ''}
                                    onChange={(e) => handleContactInfoChange('email', e.target.value)}
                                    placeholder="info@atelierah.com"
                                />
                            </div>
                        </div>

                        {/* SNS 정보 */}
                        <div className="admin-contact-section">
                            <h3 className="admin-contact-section-title">SNS 정보</h3>
                            <div className="admin-contact-field-row">
                                <div className="admin-contact-field">
                                    <label>아이디</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={contactInfo.instagram?.id || ''}
                                        onChange={(e) => handleContactInfoChange('instagram', e.target.value, 'id')}
                                        placeholder="@atelierah_official"
                                    />
                                </div>
                                <div className="admin-contact-field">
                                    <label>URL</label>
                                    <input
                                        type="url"
                                        className="admin-input"
                                        value={contactInfo.instagram?.url || ''}
                                        onChange={(e) => handleContactInfoChange('instagram', e.target.value, 'url')}
                                        placeholder="https://www.instagram.com/atelierah_official/"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 소개글 */}
                        <div className="admin-contact-section">
                            <h3 className="admin-contact-section-title">소개글</h3>
                            <div className="admin-contact-field-row">
                                <div className="admin-contact-field admin-contact-field-textarea">
                                    <label>국문</label>
                                    <textarea
                                        className="admin-textarea"
                                        value={contactInfo.description?.ko || ''}
                                        onChange={(e) => handleContactInfoChange('description', e.target.value, 'ko')}
                                        rows={4}
                                        placeholder="국문 소개글을 입력하세요"
                                    />
                                </div>
                                <div className="admin-contact-field admin-contact-field-textarea">
                                    <label>영문</label>
                                    <textarea
                                        className="admin-textarea"
                                        value={contactInfo.description?.en || ''}
                                        onChange={(e) => handleContactInfoChange('description', e.target.value, 'en')}
                                        rows={4}
                                        placeholder="Enter description in English"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminContact

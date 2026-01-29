import { useState, useEffect } from 'react'
import { getAboutData, saveAboutData, defaultAboutData } from '../../services/aboutService'

function AdminAbout() {
    // 문단 1
    const [p1KoPc, setP1KoPc] = useState('')
    const [p1KoMobile, setP1KoMobile] = useState('')
    const [p1EnPc, setP1EnPc] = useState('')
    const [p1EnMobile, setP1EnMobile] = useState('')
    // 문단 2
    const [p2KoPc, setP2KoPc] = useState('')
    const [p2KoMobile, setP2KoMobile] = useState('')
    const [p2EnPc, setP2EnPc] = useState('')
    const [p2EnMobile, setP2EnMobile] = useState('')
    // 문단 3
    const [p3KoPc, setP3KoPc] = useState('')
    const [p3KoMobile, setP3KoMobile] = useState('')
    const [p3EnPc, setP3EnPc] = useState('')
    const [p3EnMobile, setP3EnMobile] = useState('')

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')

    // About 데이터 불러오기
    useEffect(() => {
        async function loadAboutData() {
            setLoading(true)
            try {
                const data = await getAboutData()
                // 문단 1
                setP1KoPc(data.paragraph1?.koPc || defaultAboutData.paragraph1.koPc)
                setP1KoMobile(data.paragraph1?.koMobile || defaultAboutData.paragraph1.koMobile)
                setP1EnPc(data.paragraph1?.enPc || defaultAboutData.paragraph1.enPc)
                setP1EnMobile(data.paragraph1?.enMobile || defaultAboutData.paragraph1.enMobile)
                // 문단 2
                setP2KoPc(data.paragraph2?.koPc || defaultAboutData.paragraph2.koPc)
                setP2KoMobile(data.paragraph2?.koMobile || defaultAboutData.paragraph2.koMobile)
                setP2EnPc(data.paragraph2?.enPc || defaultAboutData.paragraph2.enPc)
                setP2EnMobile(data.paragraph2?.enMobile || defaultAboutData.paragraph2.enMobile)
                // 문단 3
                setP3KoPc(data.paragraph3?.koPc || defaultAboutData.paragraph3.koPc)
                setP3KoMobile(data.paragraph3?.koMobile || defaultAboutData.paragraph3.koMobile)
                setP3EnPc(data.paragraph3?.enPc || defaultAboutData.paragraph3.enPc)
                setP3EnMobile(data.paragraph3?.enMobile || defaultAboutData.paragraph3.enMobile)
            } catch (error) {
                console.error('데이터 로드 실패:', error)
            } finally {
                setLoading(false)
            }
        }
        loadAboutData()
    }, [])

    // About 데이터 저장
    const handleSaveAboutData = async () => {
        setSaving(true)
        setSaveMessage('')

        try {
            await saveAboutData({
                paragraph1: {
                    koPc: p1KoPc,
                    koMobile: p1KoMobile,
                    enPc: p1EnPc,
                    enMobile: p1EnMobile
                },
                paragraph2: {
                    koPc: p2KoPc,
                    koMobile: p2KoMobile,
                    enPc: p2EnPc,
                    enMobile: p2EnMobile
                },
                paragraph3: {
                    koPc: p3KoPc,
                    koMobile: p3KoMobile,
                    enPc: p3EnPc,
                    enMobile: p3EnMobile
                }
            })
            setSaveMessage('저장되었습니다!')
            setTimeout(() => setSaveMessage(''), 3000)
        } catch (error) {
            setSaveMessage('저장에 실패했습니다.')
            console.error('저장 실패:', error)
        } finally {
            setSaving(false)
        }
    }

    // 문단 섹션 렌더링
    const renderParagraphSection = (num, title, koPc, setKoPc, koMobile, setKoMobile, enPc, setEnPc, enMobile, setEnMobile) => (
        <div className="admin-home-section">
            <div className="admin-section-header">
                <h3>{title}</h3>
            </div>

            {/* 한글 */}
            <div className="admin-about-lang-section">
                <h4 className="admin-about-lang-title">한글</h4>
                <div className="admin-about-inputs">
                    <div className="admin-form-group">
                        <label>PC</label>
                        <textarea
                            className="admin-textarea"
                            value={koPc}
                            onChange={(e) => setKoPc(e.target.value)}
                            placeholder="PC용 한글 텍스트"
                            rows={4}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>모바일</label>
                        <textarea
                            className="admin-textarea"
                            value={koMobile}
                            onChange={(e) => setKoMobile(e.target.value)}
                            placeholder="모바일용 한글 텍스트"
                            rows={4}
                        />
                    </div>
                </div>
            </div>

            {/* 영문 */}
            <div className="admin-about-lang-section">
                <h4 className="admin-about-lang-title">영문</h4>
                <div className="admin-about-inputs">
                    <div className="admin-form-group">
                        <label>PC</label>
                        <textarea
                            className="admin-textarea"
                            value={enPc}
                            onChange={(e) => setEnPc(e.target.value)}
                            placeholder="PC용 영문 텍스트"
                            rows={4}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>모바일</label>
                        <textarea
                            className="admin-textarea"
                            value={enMobile}
                            onChange={(e) => setEnMobile(e.target.value)}
                            placeholder="모바일용 영문 텍스트"
                            rows={4}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    if (loading) {
        return (
            <div className="admin-content-main admin-about-manager">
                <div className="admin-loading-inline">
                    <p>데이터 불러오는 중...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-content-main admin-about-manager">
            {/* 문단 1 */}
            {renderParagraphSection(1, '문단 1', p1KoPc, setP1KoPc, p1KoMobile, setP1KoMobile, p1EnPc, setP1EnPc, p1EnMobile, setP1EnMobile)}

            {/* 문단 2 */}
            {renderParagraphSection(2, '문단 2', p2KoPc, setP2KoPc, p2KoMobile, setP2KoMobile, p2EnPc, setP2EnPc, p2EnMobile, setP2EnMobile)}

            {/* 문단 3 */}
            {renderParagraphSection(3, '문단 3', p3KoPc, setP3KoPc, p3KoMobile, setP3KoMobile, p3EnPc, setP3EnPc, p3EnMobile, setP3EnMobile)}

            {/* 저장 메시지 */}
            {saveMessage && (
                <div className={`admin-save-message ${saveMessage.includes('실패') ? 'error' : 'success'}`}>
                    {saveMessage}
                </div>
            )}

            {/* 저장 버튼 */}
            <button
                className="admin-button admin-button-primary admin-save-btn"
                onClick={handleSaveAboutData}
                disabled={saving}
            >
                {saving ? '저장 중...' : '변경사항 저장'}
            </button>
        </div>
    )
}

export default AdminAbout

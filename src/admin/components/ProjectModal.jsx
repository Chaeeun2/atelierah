import { useState, useRef, useEffect } from 'react'
import { projects as projectList } from '../../data/projects'

function ProjectModal({ isOpen, onClose, onSave, initialData = null }) {
    const [sketchSrc, setSketchSrc] = useState('')
    const [sketchFile, setSketchFile] = useState(null)
    const [sketchPending, setSketchPending] = useState(false)
    const [photoSrc, setPhotoSrc] = useState('')
    const [photoFile, setPhotoFile] = useState(null)
    const [photoPending, setPhotoPending] = useState(false)
    const [link, setLink] = useState('')
    const sketchInputRef = useRef(null)
    const photoInputRef = useRef(null)

    // 초기 데이터 설정 (수정 모드)
    useEffect(() => {
        if (initialData) {
            setSketchSrc(initialData.sketchSrc || '')
            setSketchFile(initialData.sketchFile || null)
            setSketchPending(initialData.sketchPending || false)
            setPhotoSrc(initialData.photoSrc || '')
            setPhotoFile(initialData.photoFile || null)
            setPhotoPending(initialData.photoPending || false)
            setLink(initialData.link || '')
        } else {
            setSketchSrc('')
            setSketchFile(null)
            setSketchPending(false)
            setPhotoSrc('')
            setPhotoFile(null)
            setPhotoPending(false)
            setLink('')
        }
    }, [initialData, isOpen])

    const handleSketchUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 로컬 미리보기 URL 생성
        const previewUrl = URL.createObjectURL(file)
        setSketchSrc(previewUrl)
        setSketchFile(file)
        setSketchPending(true)
        
        if (sketchInputRef.current) sketchInputRef.current.value = ''
    }

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 로컬 미리보기 URL 생성
        const previewUrl = URL.createObjectURL(file)
        setPhotoSrc(previewUrl)
        setPhotoFile(file)
        setPhotoPending(true)
        
        if (photoInputRef.current) photoInputRef.current.value = ''
    }

    const handleSave = () => {
        if (!link) {
            alert('프로젝트를 선택해주세요.')
            return
        }
        onSave({
            id: initialData?.id || Date.now(),
            sketchSrc,
            sketchFile,
            sketchPending,
            photoSrc,
            photoFile,
            photoPending,
            link
        })
        onClose()
    }

    // 선택된 프로젝트 이름 가져오기
    const getProjectName = () => {
        if (!link) return ''
        const projectId = parseInt(link.split('/').pop())
        const project = projectList.find(p => p.id === projectId)
        return project ? `${project.title.ko} (${project.year})` : ''
    }

    if (!isOpen) return null

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
                <div className="admin-modal-header">
                    <h3>{initialData ? '프로젝트 수정' : '프로젝트 추가'}</h3>
                    <button className="admin-modal-close-btn" onClick={onClose}>×</button>
                </div>

                <div className="admin-modal-body">
                    {/* 프로젝트 선택 */}
                    <div className="admin-form-group">
                        <label>프로젝트 선택 *</label>
                        <select
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="admin-select"
                        >
                            <option value="">프로젝트를 선택하세요</option>
                            {projectList.map((project) => (
                                <option key={project.id} value={`/works/${project.id}`}>
                                    {project.title.ko} ({project.year})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 이미지 업로드 영역 */}
                    <div className="admin-modal-images">
                        {/* 스케치 이미지 */}
                        <div className="admin-modal-image-box">
                            <label>스케치 이미지 {sketchPending && <span className="admin-pending-badge">저장 시 업로드</span>}</label>
                            <div 
                                className="admin-image-upload-area"
                                onClick={() => sketchInputRef.current?.click()}
                            >
                                {sketchSrc ? (
                                    <img src={sketchSrc} alt="스케치" />
                                ) : (
                                    <div className="admin-image-placeholder">
                                        클릭하여 선택
                                    </div>
                                )}
                            </div>
                            <input
                                ref={sketchInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleSketchUpload}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {/* 포토 이미지 */}
                        <div className="admin-modal-image-box">
                            <label>포토 이미지 {photoPending && <span className="admin-pending-badge">저장 시 업로드</span>}</label>
                            <div 
                                className="admin-image-upload-area"
                                onClick={() => photoInputRef.current?.click()}
                            >
                                {photoSrc ? (
                                    <img src={photoSrc} alt="포토" />
                                ) : (
                                    <div className="admin-image-placeholder">
                                        클릭하여 선택
                                    </div>
                                )}
                            </div>
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="admin-modal-footer">
                    <button className="admin-button" onClick={onClose}>취소</button>
                    <button className="admin-button admin-button-primary" onClick={handleSave}>
                        {initialData ? '수정' : '추가'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal

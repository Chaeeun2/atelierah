import { useState, useEffect, useRef } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    rectSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    getPressItems, addPressItem, updatePressItem, deletePressItem,
    updatePressOrder
} from '../../services/pressService'
import { uploadImage, deleteImage, uploadMultipleImages, MAX_FILE_SIZE_PROJECT } from '../../services/imageService'

// 드래그 가능한 미디어 아이템 (이미지)
function SortableMediaItem({ id, imageUrl, index, onRemove }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition: 'none',
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`admin-detail-media-item ${isDragging ? 'dragging' : ''}`}
        >
            <img
                src={imageUrl}
                alt={`이미지 ${index + 1}`}
                style={{ pointerEvents: 'none' }}
            />
            <div className="media-index">{index + 1}</div>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    onRemove(index)
                }}
                onPointerDown={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                onMouseDown={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                className="delete-media-button"
            >
                ×
            </button>
        </div>
    )
}

// 드래그 가능한 프레스 아이템
function SortablePressItem({ id, item, onEdit, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition: 'none',
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`admin-table-row ${isDragging ? 'dragging' : ''}`}
        >
            <div className="admin-table-cell admin-table-title">
                <div
                    className="admin-project-drag-handle"
                    {...listeners}
                >
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                        <circle cx="2" cy="2" r="1.5" />
                        <circle cx="8" cy="2" r="1.5" />
                        <circle cx="2" cy="8" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="2" cy="14" r="1.5" />
                        <circle cx="8" cy="14" r="1.5" />
                    </svg>
                </div>
                <div className="admin-project-title-info">
                    <div className="admin-project-title-main">{item.media?.ko || item.media || '매체명 없음'}</div>
                </div>
            </div>
            <div className="admin-table-cell admin-table-year">
                {item.project?.ko || '-'}
            </div>
            <div className="admin-table-cell admin-table-actions">
                <button
                    className="admin-button admin-button-small"
                    onClick={() => onEdit(item)}
                >
                    수정
                </button>
                <button
                    className="admin-button admin-button-small admin-button-danger"
                    onClick={() => onDelete(item.id)}
                >
                    삭제
                </button>
            </div>
        </div>
    )
}

// 프레스 추가/수정 모달
function PressModal({ isOpen, onClose, onSave, press = null, loading }) {
    const [formData, setFormData] = useState({
        type: 'link',
        image: '',
        imageFile: null,
        imagePending: false,
        mediaKo: '',
        mediaEn: '',
        projectKo: '',
        projectEn: '',
        link: '',
        // 상세페이지 콘텐츠
        heroImages: [],
        heroFiles: [],
        descriptionKo: '',
        descriptionEn: '',
        published: '',
        detailRows: []
    })
    const imageInputRef = useRef(null)
    const heroInputRef = useRef(null)

    // 드래그 앤 드롭 센서
    const mediaSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        if (press) {
            // 상세 콘텐츠 파싱
            const heroContent = press.content?.find(c => c.type === 'hero')
            const descContent = press.content?.find(c => c.type === 'description')
            const infoContent = press.content?.find(c => c.type === 'info')

            // 상세 이미지 rows 로딩
            const imageContents = press.content?.filter(c => c.type === 'images') || []
            const loadedDetailRows = imageContents.map(item => ({
                images: item.images || [],
                files: []
            }))

            setFormData({
                type: press.type || 'link',
                image: press.image || '',
                imageFile: null,
                imagePending: false,
                mediaKo: press.media?.ko || press.media || '',
                mediaEn: press.media?.en || press.media || '',
                projectKo: press.project?.ko || '',
                projectEn: press.project?.en || '',
                link: press.link || '',
                heroImages: heroContent?.images || [],
                heroFiles: [],
                descriptionKo: descContent?.text?.ko || '',
                descriptionEn: descContent?.text?.en || '',
                published: infoContent?.details?.published?.ko || '',
                detailRows: loadedDetailRows
            })
        } else {
            setFormData({
                type: 'link',
                image: '',
                imageFile: null,
                imagePending: false,
                mediaKo: '',
                mediaEn: '',
                projectKo: '',
                projectEn: '',
                link: '',
                heroImages: [],
                heroFiles: [],
                descriptionKo: '',
                descriptionEn: '',
                published: '',
                detailRows: []
            })
        }
    }, [press, isOpen])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // 썸네일 이미지 선택
    const handleImageSelect = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > MAX_FILE_SIZE_PROJECT) {
            alert(`파일 크기가 2MB를 초과합니다. (${file.name})`)
            e.target.value = ''
            return
        }

        const previewUrl = URL.createObjectURL(file)
        setFormData(prev => ({
            ...prev,
            image: previewUrl,
            imageFile: file,
            imagePending: true
        }))

        if (imageInputRef.current) {
            imageInputRef.current.value = ''
        }
    }

    // 히어로 이미지 선택
    const handleHeroFilesSelect = (e) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return

        const oversizedFiles = files.filter(f => f.size > MAX_FILE_SIZE_PROJECT)
        if (oversizedFiles.length > 0) {
            alert(`다음 파일이 2MB를 초과합니다:\n${oversizedFiles.map(f => f.name).join('\n')}`)
            e.target.value = ''
            return
        }

        const newPreviews = files.map(file => URL.createObjectURL(file))
        setFormData(prev => ({
            ...prev,
            heroImages: [...prev.heroImages, ...newPreviews],
            heroFiles: [...prev.heroFiles, ...files]
        }))

        if (heroInputRef.current) {
            heroInputRef.current.value = ''
        }
    }

    // 히어로 이미지 삭제
    const handleRemoveHeroImage = (index) => {
        setFormData(prev => {
            const newHeroImages = [...prev.heroImages]
            const newHeroFiles = [...prev.heroFiles]

            if (newHeroImages[index]?.startsWith('blob:')) {
                URL.revokeObjectURL(newHeroImages[index])
            }

            newHeroImages.splice(index, 1)
            const existingCount = press?.content?.find(c => c.type === 'hero')?.images?.length || 0
            if (index >= existingCount) {
                newHeroFiles.splice(index - existingCount, 1)
            }

            return {
                ...prev,
                heroImages: newHeroImages,
                heroFiles: newHeroFiles
            }
        })
    }

    // 히어로 이미지 드래그 앤 드롭
    const handleHeroDragEnd = (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setFormData(prev => {
            const oldIndex = prev.heroImages.findIndex((_, idx) => `hero-${idx}` === active.id)
            const newIndex = prev.heroImages.findIndex((_, idx) => `hero-${idx}` === over.id)
            return {
                ...prev,
                heroImages: arrayMove(prev.heroImages, oldIndex, newIndex)
            }
        })
    }

    // ========== 상세이미지 관련 핸들러 ==========

    // 상세이미지 row 추가
    const handleAddDetailRow = () => {
        setFormData(prev => ({
            ...prev,
            detailRows: [...prev.detailRows, { images: [], files: [] }]
        }))
    }

    // 상세이미지 row 삭제
    const handleRemoveDetailRow = (rowIndex) => {
        setFormData(prev => {
            const newRows = [...prev.detailRows]
            newRows[rowIndex].images.forEach(url => {
                if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
            })
            newRows.splice(rowIndex, 1)
            return { ...prev, detailRows: newRows }
        })
    }

    // 상세이미지 파일 선택 (최대 3개까지)
    const handleDetailImagesSelect = (rowIndex, e) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return

        const oversizedFiles = files.filter(f => f.size > MAX_FILE_SIZE_PROJECT)
        if (oversizedFiles.length > 0) {
            alert(`다음 파일이 2MB를 초과합니다:\n${oversizedFiles.map(f => f.name).join('\n')}`)
            e.target.value = ''
            return
        }

        setFormData(prev => {
            const newRows = [...prev.detailRows]
            const row = { ...newRows[rowIndex] }

            const currentCount = row.images.length
            const availableSlots = 3 - currentCount
            const filesToAdd = files.slice(0, availableSlots)

            if (filesToAdd.length === 0) {
                alert('한 Row에 최대 3개까지만 첨부할 수 있습니다.')
                return prev
            }

            const newImages = [...row.images]
            const newFiles = [...row.files]
            filesToAdd.forEach(file => {
                newImages.push(URL.createObjectURL(file))
                newFiles.push(file)
            })

            row.images = newImages
            row.files = newFiles
            newRows[rowIndex] = row

            return { ...prev, detailRows: newRows }
        })

        e.target.value = ''
    }

    // 상세이미지 개별 삭제
    const handleRemoveDetailImage = (rowIndex, imgIndex) => {
        setFormData(prev => {
            const newRows = [...prev.detailRows]
            const row = { ...newRows[rowIndex] }

            const imageToRemove = row.images[imgIndex]

            // blob URL인 경우에만 files 배열에서 삭제
            if (imageToRemove?.startsWith('blob:')) {
                URL.revokeObjectURL(imageToRemove)

                // blob URL들 중 현재 인덱스 찾기 (files 배열은 blob URL에만 대응)
                let blobIndex = 0
                for (let i = 0; i < imgIndex; i++) {
                    if (row.images[i]?.startsWith('blob:')) {
                        blobIndex++
                    }
                }
                row.files = row.files.filter((_, i) => i !== blobIndex)
            }

            // 이미지 배열에서 해당 인덱스 삭제
            row.images = row.images.filter((_, i) => i !== imgIndex)
            newRows[rowIndex] = row

            return { ...prev, detailRows: newRows }
        })
    }

    const handleSave = () => {
        if (!formData.mediaKo.trim()) {
            alert('매체명(국문)을 입력해주세요.')
            return
        }
        if (!formData.projectKo.trim()) {
            alert('프로젝트명을 입력해주세요.')
            return
        }
        if (formData.type === 'link' && !formData.link.trim()) {
            alert('외부 링크 URL을 입력해주세요.')
            return
        }
        onSave(formData, press?.id)
    }

    if (!isOpen) return null

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal-content admin-modal-project" onClick={e => e.stopPropagation()}>
                <div className="admin-modal-header">
                    <h3>{press ? '프레스 수정' : '새 프레스 추가'}</h3>
                    <div className="admin-modal-header-buttons">
                        <button
                            type="button"
                            className="admin-button admin-button-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="admin-button admin-button-primary"
                            disabled={loading || !formData.mediaKo.trim()}
                        >
                            {loading ? '저장 중...' : '저장'}
                        </button>
                    </div>
                </div>
                <div className="admin-modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                    {/* 왼쪽 컬럼 */}
                    <div className="admin-modal-rows" style={{ borderRight: '1px solid #ededed', paddingRight: '50px', marginRight: '20px', height: "100%" }}>

                        <div className="admin-form-column">
                            <div className="admin-form-group">
                                <label>타입</label>
                                <div className="admin-slider-type-selector">
                                    <label className={`admin-type-option ${formData.type === 'link' ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="pressType"
                                            value="link"
                                            checked={formData.type === 'link'}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                        />
                                        <span>외부 링크</span>
                                    </label>
                                    <label className={`admin-type-option ${formData.type === 'detail' ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="pressType"
                                            value="detail"
                                            checked={formData.type === 'detail'}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                        />
                                        <span>상세 페이지</span>
                                    </label>
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>매체명 (국문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.mediaKo}
                                        onChange={(e) => handleInputChange('mediaKo', e.target.value)}
                                        placeholder="브리크 매거진"
                                        autoFocus
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>매체명 (영문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.mediaEn}
                                        onChange={(e) => handleInputChange('mediaEn', e.target.value)}
                                        placeholder="brique magazine"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>프로젝트명 (국문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.projectKo}
                                        onChange={(e) => handleInputChange('projectKo', e.target.value)}
                                        placeholder="프로젝트명"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>프로젝트명 (영문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.projectEn}
                                        onChange={(e) => handleInputChange('projectEn', e.target.value)}
                                        placeholder="Project name"
                                    />
                                </div>
                            </div>

                            {formData.type === 'link' && (
                                <div className="admin-form-group">
                                    <label>외부 링크 URL *</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.link}
                                        onChange={(e) => handleInputChange('link', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                            )}

                            {formData.type === 'detail' && (
                                <div className="admin-form-group">
                                    <label>발행일</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.published}
                                        onChange={(e) => handleInputChange('published', e.target.value)}
                                        placeholder="Dec, 2024"
                                    />
                                </div>
                            )}
                        </div>

                        {formData.type === 'detail' && (
                            <>
                                <div className="admin-form-group" style={{ marginBottom: '30px' }}>
                                    <label>설명 (국문)</label>
                                    <textarea
                                        className="admin-textarea"
                                        value={formData.descriptionKo}
                                        onChange={(e) => handleInputChange('descriptionKo', e.target.value)}
                                        placeholder="프레스 설명을 입력하세요"
                                        rows={6}
                                    />
                                </div>

                                <div className="admin-form-group" style={{ marginBottom: '30px' }}>
                                    <label>설명 (영문)</label>
                                    <textarea
                                        className="admin-textarea"
                                        value={formData.descriptionEn}
                                        onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                                        placeholder="English description"
                                        rows={6}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* 오른쪽 컬럼 */}
                    <div className="admin-modal-rows">
                        {/* 썸네일 이미지 */}
                        <div className="admin-form-group" style={{ marginBottom: '30px' }}>
                            <label>
                                썸네일 이미지 (800*1000px)
                                {formData.imagePending && <span className="admin-pending-badge">저장 시 업로드</span>}
                            </label>
                            <div className="admin-upload-button-container">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                    onChange={handleImageSelect}
                                    ref={imageInputRef}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => imageInputRef.current?.click()}
                                    className="admin-button admin-button-secondary"
                                >
                                    이미지 추가
                                </button>
                                <small className="admin-upload-caption">
                                    지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB
                                </small>
                            </div>
                            {formData.image && (
                                <div className="admin-image-preview">
                                    <img src={formData.image} alt="썸네일" className="admin-preview-thumb" />
                                </div>
                            )}
                        </div>

                        {formData.type === 'detail' && (
                            <>
                                {/* 히어로 이미지 */}
                                <div className="admin-form-group" style={{ marginBottom: '30px', borderBottom: '1px solid #ededed', paddingBottom: '30px' }}>
                                    <label>
                                        메인 이미지 (슬라이더)
                                        {formData.heroFiles.length > 0 && (
                                            <span className="admin-pending-badge">저장 시 {formData.heroFiles.length}개 업로드</span>
                                        )}
                                    </label>
                                    <div className="admin-upload-button-container">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                            multiple
                                            onChange={handleHeroFilesSelect}
                                            ref={heroInputRef}
                                            style={{ display: 'none' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => heroInputRef.current?.click()}
                                            className="admin-button admin-button-secondary"
                                        >
                                            이미지 추가
                                        </button>
                                        <small className="admin-upload-caption">
                                            지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB
                                        </small>
                                    </div>
                                    {formData.heroImages.length > 0 && (
                                        <div className="admin-gallery-preview">
                                            <DndContext
                                                sensors={mediaSensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={handleHeroDragEnd}
                                            >
                                                <SortableContext
                                                    items={formData.heroImages.map((_, idx) => `hero-${idx}`)}
                                                    strategy={rectSortingStrategy}
                                                >
                                                    <div className="admin-detail-media-container">
                                                        {formData.heroImages.map((imageUrl, index) => (
                                                            <SortableMediaItem
                                                                key={`hero-${index}`}
                                                                id={`hero-${index}`}
                                                                imageUrl={imageUrl}
                                                                index={index}
                                                                onRemove={handleRemoveHeroImage}
                                                            />
                                                        ))}
                                                    </div>
                                                </SortableContext>
                                            </DndContext>
                                        </div>
                                    )}
                                </div>

                                {/* 상세이미지 */}
                                <div className="admin-form-group">
                                    <label>상세이미지</label>
                                    <small className="admin-upload-caption">
                                        지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB ㅣ 한 줄에 최대 3개까지 첨부 가능
                                    </small>

                                    {formData.detailRows.length > 0 && (
                                        <div className="admin-detail-rows-container">
                                            {formData.detailRows.map((row, rowIndex) => (
                                                <div key={rowIndex} className="admin-detail-row-item">
                                                    <input
                                                        type="file"
                                                        id={`detail-upload-${rowIndex}`}
                                                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                                        multiple
                                                        onChange={(e) => handleDetailImagesSelect(rowIndex, e)}
                                                        style={{ display: 'none' }}
                                                    />

                                                    {/* 이미지 미리보기 */}
                                                    <div className="admin-detail-media-container">
                                                        {row.images.length > 0 ? (
                                                            row.images.map((imageUrl, imgIndex) => (
                                                                <div key={imgIndex} className="admin-detail-media-item">
                                                                    <img src={imageUrl} alt={`상세 ${rowIndex}-${imgIndex}`} />
                                                                    <div className="media-index">{imgIndex + 1}</div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveDetailImage(rowIndex, imgIndex)}
                                                                        className="delete-media-button"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="admin-detail-empty-placeholder">
                                                                이미지를 추가하세요 (최대 3개)
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="admin-detail-row-actions">
                                                        <button
                                                            type="button"
                                                            onClick={() => document.getElementById(`detail-upload-${rowIndex}`).click()}
                                                            className="admin-button admin-button-secondary admin-button-small"
                                                            disabled={row.images.length >= 3}
                                                        >
                                                            추가
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveDetailRow(rowIndex)}
                                                            className="admin-button admin-button-small admin-button-danger"
                                                        >
                                                            삭제
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="admin-upload-button-container">
                                        <button
                                            type="button"
                                            onClick={handleAddDetailRow}
                                            className="admin-button admin-button-secondary"
                                            style={{ marginTop: '15px' }}
                                        >
                                            + Row 추가
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function AdminPress() {
    const [pressItems, setPressItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPress, setEditingPress] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        try {
            const data = await getPressItems()
            setPressItems(data)
        } catch (error) {
            alert('데이터를 불러오는데 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const loadPressItems = async () => {
        try {
            const data = await getPressItems()
            setPressItems(data)
        } catch (error) {
            // error handling
        }
    }

    // 검색어로 필터링 (역순으로 표시)
    const filteredItems = [...pressItems].reverse().filter(item => {
        if (!searchTerm) return true

        const term = searchTerm.toLowerCase()
        return (
            item.media?.ko?.toLowerCase().includes(term) ||
            item.media?.en?.toLowerCase().includes(term) ||
            (typeof item.media === 'string' && item.media.toLowerCase().includes(term)) ||
            item.project?.ko?.toLowerCase().includes(term) ||
            item.project?.en?.toLowerCase().includes(term)
        )
    })

    const handleDragEnd = async (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = filteredItems.findIndex(item => item.id === active.id)
        const newIndex = filteredItems.findIndex(item => item.id === over.id)

        const newItems = arrayMove(filteredItems, oldIndex, newIndex)
        setPressItems([...newItems].reverse())

        try {
            await updatePressOrder([...newItems].reverse().map(item => item.id))
        } catch (error) {
            loadPressItems()
        }
    }

    const handleOpenAddModal = () => {
        setEditingPress(null)
        setIsModalOpen(true)
    }

    const handleOpenEditModal = (item) => {
        setEditingPress(item)
        setIsModalOpen(true)
    }

    const convertFormToPressData = async (formData, existingPress = null) => {
        let imageUrl = formData.image

        // 썸네일 이미지 업로드
        if (formData.imagePending && formData.imageFile) {
            try {
                imageUrl = await uploadImage(formData.imageFile, 'press', MAX_FILE_SIZE_PROJECT)
                URL.revokeObjectURL(formData.image)
            } catch (error) {
                throw new Error('썸네일 이미지 업로드에 실패했습니다.')
            }
        }

        // 상세페이지 콘텐츠 생성
        let content = []

        if (formData.type === 'detail') {
            // 히어로 이미지 업로드
            let heroImages = formData.heroImages.filter(url => !url.startsWith('blob:'))

            if (formData.heroFiles.length > 0) {
                try {
                    const results = await uploadMultipleImages(formData.heroFiles, 'press/hero', null, MAX_FILE_SIZE_PROJECT)
                    heroImages = [...heroImages, ...results.urls]
                } catch (error) {
                    throw new Error('히어로 이미지 업로드에 실패했습니다.')
                }
            }

            if (heroImages.length > 0) {
                content.push({
                    type: 'hero',
                    images: heroImages,
                    autoPlayInterval: 8000
                })
            }

            // description 콘텐츠
            if (formData.descriptionKo || formData.descriptionEn) {
                content.push({
                    type: 'description',
                    text: {
                        ko: formData.descriptionKo,
                        en: formData.descriptionEn || formData.descriptionKo
                    }
                })
            }

            // info 콘텐츠
            content.push({
                type: 'info',
                details: {
                    projectName: {
                        ko: formData.projectKo,
                        en: formData.projectEn || formData.projectKo
                    },
                    media: {
                        ko: formData.mediaKo,
                        en: formData.mediaEn || formData.mediaKo
                    },
                    published: {
                        ko: formData.published,
                        en: formData.published
                    }
                }
            })

            // 상세 이미지 업로드 및 콘텐츠 생성
            for (const row of formData.detailRows) {
                const processedImages = []

                // 기존 URL 유지
                for (const imageUrl of row.images) {
                    if (imageUrl && !imageUrl.startsWith('blob:')) {
                        processedImages.push(imageUrl)
                    }
                }

                // 새 파일 업로드
                for (const file of row.files) {
                    try {
                        const uploadedUrl = await uploadImage(file, 'press/detail', MAX_FILE_SIZE_PROJECT)
                        processedImages.push(uploadedUrl)
                    } catch (error) {
                        // error handling
                    }
                }

                if (processedImages.length > 0) {
                    content.push({
                        type: 'images',
                        columns: processedImages.length,
                        images: processedImages
                    })
                }
            }
        }

        return {
            type: formData.type,
            image: imageUrl,
            media: {
                ko: formData.mediaKo,
                en: formData.mediaEn || formData.mediaKo
            },
            project: {
                ko: formData.projectKo,
                en: formData.projectEn || formData.projectKo
            },
            link: formData.type === 'link' ? formData.link : '',
            content: content
        }
    }

    const handleSavePress = async (formData, pressId) => {
        setSaving(true)

        try {
            const pressData = await convertFormToPressData(formData, editingPress)

            if (pressId) {
                await updatePressItem(pressId, pressData)
                setPressItems(prev => prev.map(p =>
                    p.id === pressId ? { ...p, ...pressData } : p
                ))
            } else {
                const newId = await addPressItem(pressData)
                setPressItems(prev => [...prev, { id: newId, ...pressData }])
            }

            setIsModalOpen(false)
            setEditingPress(null)
        } catch (error) {
            alert('프레스 저장에 실패했습니다: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDeletePress = async (pressId) => {
        if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

        try {
            const item = pressItems.find(p => p.id === pressId)
            if (item?.image) {
                await deleteImage(item.image).catch(() => { })
            }

            await deletePressItem(pressId)
            setPressItems(prev => prev.filter(p => p.id !== pressId))
        } catch (error) {
            alert('프레스 삭제에 실패했습니다.')
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
        <div className="admin-content-main admin-works-page">
            <div className="admin-home-section">
                {/* 섹션 헤더 */}
                <div className="admin-section-header">
                    <h2 className="admin-section-title">프레스 관리</h2>
                    <div className="admin-header-controls">
                        <div className="admin-search-input-group">
                            <input
                                type="text"
                                placeholder="프레스 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="admin-input admin-search-input"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="admin-search-clear"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <button
                            className="admin-button admin-button-primary"
                            onClick={handleOpenAddModal}
                        >
                            프레스 추가
                        </button>
                    </div>
                </div>

                {/* 프레스 목록 */}
                <div className="admin-projects-container">
                    {filteredItems.length === 0 ? (
                        <div className="admin-empty-state">
                            <p>{searchTerm ? '검색 결과가 없습니다.' : '등록된 프레스가 없습니다.'}</p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={filteredItems.map(p => p.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="admin-projects-table admin-press-table">
                                    <div className="admin-table-body">
                                        {filteredItems.map((item) => (
                                            <SortablePressItem
                                                key={item.id}
                                                id={item.id}
                                                item={item}
                                                onEdit={handleOpenEditModal}
                                                onDelete={handleDeletePress}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </div>

            {/* 프레스 추가/수정 모달 */}
            <PressModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingPress(null)
                }}
                onSave={handleSavePress}
                press={editingPress}
                loading={saving}
            />
        </div>
    )
}

export default AdminPress

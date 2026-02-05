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
    getProjects, addProject, updateProject, deleteProject, updateProjectOrder,
    defaultProjectTemplate
} from '../../services/worksService'
import { uploadImage, deleteImage, uploadMultipleImages, uploadVideo, MAX_FILE_SIZE_PROJECT } from '../../services/imageService'

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

// 드래그 가능한 프로젝트 아이템
function SortableProjectItem({ id, project, onEdit, onDelete }) {
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
                    <div className="admin-project-title-main">{project.title?.ko || '제목 없음'}</div>
                </div>
            </div>
            <div className="admin-table-cell admin-table-year">
                {project.year || '-'}
            </div>
            <div className="admin-table-cell admin-table-type">
                {project.category?.ko || project.category?.en || '-'}
            </div>
            <div className="admin-table-cell admin-table-actions">
                <button
                    className="admin-button admin-button-small"
                    onClick={() => onEdit(project)}
                >
                    수정
                </button>
                <button
                    className="admin-button admin-button-small admin-button-danger"
                    onClick={() => onDelete(project.id)}
                >
                    삭제
                </button>
            </div>
        </div>
    )
}

// 프로젝트 추가/수정 모달
function ProjectModal({ isOpen, onClose, onSave, project = null, loading }) {
    const [formData, setFormData] = useState({
        titleKo: '',
        titleEn: '',
        category: '',
        type: '',
        year: '',
        thumbnail: '',
        thumbnailFile: null,
        thumbnailPending: false,
        thumbnailTitleKo: '',  // 썸네일 프로젝트명 (국문)
        thumbnailTitleEn: '',  // 썸네일 프로젝트명 (영문)
        mainType: 'image',   // 'image' 또는 'video'
        mainImages: [],      // slider (메인이미지/대표이미지)
        mainFiles: [],
        mainVideoSrc: '',    // 업로드된 영상 URL
        mainVideoFile: null, // 새로 선택한 영상 파일
        mainVideoPending: false, // 업로드 대기 여부
        sketchImages: [],    // sketch (스케치)
        sketchFiles: [],
        layoutImages: [],    // layout (레이아웃)
        layoutFiles: [],
        detailRows: [],      // 상세이미지 rows: [{ images: [], files: [] }] (최대 3개)
        descriptionKo: '',
        descriptionEn: '',
        completion: '',
        usage: '',
        projectArea: '',
        location: '',
        client: '',
        design: '',
        photo: ''
    })
    const thumbnailInputRef = useRef(null)
    const mainInputRef = useRef(null)
    const sketchInputRef = useRef(null)
    const layoutInputRef = useRef(null)
    const detailInputRefs = useRef([])

    // 드래그 앤 드롭 센서
    const mediaSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        if (project) {
            const info = project.content?.find(c => c.type === 'info')
            const sliderContent = project.content?.find(c => c.type === 'slider')

            // 상세이미지 rows 불러오기 (두 가지 형식 지원)
            // 1. type: 'detail' (새 형식) - { type: 'detail', rows: [...] }
            // 2. type: 'images' (기존 형식) - 여러 개의 { type: 'images', columns, images } 객체
            const detailContent = project.content?.find(c => c.type === 'detail')
            let loadedDetailRows = []

            if (detailContent?.rows) {
                // 새 형식: type: 'detail' with rows
                loadedDetailRows = detailContent.rows.map(row => ({
                    images: row.images || [],
                    files: []
                }))
            } else {
                // 기존 형식: 여러 개의 type: 'images' 객체
                const imageContents = project.content?.filter(c => c.type === 'images') || []
                loadedDetailRows = imageContents.map(item => ({
                    images: item.images || [],
                    files: []
                }))
            }

            setFormData({
                titleKo: project.title?.ko || '',
                titleEn: project.title?.en || '',
                category: project.category?.ko || project.category?.en || project.category || '',
                type: project.type || '',
                year: project.year || '',
                thumbnail: project.images?.thumbnail || '',
                thumbnailFile: null,
                thumbnailPending: false,
                thumbnailTitleKo: project.thumbnailTitle?.ko || '',
                thumbnailTitleEn: project.thumbnailTitle?.en || '',
                mainType: sliderContent?.mediaType || 'image',
                mainImages: project.images?.slider || [],
                mainFiles: [],
                mainVideoSrc: sliderContent?.videoSrc || '',
                mainVideoFile: null,
                mainVideoPending: false,
                sketchImages: project.images?.sketch || [],
                sketchFiles: [],
                layoutImages: project.images?.layout || [],
                layoutFiles: [],
                detailRows: loadedDetailRows,
                descriptionKo: info?.description?.ko || '',
                descriptionEn: info?.description?.en || '',
                completion: info?.details?.completion?.ko || '',
                usage: info?.details?.usage?.ko || '',
                projectArea: info?.details?.projectArea?.ko || '',
                location: info?.details?.location?.ko || '',
                client: info?.details?.client?.ko || '',
                design: info?.details?.design?.ko || '',
                photo: info?.details?.photo?.ko || ''
            })
        } else {
            setFormData({
                titleKo: '',
                titleEn: '',
                category: '',
                type: '',
                year: '',
                thumbnail: '',
                thumbnailFile: null,
                thumbnailPending: false,
                thumbnailTitleKo: '',
                thumbnailTitleEn: '',
                mainType: 'image',
                mainImages: [],
                mainFiles: [],
                mainVideoSrc: '',
                mainVideoFile: null,
                mainVideoPending: false,
                sketchImages: [],
                sketchFiles: [],
                layoutImages: [],
                layoutFiles: [],
                detailRows: [],
                descriptionKo: '',
                descriptionEn: '',
                completion: '',
                usage: '',
                projectArea: '',
                location: '',
                client: '',
                design: '',
                photo: ''
            })
        }
    }, [project, isOpen])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleThumbnailSelect = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 2MB 용량 체크
        if (file.size > MAX_FILE_SIZE_PROJECT) {
            alert(`파일 크기가 2MB를 초과합니다.`)
            e.target.value = ''
            return
        }

        const previewUrl = URL.createObjectURL(file)
        setFormData(prev => ({
            ...prev,
            thumbnail: previewUrl,
            thumbnailFile: file,
            thumbnailPending: true
        }))

        if (thumbnailInputRef.current) {
            thumbnailInputRef.current.value = ''
        }
    }

    // 메인이미지 선택 핸들러
    const handleMainFilesSelect = (e) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return

        // 2MB 용량 체크
        const oversizedFiles = files.filter(f => f.size > MAX_FILE_SIZE_PROJECT)
        if (oversizedFiles.length > 0) {
            alert(`파일 크기가 2MB를 초과합니다.`)
            e.target.value = ''
            return
        }

        const newPreviews = files.map(file => URL.createObjectURL(file))
        setFormData(prev => ({
            ...prev,
            mainImages: [...prev.mainImages, ...newPreviews],
            mainFiles: [...prev.mainFiles, ...files]
        }))

        if (mainInputRef.current) {
            mainInputRef.current.value = ''
        }
    }

    // 스케치 이미지 선택 핸들러
    const handleSketchFilesSelect = (e) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return

        // 2MB 용량 체크
        const oversizedFiles = files.filter(f => f.size > MAX_FILE_SIZE_PROJECT)
        if (oversizedFiles.length > 0) {
            alert(`파일 크기가 2MB를 초과합니다.`)
            e.target.value = ''
            return
        }

        const newPreviews = files.map(file => URL.createObjectURL(file))
        setFormData(prev => ({
            ...prev,
            sketchImages: [...prev.sketchImages, ...newPreviews],
            sketchFiles: [...prev.sketchFiles, ...files]
        }))

        if (sketchInputRef.current) {
            sketchInputRef.current.value = ''
        }
    }

    // 레이아웃 이미지 선택 핸들러
    const handleLayoutFilesSelect = (e) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return

        // 2MB 용량 체크
        const oversizedFiles = files.filter(f => f.size > MAX_FILE_SIZE_PROJECT)
        if (oversizedFiles.length > 0) {
            alert(`파일 크기가 2MB를 초과합니다.`)
            e.target.value = ''
            return
        }

        const newPreviews = files.map(file => URL.createObjectURL(file))
        setFormData(prev => ({
            ...prev,
            layoutImages: [...prev.layoutImages, ...newPreviews],
            layoutFiles: [...prev.layoutFiles, ...files]
        }))

        if (layoutInputRef.current) {
            layoutInputRef.current.value = ''
        }
    }

    // 메인이미지 삭제
    const handleRemoveMainImage = (index) => {
        setFormData(prev => {
            const newMainImages = [...prev.mainImages]
            const newMainFiles = [...prev.mainFiles]

            if (newMainImages[index]?.startsWith('blob:')) {
                URL.revokeObjectURL(newMainImages[index])
            }

            newMainImages.splice(index, 1)
            const existingCount = (project?.images?.slider?.length || 0)
            if (index >= existingCount) {
                newMainFiles.splice(index - existingCount, 1)
            }

            return {
                ...prev,
                mainImages: newMainImages,
                mainFiles: newMainFiles
            }
        })
    }

    // 스케치 이미지 삭제
    const handleRemoveSketchImage = (index) => {
        setFormData(prev => {
            const newSketchImages = [...prev.sketchImages]
            const newSketchFiles = [...prev.sketchFiles]

            if (newSketchImages[index]?.startsWith('blob:')) {
                URL.revokeObjectURL(newSketchImages[index])
            }

            newSketchImages.splice(index, 1)
            const existingCount = (project?.images?.sketch?.length || 0)
            if (index >= existingCount) {
                newSketchFiles.splice(index - existingCount, 1)
            }

            return {
                ...prev,
                sketchImages: newSketchImages,
                sketchFiles: newSketchFiles
            }
        })
    }

    // 레이아웃 이미지 삭제
    const handleRemoveLayoutImage = (index) => {
        setFormData(prev => {
            const newLayoutImages = [...prev.layoutImages]
            const newLayoutFiles = [...prev.layoutFiles]

            if (newLayoutImages[index]?.startsWith('blob:')) {
                URL.revokeObjectURL(newLayoutImages[index])
            }

            newLayoutImages.splice(index, 1)
            const existingCount = (project?.images?.layout?.length || 0)
            if (index >= existingCount) {
                newLayoutFiles.splice(index - existingCount, 1)
            }

            return {
                ...prev,
                layoutImages: newLayoutImages,
                layoutFiles: newLayoutFiles
            }
        })
    }

    // 메인이미지 드래그 앤 드롭
    const handleMainDragEnd = (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setFormData(prev => {
            const oldIndex = prev.mainImages.findIndex((_, idx) => `main-${idx}` === active.id)
            const newIndex = prev.mainImages.findIndex((_, idx) => `main-${idx}` === over.id)
            return {
                ...prev,
                mainImages: arrayMove(prev.mainImages, oldIndex, newIndex)
            }
        })
    }

    // 스케치 이미지 드래그 앤 드롭
    const handleSketchDragEnd = (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setFormData(prev => {
            const oldIndex = prev.sketchImages.findIndex((_, idx) => `sketch-${idx}` === active.id)
            const newIndex = prev.sketchImages.findIndex((_, idx) => `sketch-${idx}` === over.id)
            return {
                ...prev,
                sketchImages: arrayMove(prev.sketchImages, oldIndex, newIndex)
            }
        })
    }

    // 레이아웃 이미지 드래그 앤 드롭
    const handleLayoutDragEnd = (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setFormData(prev => {
            const oldIndex = prev.layoutImages.findIndex((_, idx) => `layout-${idx}` === active.id)
            const newIndex = prev.layoutImages.findIndex((_, idx) => `layout-${idx}` === over.id)
            return {
                ...prev,
                layoutImages: arrayMove(prev.layoutImages, oldIndex, newIndex)
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
            // blob URL 해제
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

        // 2MB 용량 체크
        const oversizedFiles = files.filter(f => f.size > MAX_FILE_SIZE_PROJECT)
        if (oversizedFiles.length > 0) {
            alert(`파일 크기가 2MB를 초과합니다.`)
            e.target.value = ''
            return
        }

        setFormData(prev => {
            const newRows = [...prev.detailRows]
            const row = { ...newRows[rowIndex] }

            // 현재 이미지 개수 + 새 파일 개수가 3개를 넘지 않도록
            const currentCount = row.images.length
            const availableSlots = 3 - currentCount
            const filesToAdd = files.slice(0, availableSlots)

            if (filesToAdd.length === 0) {
                alert('최대 3개까지만 첨부할 수 있습니다.')
                return prev
            }

            // 새 이미지 추가
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
        if (!formData.titleKo.trim()) {
            alert('프로젝트명을 입력해주세요.')
            return
        }
        onSave(formData, project?.id)
    }

    if (!isOpen) return null

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal-content admin-modal-project" onClick={e => e.stopPropagation()}>
                <div className="admin-modal-header">
                    <h3>{project ? '프로젝트 수정' : '새 프로젝트 추가'}</h3>
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
                            disabled={loading || !formData.titleKo.trim()}
                        >
                            {loading ? '저장 중...' : '저장'}
                        </button>
                    </div>
                </div>
                <div className="admin-modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                    <div className="admin-modal-rows" style={{ borderRight: '1px solid #ededed', paddingRight: '50px', marginRight: '20px', height: "100%" }}>

                        <div className="admin-form-column">

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>프로젝트명 (국문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.titleKo}
                                        onChange={(e) => handleInputChange('titleKo', e.target.value)}
                                        placeholder="프로젝트명을 입력하세요"
                                        autoFocus
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>프로젝트명 (영문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.titleEn}
                                        onChange={(e) => handleInputChange('titleEn', e.target.value)}
                                        placeholder="English project name"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Year</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.year}
                                        onChange={(e) => handleInputChange('year', e.target.value)}
                                        placeholder="2024"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        placeholder="interior"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Completion</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.completion}
                                        onChange={(e) => handleInputChange('completion', e.target.value)}
                                        placeholder="Dec, 2024"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Usage</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.usage}
                                        onChange={(e) => handleInputChange('usage', e.target.value)}
                                        placeholder="cafe"
                                    />
                                </div>
                            </div>


                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Project Area</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.projectArea}
                                        onChange={(e) => handleInputChange('projectArea', e.target.value)}
                                        placeholder="60.7 ㎡"
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        placeholder="Seoul"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Client</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.client}
                                        onChange={(e) => handleInputChange('client', e.target.value)}
                                        placeholder="클라이언트명"
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>Design</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.design}
                                        onChange={(e) => handleInputChange('design', e.target.value)}
                                        placeholder="atelierah"
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>Photo</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.photo}
                                        onChange={(e) => handleInputChange('photo', e.target.value)}
                                        placeholder="photographer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="admin-form-group" style={{ marginBottom: '30px' }}>
                            <label>설명 (국문)</label>
                            <textarea
                                className="admin-textarea"
                                value={formData.descriptionKo}
                                onChange={(e) => handleInputChange('descriptionKo', e.target.value)}
                                placeholder="프로젝트 설명을 입력하세요"
                                rows={4}
                            />
                        </div>

                        <div className="admin-form-group" style={{ marginBottom: '30px' }}>
                            <label>설명 (영문)</label>
                            <textarea
                                className="admin-textarea"
                                value={formData.descriptionEn}
                                onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                                placeholder="English project description"
                                rows={4}
                            />
                        </div>
                    </div>


                    <div className="admin-modal-rows">
                        <div className="admin-form-group" style={{ marginBottom: '30px' }}>
                            <label>
                                썸네일 이미지 (1200*750px)
                            </label>
                            <div className="admin-upload-button-container">
                                <input
                                    type="file"
                                    id="thumbnail-upload"
                                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                    onChange={handleThumbnailSelect}
                                    ref={thumbnailInputRef}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => thumbnailInputRef.current?.click()}
                                    className="admin-button admin-button-secondary"
                                >
                                    이미지 추가
                                </button>
                                <small className="admin-upload-caption">
                                    지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB
                                </small>
                            </div>
                            {formData.thumbnail && (
                                <div className="admin-image-preview">
                                    <img src={formData.thumbnail} alt="썸네일 이미지" className="admin-preview-thumb" />
                                </div>
                            )}
                            <div className="admin-form-row" style={{ marginTop: '15px' }}>
                                <div className="admin-form-group">
                                    <label>썸네일 프로젝트명 (국문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.thumbnailTitleKo}
                                        onChange={(e) => handleInputChange('thumbnailTitleKo', e.target.value)}
                                        placeholder="썸네일에 표시될 프로젝트명"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>썸네일 프로젝트명 (영문)</label>
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={formData.thumbnailTitleEn}
                                        onChange={(e) => handleInputChange('thumbnailTitleEn', e.target.value)}
                                        placeholder="Thumbnail project name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 메인이미지/영상 */}
                        <div className="admin-form-group" style={{ marginBottom: '30px', borderBottom: '1px solid #ededed', paddingBottom: '30px' }}>
                            <label>메인 미디어</label>

                            {/* 이미지/영상 선택 */}
                            <div className="admin-slider-type-selector">
                                <label className={`admin-type-option ${formData.mainType === 'image' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="mainType"
                                        value="image"
                                        checked={formData.mainType === 'image'}
                                        onChange={() => handleInputChange('mainType', 'image')}
                                    />
                                    <span>이미지</span>
                                </label>
                                <label className={`admin-type-option ${formData.mainType === 'video' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="mainType"
                                        value="video"
                                        checked={formData.mainType === 'video'}
                                        onChange={() => handleInputChange('mainType', 'video')}
                                    />
                                    <span>영상</span>
                                </label>
                            </div>

                            {/* 이미지 모드 */}
                            {formData.mainType === 'image' && (
                                <>
                                    <div className="admin-upload-button-container">
                                        <input
                                            type="file"
                                            id="main-upload"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                            multiple
                                            onChange={handleMainFilesSelect}
                                            ref={mainInputRef}
                                            style={{ display: 'none' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => mainInputRef.current?.click()}
                                            className="admin-button admin-button-secondary"
                                        >
                                            이미지 추가
                                        </button>
                                        <small className="admin-upload-caption">
                                            지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB
                                        </small>
                                    </div>
                                    {formData.mainImages.length > 0 && (
                                        <div className="admin-gallery-preview">
                                            <DndContext
                                                sensors={mediaSensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={handleMainDragEnd}
                                            >
                                                <SortableContext
                                                    items={formData.mainImages.map((_, idx) => `main-${idx}`)}
                                                    strategy={rectSortingStrategy}
                                                >
                                                    <div className="admin-detail-media-container">
                                                        {formData.mainImages.map((imageUrl, index) => (
                                                            <SortableMediaItem
                                                                key={`main-${index}`}
                                                                id={`main-${index}`}
                                                                imageUrl={imageUrl}
                                                                index={index}
                                                                onRemove={handleRemoveMainImage}
                                                            />
                                                        ))}
                                                    </div>
                                                </SortableContext>
                                            </DndContext>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* 영상 모드 */}
                            {formData.mainType === 'video' && (
                                <div className="admin-video-input-section">
                                    <div className="admin-upload-button-container">
                                        <label className="admin-button admin-button-secondary" style={{ cursor: 'pointer' }}>
                                            영상 파일 선택
                                            <input
                                                type="file"
                                                accept="video/mp4,video/webm,video/quicktime"
                                                style={{ display: 'none' }}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        // blob URL 생성해서 미리보기용으로 사용
                                                        const blobUrl = URL.createObjectURL(file)
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            mainVideoSrc: blobUrl,
                                                            mainVideoFile: file,
                                                            mainVideoPending: true
                                                        }))
                                                    }
                                                }}
                                            />
                                        </label>
                                        <span className="admin-upload-caption">mp4, webm, mov / 최대 100MB</span>
                                    </div>
                                    {formData.mainVideoSrc && (
                                        <div className="admin-video-preview" style={{ marginTop: '15px' }}>
                                            <div className="admin-video-embed">
                                                <video
                                                    src={formData.mainVideoSrc}
                                                    controls
                                                    style={{ width: '100%', objectFit: 'contain', borderRadius: '8px' }}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="admin-button admin-button-small admin-button-danger"
                                                style={{ marginTop: '8px' }}
                                                onClick={() => {
                                                    if (formData.mainVideoSrc?.startsWith('blob:')) {
                                                        URL.revokeObjectURL(formData.mainVideoSrc)
                                                    }
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        mainVideoSrc: '',
                                                        mainVideoFile: null,
                                                        mainVideoPending: false
                                                    }))
                                                }}
                                            >
                                                영상 삭제
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* 스케치 이미지 */}
                        <div className="admin-form-group" style={{ marginBottom: '30px', borderBottom: '1px solid #ededed', paddingBottom: '30px' }}>
                            <label>
                                스케치 이미지
                            </label>
                            <div className="admin-upload-button-container">
                                <input
                                    type="file"
                                    id="sketch-upload"
                                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                    multiple
                                    onChange={handleSketchFilesSelect}
                                    ref={sketchInputRef}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => sketchInputRef.current?.click()}
                                    className="admin-button admin-button-secondary"
                                >
                                    이미지 추가
                                </button>
                                <small className="admin-upload-caption">
                                    지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB
                                </small>
                            </div>
                            {formData.sketchImages.length > 0 && (
                                <div className="admin-gallery-preview">
                                    <DndContext
                                        sensors={mediaSensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleSketchDragEnd}
                                    >
                                        <SortableContext
                                            items={formData.sketchImages.map((_, idx) => `sketch-${idx}`)}
                                            strategy={rectSortingStrategy}
                                        >
                                            <div className="admin-detail-media-container">
                                                {formData.sketchImages.map((imageUrl, index) => (
                                                    <SortableMediaItem
                                                        key={`sketch-${index}`}
                                                        id={`sketch-${index}`}
                                                        imageUrl={imageUrl}
                                                        index={index}
                                                        onRemove={handleRemoveSketchImage}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </DndContext>
                                </div>
                            )}
                        </div>

                        {/* 레이아웃 이미지 */}
                        <div className="admin-form-group" style={{ marginBottom: '30px', borderBottom: '1px solid #ededed', paddingBottom: '30px' }}>
                            <label>
                                레이아웃 이미지
                            </label>
                            <div className="admin-upload-button-container">
                                <input
                                    type="file"
                                    id="layout-upload"
                                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                    multiple
                                    onChange={handleLayoutFilesSelect}
                                    ref={layoutInputRef}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => layoutInputRef.current?.click()}
                                    className="admin-button admin-button-secondary"
                                >
                                    이미지 추가
                                </button>
                                <small className="admin-upload-caption">
                                    지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB
                                </small>
                            </div>
                            {formData.layoutImages.length > 0 && (
                                <div className="admin-gallery-preview">
                                    <DndContext
                                        sensors={mediaSensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleLayoutDragEnd}
                                    >
                                        <SortableContext
                                            items={formData.layoutImages.map((_, idx) => `layout-${idx}`)}
                                            strategy={rectSortingStrategy}
                                        >
                                            <div className="admin-detail-media-container">
                                                {formData.layoutImages.map((imageUrl, index) => (
                                                    <SortableMediaItem
                                                        key={`layout-${index}`}
                                                        id={`layout-${index}`}
                                                        imageUrl={imageUrl}
                                                        index={index}
                                                        onRemove={handleRemoveLayoutImage}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </DndContext>
                                </div>
                            )}
                        </div>

                        {/* 상세이미지 관리 */}
                        <div className="admin-form-group">
                            <label>상세이미지</label>
                            <small className="admin-upload-caption">
                                지원 포맷: JPG, PNG, WebP, GIF ㅣ 최대 용량: 2MB ㅣ 한 줄에 최대 3개까지 첨부 가능
                            </small>

                            {formData.detailRows.length > 0 && (
                                <div className="admin-detail-rows-container">
                                    {formData.detailRows.map((row, rowIndex) => (
                                        <div key={rowIndex} className="admin-detail-row-item">
                                            {/* Hidden file input */}
                                            <input
                                                type="file"
                                                id={`detail-upload-${rowIndex}`}
                                                accept="image/*"
                                                multiple
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleDetailImagesSelect(rowIndex, e)}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

function AdminWorks() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const sensors = useSensors(
        useSensor(PointerSensor),
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
            const projectsData = await getProjects()
            setProjects(projectsData)
        } catch (error) {
            console.error('데이터 로드 실패:', error)
            alert('데이터를 불러오는데 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const loadProjects = async () => {
        try {
            const data = await getProjects()
            setProjects(data)
        } catch (error) {
            console.error('프로젝트 로드 실패:', error)
        }
    }

    // 검색어로만 필터링 (역순으로 표시)
    const filteredProjects = [...projects].reverse().filter(project => {
        if (!searchTerm) return true

        const term = searchTerm.toLowerCase()
        return (
            project.title?.ko?.toLowerCase().includes(term) ||
            project.title?.en?.toLowerCase().includes(term) ||
            project.category?.ko?.toLowerCase().includes(term) ||
            project.category?.en?.toLowerCase().includes(term) ||
            project.year?.includes(term)
        )
    })

    const handleDragEnd = async (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = projects.findIndex((item) => item.id === active.id)
        const newIndex = projects.findIndex((item) => item.id === over.id)
        const newProjects = arrayMove(projects, oldIndex, newIndex)

        setProjects(newProjects)

        try {
            await updateProjectOrder(newProjects.map(p => p.id))
        } catch (error) {
            console.error('순서 저장 실패:', error)
            loadProjects()
        }
    }

    const handleOpenAddModal = () => {
        setEditingProject(null)
        setIsModalOpen(true)
    }

    const handleOpenEditModal = (project) => {
        setEditingProject(project)
        setIsModalOpen(true)
    }

    const convertFormToProjectData = async (formData, existingProject = null) => {
        let thumbnailUrl = formData.thumbnail

        // 썸네일 이미지 업로드 (2MB 제한)
        if (formData.thumbnailPending && formData.thumbnailFile) {
            try {
                thumbnailUrl = await uploadImage(formData.thumbnailFile, 'works', MAX_FILE_SIZE_PROJECT)
                URL.revokeObjectURL(formData.thumbnail)
            } catch (error) {
                console.error('썸네일 업로드 실패:', error)
                throw new Error('썸네일 이미지 업로드에 실패했습니다.')
            }
        }

        // 메인 영상 업로드 (pending 상태인 경우)
        let mainVideoSrc = formData.mainVideoSrc
        if (formData.mainVideoPending && formData.mainVideoFile) {
            try {
                mainVideoSrc = await uploadVideo(formData.mainVideoFile, 'works/video')
                if (formData.mainVideoSrc?.startsWith('blob:')) {
                    URL.revokeObjectURL(formData.mainVideoSrc)
                }
            } catch (error) {
                console.error('메인 영상 업로드 실패:', error)
                throw new Error('메인 영상 업로드에 실패했습니다.')
            }
        }

        // 메인이미지(슬라이더) 업로드 (2MB 제한)
        let mainUrls = formData.mainImages.filter(url => !url.startsWith('blob:'))
        if (formData.mainFiles.length > 0) {
            try {
                const { results, errors } = await uploadMultipleImages(formData.mainFiles, 'works/slider', null, MAX_FILE_SIZE_PROJECT)
                if (errors.length > 0) {
                    console.warn('일부 메인이미지 업로드 실패:', errors)
                }
                const newUrls = results.map(r => r.src)
                mainUrls = [...mainUrls, ...newUrls]
                formData.mainImages.filter(url => url.startsWith('blob:')).forEach(url => URL.revokeObjectURL(url))
            } catch (error) {
                console.error('메인이미지 업로드 실패:', error)
                throw new Error('메인이미지 업로드에 실패했습니다.')
            }
        }

        // 스케치 이미지 업로드 (2MB 제한)
        let sketchUrls = formData.sketchImages.filter(url => !url.startsWith('blob:'))
        if (formData.sketchFiles.length > 0) {
            try {
                const { results, errors } = await uploadMultipleImages(formData.sketchFiles, 'works/sketch', null, MAX_FILE_SIZE_PROJECT)
                if (errors.length > 0) {
                    console.warn('일부 스케치 이미지 업로드 실패:', errors)
                }
                const newUrls = results.map(r => r.src)
                sketchUrls = [...sketchUrls, ...newUrls]
                formData.sketchImages.filter(url => url.startsWith('blob:')).forEach(url => URL.revokeObjectURL(url))
            } catch (error) {
                console.error('스케치 이미지 업로드 실패:', error)
                throw new Error('스케치 이미지 업로드에 실패했습니다.')
            }
        }

        // 레이아웃 이미지 업로드 (2MB 제한)
        let layoutUrls = formData.layoutImages.filter(url => !url.startsWith('blob:'))
        if (formData.layoutFiles.length > 0) {
            try {
                const { results, errors } = await uploadMultipleImages(formData.layoutFiles, 'works/layout', null, MAX_FILE_SIZE_PROJECT)
                if (errors.length > 0) {
                    console.warn('일부 레이아웃 이미지 업로드 실패:', errors)
                }
                const newUrls = results.map(r => r.src)
                layoutUrls = [...layoutUrls, ...newUrls]
                formData.layoutImages.filter(url => url.startsWith('blob:')).forEach(url => URL.revokeObjectURL(url))
            } catch (error) {
                console.error('레이아웃 이미지 업로드 실패:', error)
                throw new Error('레이아웃 이미지 업로드에 실패했습니다.')
            }
        }

        // 상세이미지 업로드 (2MB 제한)
        const processedDetailRows = []
        for (const row of formData.detailRows) {
            const processedImages = []
            for (let i = 0; i < row.images.length; i++) {
                const imageUrl = row.images[i]
                const file = row.files[i]

                if (file && imageUrl?.startsWith('blob:')) {
                    // 새 파일 업로드
                    try {
                        const uploadedUrl = await uploadImage(file, 'works/detail', MAX_FILE_SIZE_PROJECT)
                        processedImages.push(uploadedUrl)
                        URL.revokeObjectURL(imageUrl)
                    } catch (error) {
                        console.error('상세이미지 업로드 실패:', error)
                    }
                } else if (imageUrl && !imageUrl.startsWith('blob:')) {
                    // 기존 URL 유지
                    processedImages.push(imageUrl)
                }
            }
            // 이미지가 있는 row만 저장
            if (processedImages.length > 0) {
                processedDetailRows.push({
                    images: processedImages
                })
            }
        }

        let content = existingProject?.content || defaultProjectTemplate.content

        // 기존 content에서 detail 타입 제거
        content = content.filter(item => item.type !== 'detail')

        content = content.map(item => {
            if (item.type === 'slider') {
                return {
                    ...item,
                    mediaType: formData.mainType,
                    videoSrc: formData.mainType === 'video' ? mainVideoSrc : ''
                }
            }
            if (item.type === 'info') {
                return {
                    ...item,
                    description: {
                        ko: formData.descriptionKo,
                        en: formData.descriptionEn
                    },
                    details: {
                        completion: { ko: formData.completion, en: formData.completion },
                        usage: { ko: formData.usage, en: formData.usage },
                        projectArea: { ko: formData.projectArea, en: formData.projectArea },
                        location: { ko: formData.location, en: formData.location },
                        client: { ko: formData.client, en: formData.client },
                        design: { ko: formData.design, en: formData.design },
                        photo: { ko: formData.photo, en: formData.photo }
                    }
                }
            }
            return item
        })

        // 상세이미지 content 추가
        if (processedDetailRows.length > 0) {
            content.push({
                type: 'detail',
                rows: processedDetailRows
            })
        }

        return {
            title: {
                ko: formData.titleKo,
                en: formData.titleEn
            },
            thumbnailTitle: {
                ko: formData.thumbnailTitleKo,
                en: formData.thumbnailTitleEn
            },
            category: {
                ko: formData.category,
                en: formData.category
            },
            year: formData.year,
            images: {
                thumbnail: thumbnailUrl,
                slider: mainUrls,
                sketch: sketchUrls,
                layout: layoutUrls
            },
            content
        }
    }

    const handleSaveProject = async (formData, projectId) => {
        setSaving(true)

        try {
            const projectData = await convertFormToProjectData(formData, editingProject)

            if (projectId) {
                await updateProject(projectId, projectData)
                setProjects(prev => prev.map(p =>
                    p.id === projectId ? { ...p, ...projectData } : p
                ))
            } else {
                const newId = await addProject(projectData)
                setProjects(prev => [...prev, { id: newId, ...projectData }])
            }

            setIsModalOpen(false)
            setEditingProject(null)
        } catch (error) {
            console.error('프로젝트 저장 실패:', error)
            alert('프로젝트 저장에 실패했습니다: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteProject = async (projectId) => {
        if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

        try {
            const project = projects.find(p => p.id === projectId)
            if (project?.images?.thumbnail) {
                await deleteImage(project.images.thumbnail).catch(() => { })
            }

            await deleteProject(projectId)
            setProjects(prev => prev.filter(p => p.id !== projectId))
        } catch (error) {
            console.error('프로젝트 삭제 실패:', error)
            alert('프로젝트 삭제에 실패했습니다.')
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
                    <h2 className="admin-section-title">프로젝트 관리</h2>
                    <div className="admin-header-controls">
                        <div className="admin-search-input-group">
                            <input
                                type="text"
                                placeholder="프로젝트 검색..."
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
                            프로젝트 추가
                        </button>
                    </div>
                </div>

                {/* 프로젝트 목록 */}
                <div className="admin-projects-container">
                    {filteredProjects.length === 0 ? (
                        <div className="admin-empty-state">
                            <p>{searchTerm ? '검색 결과가 없습니다.' : '등록된 프로젝트가 없습니다.'}</p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={filteredProjects.map(p => p.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="admin-projects-table">
                                    <div className="admin-table-body">
                                        {filteredProjects.map((project) => (
                                            <SortableProjectItem
                                                key={project.id}
                                                id={project.id}
                                                project={project}
                                                onEdit={handleOpenEditModal}
                                                onDelete={handleDeleteProject}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>

                {/* 프로젝트 모달 */}
                <ProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveProject}
                    project={editingProject}
                    loading={saving}
                />

            </div>
        </div>
    )
}

export default AdminWorks

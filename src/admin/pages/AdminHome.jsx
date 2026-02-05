import { useState, useEffect } from 'react'
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
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getHomeData, saveHomeData, defaultHomeData } from '../../services/homeService'
import { deleteImage, uploadImage, uploadVideo } from '../../services/imageService'
import { projects as projectList } from '../../data/projects'
import ImageUploader from '../../components/ImageUploader'
import SortableImageItem from '../components/SortableImageItem'
import ProjectModal from '../components/ProjectModal'

// 드래그 가능한 프로젝트 리스트 아이템
function SortableProjectListItem({ item, onEdit, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1,
    }

    // 프로젝트 이름 가져오기
    const getProjectName = () => {
        if (!item.link) return '프로젝트 미선택'
        const projectId = parseInt(item.link.split('/').pop())
        const project = projectList.find(p => p.id === projectId)
        return project ? `${project.title.ko} (${project.year})` : '프로젝트 미선택'
    }

    return (
        <div ref={setNodeRef} style={style} className="admin-project-list-item">
            <div className="admin-drag-handle" {...attributes} {...listeners}>
                ⠿
            </div>
            <div className="admin-project-list-images">
                <div className="admin-project-thumb">
                    {item.sketchSrc ? (
                        <img src={item.sketchSrc} alt="스케치" />
                    ) : (
                        <div className="admin-thumb-placeholder">스케치</div>
                    )}
                </div>
                <div className="admin-project-thumb">
                    {item.photoSrc ? (
                        <img src={item.photoSrc} alt="포토" />
                    ) : (
                        <div className="admin-thumb-placeholder">포토</div>
                    )}
                </div>
            </div>
            <div className="admin-project-list-name">
                {getProjectName()}
            </div>
            <div className="admin-project-list-actions">
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

function AdminHome() {
    // 슬로건 상태
    const [sloganPc, setSloganPc] = useState('')
    const [sloganMobile, setSloganMobile] = useState('')

    // 슬라이더 관련 상태
    const [sliderType, setSliderType] = useState('image') // 'image' 또는 'video'
    const [sliderImages, setSliderImages] = useState([])
    const [sliderVideoSrc, setSliderVideoSrc] = useState('') // 업로드된 비디오 URL
    const [sliderVideoFile, setSliderVideoFile] = useState(null) // 새로 선택한 비디오 파일
    const [sliderVideoPending, setSliderVideoPending] = useState(false) // 업로드 대기 여부

    const [projectImages, setProjectImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')

    // 삭제 예정 이미지 URL 목록 (저장 시 R2에서 삭제)
    const [pendingDeletes, setPendingDeletes] = useState([])

    // 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState(null)

    // DnD 센서 설정
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Home 데이터 불러오기
    useEffect(() => {
        async function loadHomeData() {
            setLoading(true)
            try {
                const data = await getHomeData()
                setSloganPc(data.sloganPc || defaultHomeData.sloganPc)
                setSloganMobile(data.sloganMobile || defaultHomeData.sloganMobile)
                setSliderType(data.sliderType || 'image')
                setSliderImages(data.sliderImages || defaultHomeData.sliderImages)
                setSliderVideoSrc(data.sliderVideoSrc || '')
                setProjectImages(data.projectImages || defaultHomeData.projectImages)
            } catch (error) {
                console.error('데이터 로드 실패:', error)
                setSloganPc(defaultHomeData.sloganPc)
                setSloganMobile(defaultHomeData.sloganMobile)
                setSliderType('image')
                setSliderImages(defaultHomeData.sliderImages)
                setSliderVideoSrc('')
                setProjectImages(defaultHomeData.projectImages)
            } finally {
                setLoading(false)
            }
        }
        loadHomeData()
    }, [])

    // 슬라이더 이미지 링크 수정
    const handleSliderLinkChange = (id, value) => {
        setSliderImages(prev => prev.map(img =>
            img.id === id ? { ...img, link: value } : img
        ))
    }

    // 슬라이더 이미지 삭제 (저장 시 R2에서 삭제됨)
    const handleSliderDelete = (id) => {
        const imageToDelete = sliderImages.find(img => img.id === id)

        // 삭제 예정 목록에 추가
        if (imageToDelete?.src) {
            setPendingDeletes(prev => [...prev, imageToDelete.src])
        }

        setSliderImages(prev => prev.filter(img => img.id !== id))
    }

    // 슬라이더 드래그앤드롭 핸들러
    const handleSliderDragEnd = (event) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            setSliderImages((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    // 프로젝트 추가 모달 열기
    const handleOpenAddModal = () => {
        setEditingProject(null)
        setIsModalOpen(true)
    }

    // 프로젝트 수정 모달 열기
    const handleOpenEditModal = (item) => {
        setEditingProject(item)
        setIsModalOpen(true)
    }

    // 프로젝트 저장 (추가/수정)
    const handleSaveProject = (projectData) => {
        if (editingProject) {
            // 수정 - 기존 이미지와 새 이미지가 다르면 삭제 예정 목록에 추가
            if (editingProject.sketchSrc && editingProject.sketchSrc !== projectData.sketchSrc) {
                setPendingDeletes(prev => [...prev, editingProject.sketchSrc])
            }
            if (editingProject.photoSrc && editingProject.photoSrc !== projectData.photoSrc) {
                setPendingDeletes(prev => [...prev, editingProject.photoSrc])
            }

            setProjectImages(prev => prev.map(item =>
                item.id === projectData.id ? projectData : item
            ))
        } else {
            // 추가
            setProjectImages(prev => [...prev, projectData])
        }
    }

    // 프로젝트 삭제 (저장 시 R2에서 삭제됨)
    const handleProjectDelete = (id) => {
        if (!confirm('정말 삭제하시겠습니까?')) return

        const projectToDelete = projectImages.find(item => item.id === id)

        // 삭제 예정 목록에 추가
        if (projectToDelete?.sketchSrc) {
            setPendingDeletes(prev => [...prev, projectToDelete.sketchSrc])
        }
        if (projectToDelete?.photoSrc) {
            setPendingDeletes(prev => [...prev, projectToDelete.photoSrc])
        }

        setProjectImages(prev => prev.filter(item => item.id !== id))
    }

    // 프로젝트 드래그앤드롭 핸들러
    const handleProjectDragEnd = (event) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            setProjectImages((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    // Home 데이터 저장
    const handleSaveHomeData = async () => {
        setSaving(true)
        setSaveMessage('')

        try {
            // 1. 삭제 예정 이미지들을 R2에서 삭제
            for (const imageUrl of pendingDeletes) {
                try {
                    await deleteImage(imageUrl)
                } catch (error) {
                    console.error('R2 이미지 삭제 실패:', imageUrl, error)
                }
            }

            // 2. 슬라이더 이미지 중 pending 상태인 것들 업로드
            const uploadedSliderImages = await Promise.all(
                sliderImages.map(async (img) => {
                    if (img.isPending && img.file) {
                        try {
                            const url = await uploadImage(img.file, 'slider')
                            // blob URL 해제
                            URL.revokeObjectURL(img.src)
                            return { ...img, src: url, file: undefined, isPending: false }
                        } catch (error) {
                            console.error('슬라이더 이미지 업로드 실패:', error)
                            return null // 업로드 실패한 이미지는 제거
                        }
                    }
                    return img
                })
            )
            const finalSliderImages = uploadedSliderImages.filter(img => img !== null)

            // 3. 프로젝트 이미지 중 pending 상태인 것들 업로드
            const uploadedProjectImages = await Promise.all(
                projectImages.map(async (item) => {
                    let updatedItem = { ...item }

                    // 스케치 이미지 업로드
                    if (item.sketchPending && item.sketchFile) {
                        try {
                            const url = await uploadImage(item.sketchFile, 'sketch')
                            URL.revokeObjectURL(item.sketchSrc)
                            updatedItem.sketchSrc = url
                            updatedItem.sketchFile = undefined
                            updatedItem.sketchPending = false
                        } catch (error) {
                            console.error('스케치 이미지 업로드 실패:', error)
                        }
                    }

                    // 포토 이미지 업로드
                    if (item.photoPending && item.photoFile) {
                        try {
                            const url = await uploadImage(item.photoFile, 'photo')
                            URL.revokeObjectURL(item.photoSrc)
                            updatedItem.photoSrc = url
                            updatedItem.photoFile = undefined
                            updatedItem.photoPending = false
                        } catch (error) {
                            console.error('포토 이미지 업로드 실패:', error)
                        }
                    }

                    return updatedItem
                })
            )

            // 4. 비디오 파일 업로드 (pending 상태인 경우)
            let finalVideoSrc = sliderVideoSrc
            if (sliderVideoPending && sliderVideoFile) {
                try {
                    finalVideoSrc = await uploadVideo(sliderVideoFile, 'video')
                    // blob URL 해제
                    if (sliderVideoSrc && sliderVideoSrc.startsWith('blob:')) {
                        URL.revokeObjectURL(sliderVideoSrc)
                    }
                    setSliderVideoSrc(finalVideoSrc)
                    setSliderVideoFile(null)
                    setSliderVideoPending(false)
                } catch (error) {
                    console.error('비디오 업로드 실패:', error)
                    throw new Error('비디오 업로드에 실패했습니다.')
                }
            }

            // 5. Firebase에 데이터 저장 (file 객체 제거)
            const cleanSliderImages = finalSliderImages.map(({ file, isPending, ...rest }) => rest)
            const cleanProjectImages = uploadedProjectImages.map(({ sketchFile, photoFile, sketchPending, photoPending, ...rest }) => rest)

            await saveHomeData({
                sloganPc,
                sloganMobile,
                sliderType,
                sliderImages: cleanSliderImages,
                sliderVideoSrc: finalVideoSrc,
                projectImages: cleanProjectImages
            })

            // 6. state 업데이트
            setSliderImages(finalSliderImages)
            setProjectImages(uploadedProjectImages)

            // 7. 삭제 예정 목록 초기화
            setPendingDeletes([])

            setSaveMessage('저장되었습니다!')
            setTimeout(() => setSaveMessage(''), 3000)
        } catch (error) {
            setSaveMessage('저장에 실패했습니다.')
            console.error('저장 실패:', error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="admin-content-main admin-home-manager">
                <div className="admin-loading-inline">
                    <p>데이터 불러오는 중...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-content-main admin-home-manager">
            {/* 슬로건 섹션 */}
            <div className="admin-home-section">
                <div className="admin-section-header">
                    <h3>MAIN 슬로건</h3>
                </div>

                <div className="admin-slogan-inputs">
                    <div className="admin-form-group">
                        <label>PC</label>
                        <textarea
                            className="admin-textarea"
                            value={sloganPc}
                            onChange={(e) => setSloganPc(e.target.value)}
                            placeholder="PC용 슬로건을 입력하세요"
                            rows={2}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label>모바일</label>
                        <textarea
                            className="admin-textarea"
                            value={sloganMobile}
                            onChange={(e) => setSloganMobile(e.target.value)}
                            placeholder="모바일용 슬로건을 입력하세요"
                            rows={2}
                        />
                    </div>
                </div>
            </div>

            {/* 슬라이더 섹션 */}
            <div className="admin-home-section">
                <div className="admin-section-header">
                    <h3>슬라이더</h3>
                    <p className="admin-section-desc">영상은 1개만 노출 가능합니다.</p>
                </div>

                {/* 슬라이더 타입 선택 */}
                <div className="admin-slider-type-selector">
                    <label className={`admin-type-option ${sliderType === 'image' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            name="sliderType"
                            value="image"
                            checked={sliderType === 'image'}
                            onChange={(e) => setSliderType(e.target.value)}
                        />
                        <span>이미지</span>
                    </label>
                    <label className={`admin-type-option ${sliderType === 'video' ? 'active' : ''}`}>
                        <input
                            type="radio"
                            name="sliderType"
                            value="video"
                            checked={sliderType === 'video'}
                            onChange={(e) => setSliderType(e.target.value)}
                        />
                        <span>영상</span>
                    </label>
                </div>

                {/* 이미지 모드 */}
                {sliderType === 'image' && (
                    <>
                        <ImageUploader
                            onFilesSelect={(newImages) => {
                                setSliderImages(prev => [...prev, ...newImages])
                            }}
                        />

                        {sliderImages.length > 0 && (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleSliderDragEnd}
                            >
                                <SortableContext
                                    items={sliderImages.map(img => img.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="admin-image-list">
                                        {sliderImages.map((img, index) => (
                                            <SortableImageItem
                                                key={img.id}
                                                img={img}
                                                index={index}
                                                type="slider"
                                                onLinkChange={(id, value) => handleSliderLinkChange(id, value)}
                                                onDelete={(id) => handleSliderDelete(id)}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        )}
                    </>
                )}

                {/* 영상 모드 */}
                {sliderType === 'video' && (
                    <div className="admin-video-input-section">
                        <div className="admin-upload-button-container">
                            <label className="admin-button admin-button-small" style={{ cursor: 'pointer' }}>
                                영상 파일 선택
                                <input
                                    type="file"
                                    accept="video/mp4,video/webm,video/quicktime"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            // 기존 비디오가 있고, 새 비디오로 교체하는 경우 삭제 예정 목록에 추가
                                            if (sliderVideoSrc && !sliderVideoSrc.startsWith('blob:')) {
                                                setPendingDeletes(prev => [...prev, sliderVideoSrc])
                                            }
                                            // blob URL 생성해서 미리보기용으로 사용
                                            const blobUrl = URL.createObjectURL(file)
                                            setSliderVideoSrc(blobUrl)
                                            setSliderVideoFile(file)
                                            setSliderVideoPending(true)
                                        }
                                    }}
                                />
                            </label>
                            <span className="admin-upload-caption">mp4, webm, mov / 최대 100MB</span>
                        </div>
                        {sliderVideoSrc && (
                            <div className="admin-video-preview">
                                <p className="admin-preview-label">미리보기</p>
                                <div className="admin-video-embed">
                                    <video
                                        src={sliderVideoSrc}
                                        controls
                                        style={{ width: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="admin-button admin-button-small admin-button-danger"
                                    style={{ marginTop: '8px' }}
                                    onClick={() => {
                                        // 기존 비디오 삭제 예정 목록에 추가
                                        if (sliderVideoSrc && !sliderVideoSrc.startsWith('blob:')) {
                                            setPendingDeletes(prev => [...prev, sliderVideoSrc])
                                        }
                                        // blob URL 해제
                                        if (sliderVideoSrc && sliderVideoSrc.startsWith('blob:')) {
                                            URL.revokeObjectURL(sliderVideoSrc)
                                        }
                                        setSliderVideoSrc('')
                                        setSliderVideoFile(null)
                                        setSliderVideoPending(false)
                                    }}
                                >
                                    영상 삭제
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 프로젝트 이미지 섹션 */}
            <div className="admin-home-section">
                <div className="admin-section-header">
                    <h3>프로젝트 이미지</h3>
                    <button
                        className="admin-button admin-button-small"
                        onClick={handleOpenAddModal}
                    >
                        + 프로젝트 추가
                    </button>
                </div>

                {projectImages.length > 0 && (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleProjectDragEnd}
                    >
                        <SortableContext
                            items={projectImages.map(item => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="admin-project-list">
                                {projectImages.map((item) => (
                                    <SortableProjectListItem
                                        key={item.id}
                                        item={item}
                                        onEdit={handleOpenEditModal}
                                        onDelete={handleProjectDelete}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}

                {projectImages.length === 0 && (
                    <div className="admin-empty-state">
                        <p>프로젝트 이미지가 없습니다. 위의 버튼을 클릭하여 추가하세요.</p>
                    </div>
                )}
            </div>

            {/* 저장 버튼 */}
            <button
                className="admin-button admin-button-primary admin-save-btn"
                onClick={handleSaveHomeData}
                disabled={saving}
            >
                {saving ? '저장 중...' : '변경사항 저장'}
            </button>

            {/* 프로젝트 추가/수정 모달 */}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProject}
                initialData={editingProject}
            />
        </div>
    )
}

export default AdminHome

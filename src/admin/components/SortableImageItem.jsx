import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { projects as projectList } from '../../data/projects'

function SortableImageItem({ img, index, type, onLinkChange, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: img.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className="admin-image-item">
            <div className="admin-drag-handle" {...attributes} {...listeners}>
                ⠿
            </div>
            <div className="admin-image-preview-box">
                {img.src ? (
                    <img src={img.src} alt={`${type} ${index + 1}`} />
                ) : (
                    <div className="admin-image-placeholder">이미지 없음</div>
                )}
            </div>
            <div className="admin-image-inputs">
                <div className="admin-form-group">
                    <label>클릭 시 이동할 프로젝트</label>
                    <select
                        value={img.link || ''}
                        onChange={(e) => onLinkChange(img.id, e.target.value)}
                        className="admin-select"
                    >
                        <option value="">선택 안함</option>
                        {projectList.map((project) => (
                            <option key={project.id} value={`/works/${project.id}`}>
                                {project.title.ko} ({project.year})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                className="admin-button admin-button-small admin-button-danger"
                onClick={() => onDelete(img.id)}
            >
                삭제
            </button>
        </div>
    )
}

export default SortableImageItem



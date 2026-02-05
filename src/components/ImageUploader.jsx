import { useState, useRef } from 'react'
import { MAX_FILE_SIZE, ALLOWED_TYPES } from '../services/imageService'
import './ImageUploader.css'

// 파일 선택 시 로컬 미리보기 생성 (실제 업로드는 저장 시 처리)
function ImageUploader({ onFilesSelect, maxFiles = 10 }) {
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState([])
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files).filter(file =>
      ALLOWED_TYPES.includes(file.type)
    )

    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFiles = (files) => {
    // 파일 개수 제한
    const filesToProcess = files.slice(0, maxFiles)

    // 파일 크기 검사
    const oversizedFiles = filesToProcess.filter(f => f.size > MAX_FILE_SIZE)
    if (oversizedFiles.length > 0) {
      setErrors(oversizedFiles.map(f => `${f.name}: 5MB 초과`))
      return
    }

    // 유효하지 않은 파일 타입 검사
    const invalidFiles = filesToProcess.filter(f => !ALLOWED_TYPES.includes(f.type))
    if (invalidFiles.length > 0) {
      setErrors(invalidFiles.map(f => `${f.name}: 지원하지 않는 형식`))
      return
    }

    setErrors([])

    // 로컬 미리보기 URL 생성 및 파일 객체 전달
    const results = filesToProcess.map((file, index) => ({
      id: Date.now() + index,
      src: URL.createObjectURL(file), // 로컬 미리보기 URL
      file: file, // 실제 파일 객체 (저장 시 업로드용)
      link: '',
      originalName: file.name,
      isPending: true // 아직 업로드되지 않음 표시
    }))

    if (onFilesSelect) {
      onFilesSelect(results)
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="image-uploader">
      <div
        className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <div className="upload-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p>클릭하거나 파일을 드래그하세요</p>
          <span>JPG, PNG, GIF, WebP (최대 5MB)</span>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="upload-errors">
          {errors.map((error, index) => (
            <p key={index} className="upload-error">{error}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageUploader

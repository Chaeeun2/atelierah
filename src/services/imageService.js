// Cloudflare Workers를 통한 R2 이미지 업로드 서비스

const WORKER_URL = import.meta.env.VITE_R2_WORKER_URL
const R2_PUBLIC_URL = import.meta.env.VITE_CLOUDFLARE_R2_PUBLIC_URL

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB (메인페이지용)
const MAX_FILE_SIZE_PROJECT = 2 * 1024 * 1024 // 2MB (프로젝트 페이지용)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// 파일 유효성 검사 (기본 5MB)
export function validateFile(file, maxSize = MAX_FILE_SIZE) {
    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error(`지원하지 않는 파일 형식입니다. (${file.name})`)
    }

    if (file.size > maxSize) {
        const maxMB = maxSize / (1024 * 1024)
        throw new Error(`파일 크기가 ${maxMB}MB를 초과합니다. (${file.name})`)
    }

    return true
}

// 단일 이미지 업로드 (Workers API 사용)
export async function uploadImage(file, folder = 'slider', maxSize = MAX_FILE_SIZE) {
    validateFile(file, maxSize)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
        const response = await fetch(`${WORKER_URL}/upload`, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || '업로드 실패')
        }

        const data = await response.json()
        return data.url
    } catch (error) {
        console.error('이미지 업로드 오류:', error)
        throw new Error(`업로드 실패: ${error.message}`)
    }
}

// 여러 이미지 업로드
export async function uploadMultipleImages(files, folder = 'slider', onProgress, maxSize = MAX_FILE_SIZE) {
    const results = []
    const errors = []

    for (let i = 0; i < files.length; i++) {
        const file = files[i]

        try {
            validateFile(file, maxSize)

            if (onProgress) {
                onProgress((i / files.length) * 100, file.name)
            }

            const url = await uploadImage(file, folder, maxSize)
            results.push({
                id: Date.now() + i,
                src: url,
                link: '',
                originalName: file.name
            })

            if (onProgress) {
                onProgress(((i + 1) / files.length) * 100, file.name)
            }
        } catch (error) {
            errors.push({ file: file.name, error: error.message })
        }
    }

    return { results, errors }
}

// 이미지 삭제 (Workers API 사용)
export async function deleteImage(imageUrl) {
    try {
        // Public URL에서 파일명 추출
        const fileName = imageUrl.replace(`${R2_PUBLIC_URL}/`, '')

        const response = await fetch(`${WORKER_URL}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || '삭제 실패')
        }

        return true
    } catch (error) {
        console.error('이미지 삭제 오류:', error)
        throw new Error(`삭제 실패: ${error.message}`)
    }
}

export { MAX_FILE_SIZE, MAX_FILE_SIZE_PROJECT, ALLOWED_TYPES }

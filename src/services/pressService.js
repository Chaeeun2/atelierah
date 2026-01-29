// Press 데이터 관리 서비스
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore'
import { db } from '../config/firebase'
import { pressItems as localPressItems } from '../data/press'

const COLLECTION_NAME = 'press'

// 모든 프레스 가져오기
export async function getPressItems() {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
        const items = []
        querySnapshot.forEach((docSnap) => {
            items.push({ ...docSnap.data(), id: docSnap.id })
        })
        // order 필드로 정렬
        return items.sort((a, b) => (a.order || 0) - (b.order || 0))
    } catch (error) {
        console.error('프레스 목록 가져오기 실패:', error)
        throw error
    }
}

// 단일 프레스 가져오기
export async function getPressItem(pressId) {
    try {
        const docRef = doc(db, COLLECTION_NAME, String(pressId))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id }
        }
        return null
    } catch (error) {
        console.error('프레스 가져오기 실패:', error)
        throw error
    }
}

// 프레스 추가
export async function addPressItem(pressData) {
    try {
        const items = await getPressItems()
        const newOrder = items.length

        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...pressData,
            order: newOrder,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
        return docRef.id
    } catch (error) {
        console.error('프레스 추가 실패:', error)
        throw error
    }
}

// 프레스 수정
export async function updatePressItem(pressId, pressData) {
    try {
        const docRef = doc(db, COLLECTION_NAME, String(pressId))
        await updateDoc(docRef, {
            ...pressData,
            updatedAt: new Date().toISOString()
        })
        return true
    } catch (error) {
        console.error('프레스 수정 실패:', error)
        throw error
    }
}

// 프레스 삭제
export async function deletePressItem(pressId) {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, String(pressId)))
        return true
    } catch (error) {
        console.error('프레스 삭제 실패:', error)
        throw error
    }
}

// 프레스 순서 업데이트
export async function updatePressOrder(pressIds) {
    try {
        const batch = writeBatch(db)
        pressIds.forEach((id, index) => {
            const docRef = doc(db, COLLECTION_NAME, String(id))
            batch.update(docRef, { order: index })
        })
        await batch.commit()
        return true
    } catch (error) {
        console.error('프레스 순서 업데이트 실패:', error)
        throw error
    }
}

// 로컬 데이터를 Firebase로 마이그레이션
export async function migrateLocalPressToFirebase(force = false) {
    try {
        const existingItems = await getPressItems()

        if (existingItems.length > 0 && !force) {
            console.log('이미 Firebase에 프레스 데이터가 있습니다:', existingItems.length, '개')
            return { success: false, message: '이미 데이터가 존재합니다', count: existingItems.length }
        }

        // 강제 마이그레이션 시 기존 데이터 삭제
        if (force && existingItems.length > 0) {
            const deleteBatch = writeBatch(db)
            existingItems.forEach(item => {
                const docRef = doc(db, COLLECTION_NAME, String(item.id))
                deleteBatch.delete(docRef)
            })
            await deleteBatch.commit()
            console.log('기존 데이터 삭제 완료:', existingItems.length, '개')
        }

        // 로컬 프레스 데이터를 Firebase에 저장
        const batch = writeBatch(db)

        localPressItems.forEach((item, index) => {
            const docRef = doc(db, COLLECTION_NAME, `press_${item.id}`)
            batch.set(docRef, {
                ...item,
                order: index,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        })

        await batch.commit()
        console.log('마이그레이션 완료:', localPressItems.length, '개 프레스')
        return { success: true, message: '마이그레이션 완료', count: localPressItems.length }
    } catch (error) {
        console.error('마이그레이션 실패:', error)
        throw error
    }
}

// 기본 프레스 템플릿
export const defaultPressTemplate = {
    type: 'link', // 'link' 또는 'detail'
    image: '',
    media: '',
    project: { ko: '', en: '' },
    link: '', // type이 'link'일 때
    content: [] // type이 'detail'일 때
}


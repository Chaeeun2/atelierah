// Contact 데이터 관리 서비스
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'

const COLLECTION_NAME = 'contact'
const CONTACT_DOC_ID = 'info'
const INQUIRIES_COLLECTION = 'inquiries'

// 기본 Contact 정보
export const defaultContactInfo = {
    description: {
        ko: `atelier ah는 'Ah'의 순간으로부터 출발한다.
순수한 이미지의 파동과 공간에 내재된 분위기 사이를 잇는
하나의 수평적 언어로서 존재한다.`,
        en: `atelier ah begins from moments of 'Ah'.
It exists as a horizontal language connecting the waves of pure imagery
and the atmosphere inherent in space.`
    },
    email: 'info@atelierah.com',
    instagram: {
        id: '@atelierah_official',
        url: 'https://www.instagram.com/atelierah_official'
    },
    address: {
        ko: '18-1, Jeongneung-ro 10ra-gil, Seongbuk-gu, Seoul, Republic of Korea',
        en: '18-1, Jeongneung-ro 10ra-gil, Seongbuk-gu, Seoul, Republic of Korea'
    }
}

// Contact 정보 가져오기
export async function getContactInfo() {
    try {
        const docRef = doc(db, COLLECTION_NAME, CONTACT_DOC_ID)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
            return docSnap.data()
        }
        return defaultContactInfo
    } catch (error) {
        console.error('Contact 정보 가져오기 실패:', error)
        return defaultContactInfo
    }
}

// Contact 정보 저장하기
export async function saveContactInfo(data) {
    try {
        const docRef = doc(db, COLLECTION_NAME, CONTACT_DOC_ID)
        await setDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        })
        return true
    } catch (error) {
        console.error('Contact 정보 저장 실패:', error)
        throw error
    }
}

// 문의사항 목록 가져오기
export async function getInquiries() {
    try {
        const q = query(
            collection(db, INQUIRIES_COLLECTION),
            orderBy('createdAt', 'desc')
        )
        const querySnapshot = await getDocs(q)
        const inquiries = []
        querySnapshot.forEach((docSnap) => {
            inquiries.push({ id: docSnap.id, ...docSnap.data() })
        })
        return inquiries
    } catch (error) {
        console.error('문의사항 목록 가져오기 실패:', error)
        throw error
    }
}

// 문의사항 추가하기
export async function addInquiry(data) {
    try {
        const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), {
            ...data,
            createdAt: new Date().toISOString()
        })
        return docRef.id
    } catch (error) {
        console.error('문의사항 추가 실패:', error)
        throw error
    }
}

// 문의사항 삭제하기
export async function deleteInquiry(inquiryId) {
    try {
        await deleteDoc(doc(db, INQUIRIES_COLLECTION, inquiryId))
        return true
    } catch (error) {
        console.error('문의사항 삭제 실패:', error)
        throw error
    }
}


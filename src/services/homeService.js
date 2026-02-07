// Home 페이지 데이터 관리 서비스
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const HOME_DOC_ID = 'homePageData'
const COLLECTION_NAME = 'settings'

// 기본 데이터
const defaultHomeData = {
  // 메인페이지 슬로건 (PC/모바일)
  sloganPc: 'simple horizontal totality through which all this goes',
  sloganMobile: 'simple horizontal totality through which all this goes',
  // 슬라이더 타입: 'image' 또는 'video'
  sliderType: 'image',
  sliderImages: [
    { id: 1, src: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_01.jpg', link: '/works/5' },
    { id: 2, src: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_03.jpg', link: '/works/4' },
    { id: 3, src: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_01.jpg', link: '/works/3' },
  ],
  // 영상 모드일 때 사용 (업로드된 비디오 파일 URL)
  sliderVideoSrc: '',
  // 스케치 + 포토를 하나의 프로젝트 이미지로 통합
  projectImages: [
    { 
      id: 1, 
      sketchSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/main-sketch-1.jpg', 
      photoSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_01.jpg', 
      link: '/works/5' 
    },
    { 
      id: 2, 
      sketchSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/main-sketch-2.jpg', 
      photoSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_03.jpg', 
      link: '/works/4' 
    },
    { 
      id: 3, 
      sketchSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/main-sketch-3.jpg', 
      photoSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_01.jpg', 
      link: '/works/3' 
    },
    { 
      id: 4, 
      sketchSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/main-sketch-4.jpg', 
      photoSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_02.jpg', 
      link: '/works/2' 
    },
    { 
      id: 5, 
      sketchSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/main-sketch-5.jpg', 
      photoSrc: 'https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_01.jpg', 
      link: '/works/1' 
    },
  ],
}

// Home 데이터 가져오기
export async function getHomeData() {
  try {
    const docRef = doc(db, COLLECTION_NAME, HOME_DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return defaultHomeData
    }
  } catch (error) {
    return defaultHomeData
  }
}

// Home 데이터 저장하기
export async function saveHomeData(data) {
  try {
    const docRef = doc(db, COLLECTION_NAME, HOME_DOC_ID)
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    throw error
  }
}

export { defaultHomeData }

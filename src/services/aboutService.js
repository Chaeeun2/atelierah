// About 페이지 데이터 관리 서비스
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const ABOUT_DOC_ID = 'aboutPageData'
const COLLECTION_NAME = 'settings'

// 기본 데이터 - 3개 문단 각각 한글/영문, PC/모바일
const defaultAboutData = {
  // 문단 1
  paragraph1: {
    koPc: `"Ah"란 원초적인 아름다움을 마주했을 때,
존재와 인식이 일치하는 순간에 터져 나오는 감탄사라 말한다.
그것은 이성과 감성이 교차하는 지점이며, 논리를 넘어선 찰나의 질서를 만들어낸다.`,
    koMobile: `"Ah"란 원초적인 아름다움을 마주했을 때,
존재와 인식이 일치하는 순간에 터져 나오는 감탄사라 말한다.
그것은 이성과 감성이 교차하는 지점이며,
논리를 넘어선 찰나의 질서를 만들어낸다.`,
    enPc: `"Ah" refers to an exclamation that explodes at the moment
when existence and perception coincide when facing raw beauty.
It is the point where reason and emotion intersect, creating a momentary order beyond logic.`,
    enMobile: `"Ah" refers to an exclamation that explodes at the moment
when existence and perception coincide when facing raw beauty.
It is the point where reason and emotion intersect,
creating a momentary order beyond logic.`
  },
  // 문단 2
  paragraph2: {
    koPc: `atelier ah는 이러한 'Ah'의 순간으로부터 출발한다.
순수한 이미지의 파동과 공간에 내재된 분위기 사이를 잇는 하나의 수평적 언어로서 존재한다.`,
    koMobile: `atelier ah는 이러한 'Ah'의 순간으로부터 출발한다.
순수한 이미지의 파동과 공간에 내재된 분위기 사이를 잇는
하나의 수평적 언어로서 존재한다.`,
    enPc: `Atelier ah begins from this moment of "Ah."
It exists as a horizontal language, connecting the waves of pure images with the atmosphere inherent in space.`,
    enMobile: `Atelier ah begins from this moment of "Ah."
It exists as a horizontal language, connecting the waves of
pure images with the atmosphere inherent in space.`
  },
  // 문단 3
  paragraph3: {
    koPc: `우리는 공간의 본래적 장소성과 사물, 인간, 형태, 소리, 색, 그리고 그들 사이의 관계를
솔직하게 마주하며, 고유한 의미와 이야기의 질서를 구축하고자 한다.`,
    koMobile: `우리는 공간의 본래적 장소성과 사물, 인간, 형태, 소리, 색,
그리고 그들 사이의 관계를 솔직하게 마주하며,
고유한 의미와 이야기의 질서를 구축하고자 한다.`,
    enPc: `We honestly confront the inherent placeness of space, objects, people, shapes, sounds, colors,
and the relationship between them, and seek to establish a unique order of meaning and narrative.`,
    enMobile: `We honestly confront the inherent placeness of
space, objects, people, shapes, sounds, colors,
and the relationship between them, and seek to establish
a unique order of meaning and narrative.`
  }
}

// About 데이터 가져오기
export async function getAboutData() {
  try {
    const docRef = doc(db, COLLECTION_NAME, ABOUT_DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return defaultAboutData
    }
  } catch (error) {
    return defaultAboutData
  }
}

// About 데이터 저장하기
export async function saveAboutData(data) {
  try {
    const docRef = doc(db, COLLECTION_NAME, ABOUT_DOC_ID)
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    throw error
  }
}

export { defaultAboutData }

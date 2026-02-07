// Works(Projects) 데이터 관리 서비스
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore'
import { db } from '../config/firebase'

const COLLECTION_NAME = 'projects'
const SETTINGS_COLLECTION = 'settings'
const CATEGORIES_DOC_ID = 'categories'

// 기본 카테고리 목록
const DEFAULT_CATEGORIES = ['interior', 'architecture', 'furniture', 'art']

// ========== 카테고리 관련 함수 ==========

// 카테고리 목록 가져오기
export async function getCategories() {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, CATEGORIES_DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data().list || DEFAULT_CATEGORIES
    }
    // 문서가 없으면 기본 카테고리로 초기화
    await setDoc(docRef, { list: DEFAULT_CATEGORIES })
    return DEFAULT_CATEGORIES
  } catch (error) {
    return DEFAULT_CATEGORIES
  }
}

// 카테고리 추가
export async function addCategory(categoryName) {
  try {
    const categories = await getCategories()
    if (categories.includes(categoryName)) {
      return { success: false, message: '이미 존재하는 카테고리입니다.' }
    }
    
    const newCategories = [...categories, categoryName]
    const docRef = doc(db, SETTINGS_COLLECTION, CATEGORIES_DOC_ID)
    await setDoc(docRef, { list: newCategories })
    
    return { success: true, categories: newCategories }
  } catch (error) {
    throw error
  }
}

// 카테고리 수정 (해당 카테고리를 사용하는 프로젝트도 함께 업데이트)
export async function updateCategory(oldName, newName) {
  try {
    const categories = await getCategories()
    if (!categories.includes(oldName)) {
      return { success: false, message: '존재하지 않는 카테고리입니다.' }
    }
    if (categories.includes(newName) && oldName !== newName) {
      return { success: false, message: '이미 존재하는 카테고리명입니다.' }
    }
    
    // 카테고리 목록 업데이트
    const newCategories = categories.map(c => c === oldName ? newName : c)
    const categoryDocRef = doc(db, SETTINGS_COLLECTION, CATEGORIES_DOC_ID)
    await setDoc(categoryDocRef, { list: newCategories })
    
    // 해당 카테고리를 사용하는 프로젝트들도 업데이트
    const projects = await getProjects()
    const batch = writeBatch(db)
    let updatedCount = 0
    
    projects.forEach(project => {
      if (project.category?.ko === oldName || project.category?.en === oldName) {
        const projectDocRef = doc(db, COLLECTION_NAME, String(project.id))
        batch.update(projectDocRef, {
          category: {
            ko: project.category?.ko === oldName ? newName : project.category?.ko,
            en: project.category?.en === oldName ? newName : project.category?.en
          },
          updatedAt: new Date().toISOString()
        })
        updatedCount++
      }
    })
    
    if (updatedCount > 0) {
      await batch.commit()
    }
    
    return { success: true, categories: newCategories, updatedProjects: updatedCount }
  } catch (error) {
    throw error
  }
}

// 카테고리 삭제
export async function deleteCategory(categoryName) {
  try {
    const categories = await getCategories()
    const newCategories = categories.filter(c => c !== categoryName)
    
    const docRef = doc(db, SETTINGS_COLLECTION, CATEGORIES_DOC_ID)
    await setDoc(docRef, { list: newCategories })
    
    return { success: true, categories: newCategories }
  } catch (error) {
    throw error
  }
}

// ========== 프로젝트 관련 함수 ==========

// 모든 프로젝트 가져오기
export async function getProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
    const projects = []
    querySnapshot.forEach((docSnap) => {
      // Firebase 문서 ID가 항상 사용되도록 마지막에 배치
      projects.push({ ...docSnap.data(), id: docSnap.id })
    })
    // order 필드로 정렬
    return projects.sort((a, b) => (a.order || 0) - (b.order || 0))
  } catch (error) {
    throw error
  }
}

// 단일 프로젝트 가져오기
export async function getProject(projectId) {
  try {
    const docRef = doc(db, COLLECTION_NAME, String(projectId))
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id }
    }
    return null
  } catch (error) {
    throw error
  }
}

// 프로젝트 추가
export async function addProject(projectData) {
  try {
    // 현재 프로젝트 수 확인하여 order 설정
    const projects = await getProjects()
    const newOrder = projects.length
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...projectData,
      order: newOrder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return docRef.id
  } catch (error) {
    throw error
  }
}

// 프로젝트 수정
export async function updateProject(projectId, projectData) {
  try {
    // projectId를 문자열로 변환 (Firebase는 문자열 ID만 허용)
    const docRef = doc(db, COLLECTION_NAME, String(projectId))
    await updateDoc(docRef, {
      ...projectData,
      updatedAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    throw error
  }
}

// 프로젝트 삭제
export async function deleteProject(projectId) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, String(projectId)))
    return true
  } catch (error) {
    throw error
  }
}

// 프로젝트 순서 업데이트
export async function updateProjectOrder(projectIds) {
  try {
    const batch = writeBatch(db)
    projectIds.forEach((id, index) => {
      const docRef = doc(db, COLLECTION_NAME, String(id))
      batch.update(docRef, { order: index })
    })
    await batch.commit()
    return true
  } catch (error) {
    throw error
  }
}

// 기본 프로젝트 템플릿
export const defaultProjectTemplate = {
  title: { ko: '', en: '' },
  category: { ko: 'interior', en: 'interior' },
  year: '',
  images: {
    thumbnail: '',
    slider: [],
    sketch: [],
    layout: []
  },
  content: [
    {
      type: 'slider',
      autoPlayInterval: 8000
    },
    {
      type: 'info',
      description: { ko: '', en: '' },
      details: {
        completion: { ko: '', en: '' },
        usage: { ko: '', en: '' },
        projectArea: { ko: '', en: '' },
        location: { ko: '', en: '' },
        client: { ko: '', en: '' },
        design: { ko: '', en: '' },
        photo: { ko: '', en: '' }
      }
    },
    {
      type: 'layout',
      autoPlayInterval: 5000
    }
  ]
}


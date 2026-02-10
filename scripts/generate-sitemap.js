// 사이트맵 자동 생성 스크립트
// 사용법: node scripts/generate-sitemap.js

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDF2xkdO6cGYsKt7iBqbbzWtaWsTXVzbLI",
  authDomain: "atelierah.firebaseapp.com",
  projectId: "atelierah",
  storageBucket: "atelierah.firebasestorage.app",
  messagingSenderId: "462962702102",
  appId: "1:462962702102:web:c158527e8bafc9e79e8237"
}

const SITE_URL = 'https://atelierah.com'

async function generateSitemap() {
  try {
    // Firebase 초기화
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    // 프로젝트 목록 가져오기
    const projectsSnapshot = await getDocs(collection(db, 'projects'))
    const projects = []
    projectsSnapshot.forEach(doc => {
      projects.push({ id: doc.id, ...doc.data() })
    })

    // Press 목록 가져오기
    const pressSnapshot = await getDocs(collection(db, 'press'))
    const pressItems = []
    pressSnapshot.forEach(doc => {
      pressItems.push({ id: doc.id, ...doc.data() })
    })

    // 현재 날짜
    const today = new Date().toISOString().split('T')[0]

    // 사이트맵 XML 생성
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 메인 페이지 -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- About 페이지 -->
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Works 페이지 -->
  <url>
    <loc>${SITE_URL}/works</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Press 페이지 -->
  <url>
    <loc>${SITE_URL}/press</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Contact 페이지 -->
  <url>
    <loc>${SITE_URL}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`

    // Works 상세 페이지 추가
    if (projects.length > 0) {
      sitemap += `
  <!-- Works 상세 페이지 -->`
      for (const project of projects) {
        const lastmod = project.updatedAt ? project.updatedAt.split('T')[0] : today
        sitemap += `
  <url>
    <loc>${SITE_URL}/works/${project.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
      }
    }

    // Press 상세 페이지 추가
    if (pressItems.length > 0) {
      sitemap += `
  
  <!-- Press 상세 페이지 -->`
      for (const item of pressItems) {
        const lastmod = item.updatedAt ? item.updatedAt.split('T')[0] : today
        sitemap += `
  <url>
    <loc>${SITE_URL}/press/${item.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
      }
    }

    sitemap += `
</urlset>
`

    // 파일 저장
    const outputPath = join(__dirname, '..', 'public', 'sitemap.xml')
    writeFileSync(outputPath, sitemap, 'utf-8')

    console.log(`✅ 사이트맵 생성 완료: ${outputPath}`)
    console.log(`   - Works 상세페이지: ${projects.length}개`)
    console.log(`   - Press 상세페이지: ${pressItems.length}개`)

    process.exit(0)
  } catch (error) {
    console.error('❌ 사이트맵 생성 실패:', error)
    process.exit(1)
  }
}

generateSitemap()

// RSS 피드 자동 생성 스크립트
// 사용법: node scripts/generate-rss.js

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
const SITE_TITLE = 'atelier ah'
const SITE_DESCRIPTION = 'simple horizontal totality through which all this goes'

function escapeXml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatRssDate(dateString) {
  if (!dateString) return new Date().toUTCString()
  return new Date(dateString).toUTCString()
}

async function generateRss() {
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

    // 모든 아이템을 날짜순으로 정렬
    const allItems = [
      ...projects.map(p => ({
        type: 'works',
        id: p.id,
        title: p.title?.en || p.title?.ko || 'Untitled',
        description: p.content?.find(c => c.type === 'info')?.description?.en || 
                     p.content?.find(c => c.type === 'info')?.description?.ko || '',
        image: p.images?.thumbnail || '',
        date: p.updatedAt || p.createdAt
      })),
      ...pressItems.map(p => ({
        type: 'press',
        id: p.id,
        title: p.project?.en || p.project?.ko || 'Untitled',
        description: p.media?.en || p.media?.ko || '',
        image: p.image || '',
        date: p.updatedAt || p.createdAt
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date))

    // 현재 날짜
    const now = new Date().toUTCString()

    // RSS XML 생성
    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://pub-4b716c374bc747948e9ac588042939de.r2.dev/favicon.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
`

    // 아이템 추가
    for (const item of allItems) {
      const itemUrl = `${SITE_URL}/${item.type}/${item.id}`
      rss += `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <pubDate>${formatRssDate(item.date)}</pubDate>
      <description>${escapeXml(item.description)}</description>${item.image ? `
      <media:content url="${escapeXml(item.image)}" medium="image"/>` : ''}
    </item>`
    }

    rss += `
  </channel>
</rss>
`

    // 파일 저장
    const outputPath = join(__dirname, '..', 'public', 'rss.xml')
    writeFileSync(outputPath, rss, 'utf-8')

    console.log(`✅ RSS 피드 생성 완료: ${outputPath}`)
    console.log(`   - Works: ${projects.length}개`)
    console.log(`   - Press: ${pressItems.length}개`)

    process.exit(0)
  } catch (error) {
    console.error('❌ RSS 피드 생성 실패:', error)
    process.exit(1)
  }
}

generateRss()

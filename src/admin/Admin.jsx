import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMobile } from '../contexts/MobileContext'
import AdminSidebar from './components/AdminSidebar'
import AdminLogin from './components/AdminLogin'
import MobileCheck from './components/MobileCheck'
import AdminWorks from './pages/AdminWorks'
import AdminPress from './pages/AdminPress'
import AdminHome from './pages/AdminHome'
import AdminAbout from './pages/AdminAbout'
import AdminContact from './pages/AdminContact'
import './Admin.css'

function Admin() {
    const location = useLocation()
    const { loading: authLoading, isAuthenticated } = useAuth()
    const { isMobile } = useMobile()
    const [activeTab, setActiveTab] = useState('works')

    // 페이지 타이틀 설정
    useEffect(() => {
        document.title = 'Admin - atelier ah'
    }, [])

    // URL에 따른 탭 설정
    useEffect(() => {
        if (location.pathname === '/admin/home') {
            setActiveTab('home')
        } else if (location.pathname === '/admin/about') {
            setActiveTab('about')
        } else if (location.pathname === '/admin/press') {
            setActiveTab('press')
        } else if (location.pathname === '/admin/contact') {
            setActiveTab('contact')
        } else if (location.pathname === '/admin/works') {
            setActiveTab('works')
        } else {
            setActiveTab('works')
        }
    }, [location.pathname])

    // 페이지 타이틀
    const getPageTitle = () => {
        switch (activeTab) {
            case 'home': return 'Home'
            case 'about': return 'About'
            case 'press': return 'Press'
            case 'contact': return 'Contact'
            case 'works': return 'Works'
            default: return 'Works'
        }
    }

    // 모바일 접속 시 안내 화면
    if (isMobile) {
        return <MobileCheck />
    }

    // 인증 로딩 중
    if (authLoading) {
        return (
            <div className="admin-login">
            </div>
        )
    }

    // 로그인 화면
    if (!isAuthenticated) {
        return <AdminLogin />
    }

    return (
        <div className="admin-layout">
            <AdminSidebar activeTab={activeTab} />

            <div className="admin-content-wrapper">
                <div className="admin-content">
                    <h1 className="admin-page-title">{getPageTitle()}</h1>

                    <div className="admin-content-layout">
                        {activeTab === 'home' && <AdminHome />}
                        {activeTab === 'about' && <AdminAbout />}
                        {activeTab === 'works' && <AdminWorks />}
                        {activeTab === 'press' && <AdminPress />}
                        {activeTab === 'contact' && <AdminContact />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin


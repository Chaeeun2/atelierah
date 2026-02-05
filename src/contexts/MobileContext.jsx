import { createContext, useContext, useState, useEffect } from 'react'

const MobileContext = createContext()

export function MobileProvider({ children }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            // 화면 너비 768px 이하 또는 모바일 User Agent 감지
            const isMobileWidth = window.innerWidth <= 768
            const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            setIsMobile(isMobileWidth || isMobileAgent)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    )
}

export function useMobile() {
    const context = useContext(MobileContext)
    if (!context) {
        throw new Error('useMobile must be used within a MobileProvider')
    }
    return context
}




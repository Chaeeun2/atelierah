import { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '../config/firebase'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 인증 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // 로그인
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      let message = '로그인에 실패했습니다.'
      
      switch (error.code) {
        case 'auth/invalid-email':
          message = '올바른 이메일 형식이 아닙니다.'
          break
        case 'auth/user-disabled':
          message = '비활성화된 계정입니다.'
          break
        case 'auth/user-not-found':
          message = '등록되지 않은 이메일입니다.'
          break
        case 'auth/wrong-password':
          message = '비밀번호가 올바르지 않습니다.'
          break
        case 'auth/invalid-credential':
          message = '이메일 또는 비밀번호가 올바르지 않습니다.'
          break
        case 'auth/too-many-requests':
          message = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.'
          break
        default:
          message = error.message
      }
      
      throw new Error(message)
    }
  }

  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw new Error('로그아웃에 실패했습니다.')
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}



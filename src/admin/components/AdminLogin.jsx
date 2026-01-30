import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

function AdminLogin() {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await login(email, password)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login">
            <form onSubmit={handleLogin}>
                <h2>atelier ah Admin</h2>
                <div className="admin-login-guide">
                    관리자 계정으로 로그인하세요.
                </div>
                {error && <div className="admin-error-message">{error}</div>}
                <div className="admin-form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="admin-input"
                        required
                        autoComplete="username"
                        autoFocus
                    />
                </div>
                <div className="admin-form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="admin-input"
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" disabled={loading} className="admin-button">
                    {loading ? '로그인 중...' : '관리자 로그인'}
                </button>
            </form>
        </div>
    )
}

export default AdminLogin



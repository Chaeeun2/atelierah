import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AdminSidebar({ activeTab }) {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            // error handling
        }
    }

    return (
        <aside className="admin-sidebar">
            <h2>atelier ah Admin</h2>
            <nav>
                <ul>
                    <li className={activeTab === 'home' ? 'active' : ''}>
                        <Link to="/admin/home">Home</Link>
                    </li>
                    <li className={activeTab === 'about' ? 'active' : ''}>
                        <Link to="/admin/about">About</Link>
                    </li>
                    <li className={activeTab === 'works' ? 'active' : ''}>
                        <Link to="/admin">Works</Link>
                    </li>
                    <li className={activeTab === 'press' ? 'active' : ''}>
                        <Link to="/admin/press">Press</Link>
                    </li>
                    <li className={activeTab === 'contact' ? 'active' : ''}>
                        <Link to="/admin/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <div className="admin-sidebar-footer">
                <div className="admin-user-info">
                    {user?.email}
                </div>
                <button onClick={() => navigate('/')} className="admin-nav-link">
                    사이트 보기
                </button>
                <button onClick={handleLogout} className="admin-nav-link logout">
                    로그아웃
                </button>
            </div>
        </aside>
    )
}

export default AdminSidebar


import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      {/* Kiri */}
      <div style={leftMenu}>
        <Link to="/" style={logoStyle}>Peminjaman Buku</Link>

        {auth?.role === 'admin' && (
          <Link to="/admin" style={linkStyle}>Dashboard Admin</Link>
        )}

        {auth?.role === 'user' && (
          <Link to="/user" style={linkStyle}>Dashboard User</Link>
        )}
      </div>

      {/* Kanan */}
      <div style={rightMenu}>
        {!auth && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}

        {auth && (
          <button onClick={handleLogout} style={logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

/* ===== Styles ===== */

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '18px 32px',        // ditinggikan
  background: '#1f2937',
  color: '#fff'
};

const leftMenu = {
  display: 'flex',
  gap: 24,
  alignItems: 'center'
};

const rightMenu = {
  display: 'flex',
  gap: 20,
  alignItems: 'center'
};

const logoStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: 18
};

const linkStyle = {
  color: '#e5e7eb',
  textDecoration: 'none',
  fontSize: 15
};

const logoutBtn = {
  background: '#ef4444',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 'bold'
};

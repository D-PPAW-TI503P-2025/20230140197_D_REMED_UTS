import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/users', {
        username,
        password,
        role: 'user'
      });

      alert('Registrasi berhasil, silakan login');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 20 }}>Register</h2>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={fieldStyle}>
            <label>Username</label>
            <input
              style={inputStyle}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Buat username"
              required
            />
          </div>

          <div style={fieldStyle}>
            <label>Password</label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Buat password"
              required
            />
          </div>

          <button type="submit" style={registerBtn}>
            Daftar
          </button>

          <p style={{ marginTop: 15, fontSize: 14 }}>
            Sudah punya akun?{' '}
            <span
              style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => navigate('/login')}
            >
              Login di sini
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #10b981, #065f46)'
};

const cardStyle = {
  background: '#ffffff',
  padding: 30,
  borderRadius: 12,
  width: 340,
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 15,
  width: '100%'
};

const inputStyle = {
  marginTop: 5,
  padding: 10,
  borderRadius: 8,
  border: '1px solid #ccc',
  fontSize: 14
};

const registerBtn = {
  width: '100%',
  padding: 12,
  borderRadius: 8,
  border: 'none',
  background: '#10b981',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 10
};

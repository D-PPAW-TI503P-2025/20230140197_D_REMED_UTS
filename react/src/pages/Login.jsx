import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/users/login', {
        username,
        password
      });

      const user = res.data.user;

      login(user.role, user.id);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={fieldStyle}>
            <label>Username</label>
            <input
              style={inputStyle}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Masukkan username"
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
              placeholder="Masukkan password"
              required
            />
          </div>

          <button type="submit" style={loginBtn}>
            Masuk
          </button>
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
  width: 320,
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

const loginBtn = {
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

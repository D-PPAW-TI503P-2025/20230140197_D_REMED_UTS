import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const load = async () => {
    const res = await api.get('/books');
    setBooks(res.data);
  };

  useEffect(() => { load(); }, []);

  const borrow = (bookId) => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung browser');
      return;
    }

    setLoadingId(bookId);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await api.post('/borrow', {
            bookId,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          alert('Berhasil meminjam');
          load();
        } catch (err) {
          alert(err.response?.data?.message || 'Gagal meminjam');
        } finally {
          setLoadingId(null);
        }
      },
      () => {
        alert('Gagal mengambil lokasi');
        setLoadingId(null);
      }
    );
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ marginBottom: 20 }}>Dashboard User</h2>

      <div style={gridStyle}>
        {books.map(b => (
          <div key={b.id} style={cardStyle}>
            <h3 style={{ margin: 0 }}>{b.title}</h3>
            <p style={{ margin: '8px 0', color: '#555' }}>
              Author: {b.author}
            </p>

            <p style={{
              margin: '8px 0',
              fontWeight: 'bold',
              color: b.stock > 0 ? '#16a34a' : '#dc2626'
            }}>
              Stok: {b.stock}
            </p>

            <button
              onClick={() => borrow(b.id)}
              disabled={b.stock <= 0 || loadingId === b.id}
              style={{
                ...borrowBtn,
                background: b.stock <= 0 ? '#9ca3af' : '#2563eb',
                cursor: b.stock <= 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {b.stock <= 0
                ? 'Stok Habis'
                : loadingId === b.id
                  ? 'Meminjam...'
                  : 'Pinjam Buku'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const pageStyle = {
  padding: 30,
  minHeight: '100vh',
  background: '#f3f4f6'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 20
};

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const borrowBtn = {
  border: 'none',
  color: '#fff',
  padding: '10px 12px',
  borderRadius: 8,
  fontWeight: 'bold'
};

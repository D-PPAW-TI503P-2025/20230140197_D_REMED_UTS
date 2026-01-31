import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', stock: 0 });

  const loadBooks = async () => {
    const res = await api.get('/books');
    setBooks(res.data);
  };

  const loadLogs = async () => {
    const res = await api.get('/borrow'); // harus sudah include User & Book di backend
    setLogs(res.data);
  };

  useEffect(() => {
    loadBooks();
    loadLogs();
  }, []);

  const addBook = async () => {
    if (!form.title || !form.author) {
      alert('Judul dan author wajib diisi');
      return;
    }
    await api.post('/books', form);
    setForm({ title: '', author: '', stock: 0 });
    loadBooks();
  };

  const deleteBook = async (id) => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      await api.delete(`/books/${id}`);
      loadBooks();
    }
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ marginBottom: 30 }}>Dashboard Admin</h1>

      {/* Tambah Buku */}
      <div style={cardStyle}>
        <h3 style={cardTitle}>Tambah Buku</h3>
        <div style={formRow}>
          <input
            placeholder="Judul Buku"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Author"
            value={form.author}
            onChange={e => setForm({ ...form, author: e.target.value })}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Stok"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
            style={{ ...inputStyle, width: 120 }}
          />
          <button onClick={addBook} style={primaryBtn}>
            Tambah
          </button>
        </div>
      </div>

      {/* Data Buku */}
      <div style={{ ...cardStyle, marginTop: 25 }}>
        <h3 style={cardTitle}>Data Buku</h3>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Author</th>
              <th>Stok</th>
              <th style={{ width: 120 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => (
              <tr key={b.id} style={rowStyle}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.stock}</td>
                <td>
                  <button
                    onClick={() => deleteBook(b.id)}
                    style={dangerBtn}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Laporan Peminjaman */}
      <div style={{ ...cardStyle, marginTop: 25 }}>
        <h3 style={cardTitle}>Laporan Peminjaman (Geolocation)</h3>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th>User</th>
              <th>Buku</th>
              <th>Tanggal Pinjam</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={rowStyle}>
                <td>
                  {log.User?.username || `User #${log.userId}`}
                </td>
                <td>
                  {log.Book?.title || `Buku #${log.bookId}`}
                </td>
                <td>{new Date(log.borrowDate).toLocaleString()}</td>
                <td>{log.latitude}</td>
                <td>{log.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const pageStyle = {
  padding: 40,
  background: '#f3f4f6',
  minHeight: '100vh'
};

const cardStyle = {
  background: '#ffffff',
  borderRadius: 12,
  padding: 20,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
};

const cardTitle = {
  marginBottom: 15
};

const formRow = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  alignItems: 'center'
};

const inputStyle = {
  padding: 10,
  borderRadius: 8,
  border: '1px solid #d1d5db',
  minWidth: 220
};

const primaryBtn = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 'bold'
};

const dangerBtn = {
  background: '#ef4444',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: 6,
  cursor: 'pointer'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const theadStyle = {
  background: '#f9fafb',
  textAlign: 'left'
};

const rowStyle = {
  borderTop: '1px solid #e5e7eb'
};

import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Gagal mengambil buku:', err);
      alert('Gagal mengambil data buku');
    }
  };

  const getDetail = async (id) => {
    try {
      const res = await api.get(`/books/${id}`);
      setSelectedBook(res.data);
    } catch (err) {
      console.error('Gagal mengambil detail buku:', err);
      alert('Gagal mengambil detail buku');
    }
  };

  const borrowBook = async (bookId) => {
    if (!navigator.geolocation) {
      alert('Browser tidak mendukung geolocation');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;

          await api.post('/borrow', {
            bookId,
            latitude,
            longitude
          });

          alert('Berhasil meminjam buku');
          fetchBooks(); // refresh stok
        } catch (err) {
          console.error('Gagal meminjam:', err);
          alert(err.response?.data?.message || 'Gagal meminjam buku');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        alert('Gagal mendapatkan lokasi');
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Daftar Buku</h2>

      {books.length === 0 ? (
        <p>Tidak ada buku</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Judul</th>
              <th>Author</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.stock}</td>
                <td>
                  <button onClick={() => getDetail(b.id)}>
                    Detail
                  </button>{' '}
                  <button
                    onClick={() => borrowBook(b.id)}
                    disabled={loading || b.stock <= 0}
                  >
                    {b.stock <= 0 ? 'Stok Habis' : 'Pinjam'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedBook && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
          <h3>Detail Buku</h3>
          <p><b>ID:</b> {selectedBook.id}</p>
          <p><b>Judul:</b> {selectedBook.title}</p>
          <p><b>Author:</b> {selectedBook.author}</p>
          <p><b>Stok:</b> {selectedBook.stock}</p>
          <button onClick={() => setSelectedBook(null)}>Tutup</button>
        </div>
      )}
    </div>
  );
}

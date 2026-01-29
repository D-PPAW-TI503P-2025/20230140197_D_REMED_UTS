import { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [books, setBooks] = useState([]);
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await api.get('/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
    };

    const handleBorrow = async (bookId) => {
        if (!navigator.geolocation) {
            setMessage('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;

                await api.post('/borrow', {
                    bookId,
                    latitude,
                    longitude
                });

                setMessage('Book borrowed successfully!');
                fetchBooks(); // Refresh stock
            } catch (error) {
                setMessage(error.response?.data?.message || 'Borrow failed');
            }
        }, (error) => {
            setMessage('Unable to retrieve your location');
            console.error(error);
        });
    };

    return (
        <>
            <div className="hero">
                <h1>Welcome to Library System</h1>
                <p>Discover, Borrow, and Read Books at your fingertips.</p>
            </div>
            <div className="container">
                <h2>Available Books</h2>
                {message && <p className="message">{message}</p>}
                <div className="book-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-card">
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>Stock: {book.stock}</p>

                            {user && user.role === 'user' && book.stock > 0 && (
                                <button onClick={() => handleBorrow(book.id)}>
                                    Borrow
                                </button>
                            )}

                            {book.stock <= 0 && <span className="out-of-stock">Out of Stock</span>}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;

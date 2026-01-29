import { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [stock, setStock] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await api.get('/books');
            setBooks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await api.post('/books', { title, author, stock });
            setMessage('Book added successfully');
            fetchBooks();
            setTitle('');
            setAuthor('');
            setStock(0);
        } catch (error) {
            setMessage('Failed to add book');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/books/${id}`);
            fetchBooks();
        } catch (error) {
            alert('Failed to delete book');
        }
    };

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>
            {message && <p className="success">{message}</p>}

            <div className="admin-section">
                <h3>Add New Book</h3>
                <form onSubmit={handleAddBook}>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                    <button type="submit">Add Book</button>
                </form>
            </div>

            <div className="admin-section">
                <h3>Manage Books</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.stock}</td>
                                <td>
                                    <button onClick={() => handleDelete(book.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;

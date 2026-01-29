const { Book, BorrowLog } = require('../models');

const borrowController = {
    borrowBook: async (req, res) => {
        try {
            const { bookId, latitude, longitude } = req.body;
            const userId = req.userId; // Dari middleware

            // 1. Cek User ID
            if (!userId) {
                return res.status(400).json({ message: 'User ID header is missing' });
            }

            // 2. Cek Buku & Stock
            const book = await Book.findByPk(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            if (book.stock <= 0) {
                return res.status(400).json({ message: 'Book is out of stock' });
            }

            // 3. Decrement Stock
            await book.decrement('stock');

            // 4. Catat Log
            const log = await BorrowLog.create({
                userId,
                bookId,
                latitude,
                longitude,
                borrowDate: new Date()
            });

            res.status(201).json({
                message: 'Book borrowed successfully',
                data: log
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = borrowController;

const { Book, BorrowLog, User } = require('../models');

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, latitude, longitude } = req.body;
    const userId = req.headers['x-user-id'];

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    if (book.stock <= 0) {
      return res.status(400).json({ message: 'Stok buku habis' });
    }

    book.stock -= 1;
    await book.save();

    const log = await BorrowLog.create({
      userId,
      bookId,
      borrowDate: new Date(),
      latitude,
      longitude
    });

    res.status(201).json({
      message: 'Berhasil meminjam buku',
      data: log
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal meminjam buku' });
  }
};

exports.getAllBorrowLogs = async (req, res) => {
  try {
    const logs = await BorrowLog.findAll({
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username']
        },
        {
          model: Book,
          as: 'Book',
          attributes: ['id', 'title']
        }
      ],
      order: [['borrowDate', 'DESC']]
    });

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data peminjaman' });
  }
};

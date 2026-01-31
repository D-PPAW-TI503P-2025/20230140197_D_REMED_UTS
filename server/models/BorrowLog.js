'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BorrowLog extends Model {
    static associate(models) {
      // relasi ke tabel User
      BorrowLog.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });

      // relasi ke tabel Book
      BorrowLog.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'Book'
      });
    }
  }

  BorrowLog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    borrowDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'BorrowLog',
    tableName: 'BorrowLogs' // opsional, sesuaikan jika nama tabelmu berbeda
  });

  return BorrowLog;
};

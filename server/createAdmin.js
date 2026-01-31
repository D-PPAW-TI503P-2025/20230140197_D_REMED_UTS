const bcrypt = require('bcrypt');
const { User, sequelize } = require('./models');

async function createAdmin() {
  try {
    await sequelize.authenticate();

    const username = 'admin';
    const plainPassword = 'admin123';
    const role = 'admin';

    // cek dulu apakah admin sudah ada
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      console.log('User admin sudah ada');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      username,
      password: hashedPassword,
      role
    });

    console.log('Admin berhasil dibuat');
    console.log('username: admin');
    console.log('password: admin123');

    process.exit();
  } catch (err) {
    console.error('Gagal membuat admin:', err);
    process.exit(1);
  }
}

createAdmin();

const { User, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        // Disable FK checks to allow dropping tables
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        await sequelize.sync({ force: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const adminData = {
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        };

        const user = await User.create(adminData);
        console.log('Admin created successfully:', {
            id: user.id,
            username: user.username,
            role: user.role
        });

    } catch (err) {
        console.error('Failed to seed admin:', err);
    } finally {
        await sequelize.close();
    }
}

seed();

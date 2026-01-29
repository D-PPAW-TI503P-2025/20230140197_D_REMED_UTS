const { User } = require('../models');
const bcrypt = require('bcryptjs');

const userController = {
    createUser: async (req, res) => {
        try {
            const { username, password, role } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                password: hashedPassword,
                role: role || 'user'
            });

            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password required' });
            }

            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;

const User = require('../database/models/User');
const bcrypt = require('bcrypt');

const controller = {
    // List all users
    index: async (req, res) => {
        try {
            const users = await User.findAll({
                order: [['role', 'ASC'], ['username', 'ASC']]
            });
            
            res.render('admin/users/index', {
                title: 'Gestión de Cuentas',
                user: req.session.user,
                users,
                query: req.query
            });
        } catch (error) {
            console.error('Error loading users:', error);
            res.status(500).send('Error al cargar usuarios');
        }
    },

    // Show create form
    create: (req, res) => {
        res.render('admin/users/create', {
            title: 'Nueva Cuenta',
            user: req.session.user
        });
    },

    // Process create form
    store: async (req, res) => {
        try {
            const { username, password, role } = req.body;

            // Validar que no exista el username
            const existing = await User.findOne({ where: { username } });
            if (existing) {
                return res.redirect('/admin/cuentas/crear?error=exists');
            }

            // El hash se hace automáticamente en el hook beforeCreate del modelo
            await User.create({
                username: username.trim(),
                password: password,
                role: role || 'user'
            });

            res.redirect('/admin/cuentas?msg=created');
        } catch (error) {
            console.error('Error creating user:', error);
            res.redirect('/admin/cuentas/crear?error=server');
        }
    },

    // Show edit form
    edit: async (req, res) => {
        try {
            const userToEdit = await User.findByPk(req.params.id);
            if (!userToEdit) {
                return res.status(404).send('Usuario no encontrado');
            }

            res.render('admin/users/edit', {
                title: 'Editar Cuenta',
                user: req.session.user,
                userToEdit
            });
        } catch (error) {
            console.error('Error loading user:', error);
            res.status(500).send('Error al cargar usuario');
        }
    },

    // Process edit form
    update: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const userToEdit = await User.findByPk(req.params.id);

            if (!userToEdit) {
                return res.status(404).send('Usuario no encontrado');
            }

            // Validar que el username no esté usado por otro
            if (username !== userToEdit.username) {
                const existing = await User.findOne({ where: { username } });
                if (existing) {
                    return res.redirect(`/admin/cuentas/editar/${req.params.id}?error=exists`);
                }
            }

            const updateData = {
                username: username.trim(),
                role: role || 'user'
            };

            // Solo actualizar password si se proporciona uno nuevo
            if (password && password.trim() !== '') {
                updateData.password = await bcrypt.hash(password, 10);
            }

            await userToEdit.update(updateData);
            res.redirect('/admin/cuentas?msg=updated');
        } catch (error) {
            console.error('Error updating user:', error);
            res.redirect(`/admin/cuentas/editar/${req.params.id}?error=server`);
        }
    },

    // Delete user
    destroy: async (req, res) => {
        try {
            const userToDelete = await User.findByPk(req.params.id);

            if (!userToDelete) {
                return res.redirect('/admin/cuentas');
            }

            // Evitar que el admin se elimine a sí mismo
            if (userToDelete.id === req.session.user.id) {
                return res.redirect('/admin/cuentas?error=self_delete');
            }

            await userToDelete.destroy();
            res.redirect('/admin/cuentas?msg=deleted');
        } catch (error) {
            console.error('Error deleting user:', error);
            res.redirect('/admin/cuentas?error=server');
        }
    }
};

module.exports = controller;

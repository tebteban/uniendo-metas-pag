const User = require('../database/models/User');
const bcrypt = require('bcrypt');

const controller = {
    login: (req, res) => {
        // If already logged in, redirect to dashboard
        if (req.session.user) {
            return res.redirect('/admin/dashboard');
        }
        res.render('admin/login', { title: 'Admin Login', error: null });
    },

    processLogin: async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.render('admin/login', { title: 'Admin Login', error: 'Usuario no encontrado' });
            }

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                req.session.user = { id: user.id, username: user.username, role: user.role };
                return res.redirect('/admin/dashboard');
            } else {
                return res.render('admin/login', { title: 'Admin Login', error: 'Contraseña incorrecta' });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.render('admin/login', { title: 'Admin Login', error: 'Error del servidor' });
        }
    },

    dashboard: async (req, res) => {
        try {
            const Organ       = require('../database/models/Organ');
            const Inscription = require('../database/models/Inscription');

            // Tipos exactos usados por adminInscriptionsController
            const delegatesCount   = await Inscription.count({ where: { type: 'delegado'   } });
            const authoritiesCount = await Inscription.count({ where: { type: 'autoridad'  } });
            const schoolsCount     = await Inscription.count({ where: { type: 'escuela'    } });
            const volunteerCount   = await Inscription.count({ where: { type: 'voluntario' } });
            const organCount       = await Organ.count();

            res.render('admin/dashboard', {
                title: 'Panel de Administración',
                user: req.session.user,
                metrics: {
                    volunteers:  volunteerCount,
                    organs:      organCount,
                    delegates:   delegatesCount,
                    authorities: authoritiesCount,
                    schools:     schoolsCount
                }
            });
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
            res.render('admin/dashboard', {
                title: 'Panel de Administración',
                user: req.session.user,
                metrics: { volunteers: 0, organs: 0, delegates: 0, authorities: 0, schools: 0, typeMap: {} }
            });
        }
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/admin/login');
        });
    }
};

module.exports = controller;

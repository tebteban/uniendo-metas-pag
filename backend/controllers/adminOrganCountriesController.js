const OrganCountry = require('../database/models/OrganCountry');
const Organ = require('../database/models/Organ');
const xlsx = require('xlsx');

const controller = {
    /**
     * Lista todos los países agrupados por órgano
     */
    index: async (req, res) => {
        try {
            const organs = await Organ.findAll({
                include: [{ model: OrganCountry, as: 'countries' }],
                order: [['name', 'ASC']]
            });

            const allCountries = await OrganCountry.findAll({
                include: [{ model: Organ, as: 'organ' }],
                order: [['country_name', 'ASC']]
            });

            res.render('admin/organ-countries/index', {
                title: 'Países por Órgano',
                organs,
                countries: allCountries,
                path: '/admin/paises-por-organo',
                user: req.session.user,
                query: req.query
            });
        } catch (error) {
            console.error('Error cargando países por órgano:', error);
            res.redirect('/admin/dashboard');
        }
    },

    /**
     * Agrega un país a un órgano manualmente (soporta órgano existente o nuevo)
     */
    store: async (req, res) => {
        try {
            let { organ_id, new_organ_name, country_name, country_flag } = req.body;
            if (!country_name || !country_name.trim()) {
                return res.redirect('/admin/paises-por-organo?msg=error');
            }

            // Si especificó nuevo órgano
            if (new_organ_name && new_organ_name.trim()) {
                const defaultColors = ['#61B4E4', '#73A950', '#A02140', '#FFB819', '#E15829', '#8A8A8D'];
                const count = await Organ.count();
                const newOrgan = await Organ.create({
                    name: new_organ_name.trim(),
                    color: defaultColors[count % defaultColors.length]
                });
                organ_id = newOrgan.id;
            }

            if (!organ_id) {
                return res.redirect('/admin/paises-por-organo?msg=error');
            }

            await OrganCountry.create({
                organ_id: parseInt(organ_id),
                country_name: country_name.trim(),
                country_flag: (country_flag || '').trim()
            });

            res.redirect('/admin/paises-por-organo?msg=created');
        } catch (error) {
            console.error('Error agregando país:', error);
            res.redirect('/admin/paises-por-organo?msg=error');
        }
    },

    /**
     * Importa países desde archivo Excel
     * Formato esperado: columnas "pais" y "organo" (o variantes)
     */
    upload: async (req, res) => {
        try {
            if (!req.file) {
                return res.redirect('/admin/paises-por-organo?msg=no_file');
            }

            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);

            if (data.length === 0) {
                return res.redirect('/admin/paises-por-organo?msg=error');
            }

            // Cargar órganos existentes para resolver por nombre
            let organs = await Organ.findAll();
            const organMap = {};
            organs.forEach(o => {
                organMap[o.name.toLowerCase().trim()] = o.id;
            });

            const defaultColors = ['#61B4E4', '#73A950', '#A02140', '#FFB819', '#E15829', '#8A8A8D'];
            let colorIdx = organs.length % defaultColors.length;

            const bulkData = [];
            let skipped = 0;

            for (const row of data) {
                const keys = Object.keys(row);

                // Helper para buscar clave por coincidencia parcial
                const findKey = (keywords) => keys.find(k => keywords.some(w => k.toLowerCase().includes(w)));

                const countryKey = findKey(['pais', 'país', 'country', 'nombre', 'name', 'nacion', 'nación']);
                const organKey = findKey(['organo', 'órgano', 'organ', 'comité', 'comite', 'comision', 'comisión', 'committee']);
                const flagKey = findKey(['bandera', 'flag', 'emoji']);

                const countryName = countryKey ? String(row[countryKey]).trim() : '';
                const organName = organKey ? String(row[organKey]).trim() : '';
                const flag = flagKey ? String(row[flagKey]).trim() : '';

                if (!countryName || !organName) {
                    skipped++;
                    continue;
                }

                // Resolver el órgano por nombre (búsqueda flexible)
                let organId = null;
                const organNameLower = organName.toLowerCase().trim();

                // 1. Intentar coincidencia exacta
                if (organMap[organNameLower]) {
                    organId = organMap[organNameLower];
                } else {
                    // 2. Intentar coincidencia parcial
                    for (const [name, id] of Object.entries(organMap)) {
                        if (name.includes(organNameLower) || organNameLower.includes(name)) {
                            organId = id;
                            break;
                        }
                    }
                }

                // 3. Si no existe, crearlo automáticamente
                if (!organId) {
                    const newOrgan = await Organ.create({
                        name: organName,
                        color: defaultColors[colorIdx % defaultColors.length]
                    });
                    colorIdx++;
                    organId = newOrgan.id;
                    organMap[organNameLower] = organId;
                }

                bulkData.push({
                    organ_id: organId,
                    country_name: countryName,
                    country_flag: flag
                });
            }

            if (bulkData.length > 0) {
                await OrganCountry.bulkCreate(bulkData);
            }

            const msg = skipped > 0 ? 'imported_partial' : 'imported';
            res.redirect(`/admin/paises-por-organo?msg=${msg}&imported=${bulkData.length}&skipped=${skipped}`);
        } catch (error) {
            console.error('Error importando países desde Excel:', error);
            res.redirect('/admin/paises-por-organo?msg=error');
        }
    },

    /**
     * Elimina un país individual
     */
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await OrganCountry.findByPk(id);
            if (item) {
                await item.destroy();
            }
            res.redirect('/admin/paises-por-organo?msg=deleted');
        } catch (error) {
            console.error('Error eliminando país:', error);
            res.redirect('/admin/paises-por-organo');
        }
    },

    /**
     * Vacía todos los países de un órgano específico
     */
    destroyByOrgan: async (req, res) => {
        try {
            const { organId } = req.params;
            await OrganCountry.destroy({ where: { organ_id: organId } });
            res.redirect('/admin/paises-por-organo?msg=cleared_organ');
        } catch (error) {
            console.error('Error vaciando países del órgano:', error);
            res.redirect('/admin/paises-por-organo');
        }
    },

    /**
     * Vacía todos los países de todos los órganos
     */
    destroyAll: async (req, res) => {
        try {
            await OrganCountry.destroy({ where: {} });
            res.redirect('/admin/paises-por-organo?msg=cleared');
        } catch (error) {
            console.error('Error vaciando todos los países:', error);
            res.redirect('/admin/paises-por-organo');
        }
    }
};

module.exports = controller;

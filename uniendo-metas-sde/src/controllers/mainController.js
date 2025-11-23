const fs = require('fs');
const path = require('path');

// Rutas a los archivos JSON
const organosFilePath = path.join(__dirname, '../data/organos.json');
const cronogramaFilePath = path.join(__dirname, '../data/cronograma.json');
const nosotrosFilePath = path.join(__dirname, '../data/nosotros.json'); // <--- NUEVO

// Helper para leer JSON de forma segura
const readJSON = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) return [];
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
        console.error(`Error leyendo ${filePath}:`, error);
        return [];
    }
};

const controller = {
    index: (req, res) => {
        const organos = readJSON(organosFilePath);
        const cronograma = readJSON(cronogramaFilePath);
        const nosotros = readJSON(nosotrosFilePath); // <--- NUEVO

        res.render('index', { 
            organos: organos,
            cronograma: cronograma,
            nosotros: nosotros, // <--- ENVIAMOS A LA VISTA
            titulo: "Uniendo Metas Santiago del Estero"
        });
    }
};

module.exports = controller;
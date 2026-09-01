const Organ = require('./backend/database/models/Organ');
const OrganCountry = require('./backend/database/models/OrganCountry');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const flags = {
    'Alemania': '🇩🇪',
    'Argelia': '🇩🇿',
    'Argentina': '🇦🇷',
    'Bangladés': '🇧🇩',
    'Bélgica': '🇧🇪',
    'Brasil': '🇧🇷',
    'Chile': '🇨🇱',
    'Colombia': '🇨🇴',
    'España': '🇪🇸',
    'Estados Unidos de América': '🇺🇸',
    'Estados Unidos': '🇺🇸',
    'Francia': '🇫🇷',
    'India': '🇮🇳',
    'Kenia': '🇰🇪',
    'México': '🇲🇽',
    'Nigeria': '🇳🇬',
    'Pakistán': '🇵🇰',
    'Países Bajos': '🇳🇱',
    'Senegal': '🇸🇳',
    'Afganistán': '🇦🇫',
    'Albania': '🇦🇱',
    'Corea del Sur': '🇰🇷',
    'Egipto': '🇪🇬',
    'Emiratos Árabes Unidos': '🇦🇪',
    'Etiopía': '🇪🇹',
    'Ghana': '🇬🇭',
    'Guinea': '🇬🇳',
    'Irán': '🇮🇷',
    'Irak': '🇮🇶',
    'Kazajistán': '🇰🇿',
    'Marruecos': '🇲🇦',
    'Panamá': '🇵🇦',
    'Portugal': '🇵🇹',
    'Antigua y Barbuda': '🇦🇬',
    'Arabia Saudita': '🇸🇦',
    'Armenia': '🇦🇲',
    'Australia': '🇦🇺',
    'Austria': '🇦🇹',
    'Azerbaiyán': '🇦🇿',
    'Burundi': '🇧🇮',
    'Canadá': '🇨🇦',
    'Chad': '🇹🇩',
    'China': '🇨🇳',
    'Costa de Marfil': '🇨🇮',
    'Croacia': '🇭🇷',
    'Yibuti': '🇩🇯',
    'Ecuador': '🇪🇨',
    'Federación de Rusia': '🇷🇺',
    'Finlandia': '🇫🇮',
    'Haití': '🇭🇹',
    'Japón': '🇯🇵',
    'Líbano': '🇱🇧',
    'Mauritania': '🇲🇷',
    'Mozambique': '🇲🇿',
    'Nepal': '🇳🇵',
    'Noruega': '🇳🇴',
    'Paraguay': '🇵🇾',
    'Perú': '🇵🇪',
    'Polonia': '🇵🇱',
    'Reino Unido': '🇬🇧',
    'República Dominicana': '🇩🇴',
    'San Cristóbal y Nieves': '🇰🇳',
    'Ciudad del Vaticano': '🇻🇦',
    'Angola': '🇦🇴',
    'Barbados': '🇧🇧',
    'Bolivia': '🇧🇴',
    'Bosnia y Herzegovina': '🇧🇦',
    'Botswana': '🇧🇼',
    'Camboya': '🇰🇭',
    'Camerún': '🇨🇲',
    'Corea del Norte': '🇰🇵',
    'Costa Rica': '🇨🇷',
    'Cuba': '🇨🇺',
    'Dinamarca': '🇩🇰',
    'El Salvador': '🇸🇻',
    'Filipinas': '🇵🇭',
    'Grecia': '🇬🇷',
    'Guatemala': '🇬🇹',
    'Guyana': '🇬🇾',
    'Honduras': '🇭🇳',
    'Hungría': '🇭🇺',
    'Indonesia': '🇮🇩',
    'Irlanda': '🇮🇪',
    'Israel': '🇮🇱',
    'Italia': '🇮🇹',
    'Jamaica': '🇯🇲',
    'Malasia': '🇲🇾',
    'Malí': '🇲🇱',
    'Mongolia': '🇲🇳',
    'Namibia': '🇳🇦',
    'Nicaragua': '🇳🇮',
    'Níger': '🇳🇪',
    'Republica Arabe Unida': '🇪🇬',
    'Republica China': '🇨🇳',
    'Republica Democratica Alemana': '🇩🇪',
    'Rumania': '🇷🇴',
    'URSS': '🇷🇺',
    'Venezuela': '🇻🇪'
};

// Definición de delegaciones y presencia
const combinadas_6 = [
    'Alemania', 'Argelia', 'Argentina', 'Bangladés', 'Bélgica', 'Brasil', 'Chile',
    'Colombia', 'España', 'Estados Unidos de América', 'Francia', 'India', 'Kenia',
    'México', 'Nigeria', 'Pakistán', 'Países Bajos', 'Senegal'
]; // AG, STI, ECOSOC, ONUDD

const exclusivas_onudd_4 = [
    'Afganistán', 'Albania', 'Corea del Sur', 'Egipto', 'Emiratos Árabes Unidos',
    'Etiopía', 'Ghana', 'Guinea', 'Irán', 'Irak', 'Kazajistán', 'Marruecos', 'Panamá', 'Portugal'
]; // AG, STI, ONUDD

const exclusivas_ecosoc_5 = [
    'Antigua y Barbuda', 'Arabia Saudita', 'Armenia', 'Australia', 'Austria',
    'Azerbaiyán', 'Burundi', 'Canadá', 'Chad', 'China', 'Costa de Marfil',
    'Croacia', 'Yibuti', 'Ecuador', 'Federación de Rusia', 'Finlandia', 'Haití',
    'Japón', 'Líbano', 'Mauritania', 'Mozambique', 'Nepal', 'Noruega', 'Paraguay',
    'Perú', 'Polonia', 'Reino Unido', 'República Dominicana', 'San Cristóbal y Nieves'
]; // AG, STI, ECOSOC

const observadora_1 = [
    'Ciudad del Vaticano'
]; // AG, STI

const sin_especificacion_3 = [
    'Angola', 'Barbados', 'Bolivia', 'Bosnia y Herzegovina', 'Botswana', 'Camboya',
    'Camerún', 'Corea del Norte', 'Costa Rica', 'Cuba', 'Dinamarca', 'El Salvador',
    'Filipinas', 'Grecia', 'Guatemala', 'Guyana', 'Honduras', 'Hungría', 'Indonesia',
    'Irlanda', 'Israel', 'Italia', 'Jamaica', 'Malasia', 'Malí', 'Mongolia',
    'Namibia', 'Nicaragua', 'Níger'
]; // AG, STI

const csh_15 = [
    'Canadá', 'Chile', 'Cuba', 'Estados Unidos', 'Francia', 'Ghana', 'Irlanda',
    'Polonia', 'Reino Unido', 'Republica Arabe Unida', 'Republica China',
    'Republica Democratica Alemana', 'Rumania', 'URSS', 'Venezuela'
]; // CSH

async function seedMatrix() {
    console.log('Iniciando carga de países y órganos...');

    // 1. Crear / actualizar órganos
    const organDefinitions = [
        { name: 'Asamblea General (AG)', color: '#73A950', description: 'Principal órgano deliberativo y representativo de la ONU.' },
        { name: 'Sala de Tratados Internacionales (STI)', color: '#FFB819', description: 'Espacio diplomático de negociación directa y firma de acuerdos bilaterales y multilaterales.' },
        { name: 'Consejo Económico y Social (ECOSOC)', color: '#E15829', description: 'Órgano de debate y coordinación de asuntos económicos, sociales y ambientales.' },
        { name: 'ONUDD', color: '#61B4E4', description: 'Oficina de las Naciones Unidas contra la Droga y el Delito.' },
        { name: 'Consejo de Seguridad Histórico (CSH)', color: '#A02140', description: 'Simulación histórica del Consejo de Seguridad de Naciones Unidas.' }
    ];

    const organMap = {};
    for (const def of organDefinitions) {
        let [org] = await Organ.findOrCreate({
            where: { name: def.name },
            defaults: def
        });
        organMap[def.name] = org.id;
    }

    // Vaciar países previos para recargar la matriz limpia
    await OrganCountry.destroy({ where: {} });

    const records = [];
    const excelRows = [];

    function addCountryToOrgans(countryList, organNames) {
        for (const country of countryList) {
            const flag = flags[country] || '🌐';
            for (const orgName of organNames) {
                const organId = organMap[orgName];
                records.push({
                    organ_id: organId,
                    country_name: country,
                    country_flag: flag
                });
                excelRows.push({
                    pais: country,
                    organo: orgName,
                    bandera: flag
                });
            }
        }
    }

    // AG y STI: todas las delegaciones de la matriz general (18 + 14 + 29 + 1 + 29 = 91 países)
    addCountryToOrgans(combinadas_6, ['Asamblea General (AG)', 'Sala de Tratados Internacionales (STI)', 'Consejo Económico y Social (ECOSOC)', 'ONUDD']);
    addCountryToOrgans(exclusivas_onudd_4, ['Asamblea General (AG)', 'Sala de Tratados Internacionales (STI)', 'ONUDD']);
    addCountryToOrgans(exclusivas_ecosoc_5, ['Asamblea General (AG)', 'Sala de Tratados Internacionales (STI)', 'Consejo Económico y Social (ECOSOC)']);
    addCountryToOrgans(observadora_1, ['Asamblea General (AG)', 'Sala de Tratados Internacionales (STI)']);
    addCountryToOrgans(sin_especificacion_3, ['Asamblea General (AG)', 'Sala de Tratados Internacionales (STI)']);
    addCountryToOrgans(csh_15, ['Consejo de Seguridad Histórico (CSH)']);

    await OrganCountry.bulkCreate(records);
    console.log(`✅ Se insertaron ${records.length} asignaciones de países en la base de datos.`);

    // Crear archivo Excel para descarga
    const ws = xlsx.utils.json_to_sheet(excelRows);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'PaisesPorOrgano');
    ws['!cols'] = [{ wch: 32 }, { wch: 45 }, { wch: 10 }];

    const exportPath = path.join(__dirname, 'frontend/public/documents/matriz_paises_organos.xlsx');
    fs.mkdirSync(path.dirname(exportPath), { recursive: true });
    xlsx.writeFile(wb, exportPath);
    console.log(`✅ Archivo Excel generado en ${exportPath}`);

    process.exit(0);
}

seedMatrix().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

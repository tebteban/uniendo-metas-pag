/**
 * Middleware de sanitización de inputs.
 * Limpia automáticamente todos los campos de texto en req.body
 * para prevenir ataques XSS (Cross-Site Scripting).
 *
 * Se aplica de forma global a todas las rutas POST/PUT/PATCH.
 */

const xss = require('xss');

// Configuración de xss: permitir solo texto plano, sin ningún tag HTML
const xssOptions = {
    whiteList: {},          // No permitir ningún tag HTML
    stripIgnoreTag: true,   // Eliminar tags no permitidos
    stripIgnoreTagBody: ['script', 'style'], // Eliminar contenido de <script> y <style>
};

/**
 * Sanitiza un valor individual.
 * - Si es string, lo limpia con xss.
 * - Si es array, limpia cada elemento.
 * - Si es objeto, limpia recursivamente.
 */
function sanitizeValue(value) {
    if (typeof value === 'string') {
        return xss(value.trim(), xssOptions);
    }
    if (Array.isArray(value)) {
        return value.map(sanitizeValue);
    }
    if (value !== null && typeof value === 'object') {
        return sanitizeObject(value);
    }
    return value;
}

/**
 * Sanitiza todos los campos de un objeto.
 */
function sanitizeObject(obj) {
    const sanitized = {};
    for (const key of Object.keys(obj)) {
        sanitized[key] = sanitizeValue(obj[key]);
    }
    return sanitized;
}

/**
 * Middleware que sanitiza req.body, req.query y req.params.
 */
function sanitizeInputs(req, res, next) {
    if (req.body && typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
    }
    if (req.query && typeof req.query === 'object') {
        req.query = sanitizeObject(req.query);
    }
    if (req.params && typeof req.params === 'object') {
        req.params = sanitizeObject(req.params);
    }
    next();
}

module.exports = sanitizeInputs;

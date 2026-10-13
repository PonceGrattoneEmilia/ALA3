import { esFechaValida } from './fechas.js';

export function validarTitulo(titulo) {
    if (typeof titulo !== 'string') {
        return { esValido: false, mensaje: 'El título debe ser una cadena de texto.' };
    }
    const textoLimpio = titulo.trim();
    if (textoLimpio.length === 0) {
        return { esValido: false, mensaje: 'El título no puede estar vacío.' };
    }
    if (textoLimpio.length > 100) {
        return { esValido: false, mensaje: 'El título no puede superar los 100 caracteres.' };
    }
    return { esValido: true, valor: textoLimpio };
}

export function validarDescripcion(descripcion) {
    if (descripcion === null || descripcion === undefined || descripcion === '') {
        return { esValido: true, valor: '' };
    }
    if (typeof descripcion !== 'string') {
        return { esValido: false, mensaje: 'La descripción debe ser un texto.' };
    }
    if (descripcion.length > 500) {
        return { esValido: false, mensaje: 'La descripción no puede superar los 500 caracteres.' };
    }
    return { esValido: true, valor: descripcion };
}

export function validarYNormalizarEstado(estadoEntrada) {
    if (!estadoEntrada || estadoEntrada.trim() === '') {
        return { esValido: true, valor: 'Pendiente' };
    }
    const estadoLimpio = estadoEntrada.trim().toLowerCase();
    if (estadoLimpio === 'p' || estadoLimpio === '1' || estadoLimpio === 'pendiente') {
        return { esValido: true, valor: 'Pendiente' };
    }
    if (estadoLimpio === 'e' || estadoLimpio === '2' || estadoLimpio === 'en curso' || estadoLimpio === 'en_curso') {
        return { esValido: true, valor: 'En curso' };
    }
    if (estadoLimpio === 't' || estadoLimpio === '3' || estadoLimpio === 'terminada') {
        return { esValido: true, valor: 'Terminada' };
    }
    if (estadoLimpio === 'c' || estadoLimpio === '4' || estadoLimpio === 'cancelada') {
        return { esValido: true, valor: 'Cancelada' };
    }
    return { esValido: false, mensaje: 'Opción de estado no válida. Usa [P]endiente, [E]n curso, [T]erminada o [C]ancelada.' };
}

export function validarYNormalizarDificultad(dificultadEntrada) {
    if (!dificultadEntrada || String(dificultadEntrada).trim() === '') {
        return { esValido: true, valor: 1 };
    }
    const dificultadLimpia = String(dificultadEntrada).trim().toLowerCase();
    if (dificultadLimpia === '1' || dificultadLimpia === 'f' || dificultadLimpia === 'facil' || dificultadLimpia === 'fácil') {
        return { esValido: true, valor: 1 };
    }
    if (dificultadLimpia === '2' || dificultadLimpia === 'm' || dificultadLimpia === 'medio') {
        return { esValido: true, valor: 2 };
    }
    if (dificultadLimpia === '3' || dificultadLimpia === 'd' || dificultadLimpia === 'dificil' || dificultadLimpia === 'difícil') {
        return { esValido: true, valor: 3 };
    }
    return { esValido: false, mensaje: 'Dificultad no válida. Debe ser 1 (Fácil), 2 (Medio) o 3 (Difícil).' };
}

export function validarFechaVencimiento(fechaEntrada) {
    if (!fechaEntrada || fechaEntrada.trim() === '') {
        return { esValido: true, valor: null };
    }
    const fechaLimpia = fechaEntrada.trim();
    if (esFechaValida(fechaLimpia)) {
        return { esValido: true, valor: fechaLimpia };
    }
    return { esValido: false, mensaje: 'Formato de fecha no válido. Debe ser DD/MM/AAAA (ejemplo: 30/06/2023).' };
}
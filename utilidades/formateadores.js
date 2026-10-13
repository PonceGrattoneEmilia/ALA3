import { formatearFecha } from './fechas.js';

export function formatearDificultad(dificultad) {
    const valorNumerico = parseInt(dificultad, 10);
    switch (valorNumerico) {
        case 1:
            return '★☆☆';
        case 2:
            return '★★☆';
        case 3:
            return '★★★';
        default:
            return '★☆☆';
    }
}

export function formatearTextoOVacio(valor, reemplazo = 'Sin Datos') {
    if (valor === null || valor === undefined || valor === '') {
        return reemplazo;
    }
    return valor;
}

export function formatearFechaOVacio(fecha, reemplazo = 'Sin Datos') {
    const fechaFormateada = formatearFecha(fecha);
    return fechaFormateada ? fechaFormateada : reemplazo;
}
function rellenarCero(numero) {
    return numero < 10 ? '0' + numero : '' + numero;
}

export function formatearFecha(fecha) {
    if (!fecha) return null;
    if (typeof fecha === 'string') {
        const parseada = parsearFecha(fecha);
        if (parseada) {
            const dia = rellenarCero(parseada.getDate());
            const mes = rellenarCero(parseada.getMonth() + 1);
            const anio = parseada.getFullYear();
            return `${dia}/${mes}/${anio}`;
        }
    }
    const objetoFecha = (fecha instanceof Date) ? fecha : new Date(fecha);
    if (isNaN(objetoFecha.getTime())) return null;

    const dia = rellenarCero(objetoFecha.getDate());
    const mes = rellenarCero(objetoFecha.getMonth() + 1);
    const anio = objetoFecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}

export function esFechaValida(cadenaFecha) {
    if (!cadenaFecha || typeof cadenaFecha !== 'string') return false;
    const expresion = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
    const coincidencia = cadenaFecha.trim().match(expresion);
    if (!coincidencia) return false;

    const dia = parseInt(coincidencia[1], 10);
    const mes = parseInt(coincidencia[2], 10);
    const anio = parseInt(coincidencia[3], 10);

    if (anio < 1900 || anio > 2100) return false;
    if (mes < 1 || mes > 12) return false;

    const diasEnMes = new Date(anio, mes, 0).getDate();
    if (dia < 1 || dia > diasEnMes) return false;

    return true;
}

export function parsearFecha(cadenaFecha) {
    if (!cadenaFecha) return null;
    if (cadenaFecha instanceof Date) return cadenaFecha;
    if (!esFechaValida(cadenaFecha)) return null;

    const expresion = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
    const coincidencia = cadenaFecha.trim().match(expresion);
    const dia = parseInt(coincidencia[1], 10);
    const mes = parseInt(coincidencia[2], 10) - 1;
    const anio = parseInt(coincidencia[3], 10);

    return new Date(anio, mes, dia);
}

export function obtenerFechaActual() {
    return new Date();
}
import { formatearDificultad, formatearFechaOVacio, formatearTextoOVacio } from '../utilidades/formateadores.js';
import { formatearFecha, obtenerFechaActual } from '../utilidades/fechas.js';

/**
 * Función constructora para objetos de tipo Tarea.
 * En la POO basada en prototipos, define el estado inicial mediante 'this'.
 * 
 * @param {Object} datos - Objeto con los datos iniciales de la tarea.
 */
export function Tarea(datos = {}) {
    this.id = datos.id;
    this.titulo = datos.titulo;
    this.descripcion = datos.descripcion || '';
    this.estado = datos.estado || 'Pendiente';
    this.dificultad = datos.dificultad || 1;
    this.vencimiento = datos.vencimiento || null;
    this.creacion = datos.creacion || formatearFecha(obtenerFechaActual());
    this.ultimaEdicion = datos.ultimaEdicion || this.creacion;
}

/**
 * Métodos definidos en Tarea.prototype para ser compartidos por todas las instancias.
 */

// Permite a la tarea actualizar su propio estado (encapsulamiento de comportamiento)
Tarea.prototype.actualizar = function (camposActualizados = {}) {
    if (camposActualizados.titulo !== undefined) {
        this.titulo = camposActualizados.titulo;
    }
    if (camposActualizados.descripcion !== undefined) {
        this.descripcion = camposActualizados.descripcion;
    }
    if (camposActualizados.estado !== undefined) {
        this.estado = camposActualizados.estado;
    }
    if (camposActualizados.dificultad !== undefined) {
        this.dificultad = camposActualizados.dificultad;
    }
    if (camposActualizados.vencimiento !== undefined) {
        this.vencimiento = camposActualizados.vencimiento;
    }
    this.ultimaEdicion = formatearFecha(obtenerFechaActual());
};

// Evalúa si el título de la tarea coincide con un término de búsqueda
Tarea.prototype.coincideCon = function (termino) {
    if (!termino || typeof termino !== 'string') return false;
    const terminoLimpio = termino.trim().toLowerCase();
    return this.titulo.toLowerCase().includes(terminoLimpio);
};

// Verifica si la tarea pertenece a un estado determinado
Tarea.prototype.tieneEstado = function (estadoBuscado) {
    if (!estadoBuscado || typeof estadoBuscado !== 'string') return false;
    return this.estado.toLowerCase() === estadoBuscado.toLowerCase();
};

// Retorna un clon plano con el estado actual
Tarea.prototype.aObjetoPlano = function () {
    return {
        id: this.id,
        titulo: this.titulo,
        descripcion: this.descripcion,
        estado: this.estado,
        dificultad: this.dificultad,
        vencimiento: this.vencimiento,
        creacion: this.creacion,
        ultimaEdicion: this.ultimaEdicion
    };
};

/**
 * Getters (propiedades computadas) en el prototipo, tal como describe la teoría.
 */
Object.defineProperty(Tarea.prototype, 'dificultadEstrellas', {
    get: function () {
        return formatearDificultad(this.dificultad);
    }
});

Object.defineProperty(Tarea.prototype, 'descripcionFormateada', {
    get: function () {
        return formatearTextoOVacio(this.descripcion);
    }
});

Object.defineProperty(Tarea.prototype, 'vencimientoFormateado', {
    get: function () {
        return formatearFechaOVacio(this.vencimiento);
    }
});

Object.defineProperty(Tarea.prototype, 'creacionFormateada', {
    get: function () {
        return formatearFechaOVacio(this.creacion);
    }
});

Object.defineProperty(Tarea.prototype, 'ultimaEdicionFormateada', {
    get: function () {
        return formatearFechaOVacio(this.ultimaEdicion);
    }
});
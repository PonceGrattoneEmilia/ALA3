import { formatearFecha, obtenerFechaActual } from '../utilidades/fechas.js';
import {
    validarTitulo,
    validarDescripcion,
    validarYNormalizarEstado,
    validarYNormalizarDificultad,
    validarFechaVencimiento
} from '../utilidades/validadores.js';

/**
 * Función constructora para ServicioTareas.
 * Se encarga de aplicar las reglas de validación y coordinar
 * operaciones sobre una instancia de RepositorioTareas.
 * 
 * @param {RepositorioTareas} repositorio - Instancia del repositorio.
 */
export function ServicioTareas(repositorio) {
    this.repositorio = repositorio;
}

/**
 * Métodos en ServicioTareas.prototype
 */

ServicioTareas.prototype.obtenerTodasLasTareas = function () {
    return this.repositorio.obtenerTodas();
};

ServicioTareas.prototype.obtenerTareaPorId = function (id) {
    return this.repositorio.obtenerPorId(id);
};

ServicioTareas.prototype.buscarTareasPorTitulo = function (terminoBusqueda) {
    return this.repositorio.buscarPorTitulo(terminoBusqueda);
};

ServicioTareas.prototype.filtrarPorEstado = function (opcionEstado) {
    return this.repositorio.filtrarPorEstado(opcionEstado);
};

ServicioTareas.prototype.ordenarTareas = function (listaTareas, tipoOrden) {
    return this.repositorio.ordenar(listaTareas, tipoOrden);
};

ServicioTareas.prototype.crearTarea = function ({ titulo, descripcion, estado, dificultad, vencimiento }) {
    const validacionTitulo = validarTitulo(titulo);
    if (!validacionTitulo.esValido) {
        return { exito: false, mensaje: validacionTitulo.mensaje };
    }

    const validacionDescripcion = validarDescripcion(descripcion);
    if (!validacionDescripcion.esValido) {
        return { exito: false, mensaje: validacionDescripcion.mensaje };
    }

    const validacionEstado = validarYNormalizarEstado(estado);
    if (!validacionEstado.esValido) {
        return { exito: false, mensaje: validacionEstado.mensaje };
    }

    const validacionDificultad = validarYNormalizarDificultad(dificultad);
    if (!validacionDificultad.esValido) {
        return { exito: false, mensaje: validacionDificultad.mensaje };
    }

    const validacionVencimiento = validarFechaVencimiento(vencimiento);
    if (!validacionVencimiento.esValido) {
        return { exito: false, mensaje: validacionVencimiento.mensaje };
    }

    const fechaHoyFormateada = formatearFecha(obtenerFechaActual());

    const nuevaTarea = this.repositorio.agregar({
        titulo: validacionTitulo.valor,
        descripcion: validacionDescripcion.valor,
        estado: validacionEstado.valor,
        dificultad: validacionDificultad.valor,
        vencimiento: validacionVencimiento.valor,
        creacion: fechaHoyFormateada,
        ultimaEdicion: fechaHoyFormateada
    });

    return { exito: true, tarea: nuevaTarea };
};

ServicioTareas.prototype.editarTarea = function (id, { entradaTitulo, entradaDescripcion, entradaEstado, entradaDificultad, entradaVencimiento }) {
    const tareaExistente = this.repositorio.obtenerPorId(id);
    if (!tareaExistente) {
        return { exito: false, mensaje: 'La tarea no existe.' };
    }

    const datosActualizados = {};

    if (entradaTitulo !== undefined) {
        if (entradaTitulo === '') {
            datosActualizados.titulo = tareaExistente.titulo;
        } else {
            const validacionTitulo = validarTitulo(entradaTitulo);
            if (!validacionTitulo.esValido) {
                return { exito: false, mensaje: validacionTitulo.mensaje };
            }
            datosActualizados.titulo = validacionTitulo.valor;
        }
    }

    if (entradaDescripcion !== undefined) {
        if (entradaDescripcion === '') {
            datosActualizados.descripcion = tareaExistente.descripcion;
        } else if (entradaDescripcion === ' ') {
            datosActualizados.descripcion = '';
        } else {
            const validacionDescripcion = validarDescripcion(entradaDescripcion);
            if (!validacionDescripcion.esValido) {
                return { exito: false, mensaje: validacionDescripcion.mensaje };
            }
            datosActualizados.descripcion = validacionDescripcion.valor;
        }
    }

    if (entradaEstado !== undefined) {
        if (entradaEstado === '') {
            datosActualizados.estado = tareaExistente.estado;
        } else {
            const validacionEstado = validarYNormalizarEstado(entradaEstado);
            if (!validacionEstado.esValido) {
                return { exito: false, mensaje: validacionEstado.mensaje };
            }
            datosActualizados.estado = validacionEstado.valor;
        }
    }

    if (entradaDificultad !== undefined) {
        if (entradaDificultad === '') {
            datosActualizados.dificultad = tareaExistente.dificultad;
        } else {
            const validacionDificultad = validarYNormalizarDificultad(entradaDificultad);
            if (!validacionDificultad.esValido) {
                return { exito: false, mensaje: validacionDificultad.mensaje };
            }
            datosActualizados.dificultad = validacionDificultad.valor;
        }
    }

    if (entradaVencimiento !== undefined) {
        if (entradaVencimiento === '') {
            datosActualizados.vencimiento = tareaExistente.vencimiento;
        } else if (entradaVencimiento === ' ') {
            datosActualizados.vencimiento = null;
        } else {
            const validacionVencimiento = validarFechaVencimiento(entradaVencimiento);
            if (!validacionVencimiento.esValido) {
                return { exito: false, mensaje: validacionVencimiento.mensaje };
            }
            datosActualizados.vencimiento = validacionVencimiento.valor;
        }
    }

    const tareaModificada = this.repositorio.actualizar(id, datosActualizados);
    return { exito: true, tarea: tareaModificada };
};
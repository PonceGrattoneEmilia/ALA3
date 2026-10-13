import { Tarea } from './Tarea.js';
import { parsearFecha } from '../utilidades/fechas.js';

/**
 * Función constructora para RepositorioTareas.
 * Encapsula la colección de tareas y el generador de IDs.
 */
export function RepositorioTareas() {
    this.tareas = [];
    this.siguienteId = 1;
}

/**
 * Métodos en RepositorioTareas.prototype
 */

// Agrega una nueva tarea instanciada con el constructor Tarea
RepositorioTareas.prototype.agregar = function (datosTarea) {
    const nuevaTarea = new Tarea({
        id: this.siguienteId++,
        titulo: datosTarea.titulo,
        descripcion: datosTarea.descripcion || '',
        estado: datosTarea.estado || 'Pendiente',
        dificultad: datosTarea.dificultad || 1,
        vencimiento: datosTarea.vencimiento || null,
        creacion: datosTarea.creacion,
        ultimaEdicion: datosTarea.ultimaEdicion || datosTarea.creacion
    });

    this.tareas.push(nuevaTarea);
    return nuevaTarea;
};

// Retorna un array con todas las tareas existentes
RepositorioTareas.prototype.obtenerTodas = function () {
    return [...this.tareas];
};

// Busca y retorna una tarea por su id
RepositorioTareas.prototype.obtenerPorId = function (id) {
    const idNumerico = parseInt(id, 10);
    const tarea = this.tareas.find(t => t.id === idNumerico);
    return tarea || null;
};

// Actualiza una tarea enviándole el mensaje .actualizar(...) al objeto
RepositorioTareas.prototype.actualizar = function (id, camposActualizados) {
    const tarea = this.obtenerPorId(id);
    if (!tarea) {
        return null;
    }

    tarea.actualizar(camposActualizados);
    return tarea;
};

// Busca tareas por título delegando la condición en tarea.coincideCon(termino)
RepositorioTareas.prototype.buscarPorTitulo = function (termino) {
    if (!termino || typeof termino !== 'string') return [];
    const terminoLimpio = termino.trim();
    if (terminoLimpio === '') return [];

    return this.tareas.filter(tarea => tarea.coincideCon(terminoLimpio));
};

// Filtra tareas según el estado solicitado
RepositorioTareas.prototype.filtrarPorEstado = function (opcionEstado) {
    switch (opcionEstado) {
        case '1':
        case 'todas':
        case 'Todas':
            return [...this.tareas];
        case '2':
        case 'pendientes':
        case 'Pendientes':
            return this.tareas.filter(t => t.tieneEstado('Pendiente'));
        case '3':
        case 'en curso':
        case 'En curso':
            return this.tareas.filter(t => t.tieneEstado('En curso'));
        case '4':
        case 'terminadas':
        case 'Terminadas':
            return this.tareas.filter(t => t.tieneEstado('Terminada'));
        case 'canceladas':
        case 'Canceladas':
            return this.tareas.filter(t => t.tieneEstado('Cancelada'));
        default:
            return [...this.tareas];
    }
};

// Ordena una lista de tareas según el criterio indicado
RepositorioTareas.prototype.ordenar = function (listaTareas, tipoOrden) {
    const lista = [...listaTareas];

    switch (tipoOrden) {
        case '1':
        case 'creacion':
            return lista.sort((a, b) => {
                const fechaA = parsearFecha(a.creacion) || new Date(0);
                const fechaB = parsearFecha(b.creacion) || new Date(0);
                return fechaA.getTime() - fechaB.getTime();
            });

        case '2':
        case 'alfabetico':
            return lista.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' }));

        case '3':
        case 'vencimiento':
            return lista.sort((a, b) => {
                if (!a.vencimiento && !b.vencimiento) return 0;
                if (!a.vencimiento) return 1;
                if (!b.vencimiento) return -1;

                const fechaA = parsearFecha(a.vencimiento) || new Date(0);
                const fechaB = parsearFecha(b.vencimiento) || new Date(0);
                return fechaA.getTime() - fechaB.getTime();
            });

        default:
            return lista;
    }
};
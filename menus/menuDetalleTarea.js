import { limpiarPantalla, leerEntrada, pausar } from '../utilidades/consola.js';
import { mostrarMenuEditarTarea } from './menuEditarTarea.js';

export function mostrarMenuDetalleTarea(servicioTareas, idTarea) {
    let enEjecucion = true;

    while (enEjecucion) {
        const tarea = servicioTareas.obtenerTareaPorId(idTarea);
        if (!tarea) {
            console.log('\nTarea no encontrada.');
            pausar();
            break;
        }

        limpiarPantalla();
        console.log('Esta es la tarea que elegiste.\n');
        console.log(`${tarea.titulo}\n`);
        console.log(`${tarea.descripcionFormateada}\n`);

        console.log(`Estado:        ${tarea.estado}`);
        console.log(`Dificultad:    ${tarea.dificultadEstrellas}`);
        console.log(`Vencimiento:   ${tarea.vencimientoFormateado}`);
        console.log(`Creación:      ${tarea.creacionFormateada}`);
        console.log(`Última Edición: ${tarea.ultimaEdicionFormateada}\n`);

        console.log('Si deseas editarla, presiona E, o presiona 0 para volver.');
        const opcion = leerEntrada().trim().toUpperCase();

        if (opcion === 'E') {
            mostrarMenuEditarTarea(servicioTareas, idTarea);
        } else if (opcion === '0') {
            enEjecucion = false;
        } else {
            console.log('\nOpción no válida. Ingresa E para editar o 0 para volver.');
            pausar();
        }
    }
}
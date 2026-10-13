import { limpiarPantalla, leerEntrada, pausar } from '../utilidades/consola.js';
import { mostrarMenuDetalleTarea } from './menuDetalleTarea.js';

export function mostrarMenuListaTareas(servicioTareas, listaTareas, encabezado = 'Estas son todas tus tareas.') {
    let enEjecucion = true;

    while (enEjecucion) {
        limpiarPantalla();
        console.log(`${encabezado}\n`);

        if (listaTareas.length === 0) {
            console.log('No hay tareas para mostrar.\n');
            pausar('Presiona cualquier tecla para volver...');
            break;
        }

        listaTareas.forEach((tarea, indice) => {
            console.log(`[${indice + 1}] ${tarea.titulo}`);
        });

        console.log('\n¿Deseas ver los detalles de alguna?');
        console.log('Introduce el número para verla o 0 para volver.');
        const entrada = leerEntrada().trim();

        if (entrada === '0') {
            enEjecucion = false;
        } else {
            const indiceSeleccionado = parseInt(entrada, 10);
            if (!isNaN(indiceSeleccionado) && indiceSeleccionado >= 1 && indiceSeleccionado <= listaTareas.length) {
                const tareaSeleccionada = listaTareas[indiceSeleccionado - 1];
                mostrarMenuDetalleTarea(servicioTareas, tareaSeleccionada.id);
            } else {
                console.log('\nOpción no válida. Debes ingresar un número de la lista o 0 para volver.');
                pausar();
            }
        }
    }
}
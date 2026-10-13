import { limpiarPantalla, leerEntrada, pausar } from '../utilidades/consola.js';
import { mostrarMenuVerTareas } from './menuVerTareas.js';
import { mostrarMenuBuscarTarea } from './menuBuscarTarea.js';
import { mostrarMenuAgregarTarea } from './menuAgregarTarea.js';

export function mostrarMenuPrincipal(servicioTareas) {
    let enEjecucion = true;

    while (enEjecucion) {
        limpiarPantalla();
        console.log('¡Hola Olivia!\n');
        console.log('¿Qué deseas hacer?\n');
        console.log('[1] Ver Mis Tareas.');
        console.log('[2] Buscar una Tarea.');
        console.log('[3] Agregar una Tarea.');
        console.log('[0] Salir.');

        const opcion = leerEntrada('\n> ').trim();

        switch (opcion) {
            case '1':
                mostrarMenuVerTareas(servicioTareas);
                break;
            case '2':
                mostrarMenuBuscarTarea(servicioTareas);
                break;
            case '3':
                mostrarMenuAgregarTarea(servicioTareas);
                break;
            case '0':
                console.log('\n¡Hasta luego Olivia!');
                enEjecucion = false;
                break;
            default:
                console.log('\nOpción no válida. Por favor introduce 1, 2, 3 o 0.');
                pausar();
                break;
        }
    }
}
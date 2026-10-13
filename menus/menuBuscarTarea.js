import { limpiarPantalla, leerEntrada, pausar } from '../utilidades/consola.js';
import { mostrarMenuListaTareas } from './menuListaTareas.js';

export function mostrarMenuBuscarTarea(servicioTareas) {
    limpiarPantalla();
    console.log('Introduce el título de una tarea para buscarla:');
    const textoBusqueda = leerEntrada('> ').trim();

    if (textoBusqueda === '') {
        console.log('\nNo ingresaste ningún término de búsqueda.');
        pausar('Presiona cualquier tecla para continuar...');
        return;
    }

    const coincidencias = servicioTareas.buscarTareasPorTitulo(textoBusqueda);

    if (coincidencias.length === 0) {
        console.log('\nNo hay tareas relacionadas con la búsqueda.');
        pausar('Presiona cualquier tecla para continuar...');
    } else {
        mostrarMenuListaTareas(servicioTareas, coincidencias, 'Estas son las tareas relacionadas:');
    }
}
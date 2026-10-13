import { limpiarPantalla, leerEntrada, pausar } from '../utilidades/consola.js';
import { mostrarMenuListaTareas } from './menuListaTareas.js';

function seleccionarOrden() {
    limpiarPantalla();
    console.log('¿Deseas aplicar algún orden a la lista?\n');
    console.log('[1] Por fecha de creación (Por defecto)');
    console.log('[2] Alfabético ascendente (A-Z)');
    console.log('[3] Por fecha de vencimiento');
    console.log('[0] Mantener orden actual');

    const opcionOrden = leerEntrada('\n> ').trim();
    return opcionOrden;
}

export function mostrarMenuVerTareas(servicioTareas) {
    let enMenu = true;

    while (enMenu) {
        limpiarPantalla();
        console.log('¿Qué tareas deseas ver?\n');
        console.log('[1] Todas');
        console.log('[2] Pendientes');
        console.log('[3] En curso');
        console.log('[4] Terminadas');
        console.log('[0] Volver');

        const opcion = leerEntrada('\n> ').trim();

        if (opcion === '0') {
            enMenu = false;
            break;
        }

        if (['1', '2', '3', '4'].includes(opcion)) {
            let tareasFiltradas = servicioTareas.filtrarPorEstado(opcion);

            let tituloEncabezado = 'Estas son todas tus tareas.';
            if (opcion === '2') tituloEncabezado = 'Estas son tus tareas pendientes.';
            if (opcion === '3') tituloEncabezado = 'Estas son tus tareas en curso.';
            if (opcion === '4') tituloEncabezado = 'Estas son tus tareas terminadas.';

            if (tareasFiltradas.length > 0) {
                const opcionOrden = seleccionarOrden();
                if (opcionOrden === '2') {
                    tareasFiltradas = servicioTareas.ordenarTareas(tareasFiltradas, 'alfabetico');
                } else if (opcionOrden === '3') {
                    tareasFiltradas = servicioTareas.ordenarTareas(tareasFiltradas, 'vencimiento');
                } else if (opcionOrden === '1' || opcionOrden === '') {
                    tareasFiltradas = servicioTareas.ordenarTareas(tareasFiltradas, 'creacion');
                }
            }

            mostrarMenuListaTareas(servicioTareas, tareasFiltradas, tituloEncabezado);
        } else {
            console.log('\nOpción no válida. Por favor selecciona una opción del menú.');
            pausar();
        }
    }
}
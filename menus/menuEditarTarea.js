import { limpiarPantalla, leerEntrada, pausar } from '../utilidades/consola.js';

export function mostrarMenuEditarTarea(servicioTareas, idTarea) {
    const tarea = servicioTareas.obtenerTareaPorId(idTarea);
    if (!tarea) {
        console.log('\nTarea no encontrada.');
        pausar();
        return;
    }

    limpiarPantalla();
    console.log(`Estas editando la tarea ${tarea.titulo}.\n`);
    console.log('- Si deseas mantener los valores de un atributo, simplemente dejalo en blanco.');
    console.log('- Si deseas dejar en blanco un atributo, escribe un espacio.\n');

    console.log(`1. Ingresa el título:`);
    const entradaTitulo = leerEntrada();

    console.log(`2. Ingresa la descripción:`);
    const entradaDescripcion = leerEntrada();

    console.log(`3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada):`);
    const entradaEstado = leerEntrada();

    console.log(`4. Dificultad ([1] / [2] / [3]):`);
    const entradaDificultad = leerEntrada();

    console.log(`5. Vencimiento (DD/MM/AAAA):`);
    const entradaVencimiento = leerEntrada();

    const resultado = servicioTareas.editarTarea(idTarea, {
        entradaTitulo,
        entradaDescripcion,
        entradaEstado,
        entradaDificultad,
        entradaVencimiento
    });

    if (resultado.exito) {
        console.log('\n¡Datos guardados!');
    } else {
        console.log(`\nError al guardar: ${resultado.mensaje}`);
    }

    pausar('Presiona cualquier tecla para continuar...');
}
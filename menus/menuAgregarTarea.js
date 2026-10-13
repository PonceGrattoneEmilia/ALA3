import { limpiarPantalla, leerEntrada, pausar } from '../utilidades/consola.js';

export function mostrarMenuAgregarTarea(servicioTareas) {
    limpiarPantalla();
    console.log('Estas creando una nueva tarea.\n');

    console.log('1. Ingresa el Título:');
    const titulo = leerEntrada('> ');

    console.log('2. Ingresa la descripción:');
    const descripcion = leerEntrada('> ');

    console.log('3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada):');
    const estado = leerEntrada('> ');

    console.log('4. Dificultad ([1] / [2] / [3]):');
    const dificultad = leerEntrada('> ');

    console.log('5. Vencimiento (DD/MM/AAAA) [Opcional]:');
    const vencimiento = leerEntrada('> ');

    const resultado = servicioTareas.crearTarea({
        titulo,
        descripcion,
        estado,
        dificultad,
        vencimiento
    });

    if (resultado.exito) {
        console.log('\n¡Datos guardados!');
    } else {
        console.log(`\nError al crear la tarea: ${resultado.mensaje}`);
    }

    pausar('Presiona cualquier tecla para continuar...');
}
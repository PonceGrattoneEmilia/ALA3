import readlineSync from 'readline-sync';

export function limpiarPantalla() {
    console.clear();
}

export function leerEntrada(indicador = '> ') {
    return readlineSync.question(indicador);
}

export function pausar(mensaje = 'Presiona cualquier tecla para continuar...') {
    console.log(`\n${mensaje}`);
    readlineSync.keyIn('', { hideEchoBack: true, mask: '' });
}
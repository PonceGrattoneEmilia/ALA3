import { RepositorioTareas } from './modelos/repositorioTareas.js';
import { ServicioTareas } from './servicios/servicioTareas.js';
import { mostrarMenuPrincipal } from './menus/menuPrincipal.js';

function main() {
    const repositorio = new RepositorioTareas();
    const servicio = new ServicioTareas(repositorio);

    mostrarMenuPrincipal(servicio);
}

main();

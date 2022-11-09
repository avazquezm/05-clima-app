import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";
import Busquedas from "./models/busquedas.js";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()



const main = async() =>{

    const busquedas = new Busquedas();
    let opt = 0;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje y leer input
                const texto = await leerInput('Ciudad:');

                // Buscar los lugares 
                const lugares = await busquedas.ciudad(texto);
                // console.log(lugares);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);

                // Clima
                // Mostrar resultados
                console.log('\nInformación de la ciudad:'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:');
                console.log('Mínima:');
                console.log('Máxima:');

                break;
            case 2:
                console.log('Has seleccionado la opción 2');
                break;
            case 0:
    
                break;
            default:
                break;
        }

        await pausa();
    } while (opt !== 0);

    return;
    

}

main();
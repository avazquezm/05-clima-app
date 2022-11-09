import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
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
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad:');

                await busquedas.ciudad(lugar);

                // Buscar los lugares 
                // Seleccionar el lugar
                // Clima
                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', );
                console.log('Lat:',);
                console.log('Lng:');
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
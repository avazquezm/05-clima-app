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

                if (id !== 0 )
                    {  
                        const lugarSel = lugares.find(l => l.id === id);
                        busquedas.agregarHistorial(lugarSel.nombre);

                        // Clima
                        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lon);

                        // Mostrar resultados
                        console.clear();
                        console.log('\nInformación del clima:\n');
                        console.log('Ciudad:'.bold, lugarSel.nombre.green);
                        console.log('Clima:'.bold, clima.desc.cyan);
                        console.log('Temperatura:'.bold, clima.temp, 'ºC'.yellow);
                        console.log('Máxima:'.bold, clima.tempMax, 'ºC'.yellow);
                        console.log('Mínima:'.bold, clima.tempMin, 'ºC'.yellow);
                        console.log('Humedad:'.bold, clima.humedad, '%'.yellow);
                        console.log('Latitud:'.bold, lugarSel.lat);
                        console.log('Longitud:'.bold, lugarSel.lon);
                    }

                break;
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${ i + 1 }.`.green
                    console.log(`${idx} ${lugar}`);
                });
         
                break;
            default:
                break;
        }

        await pausa();
    } while (opt !== 0);

    return;
    

}

main();
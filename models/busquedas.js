import fs from "fs";
import axios from "axios";

export default class Busquedas{

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        this.leerDB();
    }


    get paramsMapbox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'types': 'country,place',
            'language': 'es',
            'limit': 5
        }
    }

    get paramsOpenweather(){
        return {
            'appid':process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    async ciudad(lugar = ''){

        // Petición http
        // console.log(lugar);

        try {

            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            
            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lon: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {

            console.log(error);
            return [];
        }

    }

    async climaLugar( lat, lon ){

        try {

            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenweather, lat, lon}
            });

            const resp = await instance.get();

            const {main, weather} = resp.data;

            return {
                temp: main.temp,
                tempMin: main.temp_min,
                tempMax: main.temp_max,
                humedad: main.humidity,
                desc: weather[0].description
            };

            
        } catch (error) {
            console.log(error);
            return [];
        }

    }

    agregarHistorial(lugar = ''){

        if(this.historial.includes(lugar)) return;

        // Guardar solo 5 registros
        this.historial = this.historial.splice(0,4);
    
        this.historial.unshift(lugar);

        this.guardarDB();
        
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB(){

        if(fs.existsSync(this.dbPath)){

            const info = fs.readFileSync( this.dbPath, {'encoding':'utf-8'} );
            const data = JSON.parse(info);

            this.historial = data.historial; 

        }

        return;

    }


}
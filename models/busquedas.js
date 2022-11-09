import axios from "axios";

export default class Busquedas{

    historial = ['Madrid', 'Barcelona', 'París'];

    constructor() {
        //TODO: Leer DB si existen datos
    }


    get paramsMapbox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'types': 'country,place',
            'language': 'es',
            'limit': 5
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

            console.log(resp.data);

            return []; //Array con todas las ciudades
        } catch (error) {
            console.log(error);
            return [];
            
        }

    }


}
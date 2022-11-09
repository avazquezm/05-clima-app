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

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {

            console.log(error);
            return [];
            
        }

    }


}
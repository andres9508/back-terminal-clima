const axios = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];

  constructor() {
    //todo: leer DB si existe
  }

  getparamsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 6,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    // peticion http
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.getparamsMapbox(),
      });

      console.log("cuidad in", lugar);
      const res = await instance.get()||[];	
      const data = res.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
      return data || [];
    } catch (error) {
      return []; // retornar los lugares
    }
  }
}

module.exports = Busquedas;

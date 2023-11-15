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

  async climasLugar(lat, lon) {
    // peticion http
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_KEY,
          units: "metric",
          lang: "es",
        },
      });
      const res = await instance.get();
      console.log(res.data);
      const { weather, main } = res.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;

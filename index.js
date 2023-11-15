require("dotenv").config();

const { leerInput, inquirerMenu, pausa,listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.log(process.env.MAPBOX_KEY);

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // mostrar mensaje
        const termino = await leerInput("Ciudad: ");
      //buscar lugares
        const lugares = await busquedas.ciudad(termino); 
        // seleccionar el lugar
        const idSelsecionado=await listarLugares(lugares);
        const lugarSelecionado=lugares.find(l=>l.id===idSelsecionado);
        // clima
        const clima=await busquedas.climasLugar(lugarSelecionado.lat,lugarSelecionado.lng);
        // mostrar resultados

        console.log("\nInformación de la ciudad\n".green);
        console.log(`Ciudad: ${lugarSelecionado.nombre.green}`);
        console.log(`Lat: ${lugarSelecionado.lat}`);
        console.log(`Lng: ${lugarSelecionado.lng}`);
        console.log("Temperatura : ", clima.temp);
        console.log("Mínima : ", clima.min);
        console.log("Máxima : ", clima.max);
        console.log("Como está el clima : ", clima.desc.green);
        break;

      case 2:
        console.log("Historial");
        break;

      default:
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();

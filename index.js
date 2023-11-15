const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");

const main = async () => {
  let opt;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        console.log("Buscar");
        break;

      case 2:
        console.log("Historial");
        break;

      default:
        break;
    }
   if(opt!==0) await pausa()
  } while (opt !== 0);
};

main();

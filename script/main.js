import RevezadorDePartes from "./RevezadorDePartes.js";
import CarregadorDeLinhas from "./CarregadorDeLinhas.js";
import ModalMateriaisController from "./ModalMateriaisController.js";
import ManipuladorDeDadosLS from "./ManipuladorDeDadosLS.js";
import ModalConfigController from "./ModalConfigController.js";
import ToastController from "./ToastController.js";
import ConfigController from "./ConfigController.js";
import DBController from "./DBController.js";


const dbController = new DBController();

const configPadrao = {
    "layout": {
        "forcarLinhasNaMesmaPagina": false
    },
    "exibicao": {
        "ordenarPorQuantidade": true,
        "mostrarObs": false
    },
    "linhasExibidas": {
        "linha1": true,
        "linha2": true,
        "linha3": true,
        "linha4": true,
        "linha5": true,
        "linha6": true,
        "linha7": true,
        "linha8": true,
        "linha9": true,
        "linha10": true,
        "hibrida": true,
        "servidor": true
    },
    "tema": {
        "modoNoturno": false
    },
    "intervaloTrocaDePagina": 5
}



const manipuladorDeDadosLS = new ManipuladorDeDadosLS(configPadrao);
const toastController = new ToastController();
const revezadorDePartes = new RevezadorDePartes();

const materiais = await dbController.getMateriais();
const modalMateriaisController = new ModalMateriaisController(materiais, manipuladorDeDadosLS, revezadorDePartes, toastController);
const carregadorDeLinhas = new CarregadorDeLinhas(dbController, modalMateriaisController, manipuladorDeDadosLS);


const configController = new ConfigController(manipuladorDeDadosLS, revezadorDePartes, carregadorDeLinhas, modalMateriaisController);
configController.carregarModificacoes();

const modalConfigController = new ModalConfigController(manipuladorDeDadosLS, toastController, configPadrao, revezadorDePartes, configController);
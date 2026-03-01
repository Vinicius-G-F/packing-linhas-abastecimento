import RevezadorDePartes from "./RevezadorDePartes.js";
import dados from "../dados.json" with { type: 'json' };
import CarregadorDeLinhas from "./CarregadorDeLinhas.js";
import ModalController from "./ModalController.js";
import ManipuladorDeDadosLS from "./ManipuladorDeDadosLS.js";



const revezadorDePartes = new RevezadorDePartes();
revezadorDePartes.revezar();

const carregadorDeLinhas = new CarregadorDeLinhas(dados.linhas);
const manipuladorDeDadosLS = new ManipuladorDeDadosLS()
const modalController = new ModalController(dados.materiais,manipuladorDeDadosLS, revezadorDePartes);
carregadorDeLinhas.carregarLinhas(modalController);
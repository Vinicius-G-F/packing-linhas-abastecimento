export default class ConfigController {
    constructor(manipuladorDeDadosLS, revezadorDePartes, carregadorDeLinhas, modalMateriaisController) {
        this.manipuladorDeDadosLS = manipuladorDeDadosLS;
        this.revezadorDePartes = revezadorDePartes;
        this.carregadorDeLinhas = carregadorDeLinhas;
        this.modalConfigController = modalMateriaisController;
    }
    carregarModificacoes() {
        const config = this.manipuladorDeDadosLS.obterConfig();
        const dadosObs = this.manipuladorDeDadosLS.obterTodasObs();
        const botoesNavPartes = document.getElementById("botoes-de-nav");
        if(!config.layout.forcarLinhasNaMesmaPagina){
            this.revezadorDePartes.setIntervalo(config.intervaloTrocaDePagina);
            botoesNavPartes.style.display = 'block';
            this.revezadorDePartes.ativar();
        } else {
            botoesNavPartes.style.display = 'none';
            this.revezadorDePartes.desativar();
        }
        this.carregadorDeLinhas.carregarLinhas(config, dadosObs);

        this.carregarTema(config);
    }
    carregarTema(config){
        if(config.tema.modoNoturno){
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
}
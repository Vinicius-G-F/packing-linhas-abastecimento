export default class ConfigController {
    constructor(manipuladorDeDadosLS, revezadorDePartes, carregadorDeLinhas, modalMateriaisController) {
        this.manipuladorDeDadosLS = manipuladorDeDadosLS;
        this.revezadorDePartes = revezadorDePartes;
        this.carregadorDeLinhas = carregadorDeLinhas;
        this.modalConfigController = modalMateriaisController;
    }
    async carregarModificacoes() {
        const config = this.manipuladorDeDadosLS.obterConfig();
        this.carregarTema(config);
        const botoesNavPartes = document.getElementById("botoes-de-nav");
        if(!config.layout.forcarLinhasNaMesmaPagina){
            this.revezadorDePartes.setIntervalo(config.intervaloTrocaDePagina);
            botoesNavPartes.style.display = 'block';
            this.revezadorDePartes.ativar();
        } else {
            botoesNavPartes.style.display = 'none';
            this.revezadorDePartes.desativar();
        }
        await this.carregadorDeLinhas.carregarLinhas();
    }
    carregarTema(config){
        if(config.tema.modoNoturno){
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
}
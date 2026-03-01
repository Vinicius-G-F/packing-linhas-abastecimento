export default class ManipuladorDeDadosLS {
    constructor() {
        this.dadosSalvos = JSON.parse(localStorage.getItem("obs")) || [];
    }

    salvarObs(fml, preKitting, obs) {

        const obsDaMaquina = {
            fml,
            "pre-kitting": preKitting,
            obs
        };

        const indexDaOBS = this.dadosSalvos.findIndex(item =>
            item.fml === fml && item["pre-kitting"] === preKitting
        );

        if (indexDaOBS === -1) {
            this.dadosSalvos.push(obsDaMaquina);
        } else {
            this.dadosSalvos[indexDaOBS] = obsDaMaquina;
        }

        localStorage.setItem("obs", JSON.stringify(this.dadosSalvos));
    }

    obterObs(fml, preKitting) {
        const obs = this.dadosSalvos.find(item => item.fml === fml && item["pre-kitting"] === preKitting);
        if(obs){
            return obs.obs;
        }
        return "";
    }
}
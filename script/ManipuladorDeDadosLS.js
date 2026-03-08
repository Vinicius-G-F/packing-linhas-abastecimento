export default class ManipuladorDeDadosLS {
    constructor(configPadrao) {
        this.configPadrao = configPadrao;
    }

    salvarObs(fml, preKitting, obs) {
        const dadosObs = JSON.parse(localStorage.getItem("obs")) || [];
        const obsDaMaquina = {
            fml,
            "pre-kitting": preKitting,
            obs
        };

        const indexDaOBS = dadosObs.findIndex(item =>
            item.fml === fml && item["pre-kitting"] === preKitting
        );

        if (indexDaOBS === -1) {
            dadosObs.push(obsDaMaquina);
        } else {
            dadosObs[indexDaOBS] = obsDaMaquina;
        }

        localStorage.setItem("obs", JSON.stringify(dadosObs));
    }

    obterObs(fml, preKitting) {
        const dadosObs = JSON.parse(localStorage.getItem("obs")) || [];
        const obs = dadosObs.find(item => item.fml === fml && item["pre-kitting"] === preKitting);
        if(obs){
            return obs.obs;
        }
        
        return "";
    }

    obterTodasObs(){
        return JSON.parse(localStorage.getItem("obs")) || [];
    }

    salvarConfig(dados){
        const tamanhoDaTela = window.innerWidth;
        localStorage.setItem(`config[${tamanhoDaTela}]`, JSON.stringify(dados));
    }

    obterConfig(){
        const tamanhoDaTela = window.innerWidth;
        return JSON.parse(localStorage.getItem(`config[${tamanhoDaTela}]`)) || this.configPadrao;
    }
}
export default class LinhaCards {

    constructor(linha, maquinas, config, dadosObs) {
        this.maquinasHTML = '';
        let maquinasOrdenadasOuNao = maquinas;
        const temQueOrdenar = config.exibicao.ordenarPorQuantidade;
        if (temQueOrdenar) {
            maquinasOrdenadasOuNao = maquinas.sort((a, b) => {
                return b.qtd - a.qtd;
            })
        }
        maquinasOrdenadasOuNao.forEach((maquina) => {
            let qtdBalanco = '';
            if (maquina.qtd > 20) {
                qtdBalanco = 'alto';
            } else if (maquina.qtd <= 10) {
                qtdBalanco = 'baixo'
            } else {
                qtdBalanco = 'medio'
            }
            let obsLinha = '';
            if (config.exibicao.mostrarObs) {
                obsLinha = this.criarLinhaObs(dadosObs, maquina);
            }
            this.maquinasHTML += `<div class="maquina">
            <p><strong>FML:</strong> ${maquina.fml}</p>
            <p><strong>KIT:</strong> ${maquina['pre-kitting']}</p>
            <p class="qtd ${qtdBalanco}"><strong>QTD:</strong> ${maquina.qtd}</p>
            ${obsLinha}
            <button class="mostrar-materiais" data-fml="${maquina.fml}" data-prekitting="${maquina['pre-kitting']}">Materiais</button>
        </div>`;
        })
        this.linhaHTML = `
        <article class="linha">
            <header class="linha-header">
                <h2>${linha}</h2>
                <p class="horario-intervalo">(Horário do intervalo 20:00h)<p>
            </header>

            <div class="maquinas">
                ${this.maquinasHTML}
            </div>
        </article>`;
    }

    getLinhaHTML() {
        return this.linhaHTML;
    }

    criarLinhaObs(dadosObs, maquina){
        const obs = dadosObs.find(item => item.fml === maquina.fml && item["pre-kitting"] === maquina['pre-kitting']);
        if(obs == undefined){
            return `<p><strong>Obs:</strong></p>`;
        }
        
        if(obs.obs.length > 30){
            const obsReduzida = obs.obs.slice(0, 28);
            return `<p><strong>Obs:</strong> ${obsReduzida + "..."} <button type="button" class="btn-ver-mais" data-full="${obs.obs}">ver mais</button></p>`;
        }
        return `<p><strong>Obs:</strong> ${obs.obs}</p>`;
    }
}
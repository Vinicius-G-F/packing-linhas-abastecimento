export default class LinhaCards{

    constructor(linha, maquinas){
        this.maquinasHTML = '';
        const maquinasOrdenadas = maquinas.sort((a,b)=>{
            return b.qtd - a.qtd;
        })
        maquinasOrdenadas.forEach(maquina=>{
            let qtdBalanco = '';
            if(maquina.qtd > 20){
                qtdBalanco = 'alto'; 
            } else if(maquina.qtd <= 10) {
                qtdBalanco = 'baixo'
            } else {
                qtdBalanco = 'medio'
            }
            this.maquinasHTML += `<div class="maquina">
            <p><strong>FML:</strong> ${maquina.fml}</p>
            <p><strong>Pré-kitting:</strong> ${maquina['pre-kitting']}</p>
            <p class="qtd ${qtdBalanco}"><strong>QTD:</strong> ${maquina.qtd}</p>
            <button class="mostrar-materiais" data-fml="${maquina.fml}" data-prekitting="${maquina['pre-kitting']}">Mostrar materiais</button>
        </div>`;
        })
        this.linhaHTML = `
        <article class="linha">
            <header class="linha-header">
                <h2>${linha}</h2>
            </header>

            <div class="maquinas">
                ${this.maquinasHTML}
            </div>
        </article>`;
    }

    getLinhaHTML(){
        return this.linhaHTML;
    }
}
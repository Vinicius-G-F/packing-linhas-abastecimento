import LinhaCards from "./templatesHTML/LinhaCards.js";

export default class CarregadorDeLinhas{
    constructor(dadosDasLinhas){
        this.linhasParteUm = document.getElementById("parte-um");
        this.linhasParteDois = document.getElementById("parte-dois");

        this.linhasInicioHTML = [
            new LinhaCards("Linha 1", dadosDasLinhas.linha1).getLinhaHTML(),
            new LinhaCards("Linha 2", dadosDasLinhas.linha2).getLinhaHTML(),
            new LinhaCards("Linha 3", dadosDasLinhas.linha3).getLinhaHTML(),
            new LinhaCards("Linha 4", dadosDasLinhas.linha4).getLinhaHTML(),
            new LinhaCards("Linha 5", dadosDasLinhas.linha5).getLinhaHTML(),
            new LinhaCards("Linha 6", dadosDasLinhas.linha6).getLinhaHTML()
        ]

        this.linhasFinalHTML = [
            new LinhaCards("Linha 7", dadosDasLinhas.linha7).getLinhaHTML(),
            new LinhaCards("Linha 8", dadosDasLinhas.linha8).getLinhaHTML(),
            new LinhaCards("Linha 9", dadosDasLinhas.linha9).getLinhaHTML(),
            new LinhaCards("Linha 10", dadosDasLinhas.linha10).getLinhaHTML(),
            new LinhaCards("Célular Híbrida", dadosDasLinhas.celulaHibrida).getLinhaHTML(),
            new LinhaCards("Servidor", dadosDasLinhas.servidor).getLinhaHTML()
        ]
    }

    carregarLinhas(modalController){
        this.linhasInicioHTML.forEach(linha=>{
            this.linhasParteUm.innerHTML += linha
        })
        this.linhasFinalHTML.forEach(linha=>{
            this.linhasParteDois.innerHTML += linha
        })

        this.linhasParteUm.addEventListener('click',(e)=>{
            e.preventDefault();
            const botao = e.target.closest(".mostrar-materiais");
            if(botao){
                const fml = botao.dataset.fml;
                const preKitting = botao.dataset.prekitting;
                modalController.MostrarModal(fml, preKitting);
            }
        })

        this.linhasParteDois.addEventListener('click',(e)=>{
            e.preventDefault();
            const botao = e.target.closest(".mostrar-materiais");
            if(botao){
                const fml = botao.dataset.fml;
                const preKitting = botao.dataset.prekitting;
                modalController.MostrarModal(fml, preKitting);
            }
        })
    }
}
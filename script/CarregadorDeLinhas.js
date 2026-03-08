import LinhaCards from "./templatesHTML/LinhaCards.js";

export default class CarregadorDeLinhas {
    constructor(dbController, modalController, manipuladorDeDadosLS) {
        this.linhasParteUm = document.getElementById("parte-um");
        this.linhasParteDois = document.getElementById("parte-dois");
        this.todasLinhas = document.getElementById("todas-linhas")
        this.linhasCompleta = [];
        this.dbController = dbController;
        this.intervaloId = null;
        this.manipuladorDeDadosLS = manipuladorDeDadosLS;

        this.linhasParteUm.addEventListener('click', (e) => {
            e.preventDefault();
            const botaoMostrarMateriais = e.target.closest(".mostrar-materiais");
            if (botaoMostrarMateriais) {
                const fml = botaoMostrarMateriais.dataset.fml;
                const preKitting = botaoMostrarMateriais.dataset.prekitting;
                modalController.MostrarModal(fml, preKitting);
            }
            const botaoVerMais = e.target.closest(".btn-ver-mais");
            if (botaoVerMais) {
                const textoCompleto = e.target.getAttribute('data-full');
                botaoVerMais.parentElement.innerHTML = `<strong>Obs:</strong> ${textoCompleto}`;
            }
        })

        this.linhasParteDois.addEventListener('click', (e) => {
            e.preventDefault();
            const botaoMostrarMateriais = e.target.closest(".mostrar-materiais");
            if (botaoMostrarMateriais) {
                const fml = botaoMostrarMateriais.dataset.fml;
                const preKitting = botaoMostrarMateriais.dataset.prekitting;
                modalController.MostrarModal(fml, preKitting);
            }
            const botaoVerMais = e.target.closest(".btn-ver-mais");
            if (botaoVerMais) {
                const textoCompleto = e.target.getAttribute('data-full');
                botaoVerMais.parentElement.innerHTML = `<strong>Obs:</strong> ${textoCompleto}`;
            }
        })

        this.todasLinhas.addEventListener('click', (e) => {
            e.preventDefault();
            const botaoMostrarMateriais = e.target.closest(".mostrar-materiais");
            if (botaoMostrarMateriais) {
                const fml = botaoMostrarMateriais.dataset.fml;
                const preKitting = botaoMostrarMateriais.dataset.prekitting;
                modalController.MostrarModal(fml, preKitting);
            }
            const botaoVerMais = e.target.closest(".btn-ver-mais");
            if (botaoVerMais) {
                const textoCompleto = e.target.getAttribute('data-full');
                botaoVerMais.parentElement.innerHTML = `<strong>Obs:</strong> ${textoCompleto}`;
            }
        })

    }

    async carregarLinhas() {
        this.pararIntervalo(this.intervaloId);
        const config = this.manipuladorDeDadosLS.obterConfig();
        const dadosObs = this.manipuladorDeDadosLS.obterTodasObs();
        this.linhasCompleta = [];
        const dadosDasLinhas = await this.dbController.getLinhas();
        for (const linha in config.linhasExibidas) {
            if (config.linhasExibidas[linha]) {
                if (linha === 'linha1') {
                    this.linhasCompleta.push(new LinhaCards("Linha 1", dadosDasLinhas.linha1, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha2') {
                    this.linhasCompleta.push(new LinhaCards("Linha 2", dadosDasLinhas.linha2, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha3') {
                    this.linhasCompleta.push(new LinhaCards("Linha 3", dadosDasLinhas.linha3, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha4') {
                    this.linhasCompleta.push(new LinhaCards("Linha 4", dadosDasLinhas.linha4, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha5') {
                    this.linhasCompleta.push(new LinhaCards("Linha 5", dadosDasLinhas.linha5, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha6') {
                    this.linhasCompleta.push(new LinhaCards("Linha 6", dadosDasLinhas.linha6, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha7') {
                    this.linhasCompleta.push(new LinhaCards("Linha 7", dadosDasLinhas.linha7, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha8') {
                    this.linhasCompleta.push(new LinhaCards("Linha 8", dadosDasLinhas.linha8, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha9') {
                    this.linhasCompleta.push(new LinhaCards("Linha 9", dadosDasLinhas.linha9, config, dadosObs).getLinhaHTML())
                } else if (linha === 'linha10') {
                    this.linhasCompleta.push(new LinhaCards("Linha 10", dadosDasLinhas.linha10, config, dadosObs).getLinhaHTML())
                } else if (linha === 'hibrida') {
                    this.linhasCompleta.push(new LinhaCards("Célula Híbrida", dadosDasLinhas.celulaHibrida, config, dadosObs).getLinhaHTML())
                } else if (linha === 'servidor') {
                    this.linhasCompleta.push(new LinhaCards("Servidor", dadosDasLinhas.servidor, config, dadosObs).getLinhaHTML())
                }
            }
        }
        this.todasLinhas.innerHTML = '';
        this.linhasParteUm.innerHTML = '';
        this.linhasParteDois.innerHTML = '';
        this.injetarLinhasNoDOM(config);
        await this.loopDeCarregamento()
    }

    injetarLinhasNoDOM(config) {
        this.linhasCompleta.forEach((linha, i) => {
            if (config.layout.forcarLinhasNaMesmaPagina) {
                this.todasLinhas.innerHTML += linha;
                return
            }
            if (this.linhasCompleta.length / 2 >= i + 1) {
                this.linhasParteUm.innerHTML += linha
            } else {
                this.linhasParteDois.innerHTML += linha
            }
        })
        if (this.linhasCompleta.length <= 10) {
            this.linhasParteUm.classList.add("linhas-fracionadas");
            this.linhasParteDois.classList.add("linhas-fracionadas");
        } else if (this.linhasCompleta.length == 11) {
            this.linhasParteUm.classList.add("linhas-fracionadas");
            this.linhasParteDois.classList.remove("linhas-fracionadas");
        } else {
            this.linhasParteUm.classList.remove("linhas-fracionadas");
            this.linhasParteDois.classList.remove("linhas-fracionadas");
        }

        if (this.linhasCompleta.length <= 5) {
            this.todasLinhas.classList.add("linhas-fracionadas-cinco");
            this.todasLinhas.classList.remove("linhas-fracionadas-sete");
            this.todasLinhas.classList.remove("linhas-fracionadas-nove");

        }  else if(this.linhasCompleta.length <= 7){
            this.todasLinhas.classList.add("linhas-fracionadas-sete");
            this.todasLinhas.classList.remove("linhas-fracionadas-cinco");
            this.todasLinhas.classList.remove("linhas-fracionadas-nove");

        } else if(this.linhasCompleta.length <= 9){
            this.todasLinhas.classList.add("linhas-fracionadas-nove");
            this.todasLinhas.classList.remove("linhas-fracionadas-cinco");
            this.todasLinhas.classList.remove("linhas-fracionadas-sete");

        } 
        else{
            this.todasLinhas.classList.remove("linhas-fracionadas-sete");
            this.todasLinhas.classList.remove("linhas-fracionadas-cinco");
            this.todasLinhas.classList.remove("linhas-fracionadas-nove");
        }
    }
    async loopDeCarregamento(){
        const config = this.manipuladorDeDadosLS.obterConfig();
        const dadosObs = this.manipuladorDeDadosLS.obterTodasObs();
        this.intervaloId = setInterval(()=>{
            this.carregarLinhas(config, dadosObs);
        }, 25000);
    }

    estaAtivoLoop(){
        return this.intervaloId ? true : false;
    }
    pararIntervalo(){
        clearInterval(this.intervaloId);
    }
}
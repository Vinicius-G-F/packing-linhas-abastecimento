export default class ModalConfigController {
    constructor(manipuladorDeDadosLS, toast, configRecomendada, revezadorDePartes, configController) {
        this.modalConfig = document.getElementById("modal-config");
        this.btnEngrenagem = document.getElementById("btn-config");
        this.overlay = document.getElementById("overlay");
        this.btnFechar = document.getElementById("btn-fechar-config");
        this.entradaRange = document.getElementById("intervalo-paginas");
        this.valorRange = document.getElementById("valor-range");
        this.linhaExibidas = document.getElementById("linhas-exibidas");
        this.forcarMesmaPagina = document.getElementById("forcar-mesma-pagina");
        this.manipuladorDeDadosLS = manipuladorDeDadosLS;
        this.toast = toast;
        this.trocaAutomaticaLegend = document.getElementById("troca-automatica-legenda");
        this.configController = configController;
        const btnSalvar = document.getElementById("btn-salvar-config");
        const btnUsarRecomendadas = document.getElementById("btn-recomendado");


        this.btnEngrenagem.addEventListener("click", (e) => {
            e.preventDefault();
            this.mostrarModal();
            revezadorDePartes.parar();
        });

        this.btnFechar.addEventListener("click", (e) => {
            e.preventDefault();
            this.fechaModal();
            revezadorDePartes.revezar();
        })
        this.entradaRange.addEventListener("change", (e) => {
            this.valorRange.innerHTML = e.target.value;
        })
        this.linhaExibidas.addEventListener("click", (e) => {
            const checkBox = e.target.closest(".linha-checkbox");
            if (checkBox) {
                if (checkBox.value === "exibir-todas") {
                    if (!checkBox.checked) {
                        checkBox.checked = true;
                        return;
                    }
                    const todasCheckBox = document.querySelectorAll(".linha-checkbox");
                    todasCheckBox.forEach((checkBox) => checkBox.checked = true)
                } else {
                    const exibirTodas = document.getElementById("exibir-todas");
                    if (!checkBox.checked) {
                        exibirTodas.checked = false;
                    } else {
                        const todasCheckBox = document.querySelectorAll(".linha-checkbox");
                        let temItemDesmarcado = false;
                        todasCheckBox.forEach((checkBox) => {
                            if (checkBox.value !== "exibir-todas" && checkBox.checked === false) {
                                temItemDesmarcado = true;
                            }
                        })
                        if (!temItemDesmarcado) {
                            exibirTodas.checked = true;

                        }
                    }
                }

            }
        })

        this.forcarMesmaPagina.addEventListener("change", (e) => {
            if (this.forcarMesmaPagina.checked) {
                this.entradaRange.disabled = true;
                this.trocaAutomaticaLegend.classList.add("desabilitado");
                this.valorRange.classList.add("desabilitado");
            } else {
                this.entradaRange.disabled = false;
                this.trocaAutomaticaLegend.classList.remove("desabilitado");
                this.valorRange.classList.remove("desabilitado");
            }
        })
        btnSalvar.addEventListener("click", (e) => {
            e.preventDefault();
            this.salvarDados();
        })

        btnUsarRecomendadas.addEventListener("click", (e) => {
            e.preventDefault();
            this.marcarCheckboxes(configRecomendada);
            toast.mostrarToastInformacao("A configuração precisa ser salva para surtir efeito.", 2500);
        })
    }

    mostrarModal() {
        this.modalConfig.show();
        this.overlay.style.display = "block";
        this.marcarCheckboxes(this.manipuladorDeDadosLS.obterConfig());
    }

    fechaModal() {
        this.modalConfig.close();
        this.overlay.style.display = "none";
    }

    salvarDados() {
        const dados = {
            "layout": {
                "forcarLinhasNaMesmaPagina": this.forcarMesmaPagina.checked
            },
            "exibicao": {
                "ordenarPorQuantidade": document.getElementById("ordenar-maquinas").checked,
                "mostrarObs": document.getElementById("mostrar-obs").checked
            },
            "linhasExibidas": {
                "linha1": document.getElementById("linha1").checked,
                "linha2": document.getElementById("linha2").checked,
                "linha3": document.getElementById("linha3").checked,
                "linha4": document.getElementById("linha4").checked,
                "linha5": document.getElementById("linha5").checked,
                "linha6": document.getElementById("linha6").checked,
                "linha7": document.getElementById("linha7").checked,
                "linha8": document.getElementById("linha8").checked,
                "linha9": document.getElementById("linha9").checked,
                "linha10": document.getElementById("linha10").checked,
                "hibrida": document.getElementById("hibrida").checked,
                "servidor": document.getElementById("servidor").checked
            },
            "tema": {
                "modoNoturno": document.getElementById("tema-escuro").checked
            },
            "intervaloTrocaDePagina": this.entradaRange.value
        }

        let contadorLinhas = 0;

        for (const linha in dados.linhasExibidas) {
            if (dados.linhasExibidas[linha]) {
                contadorLinhas++;
            }
        }

        if (contadorLinhas == 0) {
            this.toast.mostrarToastErro("As configurações não foram salvas, favor ativar pelo menos uma linha", 2500);
            return
        }

        this.manipuladorDeDadosLS.salvarConfig(dados);
        if (contadorLinhas == 1 && !dados.layout.forcarLinhasNaMesmaPagina) {
            this.toast.mostrarToastSucesso("Configuração salva, porém o Layout de 'linhas na mesma página' foi ativado por causa de ter apenas uma linha ativa", 4000);
            dados.layout.forcarLinhasNaMesmaPagina = true;
            this.forcarMesmaPagina.checked = true;
        } else {
            this.toast.mostrarToastSucesso("Configuração salva com sucesso!!", 2500);
        }

        this.configController.carregarModificacoes();
    }

    marcarCheckboxes(config) {
        //layout
        const forcarMesmaPagina = document.getElementById("forcar-mesma-pagina");
        forcarMesmaPagina.checked = config.layout.forcarLinhasNaMesmaPagina;
        //range
        document.getElementById("intervalo-paginas").value = config.intervaloTrocaDePagina;
        document.getElementById("valor-range").innerHTML = config.intervaloTrocaDePagina;
        if (!forcarMesmaPagina.checked) {
            this.entradaRange.disabled = false;
            this.trocaAutomaticaLegend.classList.remove("desabilitado");
            this.valorRange.classList.remove("desabilitado");
        } else {
            this.entradaRange.disabled = true;
            this.trocaAutomaticaLegend.classList.add("desabilitado");
            this.valorRange.classList.add("desabilitado");
        }
        //Exibição
        document.getElementById("ordenar-maquinas").checked = config.exibicao.ordenarPorQuantidade;
        document.getElementById("mostrar-obs").checked = config.exibicao.mostrarObs;
        //tema
        document.getElementById("tema-escuro").checked = config.tema.modoNoturno;
        document.getElementById("tema-claro").checked = !config.tema.modoNoturno;


        //linhas
        document.getElementById("linha1").checked = config.linhasExibidas.linha1;
        document.getElementById("linha2").checked = config.linhasExibidas.linha2;
        document.getElementById("linha3").checked = config.linhasExibidas.linha3;
        document.getElementById("linha4").checked = config.linhasExibidas.linha4;
        document.getElementById("linha5").checked = config.linhasExibidas.linha5;
        document.getElementById("linha6").checked = config.linhasExibidas.linha6;
        document.getElementById("linha7").checked = config.linhasExibidas.linha7;
        document.getElementById("linha8").checked = config.linhasExibidas.linha8;
        document.getElementById("linha9").checked = config.linhasExibidas.linha9;
        document.getElementById("linha10").checked = config.linhasExibidas.linha10;
        document.getElementById("hibrida").checked = config.linhasExibidas.hibrida;
        document.getElementById("servidor").checked = config.linhasExibidas.servidor;
        let temLinhaDesmarcada = false;
        for (const linha in config.linhasExibidas) {
            if (!config.linhasExibidas[linha]) {
                temLinhaDesmarcada = true;
                break;
            }
        }
        if (!temLinhaDesmarcada) {
            document.getElementById("exibir-todas").checked = true;
        }
    }
}
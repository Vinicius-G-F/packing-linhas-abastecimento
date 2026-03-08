export default class RevezadorDePartes {
    constructor() {
        this.parteUm = document.getElementById("parte-um");
        this.parteDois = document.getElementById("parte-dois");
        this.btnLinhasDoComeco = document.getElementById("btn-linhas-do-comeco");
        this.btnLinhasDoFinal = document.getElementById("btn-linhas-do-final");
        this.idDoIntervalo = null;
        this.idDoTimeOut = null;
        this.intervalo = 5000;
        this.estaAtivo = true;
        this.estaRevezando = false;
        this.mostrarPrimeiraParte();

        this.btnLinhasDoComeco.addEventListener("click", (e) => {
            e.preventDefault();
            this.parar()

            this.mostrarPrimeiraParte();

            this.idDoTimeOut = setTimeout(()=>{
                this.revezar();
            }, this.intervalo + 5000)
        })
        this.btnLinhasDoFinal.addEventListener("click", (e) => {
            e.preventDefault();
            this.parar()

            this.mostrarSegundaParte();

            this.idDoTimeOut = setTimeout(()=>{
                this.revezar();
            }, this.intervalo + 5000)
        })
    }

    revezar() {
        if(!this.estaAtivo || this.estaRevezando){
            return;
        }
        this.estaRevezando = true;
        this.idDoIntervalo = setInterval(() => {
            if (this.estaNaPrimeiraParte) {
                this.mostrarSegundaParte();
            } else {
                this.mostrarPrimeiraParte();
            }
        }, this.intervalo)
    }


    mostrarPrimeiraParte() {
        this.parteUm.classList.remove("linhas-ocultadas");
        this.parteUm.classList.add("linhas");
        this.parteDois.classList.add("linhas-ocultadas");
        this.parteDois.classList.remove("linhas");

        this.btnLinhasDoComeco.classList.add("selecionado");
        this.btnLinhasDoFinal.classList.remove("selecionado");


        this.estaNaPrimeiraParte = true;
    }
    mostrarSegundaParte() {
        this.parteDois.classList.remove("linhas-ocultadas");
        this.parteDois.classList.add("linhas");
        this.parteUm.classList.remove("linhas");
        this.parteUm.classList.add("linhas-ocultadas");

        this.btnLinhasDoFinal.classList.add("selecionado");
        this.btnLinhasDoComeco.classList.remove("selecionado");

        this.estaNaPrimeiraParte = false;
    }
    parar(){
        this.estaRevezando = false;
        if (this.idDoIntervalo) {
            clearInterval(this.idDoIntervalo);
        }
        if(this.idDoTimeOut){
            clearTimeout(this.idDoTimeOut)
        }
    }
    setIntervalo(tempoEmSegundo){
        this.intervalo = tempoEmSegundo * 1000;
    }
    desativar(){
        this.estaAtivo = false;
    }
    ativar(){
        this.revezar();
        this.estaAtivo = true;
    }
}
export default class ToastController {
    constructor() {
        this.toast = document.getElementById("toast");
    }
    mostrarToastSucesso(mensagem, tempo) {
        this.toast.classList.add("sucesso");
        this.toast.innerHTML = mensagem;
        setTimeout(() => {
            this.contadorToast--;
            toast.classList.remove("sucesso");
        }, tempo);
    }
    mostrarToastErro(mensagem, tempo) {
        this.toast.classList.add("erro");
        this.toast.innerHTML = mensagem;
        setTimeout(() => {
            toast.classList.remove("erro");
            
        }, tempo);
    }
    mostrarToastAviso(mensagem, tempo) {
        this.toast.classList.add("aviso");
        this.toast.innerHTML = mensagem;

        setTimeout(() => {
            toast.classList.remove("aviso");

        }, tempo);
    }
    mostrarToastInformacao(mensagem, tempo) {
        this.toast.classList.add("informacao");
        this.toast.innerHTML = mensagem;

        setTimeout(() => {
            toast.classList.remove("informacao");
        }, tempo);
    }
}
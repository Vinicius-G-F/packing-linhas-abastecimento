export default class DBController {
    constructor() {
        this.ehPrimeiroCarregamento = true;
    }
    async getLinhas() {
        if(this.ehPrimeiroCarregamento){
            const spinner = document.getElementById("spinner");
            spinner.style.display = "flex";
        }
        this.ehPrimeiroCarregamento = false;

        try {

            const resposta = await fetch('../dados.json');
            const dados = await resposta.json();

            await this.delay(5000);

            return dados.linhas;

        } catch (erro) {
            console.error('Erro ao ler o JSON:', erro);
        } finally {
            spinner.style.display = "none";
        }
    }

    async getMateriais() {
        try {
            const resposta = await fetch('../dados.json');
            const dados = await resposta.json();
            return dados.materiais;
        } catch (erro) {
            console.error('Erro ao ler o JSON:', erro);
        }
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
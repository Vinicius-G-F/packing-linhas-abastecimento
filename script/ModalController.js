export default class ModalController {
    constructor(materiais, manipuladorDeDadosLS, revezadorDePartes) {
        this.materiais = materiais;
        this.manipuladorDeDadosLS = manipuladorDeDadosLS;
        this.corpoModal = document.getElementById("modal-body");
        this.modal = document.getElementById("materiais");
        this.overlay = document.getElementById("overlay");
        this.obs = null;
        this.fml = null;
        this.preKitting = null;
        this.revezadorDePartes = revezadorDePartes;
        const btnFecharModal = document.getElementById("btnFechar");
        const btnFecharModalFooter = document.getElementById("btnFecharFooter");
        const btnSalvar = document.getElementById("btn-salvar");
        const toast = document.getElementById("toast");

        btnFecharModal.addEventListener("click", (e) => {
            e.preventDefault();
            this.fecharModal();
        })

        btnFecharModalFooter.addEventListener("click", (e) => {
            e.preventDefault();
            this.fecharModal();
        })

        btnSalvar.addEventListener("click", (e) => {
            e.preventDefault();

            const obsDigitada = this.obs.value;
            if(obsDigitada == "" || this.fml == null || this.preKitting == null){
                alert("Os dados não foram salvos. =/");
                return
            }
            manipuladorDeDadosLS.salvarObs(this.fml, this.preKitting, obsDigitada);
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 2500);
        })
    }

    MostrarModal(fml, preKitting) {
        this.fml = fml;
        this.preKitting = preKitting;
        const materialDoCard = this.materiais.find((material) => {
            if (material.fml == fml && material["pre-kitting"] == preKitting) {
                return material;
            }
        })
        for (let material in materialDoCard) {
            this.corpoModal.innerHTML += `<div class="info-item">
                <span>${material}:</span>
                <strong>${materialDoCard[material]}</strong>
            </div>`;
        }
        this.corpoModal.innerHTML += `<div class="observacao">
                <label for="obs">Observação:</label>
                <textarea id="obs" placeholder="Digite alguma observação..."></textarea>
            </div>`;

        
        this.obs = document.getElementById("obs");
        this.obs.value = this.manipuladorDeDadosLS.obterObs(fml,preKitting);

        this.modal.show();
        this.overlay.style.display = "block";
        this.revezadorDePartes.parar();
    }

    fecharModal() {
        this.modal.close();
        this.corpoModal.innerHTML = "";
        this.overlay.style.display = "none";
        this.obs.value = "";
        this.revezadorDePartes.revezar();
    }
}
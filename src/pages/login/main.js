import { StockOrganization } from "../../model/stockModel.js";

const form = document.getElementById('loginForm');
const nameInput = document.getElementById('name');
const keyInput = document.getElementById('key-api');

const FormHandler = {

    async handleFormSubmit(event) {
        event.preventDefault();

        const name = nameInput.value;
        const key = keyInput.value;

        try {
            const existingEntry = await this.findExistingEntry(name, key);

            console.log("Entrada encontrada:", existingEntry);

            if (existingEntry) {
                alert('Os dados de login já existem. Redirecionando para a página inicial...');
                this.redirectToHome();
                return;
            }

            await StockOrganization.sendData('key', [name, key]);
            alert('Dados salvos com sucesso!');
            this.clearForm();
            this.redirectToHome();

        } catch (error) {
            console.error("Erro ao processar o formulário:", error);
            alert("Ocorreu um erro ao processar o formulário. Por favor, tente novamente.");
        }
    },

    async findExistingEntry(name, key) {
        const db = await StockOrganization.allItems('key');

        if (!db || !Array.isArray(db.key)) {
            console.error("Erro: A propriedade 'key' do banco de dados não está no formato esperado.");
            return null;
        }

        return db.key.find(entry => {
            const [entryName, entryKey] = entry;

            return (entryName && entryName.toLowerCase() === name.toLowerCase()) || (entryKey && entryKey === key);
        });
    },

    clearForm() {
        nameInput.value = "";
        keyInput.value = "";
    },

    redirectToHome() {
        window.location.href = '../home/index.html';
    }
};

form.addEventListener('submit', FormHandler.handleFormSubmit.bind(FormHandler));
import { loadDatabase, saveDatabase } from '../../src/database/db.js';

export class Stock {
    #db;

    constructor() {
        this.#db = loadDatabase();
    }

    addProduct(nameArray, item) {
        if (!this.#db[nameArray]) {
            console.error(`Erro: O array '${nameArray}' não existe no banco de dados.`);
            return false;
        }
        this.#db[nameArray].push(item);
        saveDatabase(this.#db);
        console.log(`Produto adicionado em '${nameArray}' com sucesso.`);
        return true;
    }

    searchProduct(nameArray, item) {
        if (!this.#db[nameArray]) {
            console.error(`Erro: O array '${nameArray}' não existe no banco de dados.`);
            return undefined;
        }
        return this.#db[nameArray].find(item);
    }

    updateProduct(nameArray, item, updatedProduct) {
        if (!this.#db[nameArray]) {
            console.error(`Erro: O array '${nameArray}' não existe no banco de dados.`);
            return false;
        }
        const index = this.#db[nameArray].findIndex(item);
        if (index !== -1) {
            this.#db[nameArray][index] = { ...this.#db[nameArray][index], ...updatedProduct };
            saveDatabase(this.#db);
            console.log(`Produto em '${nameArray}' atualizado com sucesso.`);
            return true;
        }
        console.error(`Erro: Produto não encontrado para atualização em '${nameArray}'.`);
        return false;
    }

    excludeProduct(nameArray, item) {
        if (!this.#db[nameArray]) {
            console.error(`Erro: O array '${nameArray}' não existe no banco de dados.`);
            return false;
        }
        const initialLength = this.#db[nameArray].length;
        this.#db[nameArray] = this.#db[nameArray].filter(index => !item(index));

        if (this.#db[nameArray].length < initialLength) {
            saveDatabase(this.#db);
            console.log(`Produto excluído de '${nameArray}' com sucesso.`);
            return true;
        }
        console.error(`Erro: Produto não encontrado para exclusão em '${nameArray}'.`);
        return false;
    }

    getDatabase(value) {
        return this.#db[value];
    }
}
import { loadDatabase, saveDatabase } from '../../database/db.js';

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const db = loadDatabase();
    const stockTotal = calculateTotal(db);
    renderStockTable(stockTotal);
}

/**
 * Calcula o estoque total a partir dos dados de entrada e saída.
 * Utiliza um Map para somar entradas e subtrair saídas em um único laço.
 * @param {object} db - O objeto do banco de dados com 'entries' e 'outpull'.
 * @returns {Array<Array<any>>} Um array de itens com suas quantidades totais.
 */
function calculateTotal(db) {
    const stockMap = new Map();

    // Consolida entradas e saídas em um único array para processamento unificado
    const transactions = [
        ...db.entries.map(([item, quantity]) => ({ item, quantity })),
        ...db.outpull.map(([item, quantity]) => ({ item, quantity: -quantity }))
    ];

    // Processa todas as transações em um único laço para calcular o total
    transactions.forEach(({ item, quantity }) => {
        stockMap.set(item, (stockMap.get(item) || 0) + quantity);
    });

    // Remove itens com quantidade zero ou negativa
    stockMap.forEach((quantity, item) => {
        if (quantity <= 0) {
            stockMap.delete(item);
        }
    });

    // Converte o mapa de volta para um array e salva o estado no banco de dados.
    const total = Array.from(stockMap.entries()).map(([item, quantity]) => [item, quantity]);
    saveDatabase({ ...db, total });
    return total;
}

/**
 * Atualiza a tabela HTML com os dados de estoque fornecidos.
 * @param {Array<Array<any>>} stock - O array de itens de estoque para renderizar.
 */
function renderStockTable(stock) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    if (stock.length === 0) {
        tbody.insertAdjacentHTML('beforeend', '<tr><td colspan="2">Nenhum item em estoque.</td></tr>');
        return;
    }

    stock.forEach(([item, quantity]) => {
        tbody.insertAdjacentHTML('beforeend', createTableRow(item, quantity));
    });
}

/**
 * Cria a string HTML para uma linha da tabela.
 * @param {string} item - O nome do item.
 * @param {number} quantity - A quantidade do item.
 * @returns {string} O HTML da linha da tabela.
 */
function createTableRow(item, quantity) {
    return `<tr><td>${item}</td><td>${quantity}</td></tr>`;
}
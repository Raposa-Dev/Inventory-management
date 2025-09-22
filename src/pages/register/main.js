import { StockOrganization } from "../../model/stockModel.js";

const ncmInput = document.getElementById('ncm');
const ncmResultsContainer = document.getElementById('ncm-results');

const price = window.document.getElementById("price");
const profit = window.document.getElementById("profit");
const barcode = window.document.getElementById("barcode");
const supplier = window.document.getElementById("supplier");
const amount = window.document.getElementById("amount");
const department = window.document.getElementById("department");
const productName = window.document.getElementById("product-name");
const form = window.document.getElementById("form-register");
const btnSubmit = window.document.getElementById("btn-submit");

btnSubmit.addEventListener('click', () => {

    if (form.checkValidity()) {
        const items = {
            name_product: productName.value,
            ncm: ncm.value,
            price: price.value,
            profit: profit.value,
            barcode: barcode.value,
            supplier: supplier.value,
            amount: parseInt(amount.value),
            department: department.value
        }
            productName.value = "";
            ncm.value = "";
            price.value = "";
            profit.value = "";
            barcode.value = "";
            supplier.value = "";
            amount.value = "";
            department.value = "";

        StockOrganization.sendData("total", items);
        
        return;
    };
    
    alert("Formulário inválido. Preencha todos os campos corretamente.");
});

let allNcmData = [];

async function fetchAllNcm() {
    const URL = 'https://brasilapi.com.br/api/ncm/v1';
    try {
        const request = await fetch(URL);
        if (!request.ok) {
            throw new Error(`Erro na requisição: ${request.status} ${request.statusText}`);
        }
        allNcmData = await request.json();
        console.log("Dados do NCM carregados:", allNcmData.length, "itens.");
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os dados do NCM:', error);
    }
}

function filterNcm(query) {
    if (!query) {
        return [];
    }
    const lowerCaseQuery = query.toLowerCase();
    
    return allNcmData.filter(item => 
        item.codigo.toLowerCase().includes(lowerCaseQuery) ||
        item.descricao.toLowerCase().includes(lowerCaseQuery)
    );
}

function displayNcmResults(results) {
    ncmResultsContainer.innerHTML = '';
    if (results.length > 0) {
        const ul = document.createElement('ul');
        results.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.codigo} - ${item.descricao}`;
           
            li.addEventListener('click', () => {
                ncmInput.value = item.codigo;
                ncmResultsContainer.innerHTML = '';
            });
            ul.appendChild(li);
        });
        ncmResultsContainer.appendChild(ul);
    }
}

ncmInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    const filteredResults = filterNcm(query);
    displayNcmResults(filteredResults);
});


document.addEventListener('DOMContentLoaded', () => {
    fetchAllNcm();
});
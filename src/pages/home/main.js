import { StockOrganization } from "../../model/stockModel.js";

const entriesProducts = document.getElementById('entries-Products');
const entriesQuantity = document.getElementById('entries-Quantity');
const pullOutProducts = document.getElementById('pullOutProducts');
const pullOutQuantity = document.getElementById('pullOutQuantity');
const pullOutSector = document.getElementById('pullOutSector');

const localDate = new Date().toLocaleDateString('pt-BR');
let oneMonthAfter = new Date();
oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
oneMonthAfter = oneMonthAfter.toLocaleDateString('pt-BR');

function sendEntriesData() {
    const items = [
        entriesProducts.value,
        parseInt(entriesQuantity.value),
        localDate,
        oneMonthAfter
    ]
    entriesProducts.value = "";
    entriesQuantity.value = "";

    StockOrganization.sendData("entries",items);
};

function sendPullOutData() {
    const items = [
        pullOutProducts.value,
        parseInt(pullOutQuantity.value), 
        localDate,
        pullOutSector.value
    ]
    pullOutProducts.value = "";
    pullOutQuantity.value = "";
    pullOutSector.value = "";

    StockOrganization.sendData("outpull", items);
};

document.querySelector('.btn-entries').addEventListener('click', sendEntriesData);
document.querySelector('.btn-outpull').addEventListener('click', sendPullOutData);

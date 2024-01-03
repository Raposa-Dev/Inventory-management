import { ListArray } from '../../database/db.js';
const entriesProducts = document.getElementById('entries-Products');
const entriesQuantity = document.getElementById('entries-Quantity');
const pullOutProducts = document.getElementById('pullOutProducts');
const pullOutQuantity = document.getElementById('pullOutQuantity');
const pullOutSector = document.getElementById('pullOutSector');
const localDate = new Date().toLocaleDateString('pt-BR');
let oneMonthAfter = new Date();
const db = {
    entries: ListArray.entries || [],
    outpull: ListArray.outpull || [],
    stock: ListArray.stock || [],
    total: ListArray.total || []
};
oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
oneMonthAfter = oneMonthAfter.toLocaleDateString('pt-BR');
function postEntriesDate() {
    db.entries.push(
        [
            entriesProducts.value,
            entriesQuantity.value,
            localDate,
            oneMonthAfter
        ]
    );
    updateLocalStorage();
    entriesProducts.value = "";
    entriesQuantity.value = "";
};

function postPullOutDate() {
    db.outpull.push(
        [
            pullOutProducts.value,
            pullOutQuantity.value, 
            localDate,
            pullOutSector.value
        ]
    );
    updateLocalStorage(); 
    pullOutProducts.value = "";
    pullOutQuantity.value = "";
    pullOutSector.value = "";
};
function updateLocalStorage() {
    localStorage.setItem('list_save', JSON.stringify(db));
};
document.querySelector('.btn-entries').addEventListener('click', postEntriesDate);
document.querySelector('.btn-outpull').addEventListener('click', postPullOutDate);
window.db = db;
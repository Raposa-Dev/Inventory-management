const entriesProducts = document.getElementById('entries-Products');
const entriesQuantity = document.getElementById('entries-Quantity');
const pullOutProducts = document.getElementById('pullOutProducts');
const pullOutQuantity = document.getElementById('pullOutQuantity');
const pullOutSector = document.getElementById('pullOutSector');
const localDate = new Date().toLocaleDateString('pt-BR');

let oneMonthAfter = new Date();
oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);
oneMonthAfter = oneMonthAfter.toLocaleDateString('pt-BR');

// Inicializando o banco de dados
const storedData = localStorage.getItem('list_save');
const db = storedData ? JSON.parse(storedData) : {
    entries: [],
    outpull: [],
    stock: [],
    total: []
};

function postEntriesDate() {
    const product = entriesProducts.value.trim();
    const quantity = parseInt(entriesQuantity.value, 10);

    if (product && !isNaN(quantity)) {
        db.entries.push([
            product,
            parseInt(quantity),
            localDate,
            oneMonthAfter
        ]);
        updateLocalStorage();
        entriesProducts.value = "";
        entriesQuantity.value = "";
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    };
};

function postPullOutDate() {
    const product = pullOutProducts.value.trim();
    const quantity = parseInt(pullOutQuantity.value, 10);
    const sector = pullOutSector.value.trim();

    if (product && !isNaN(quantity) && sector) {
        db.outpull.push([
            product,
            parseInt(quantity),
            localDate,
            sector
        ]);
        updateLocalStorage();
        pullOutProducts.value = "";
        pullOutQuantity.value = "";
        pullOutSector.value = "";
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    };
};

function updateLocalStorage() {
    localStorage.setItem('list_save', JSON.stringify(db));
};

document.querySelector('.btn-entries')?.addEventListener('click', postEntriesDate);
document.querySelector('.btn-outpull')?.addEventListener('click', postPullOutDate);

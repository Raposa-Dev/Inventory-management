const itensArray = document.getElementById('itens_array');
let db = retrieveDataFromLocalStorage();
updateTextareaContent();

function pushLocalStorage() {
    const inputData = prompt("Insira os dados no formato especificado:");

    if (inputData) {
        const parsedInput = JSON.parse(inputData);
        updateDatabase(parsedInput);
        saveDataToLocalStorage();
        updateTextareaContent();
    };
};

function retrieveDataFromLocalStorage() {
    const storedData = localStorage.getItem('list_save');
    return storedData ? JSON.parse(storedData) : { entries: [], outpull: [], stock: [], total: [] };
};

function updateDatabase(parsedData) {
    db.entries = (db.entries || []).concat(parsedData.entries || []);
    db.outpull = (db.outpull || []).concat(parsedData.outpull || []);
    db.stock = (db.stock || []).concat(parsedData.stock || []);
    db.total = (db.total || []).concat(parsedData.total || []);
};

function saveDataToLocalStorage() {
    localStorage.setItem('list_save', JSON.stringify(db));
};

function updateTextareaContent() {
    itensArray.textContent = JSON.stringify(db);
};

function formatTextareaContent() {
    itensArray.textContent = JSON.stringify(db, null, 2);
};

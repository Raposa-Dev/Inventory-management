document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const db = loadDatabase();
    updateQuantities(db);
    updateTable(db.total);
};

function loadDatabase() {
    const storedData = localStorage.getItem('list_save');
    return storedData ? JSON.parse(storedData) : { entries: [], outpull: [], total: [] };
};

function updateQuantities(db) {
    db.total = db.entries
        .map(entry => computeTotalForEntry(db, entry))
        .filter(([_, quantity]) => quantity > 0);

    saveToLocalStorage(db);
    updateTable(db.total);
};

function computeTotalForEntry(db, entry) {
    const [item, initialQuantity, ...rest] = entry;
    const outpullQuantity = getTotalOutpullQuantity(db.outpull, item);
    const finalQuantity = Math.max(initialQuantity - outpullQuantity, 0);
    return [item, finalQuantity, ...rest];
};

function getTotalOutpullQuantity(outpullEntries, item) {
    return outpullEntries
        .filter(([outpullItem]) => outpullItem === item)
        .reduce((total, [, quantity]) => total + quantity, 0);
};

function saveToLocalStorage(db) {
    try {
        localStorage.setItem('list_save', JSON.stringify(db));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

function updateTable(total) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = total.map(([item, quantity]) => createTableRow(item, quantity)).join('');
};

function createTableRow(item, quantity) {
    return `
        <tr>
            <td>${item}</td>
            <td>${quantity}</td>
        </tr>
    `;
};

function addNewEntry(db, newEntry) {
    db.entries.push(newEntry);
    updateQuantities(db);
};

function addOutpull(db, itemToRemove, quantityToRemove) {
    const index = db.outpull.findIndex(([item]) => item === itemToRemove);

    if (index !== -1) {
        db.outpull[index][1] += quantityToRemove;
    } else {
        db.outpull.push([itemToRemove, quantityToRemove]);
    };

    updateQuantities(db);
};

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    let db = loadDatabase();

    calculateQuantity(db);
    updateTable(db.total);
}

function loadDatabase() {
    const storedData = localStorage.getItem('list_save');
    return storedData ? JSON.parse(storedData) : { entries: [], outpull: [], total: [] };
}

function calculateQuantity(db) {
    db.total = db.entries.map(entry => calculateTotalEntry(db, entry)).filter(entry => entry[1] > 0);

    updateLocalStorage(db);
    updateTable(db.total);
}

function calculateTotalEntry(db, entry) {
    const [item, quantity, other1, other2] = entry;
    const outpullItems = db.outpull.filter(outpullEntry => outpullEntry[0] === item);

    let totalQuantity = quantity;

    outpullItems.forEach(outpullItem => {
        totalQuantity -= outpullItem[1];
    });

    totalQuantity = Math.max(totalQuantity, 0); // Garante que a quantidade não seja negativa

    return [item, totalQuantity, other1, other2];
}

function updateLocalStorage(db) {
    try {
        localStorage.setItem('list_save', JSON.stringify(db));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function updateTable(total) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    total.forEach(([item, quantity]) => {
        const row = createTableRow(item, quantity);
        tbody.appendChild(row);
    });
}

function createTableRow(item, quantity) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item}</td>
        <td>${quantity}</td>
    `;
    return row;
}

function addNewEntry(db, newEntry) {
    db.entries.push(newEntry);
    updateTotalOnEntryAdd(db, newEntry);
}

function addOutpull(db, itemToRemove, quantityToRemove) {
    const existingOutpullIndex = db.outpull.findIndex(entry => entry[0] === itemToRemove);

    if (existingOutpullIndex !== -1) {
        db.outpull[existingOutpullIndex][1] += quantityToRemove;
    } else {
        db.outpull.push([itemToRemove, quantityToRemove]);
    }

    calculateQuantity(db);
}

function updateTotalOnEntryAdd(db, newEntry) {
    const [item, quantity, dailyDate, monthAfter] = newEntry;
    const outpullItem = db.outpull.find(outpullEntry => outpullEntry[0] === item);

    const updatedTotalEntry = outpullItem
        ? [item, quantity - outpullItem[1], dailyDate, monthAfter]
        : newEntry;

    db.total.push(updatedTotalEntry);
    calculateQuantity(db);
}
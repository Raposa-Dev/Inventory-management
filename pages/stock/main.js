document.addEventListener('DOMContentLoaded', function () {
    const storedData = localStorage.getItem('list_save');
    let db = { entries: [], outpull: [], total: [] };

    if (storedData) {
        db = JSON.parse(storedData);
    };

    calculateQuantity(db);
    updateTable(db.total);
});

function calculateQuantity(db) {
    db.total = db.entries.map(entry => {
        const [item, quantity, other1, other2] = entry;
        const outpullItem = db.outpull.find(outpullEntry => outpullEntry[0] === item);

        return outpullItem
            ? [item, quantity - outpullItem[1], other1, other2]
            : entry;
    }).filter(entry => entry[1] > 0); // Remove itens com quantidade não positiva

    updateLocalStorage(db);
};

function updateLocalStorage(db) {
    localStorage.setItem('list_save', JSON.stringify(db));
};

function updateTable(total) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    total.forEach(([item, quantity]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item}</td>
            <td>${quantity}</td>
        `;
        tbody.appendChild(row);
    });
};

function addNewEntry(db, newEntry) {
    db.entries.push(newEntry);
    updateTotalOnEntryAdd(db, newEntry);
};

function addOutpull(db, itemToRemove, quantityToRemove) {
    const existingOutpullIndex = db.outpull.findIndex(entry => entry[0] === itemToRemove);

    if (existingOutpullIndex !== -1) {
        db.outpull[existingOutpullIndex][1] += quantityToRemove;
    } else {
        db.outpull.push([itemToRemove, quantityToRemove]);
    }

    calculateQuantity(db);
};

function updateTotalOnEntryAdd(db, newEntry) {
    const [item, quantity, dailyDate, monthAfter] = newEntry;
    const outpullItem = db.outpull.find(outpullEntry => outpullEntry[0] === item);

    const updatedTotalEntry = outpullItem
        ? [item, quantity - outpullItem[1], dailyDate, monthAfter]
        : newEntry;

    db.total.push(updatedTotalEntry);
    calculateQuantity(db);
};
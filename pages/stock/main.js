document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const db = loadDatabase();
    const total = calculateTotal(db);
    updateTable(total);
}

function loadDatabase() {
    const storedData = localStorage.getItem('list_save');
    return storedData ? JSON.parse(storedData) : { entries: [], outpull: [], total: [] };
}

function calculateTotal(db) {
    const totalMap = new Map();

    db.entries.forEach(entry => {
        const [item, quantity, ...rest] = entry;
        const currentQuantity = totalMap.get(item) || [item, 0, ...rest];
        currentQuantity[1] += quantity;
        totalMap.set(item, currentQuantity);
    });

    db.outpull.forEach(outpull => {
        const [item, quantity] = outpull;
        if (totalMap.has(item)) {
            const currentQuantity = totalMap.get(item);
            currentQuantity[1] = Math.max(currentQuantity[1] - quantity, 0);
            if (currentQuantity[1] === 0) {
                totalMap.delete(item);
            } else {
                totalMap.set(item, currentQuantity);
            }
        }
    });

    const total = Array.from(totalMap.values());
    saveToLocalStorage({ ...db, total });
    return total;
}

function saveToLocalStorage(db) {
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
        tbody.insertAdjacentHTML('beforeend', createTableRow(item, quantity));
    });
}

function createTableRow(item, quantity) {
    return `<tr><td>${item}</td><td>${quantity}</td></tr>`;
}

function addNewEntry(db, newEntry) {
    const newDb = { ...db, entries: [...db.entries, newEntry] };
    const total = calculateTotal(newDb);
    updateTable(total);
    saveToLocalStorage(newDb);
}

function addOutpull(db, itemToRemove, quantityToRemove, date, location) {
    const newOutpull = [...db.outpull, [itemToRemove, quantityToRemove, date, location]];
    const newDb = { ...db, outpull: newOutpull };
    const total = calculateTotal(newDb);
    updateTable(total);
    saveToLocalStorage(newDb);
}

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
        const [item, initialQuantity, ...rest] = entry;
        const outpullQuantity = getTotalOutpullQuantity(db.outpull, item);
        const finalQuantity = Math.max(initialQuantity - outpullQuantity, 0);

        if (finalQuantity > 0) {
            totalMap.set(item, [item, finalQuantity, ...rest]);
        }
    });

    const total = Array.from(totalMap.values());
    saveToLocalStorage({ ...db, total });
    return total;
}

function getTotalOutpullQuantity(outpullEntries, item) {
    return outpullEntries
        .filter(([outpullItem]) => outpullItem === item)
        .reduce((total, [, quantity]) => total + quantity, 0);
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
}

function addOutpull(db, itemToRemove, quantityToRemove) {
    const existingOutpull = db.outpull.find(([item]) => item === itemToRemove);
    let newOutpull;

    if (existingOutpull) {
        
        newOutpull = db.outpull.map(([item, quantity]) => 
            item === itemToRemove ? [item, quantity + quantityToRemove] : [item, quantity]
        );
    } else {
        newOutpull = [...db.outpull, [itemToRemove, quantityToRemove]];
    }

    const newDb = { ...db, outpull: newOutpull };
    const total = calculateTotal(newDb);
    updateTable(total);
}

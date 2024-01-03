document.addEventListener('DOMContentLoaded', function () {
    const storedData = localStorage.getItem('list_save');
    let db = { entries: [], outpull: [], total: [] };
    if (storedData) {       
        db = JSON.parse(storedData);
    };
    CalculateQuantity(db);
    updateTable(db.total);
});
function CalculateQuantity(db) {
    db.total = db.entries.reduce((total, entry) => {       
        const outpullItem = db.outpull.find(outpullEntry => outpullEntry[0] === entry[0]);
        if (outpullItem) {
            total.push([entry[0], entry[1] - outpullItem[1], entry[2], entry[3]]);
        } else {
            total.push(entry);
        };
        return total;
    }, []);
    localStorage.setItem('list_save', JSON.stringify(db));
    updateTable(db.total);
};
function updateTable(total) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    total.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item[0]}</td>
            <td>${item[1]}</td>
        `;
        tbody.appendChild(row);
    });
};
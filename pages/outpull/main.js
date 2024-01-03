document.addEventListener('DOMContentLoaded', function () {
    const storedData = localStorage.getItem('list_save');
    if (storedData) {
        const db = JSON.parse(storedData);
        updateTable(db);
    } else {
        console.log('Nenhum dado encontrado no localStorage.');
    };
});
function deleteItem(index) {
    const storedData = localStorage.getItem('list_save');
    if (storedData) {
        const db = JSON.parse(storedData);
        db.outpull.splice(index, 1);
        localStorage.setItem('list_save', JSON.stringify(db));
        updateTable(db);
    };
};
window.deleteItem = deleteItem;
function editEntry(index) {
    const storedData = localStorage.getItem('list_save');
    if (storedData) {
        const db = JSON.parse(storedData);
        const editedEntry = db.outpull[index];
        if (editedEntry) {
            const newProduct = prompt(`Editar produto: ${editedEntry[0]}`, editedEntry[0]);
            const newQuantity = prompt(`Editar quantidade: ${editedEntry[1]}`, editedEntry[1]);
            const newExit = prompt(`Editar saída: ${editedEntry[2]}`, editedEntry[2]);
            if (newProduct !== null && newQuantity !== null && newExit !== null) {
                editedEntry[0] = newProduct;
                editedEntry[1] = parseInt(newQuantity);
                editedEntry[2] = newExit;
                localStorage.setItem('list_save', JSON.stringify(db));
                updateTable(db);
            };
        };
    };
};
window.editEntry = editEntry;
function updateTable(db) {
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';
    db.outpull.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="product">${item[0]}</td>
            <td>${item[1]}</td>
            <td>${item[2]}</td>
            <td>${item[3]}</td>
            <td id="content-button" >
                <button class="edit-btn" onclick="editEntry(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};
export function renderTable(selector, items, onEdit, onDelete) {
    const tbody = document.querySelector(selector);
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.insertAdjacentHTML('beforeend', '<tr><td colspan="5">Nenhum dado encontrado.</td></tr>');
        return;
    }

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        const rowContent = item.map(value => `<td>${value}</td>`).join('');
        
        row.innerHTML = `
            ${rowContent}
            <td id="content-button">
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;
        
        const editButton = row.querySelector('.edit-btn');
        const deleteButton = row.querySelector('.delete-btn');

        editButton.addEventListener('click', () => onEdit(index));
        deleteButton.addEventListener('click', () => onDelete(index));

        tbody.appendChild(row);
    });
}
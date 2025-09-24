import { StockOrganization } from "../../model/stockModel.js";
import { renderTable } from "../../../public/scripts/render.js";

let dataEntries;

async function viewDateOutpull() {
    const db = await StockOrganization.allItems('entries');
    dataEntries = db;
    console.log(db)
    return db;
}

function deleteItem(index) {
    StockOrganization.removeData('entries', index);
    
    updateEntriesTable(); 
}

function editData(index) {
    const db = dataEntries;
    const editedEntry = db[index];
    if (editedEntry) {
        const newProduct = prompt(`Editar produto: ${editedEntry[0]}`, editedEntry[0]);
        
        if (newProduct !== null && newQuantity !== null && newExit !== null && newLocation !== null) {
            const newValues = [newProduct, parseInt(newQuantity), newExit, newLocation];
            StockOrganization.updateData('entries', index, newValues);
            
            updateEntriesTable();
        }
    }
}

async function updateEntriesTable() {
    let db = await viewDateOutpull();
    renderTable('.tbody', db, editData, deleteItem);
}

updateEntriesTable();
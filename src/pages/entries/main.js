import { StockOrganization } from "../../model/stockModel.js";
import { renderTable } from "../../../public/scripts/render.js";

let dataEntries;

async function viewDateOutpull() {
    const db = await StockOrganization.allItems('entries');
    dataEntries = db;
    return db;
}

export function deleteItem(index) {
    StockOrganization.removeData('entries', index);
    
    updateOutpullTable(); 
}

export function editData(index) {
    const db = dataEntries;
    const editedEntry = db[index];
    if (editedEntry) {
        const newProduct = prompt(`Editar produto: ${editedEntry[0]}`, editedEntry[0]);
        
        if (newProduct !== null && newQuantity !== null && newExit !== null && newLocation !== null) {
            const newValues = [newProduct, parseInt(newQuantity), newExit, newLocation];
            StockOrganization.updateData('entries', index, newValues);
            
            updateOutpullTable();
        }
    }
}

async function updateOutpullTable() {
    let db = await viewDateOutpull();
    renderTable('.tbody', db, editData, deleteItem);
}

updateOutpullTable();
import { StockOrganization } from "../../model/stockModel.js";
import { renderTable } from "../../../public/scripts/render.js";

let dataOutpull;

async function viewDateOutpull() {
    const db = await StockOrganization.allItems('outpull');
    dataOutpull = db;
    console.log(db)
    return db;
}

function deleteItem(index) {
    StockOrganization.removeData('outpull', index);
    
    updateOutpullTable(); 
}

function editData(index) {
    const db = dataOutpull;
    const editedEntry = db[index];
    if (editedEntry) {
        const newProduct = prompt(`Editar produto: ${editedEntry[0]}`, editedEntry[0]);
        
        if (newProduct !== null && newQuantity !== null && newExit !== null && newLocation !== null) {
            const newValues = [newProduct, parseInt(newQuantity), newExit, newLocation];
            StockOrganization.updateData('outpull', index, newValues);
            
            updateOutpullTable();
        }
    }
}

async function updateOutpullTable() {
    let db = await viewDateOutpull();
    renderTable('.tbody', db, editData, deleteItem);
}

updateOutpullTable();
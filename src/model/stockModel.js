import { Stock } from '../repository/repository.js';

const stockManager = new Stock();

export const StockOrganization = {
    
    sendData(nameArray, data) {
        stockManager.addProduct(nameArray, data);
    },
    
    readData(nameArray, data) {
        stockManager.searchProduct(nameArray, data);
    },
    
    updateData(nameArray,item, data) {
        stockManager.updateProduct(nameArray, item, data);
    },
    
    removeData(nameArray, dataIndex) {
        stockManager.excludeProduct(nameArray, dataIndex);
    },

    allItems(value) {
       return stockManager.getDatabase(value);
    }

};
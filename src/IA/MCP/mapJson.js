import { StockOrganization } from "../../model/stockModel.js";

export function executeAction(actionJson) {
    let confirmationMessage = '';

    const { action, params } = actionJson;

    const functionsMap = {
        'addEntry': () => StockOrganization.sendData(action, params),
        'addOutpull': () => StockOrganization.sendData(action, params),
        'viewEntry': () => StockOrganization.readData(action, params),
        'viewOutpull': () => StockOrganization.readData(action, params),
        'viewStock': () => StockOrganization.allItems('total', params),
        'editEntry': () => StockOrganization.updateData(action, params.item, params),
        'editOutpull': () => StockOrganization.updateData(action, params.item, params),
        'removeEntry': () => StockOrganization.removeData(action, params.dataIndex),
        'removeOutpull': () => StockOrganization.removeData(action, params.dataIndex)
    };

    const selectedFunction = functionsMap[action];

    if (!selectedFunction) {
        //console.error(`A função para a ação '${action}' não foi encontrada.`);
        return `Não foi possível realizar a ação. A função para '${action}' não existe.`;
    }

    try {
       const response = selectedFunction();
        confirmationMessage = `Ação '${action}' executada com sucesso. 
            ${response}
        `;
    } catch (error) {
        //console.error(`Erro ao executar a ação '${action}':`, error);
        confirmationMessage = `Ocorreu um erro ao tentar executar a ação '${action}'. Por favor, tente novamente.`;
    }

    return confirmationMessage;
}
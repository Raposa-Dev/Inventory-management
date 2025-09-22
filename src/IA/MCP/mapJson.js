import { StockOrganization } from "../../model/stockModel.js";

const {sendData, readDate, updateDate, removeData} = StockOrganization

// A função `executeAction` que você já tinha, mas agora usando as novas funções.
export function executeAction(actionJson) {
    const { action, params } = actionJson;
    let confirmationMessage = '';

    // A adaptar esse codigo a baixo

    /// chamar 

    // O nome da função foi corrigido para getFunctions
    const getFunctions = (nameArray, params) => {
        // Define um mapa de funções, guardando apenas as referências
        const functionsMap = {
            'addEntry': () => sendData(nameArray, params), // Passando 'parms' como um segundo argumento
            'addOutpull': () => sendData(nameArray, params), // Passando 'parms' como um segundo argumento
            'viewEntry': () => readDate(nameArray, params),
            'viewOutpull': () => readDate(nameArray, params),
            'viewStock': () => readDate(nameArray, params),
            'editEntry': () => updateDate(nameArray, item, params),
            'editOutpull': () => updateDate(nameArray, item, params),
            'removeEntry': () => removeData(nameArray, dataIndex),
            'removeOutpull': () => removeData(nameArray, dataIndex)
        };

        // Retorna a função correspondente ou undefined se não existir
        const selectedFunction = functionsMap[params];

        // Verifica se a função existe antes de chamá-la
        if (selectedFunction) {
            return selectedFunction();
        }

        // Se a função não existir, exibe uma mensagem de erro ou lança uma exceção
        console.error(`A função para o parâmetro '${params}' não foi encontrada.`);
        return null;
    };

    // function addEntries(a, b) {
    //   console.log('Ação: Adicionar', a, 'com o parâmetro', b);
    // }

    // function remove(a, b) {
    // console.log('Ação: Remover', a, 'com o parâmetro', b);
    // }

    // Exemplos de uso
    // getFunctions('add', ['item1', 'item2']);
    // getFunctions('rm', ['item1', 'item2']);
    // getFunctions('edit', ['item1', 'item2']); // Exemplo de um parâmetro que não existe


    // _________________adaptar__________________________

    return confirmationMessage;
}





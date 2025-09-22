import { executeAction } from "./MCP/mapJson.js";

let messagesContent = document.getElementById("response");

export const TalkArray = [];

/**
 * Valida se uma string é um JSON válido e a executa se for uma ação.
 * Caso contrário, trata como texto e exibe a resposta da IA.
 * @param {object} value O objeto de mensagem completo recebido da IA.
 */
export async function addTalkInArray(value) {
    try {
        const actionJson = validateResponse(value);
        if (actionJson) {
            // Se for um JSON válido, execute a ação
            const confirmationMessage = executeAction(actionJson);
            // Exibe a mensagem de confirmação
            createBuble({ role: "model", parts: [{ text: confirmationMessage }] });
            console.log("JSON recebido:", actionJson);
        } else {
            // Se não for um JSON, exibe a mensagem como texto natural
            TalkArray.push(value);
            createBuble(value);
        }
    } catch (error) {
        console.error("Erro ao adicionar mensagem:", error);
    }
}

/**
 * Valida se a resposta contém um JSON válido em um bloco de código Markdown.
 * @param {object} response O objeto de resposta da IA.
 * @returns {object|null} O objeto JSON se a validação for bem-sucedida, caso contrário, null.
 */
function validateResponse(response) {
    const textContent = response.parts[0].text;
    
    // Expressão regular para encontrar um bloco de código com 'json' opcional
    const jsonRegex = /```(?:json)?([\s\S]*?)```/;
    const match = textContent.match(jsonRegex);

    if (match && match[1]) {
        try {
            // Tenta analisar o conteúdo capturado dentro do bloco de código
            const jsonResponse = JSON.parse(match[1].trim());
            console.log("JSON extraído com sucesso!");
            return jsonResponse;
        } catch (error) {
            console.warn("Conteúdo do bloco de código não é um JSON válido.", error);
            return null;
        }
    }

    console.log("A resposta da IA não contém um JSON válido em um bloco de código. Tratando como texto.");
    return null;
}

export function createBuble(value) {
    let message = document.createElement('div');
    let textElement = document.createElement('p');
    // Usando o parse do 'marked' para renderizar o Markdown em HTML
    let messageInArray = marked.parse(value.parts[0].text);

    textElement.innerHTML = messageInArray;
    messagesContent.appendChild(message);
    message.appendChild(textElement);
    message.classList.add('cloudtalk');
}
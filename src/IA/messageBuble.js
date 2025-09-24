import { executeAction } from "./MCP/mapJson.js";

const messagesContent = document.getElementById("response");
export const TalkArray = [];

export async function addTalkInArray(value) {
    try {
        const actionJson = validateResponse(value);
        if (actionJson) {
            const confirmationMessage = executeAction(actionJson);
            createBubble({ role: "model", parts: [{ text: confirmationMessage }] });
            return;
        }

        TalkArray.push(value);
        createBubble(value);
    } catch (error) {
        console.error("Erro ao adicionar mensagem:", error);
    }
}

function validateResponse(response) {
    const textContent = response.parts[0].text;
    const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
    const match = textContent.match(jsonRegex);

    if (!match || !match[1]) {
        //console.log("A resposta da IA não contém um JSON em um bloco de código. Tratando como texto.");
        return null;
    }

    try {
        const jsonResponse = JSON.parse(match[1].trim());
        return jsonResponse;
    } catch (error) {
        console.warn("Conteúdo do bloco de código não é um JSON válido. Tratando como texto.", error);
        return null;
    }
}

export function createBubble(value) {
    const message = document.createElement('div');
    const textElement = document.createElement('p');
    
    const renderedHtml = marked.parse(value.parts[0].text);
    textElement.innerHTML = renderedHtml;

    message.classList.add('cloudtalk');
    message.appendChild(textElement);
    messagesContent.appendChild(message);
}
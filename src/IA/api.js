import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { startTest } from "./MCP/llms.js";
import { absorberMessage } from "./chat.js";
import { TalkArray } from "./messageBuble.js";
import { StockOrganization } from "../model/stockModel.js";
const KEY = StockOrganization.allItems('key')
const API_KEY = KEY[0][1];
const genAI = new GoogleGenerativeAI(API_KEY);

let chat;

const sendButton = document.getElementById('send-button');
const promptInput = document.getElementById('prompt');

async function initializeAI() {
    try {
        const llmsManual = await startTest;
        console.log('Dados do manual recebidos com sucesso!');

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-002",
            systemInstruction: llmsManual
        });

        chat = model.startChat({
            history: TalkArray
        });

        console.log('Modelo e chat inicializados.');

    } catch (error) {
        console.error('Falha ao inicializar o modelo:', error);
    }
};

initializeAI();

async function run() {
    try {
        const prompt = promptInput.value;
        promptInput.value = "";

        if (!prompt) {
            alert("Por favor, digite uma pergunta.");
            return;
        };

        if (!chat) {
            alert("O chat ainda não foi inicializado. Tente novamente em alguns segundos.");
            return;
        };

        absorberMessage({
            role: "User",
            parts: [{ text: prompt }]
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        absorberMessage({
            role: "model",
            parts: [{ text: text }]
        });

    } catch (error) {
        console.error("Erro ao chamar a API:", error);
        absorberMessage(
            {
                role: "model",
                parts: "Ocorreu um erro ao gerar a resposta. Verifique a chave da API e a permissão."
            }
        )
    }
};

sendButton.addEventListener('click', run);


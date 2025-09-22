// A URL para o seu arquivo .txt
const markdownFile = '../../IA/llms.md';

async function fetchMarkdown() {
  try {
    // 1. Faz a requisição de forma assíncrona
    const response = await fetch(markdownFile);

    // 2. Lança um erro se a resposta não for bem-sucedida (ex: 404 Not Found)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    // 3. Extrai o conteúdo do corpo da resposta como texto
    const data = await response.text();
    
    // 4. Retorna os dados para quem chamou a função
    return data;

  } catch (error) {
    // Captura e loga qualquer erro que ocorra (erros de rede, etc.)
    console.error('Ocorreu um erro ao buscar o arquivo:', error);
    // Opcional: Você pode retornar um valor padrão ou null em caso de erro
    return null;
  }
}

// Exporta a promessa que a função retorna, que será resolvida com o conteúdo do arquivo
export const startTest = fetchMarkdown();
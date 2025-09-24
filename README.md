# Inventory Management

Este projeto é uma aplicação de gerenciamento de inventário que permite adicionar novos itens, registrar saídas e entradas, visualizar a quantidade atual de cada item em uma tabela HTML e fazer download em PDF.
Este projeto usa a API do gemini para ajudar o usuário a gerenciar o estoque por comandos no chat.
Ao digitar o NCM no formulario, o usuário receberá uma sujestão de NCM.
O código também  utiliza o `localStorage` do navegador para armazenar e recuperar dados.


## Funcionalidades
-**Inserção de Dados:** Permite inserir dados Entradas e Saidas de itens.
-**Cadastro de Produtos:** Cadastra produto ultilizando NCM, preço, quantidade, código de barras e fornecedor.
- **Carregamento de Dados:** Carrega os dados salvos do `localStorage` ao inicializar.
- **Cálculo de Quantidades:** Atualiza as quantidades disponíveis dos itens, considerando as somas das saídas e entradas registradas.
- **Exibição em Tabela:** Exibe a lista de itens e suas quantidades atuais em uma tabela HTML.
- **Adicionar Novas Entradas:** Permite adicionar novos itens ao inventário.
- **Registrar Saídas:** Permite registrar a saída de itens do inventário.
- **Fazer inserção de JSON:** Permite inserir dados através JSON no `localStorage`.
- **Fazer Download em PDF:** Permite fazer download em PDF dos dados nas paginas.

## Uso

 **Inicialização:** Use a extenção `Live Server`.

## Requisitos

- Navegador web com suporte a `localStorage`.

## Melhorias futuras

 [ ] imput do fornecedor receber dados via JS
 [ ] ajustar chat de IA com as respectivas funções
 [ ] ajustar novo calculo de entradas e saidas
 [ ] separar funções do register
 [ ] melhorar as validações(criar +)  

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://github.com/Raposa-Dev/Inventory-management/blob/main/LICENSE) para mais detalhes.



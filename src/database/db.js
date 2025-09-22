export function loadDatabase() {
    const storedData = localStorage.getItem('list_save');
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        console.log('Nenhum dado encontrado no localStorage. Inicializando banco de dados.');
        return {
            entries: [],
            outpull: [],
            total: [],
            key: []
        };
    }
}

export function saveDatabase(db) {
    localStorage.setItem('list_save', JSON.stringify(db));
}

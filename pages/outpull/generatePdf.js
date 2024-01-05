function generatePDF() {
    const storedData = localStorage.getItem('list_save');
    let db = { entries: [], outpull: [], total: [] };

    if (storedData) {
        db = JSON.parse(storedData);
    };
    const outpull = db.outpull;
    let printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Saida</title>');
    printWindow.document.write(`
    
        <style>
            table { 
                width: 50%;
                font-size: 12px; 
            } 
            td { 
                border: 1px solid black; 
            } 
            body{ 
                width: 100%; 
                height: 100%; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
            }
        </style>
    
    `);
    printWindow.document.write('</head><body><table>');
    printWindow.document.write(`
        <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Saida</th>
            <th>Setor</th>
        </tr>
    `);
    outpull.forEach((item) => {
        printWindow.document.write(`
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
            </tr>
        `);
    });

    printWindow.document.write('</table></body></html>');
    printWindow.document.close();
    printWindow.print();
};
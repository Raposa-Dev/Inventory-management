function generatePDF() {
    const storedData = localStorage.getItem('list_save');
    let db = { entries: [], outpull: [], total: [] };

    if (storedData) {
        db = JSON.parse(storedData);
    };
    const total = db.total;
    let printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Total</title>');
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
        </tr>
    `);
    total.forEach(([item, quantity]) => {
        printWindow.document.write(`<tr><td>${item}</td><td>${quantity}</td></tr>`);
    });

    printWindow.document.write('</table></body></html>');
    printWindow.document.close();
    printWindow.print();
};
let rowCount = 1;

function calculateValues(element) {
    const row = element.closest('tr');
    const sampleStoneWeight = parseFloat(row.querySelector('.sample-stone-weight').value) || 0;
    const sampleQty = parseFloat(row.querySelector('.sample-qty').value) || 0;
    const actualQty = parseFloat(row.querySelector('.actual-qty').value) || 0;
    const perPcsWeightInput = row.querySelector('.per-pcs-weight');
    const totalWeightInput = row.querySelector('.total-weight');

    let perPcsWeight = 0;

    if (sampleStoneWeight && sampleQty) {
        perPcsWeight = sampleStoneWeight / sampleQty;
        perPcsWeightInput.value = perPcsWeight.toFixed(3);
    } else {
        perPcsWeightInput.value = '';
    }

    const totalWeight = perPcsWeight * actualQty;
    totalWeightInput.value = totalWeight.toFixed(3);

    updateGrandTotal();
}

function updateGrandTotal() {
    const rows = document.querySelectorAll('#sampleTable tbody tr');
    let grandTotal = 0;

    rows.forEach(row => {
        const totalWeight = parseFloat(row.querySelector('.total-weight').value) || 0;
        grandTotal += totalWeight;
    });

    document.getElementById('grandTotal').innerText = grandTotal.toFixed(3);
}

function addRow() {
    const tableBody = document.querySelector('#sampleTable tbody');
    const newRow = document.createElement('tr');
    rowCount++;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="description" /></td>
        <td><input type="number" class="sample-stone-weight" oninput="calculateValues(this)" /></td>
        <td><input type="number" class="sample-qty" oninput="calculateValues(this)" /></td>
        <td><input type="number" class="per-pcs-weight" readonly /></td>
        <td><input type="number" class="actual-qty" oninput="calculateValues(this)" /></td>
        <td><input type="number" class="total-weight" readonly /></td>
    `;

    tableBody.appendChild(newRow);
}

function deleteRow() {
    const tableBody = document.querySelector('#sampleTable tbody');
    if (tableBody.rows.length > 1) {
        tableBody.deleteRow(-1);
        rowCount--;
        updateSlNo();
        updateGrandTotal();
    }
}

function updateSlNo() {
    const rows = document.querySelectorAll('#sampleTable tbody tr');
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').innerText = index + 1;
    });
}

function printTable() {
    window.print();
}
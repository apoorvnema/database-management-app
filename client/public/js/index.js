function toggleDialog() {
    const dialog = document.getElementById("create-table-dialog");
    dialog.open = !dialog.open;
}

function addAnotherField() {
    const newColumn = document.getElementById("new-column");
    const div = document.createElement("div");
    div.classList.add("newColumn");
    const newField = document.createElement("input");
    newField.placeholder = "Enter Column Name";
    newField.required = true;
    newField.classList.add("newField");
    const newDatatype = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value = "STRING";
    option1.text = "STRING";
    const option2 = document.createElement("option");
    option2.value = "INTEGER";
    option2.text = "INTEGER";
    const option3 = document.createElement("option");
    option3.value = "BOOLEAN";
    option3.text = "BOOLEAN";
    newDatatype.classList.add("newDatatype");
    newDatatype.appendChild(option1);
    newDatatype.appendChild(option2);
    newDatatype.appendChild(option3);
    div.appendChild(newField);
    div.appendChild(newDatatype);
    newColumn.appendChild(div);
}

function removeField() {
    const newColumns = document.querySelectorAll(".newColumn");
    if (newColumns.length > 0) {
        const lastColumn = newColumns[newColumns.length - 1];
        lastColumn.remove();
    }
}

function createTable(e) {
    e.preventDefault();
    const tableName = e.target.tableName.value;
    const newField = document.querySelectorAll(".newField");
    const newDatatype = document.querySelectorAll(".newDatatype");
    if (newField.length != 0 && newDatatype.length != 0) {
        const fields = [];
        newField.forEach((field, index) => {
            const fieldName = field.value;
            const dataType = newDatatype[index].value;
            fields.push({ fieldName: fieldName, dataType: dataType });
        });
        axios.post('http://127.0.0.1:3000/table/add-table/', {
            tableName: tableName,
            fields: fields
        })
            .then(response => {
                document.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }
    else {
        alert("Please add column fields");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tableList = document.getElementById("tableList");
    axios.get("http://127.0.0.1:3000/table/get-tables")
        .then((res) => {
            const tables = res.data.tables;
            tables.forEach((table) => {
                const a = document.createElement("a");
                a.classList.add('table-link');
                a.id = table;
                a.addEventListener('click', () => {
                    fetchRecords(table);
                });
                const li = document.createElement("li");
                li.innerText = table;
                a.appendChild(li);
                tableList.appendChild(a);
            })
        })
        .catch(err => console.log(err))
})

function fetchRecords(table) {
    localStorage.setItem('table', table);
    axios.get(`http://127.0.0.1:3000/table/${table}`)
        .then((res) => {
            const tableElement = document.querySelector("table");
            const records = document.getElementById("records");
            const newRecord = document.getElementById("new-record");
            const insertRecordForm = document.getElementById("insert-record-form");
            insertRecordForm.onsubmit = insertRecord;
            newRecord.innerHTML = "";
            tableElement.innerHTML = '';
            const existingButton = document.querySelector(".insert-record");
            if (existingButton) {
                records.removeChild(existingButton);
            }
            const trh = document.createElement("tr");
            res.data.headers.forEach((head) => {
                if (head != 'id' && head != "createdAt" && head != "updatedAt") {
                    const th = document.createElement("th");
                    th.innerText = head;
                    trh.appendChild(th);
                    const div = document.createElement("div");
                    div.classList.add("newColumn");
                    const newField = document.createElement("input");
                    newField.placeholder = head;
                    newField.name = head;
                    newField.required = true;
                    newField.classList.add("newField");
                    div.appendChild(newField);
                    newRecord.appendChild(div);
                }
            });
            const th = document.createElement("th");
            trh.appendChild(th);
            tableElement.appendChild(trh);
            if (res.data.records && res.data.records.length > 0) {
                res.data.records.forEach((rows) => {
                    const tr = document.createElement("tr");
                    tr.id = rows.id;
                    Object.entries(rows).forEach(([key, value]) => {
                        if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
                            const td = document.createElement("td");
                            td.innerText = value;
                            tr.appendChild(td);
                        }
                    });
                    const td = document.createElement("td");
                    td.innerHTML = `<button class='del-btn' type='button' onclick=handleRecordDelete(event)>X</button>`;
                    tr.appendChild(td);
                    tableElement.appendChild(tr);
                });
            }
            else {
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.innerText = "No data available";
                tr.appendChild(td);
                tableElement.appendChild(tr);
            }
            const button = document.createElement("button");
            button.innerText = "Insert a record";
            button.classList.add("insert-record");
            button.addEventListener('click', () => {
                insertRecordDialog();
            });
            records.appendChild(button);
        })
        .catch(err => console.log(err));
}

function insertRecordDialog() {
    const dialog = document.getElementById("insert-record-dialog");
    dialog.open = !dialog.open;
}

function insertRecord(e) {
    e.preventDefault();
    table = localStorage.getItem('table')
    const formData = new FormData(e.target);
    const data = {};
    for (const [name, value] of formData.entries()) {
        data[name] = value;
    }
    axios.post(`http://127.0.0.1:3000/table/add-record/${table}`, data)
        .then(response => {
            const tableId = document.getElementById(table);
            insertRecordDialog();
            tableId.click();
        })
        .catch(error => {
            alert("Please check the datatype of field");
        });
}

function handleRecordDelete(e) {
    const row = e.target.parentElement.parentElement;
    table = localStorage.getItem('table')
    const id = row.id;
    axios.delete(`http://127.0.0.1:3000/table/delete-record/${table}/${id}`)
        .then(response => {
            row.remove();
        })
        .catch(error => {
            console.log(err);
        });

}


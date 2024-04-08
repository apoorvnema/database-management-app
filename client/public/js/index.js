const form = document.querySelector(".add-table");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.querySelector("modal");
    if (modal.style.display === "block") {
        modal.style.display = "none";
    }
    else {
        modal.style.display = "block";
    }
});

const addAnother = document.getElementById("add-another");
addAnother.addEventListener("click", () => {
    const fieldNames = document.querySelector("#fieldNames");
    const dataField = document.createElement("input");
    dataField.type = "text";
    dataField.name = "field";
    dataField.placeholder = "Field Name";
    dataField.required = true;
    const dataType = document.createElement("select");
    dataType.name = "type";
    const option1 = document.createElement("option");
    option1.value = "STRING";
    option1.innerText = "STRING";
    const option2 = document.createElement("option");
    option2.value = "INTEGER";
    option2.innerText = "INTEGER";
    const option3 = document.createElement("option");
    option3.value = "BOOLEAN";
    option3.innerText = "BOOLEAN";
    dataType.appendChild(option1);
    dataType.appendChild(option2);
    dataType.appendChild(option3);
    fieldNames.appendChild(dataField);
    fieldNames.appendChild(dataType);
    const br = document.createElement("br");
    fieldNames.appendChild(br);
});

const createTable = document.getElementById("create-table");
createTable.addEventListener("submit", (e) => {
    e.preventDefault();
    const tableName = e.target.tableName.value;
    const fields = [];
    const fieldInputs = document.querySelectorAll("#fieldNames input[name='field']");
    const dataTypeSelects = document.querySelectorAll("#fieldNames select[name='type']");
    fieldInputs.forEach((input, index) => {
        const fieldName = input.value;
        const dataType = dataTypeSelects[index].value;
        fields.push({ fieldName: fieldName, dataType: dataType });
    });
    const tableData = {
        tableName: tableName,
        fields: fields
    };
    axios.post('http://127.0.0.1:3000/table/addTable', tableData)
        .then(() => {
            document.location.reload();
        })
        .catch(err => console.log(err));
});


document.addEventListener("DOMContentLoaded", () => {
    const tableData = document.querySelector("#table-data");
    axios.get('http://127.0.0.1:3000/table/getTables')
        .then(res => {
            res.data.tables.forEach(table => {
                const a = document.createElement("a");
                a.href = `/table/${table}`;
                li = document.createElement("li");
                li.innerText = table;
                a.appendChild(li);
                tableData.appendChild(a);
            });
        })
        .catch(err => console.log(err));
});

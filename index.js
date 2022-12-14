const addIncomeBtn = document.getElementById("addIncomeBtn");

let allIncomeList = [];
let allIncomeSum = '';
let incomeLastId = 1;
let incomeIdSplitMain = []

addIncomeBtn.addEventListener("click", function () {
    const newIncomeName = document.getElementById("new-income-name");
    const newIncomePrice = document.getElementById("new-income-price");
    const income = {
        name: newIncomeName.value,
        price: Number(newIncomePrice.value),
        id: `income-${incomeLastId}`,
    };

    if (income.price < 0) {
        return (alert('musisz podać liczbę większą od zera!'))
    }

    allIncomeList.push(income);
    incomeLastId++;

    updateAllIncomeList();
    incomeSum(allIncomeList);
    budgetSum()
});

function updateAllIncomeList() {
    const ulIncomeList = document.getElementById('ul-income');
    ulIncomeList.innerText = '';
    
    allIncomeList.forEach(function (income) {

        const incomeIdSplit = income.id.split('-');
        incomeIdSplitMain.push(incomeIdSplit)

        const incomeLi = document.createElement('li');
        incomeLi.innerText = `${income.name} :${income.price} zł`;
        incomeLi.classList.add('li-separator');
        incomeLi.id = `li-income-${incomeIdSplit[1]}`;

        const incomeLiDivButtons = document.createElement('div');

        const editIncomeBtn = document.createElement('button');
        editIncomeBtn.innerText = 'Edytuj';
        editIncomeBtn.id = `editIncomeBtn-${incomeIdSplit[1]}`;
        editIncomeBtn.addEventListener('click', function () {
            const containerIncomeLiId = `li-income-${incomeIdSplit[1]}`
            const containerIncome = document.getElementById(containerIncomeLiId);
            containerIncome.innerHTML = `
            <input id="edited-income-name${incomeIdSplit[1]}" value="${income.name}"></input>
            <input id="edited-income-price${incomeIdSplit[1]}" value="${income.price}" type="number" min="0" oninput="this.value = 
            !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null">
           ></input>
            <p>*Jeśli nie chcesz nic zmieniać, pozostaw domyślne wartości</p><button onclick="onSaveIncomeButtonClicked(${incomeIdSplit[1]})">Zapisz</button>
            `
        })

        const deleteIncomeBtn = document.createElement('button');
        deleteIncomeBtn.innerText = 'Usuń';
        deleteIncomeBtn.id = `deleteIncomeBtn-${incomeIdSplit[1]}`;
        deleteIncomeBtn.addEventListener('click', function () {
            allIncomeList = allIncomeList.filter(function (elemIncome) {
                const deleteIncomeBtnId = deleteIncomeBtn.id.split('-');
                const incomeSplit = elemIncome.id.split('-');
                return Number(incomeSplit[1]) !== Number(deleteIncomeBtnId[1]);
            });
            updateAllIncomeList();
            incomeSum(allIncomeList);
            budgetSum()
        });
        incomeLiDivButtons.appendChild(deleteIncomeBtn);
        incomeLiDivButtons.appendChild(editIncomeBtn);
        incomeLi.appendChild(incomeLiDivButtons);
        ulIncomeList.appendChild(incomeLi);

    });
    
}

function onSaveIncomeButtonClicked(incomeIdSplitMain) {
    const income = allIncomeList.find(elem => elem.id === `income-${incomeIdSplitMain}`);
    const inputIncomeElemValue = document.getElementById(`edited-income-name${incomeIdSplitMain}`);
    income.name = inputIncomeElemValue.value;
    const inputIncomeElemPrice = document.getElementById(`edited-income-price${incomeIdSplitMain}`);
    income.price = Number(inputIncomeElemPrice.value)

    updateAllIncomeList()
    incomeSum(allIncomeList)
    budgetSum()
}

function incomeSum(allIncomeList) {
    let i1 = 0;
    let sum1 = 0;
    while (i1 < allIncomeList.length) {
        sum1 += allIncomeList[i1].price;
        i1++;
    }
    const incomeSum = document.getElementById('income-sum-value');
    incomeSum.innerText = `${sum1} zł`;
    allIncomeSum = Number(sum1);
};

const addExpensesBtn = document.getElementById("addExpensesBtn");

let allExpensesList = [];
let allExpensesSum = '';
let expensesLastId = 1;
let expensesIdSplitMain = []

addExpensesBtn.addEventListener("click", function () {

    const newExpensesName = document.getElementById("new-expenses-name");
    const newExpensesPrice = document.getElementById("new-expenses-price");
    const expenses = {
        name: newExpensesName.value,
        price: Number(newExpensesPrice.value),
        id: `expenses-${expensesLastId}`,
    };

    if (expenses.price < 0) {
        return (alert('musisz podać liczbę większą od zera!'))
    }
    allExpensesList.push(expenses);
    expensesLastId++;

    updateAllExpensesList();
    expensesSum(allExpensesList);
    budgetSum()

});

function updateAllExpensesList() {
    const ulExpensesList = document.getElementById('ul-expenses');
    ulExpensesList.innerText = '';

    allExpensesList.forEach(function (expenses) {

        let expensesIdSplit = expenses.id.split('-');
        expensesIdSplitMain.push(expensesIdSplit)

        const expensesLi = document.createElement('li');
        expensesLi.innerText = `${expenses.name} :${expenses.price} zł`;
        expensesLi.classList.add('li-separator');
        expensesLi.id = `li-expenses-${expensesIdSplit[1]}`;

        const expensesLiDivButtons = document.createElement('div');

        const editExpensesBtn = document.createElement('button');
        editExpensesBtn.innerText = 'Edytuj';
        editExpensesBtn.id = `editIncomeBtn-${expensesIdSplit[1]}`;
        editExpensesBtn.addEventListener('click', function () {
            const containerExpensesLiId = `li-expenses-${expensesIdSplit[1]}`
            const containerExpenses = document.getElementById(containerExpensesLiId);
            containerExpenses.innerHTML = `
            <input id="edited-expenses-name${expensesIdSplit[1]}" value="${expenses.name}" ></input>
            <input id="edited-expenses-price${expensesIdSplit[1]}" value="${expenses.price}" type="number" min="0" oninput="this.value = 
            !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null">
           ></input>
            <p>*Jeśli nie chcesz nic zmieniać, pozostaw domyślne wartości</p><button onclick="onSaveExpensesButtonClicked(${expensesIdSplit[1]})">Zapisz</button>
            `
        })

        const deleteExpensesBtn = document.createElement('button');
        deleteExpensesBtn.innerText = 'Usuń';
        deleteExpensesBtn.id = `deleteExpensesBtn-${expensesIdSplit[1]}`;
        deleteExpensesBtn.addEventListener('click', function () {
            allExpensesList = allExpensesList.filter(function (elemExpenses) {
                let deleteExpensesBtnId = deleteExpensesBtn.id.split('-');
                let expensesSplit = elemExpenses.id.split('-');
                return Number(expensesSplit[1]) !== Number(deleteExpensesBtnId[1]);
            });
            updateAllExpensesList();
            expensesSum(allExpensesList);
            budgetSum()
        });
        expensesLiDivButtons.appendChild(deleteExpensesBtn);
        expensesLiDivButtons.appendChild(editExpensesBtn); 
        expensesLi.appendChild(expensesLiDivButtons); 
        ulExpensesList.appendChild(expensesLi);

    });
}

function onSaveExpensesButtonClicked(expensesIdSplitMain) {
    const expenses = allExpensesList.find(elem => elem.id === `expenses-${expensesIdSplitMain}`);
    const inputExpensesElemValue = document.getElementById(`edited-expenses-name${expensesIdSplitMain}`);
    expenses.name = inputExpensesElemValue.value;
    const inputExpensesElemPrice = document.getElementById(`edited-expenses-price${expensesIdSplitMain}`);
    expenses.price = Number(inputExpensesElemPrice.value)
    updateAllExpensesList()
    expensesSum(allExpensesList)
    budgetSum()
}

function expensesSum(allExpensesList) {
    let i2 = 0;
    let sum2 = 0;
    while (i2 < allExpensesList.length) {
        sum2 += allExpensesList[i2].price;
        i2++;
    }
    const expensesSum = document.getElementById('expenses-sum-value');
    expensesSum.innerText = `${sum2} zł`;
    allExpensesSum = Number(sum2);
};

function budgetSum() {
    const budget = allIncomeSum - allExpensesSum;
    const moneyLeftValue = document.getElementById('money-left-value')
    const moneyLeftStyle = document.querySelector('.money-left')
    if (budget > 0) {
        moneyLeftValue.innerText = `Możesz jeszcze wydać ${budget} zł`
        moneyLeftStyle.style.backgroundColor = "green";

    } else if (budget < 0) {
        moneyLeftValue.innerText = `Bilans jest ujemny. Jesteś na minusie ${budget} zł`
        moneyLeftStyle.style.backgroundColor = "red";
    } else {
        moneyLeftValue.innerText = 'Bilans wynosi zero'
        moneyLeftStyle.style.backgroundColor = "yellow";
    }

}
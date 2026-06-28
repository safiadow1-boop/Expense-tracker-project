const balandceElemet = document.getElementById("balance");
const incomeamount = document.getElementById("income-amount");
const expensesamount = document.getElementById("expense-amount");
const transactionlist = document.getElementById("transaction-list");
const transactionform = document.getElementById("transaction-form");
const descriptionElement = document.getElementById("description");
const amountElement = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionform.addEventListener("submit", addtransaction);

function addtransaction(event) {
    event.preventDefault();

    const description = descriptionElement.value.trim();
    const amount = parseFloat(amountElement.value);

    transactions.push({
        id: Date.now(),
        description,
        amount
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updatetransactionlist();
    updatesummary();

    transactionform.reset();
}

function updatetransactionlist() {
    transactionlist.innerHTML = "";

    const sortedtransaction = [...transactions].reverse();

    sortedtransaction.forEach((transaction) => {
        const transactionEL = createtransanctionElment(transaction);
        transactionlist.appendChild(transactionEL);
    });
}

function createtransanctionElment(transaction) {
    const li = document.createElement("li");

    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expenses");

    li.innerHTML = `
        <span>${transaction.description}</span>

        <span>
            ${formatcurrency(transaction.amount)}

            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
                X
            </button>
        </span>
    `;

    return li;
}

function updatesummary() {

    const balance = transactions.reduce(
        (accumulator, transaction) => accumulator + transaction.amount,
        0
    );

    const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce(
            (accumulator, transaction) => accumulator + transaction.amount,
            0
        );

    const expenses = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce(
            (accumulator, transaction) => accumulator + transaction.amount,
            0
        );

    balandceElemet.textContent = formatcurrency(balance);
    incomeamount.textContent = formatcurrency(income);
    expensesamount.textContent = formatcurrency(expenses);
}

function formatcurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(number);
}
function removeTransaction(id){
    transactions=transactions.filter(transaction=>transaction.id!==id)
    localStorage.setItem("transactions",JSON.stringify(transactions))
    updatetransactionlist();
    updatesummary();
}

updatetransactionlist();
updatesummary();
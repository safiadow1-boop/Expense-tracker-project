const balanceEL = document.getElementById("balance");
const incomeAmount = document.getElementById("income-amount");
const expensesAmount = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const descriptionEL = document.getElementById("description");
const amountEL = document.getElementById("amount");
const transactionForm = document.getElementById("transaction-form");
let transactions=JSON.parse(localStorage.getItem("transactions"))||[];
transactionForm.addEventListener("submit",addTransaction);
function addTransaction(event){
    event.preventDefault();
    const description=descriptionEL.value.trim();
    const amount=parseFloat(amountEL.value);
    transactions.push({
        id:Date.now(),
        description,
        amount
    })
 localStorage.setItem("transactions",JSON.stringify(transactions));
 updatetransactionlist();
 updatesummary();
 transactionForm.reset();
}
function updatetransactionlist(){
    transactionList.innerHTML="";
    const sortedtransactions=[...transactions].reverse();
    sortedtransactions.forEach((transaction)=>{
        const transactionEl=createtransactionElement(transaction)
        transactionList.appendChild(transactionEl)
    })
}
function createtransactionElement(transaction){
    const li=document.createElement("li");
    li.classList.add("transaction")
        li.classList.add(transaction.amount > 0 ? "income" : "expenses");
        li.innerHTML=`
        <span>${transaction.description}</span>
        <span>${formatCurrency(transaction.amount)}
        <button class="delete-btn" onclick="RemoveTransactions(${transaction.id})">X</button>
    
        </span>
        `;
        return li;



}
function updatesummary(){
    const balance=transactions.reduce((accumulator,transaction)=>accumulator+transaction.amount,0
    );
    const income=transactions.filter(transaction=>transaction.amount>0)
                  .reduce((accumulator,transaction)=>accumulator+transaction.amount,0
                );
 const expenses=transactions.filter(transaction=>transaction.amount < 0)
                  .reduce((accumulator,transaction)=>accumulator+transaction.amount,0
                );

balanceEL.textContent=formatCurrency(balance);
incomeAmount.textContent=formatCurrency(income);
expensesAmount.textContent=formatCurrency(expenses);
                }

function formatCurrency(number){
    return new Intl.NumberFormat("en-KE",{
        style:"currency",
        currency:"KES"
    }).format(number);
  
}

function RemoveTransactions(id){
transactions.filter(transaction=>transaction.id !==id);
updatetransactionlist();
updatesummary();
}

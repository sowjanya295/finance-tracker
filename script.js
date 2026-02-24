const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionListEl = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add transaction
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  
  if(description === '' || isNaN(amount)) {
    alert('Please enter valid description and amount');
    return;
  }
  
  const transaction = {
    id: Date.now(),
    description,
    amount,
  };
  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
  
  descriptionInput.value = '';
  amountInput.value = '';
});

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

// Render transactions and update balance
function renderTransactions() {
  transactionListEl.innerHTML = '';
    let income = 0, expense = 0, balance = 0;
  
  transactions.forEach(t => {
    const li = document.createElement('li');
    li.classList.add(t.amount > 0 ? 'plus' : 'minus');
    li.innerHTML = `
      ${t.description} <span>${t.amount > 0 ? '+' : ''}₹${t.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">x</button>
    `;
    transactionListEl.appendChild(li);
    
    if(t.amount > 0) income += t.amount;
    else expense += t.amount;
  });
   balance = income + expense;
  
  balanceEl.textContent = balance.toFixed(2);
  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = Math.abs(expense).toFixed(2);
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

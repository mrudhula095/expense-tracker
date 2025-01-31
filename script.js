const expenseForm = document.getElementById("expense-form");
const expenseTableBody = document.querySelector("#expense-table tbody");
const totalExpenseDisplay = document.getElementById("total-expense");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Add Expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("expense-name").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;

  const expense = { name, amount, category, id: Date.now() };
  expenses.push(expense);

  updateUI();
  saveToLocalStorage();
  expenseForm.reset();
});

// Update UI
function updateUI() {
  expenseTableBody.innerHTML = "";
  let totalExpense = 0;

  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${expense.name}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
    `;

    expenseTableBody.appendChild(row);
    totalExpense += expense.amount;
  });

  totalExpenseDisplay.textContent = `Total: $${totalExpense.toFixed(2)}`;
}

// Delete Expense
expenseTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    expenses = expenses.filter((expense) => expense.id !== parseInt(id));
    updateUI();
    saveToLocalStorage();
  }
});

// Save to Local Storage
function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Initialize UI
updateUI();

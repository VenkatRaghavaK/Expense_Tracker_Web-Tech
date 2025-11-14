
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

let chart;
const ctx = () => document.getElementById("expenseChart");

function renderChart() {
  const labels = expenses.map(e => e.title);
  const data = expenses.map(e => Number(e.amount));

  if (chart) chart.destroy();

  chart = new Chart(ctx(), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Expense Amounts',
        data,
        borderWidth: 1
      }]
    }
  });
}

function renderExpenses() {
  const list = document.getElementById('expenseList');
  const total = document.getElementById('total');

  list.innerHTML = '';
  let sum = 0;

  expenses.forEach((exp, index) => {
    sum += Number(exp.amount);
    list.innerHTML += `
      <li>
        ${exp.title} - ₹${exp.amount}
        <span class="actions">
          <button onclick="editExpense(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        </span>
      </li>`;
  });

  total.innerText = sum;
  localStorage.setItem('expenses', JSON.stringify(expenses));

  renderChart();
}

function addExpense() {
  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;

  if (!title || !amount) return alert('Enter all fields');

  expenses.push({ title, amount });
  document.getElementById('title').value = '';
  document.getElementById('amount').value = '';

  renderExpenses();
}

function editExpense(index) {
  const newTitle = prompt('Edit title', expenses[index].title);
  const newAmount = prompt('Edit amount', expenses[index].amount);

  if (newTitle && newAmount) {
    expenses[index] = { title: newTitle, amount: newAmount };
    renderExpenses();
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

renderExpenses();

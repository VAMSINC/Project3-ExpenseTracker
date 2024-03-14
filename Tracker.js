document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const balanceElement = document.getElementById('balance');

    // Retrieve expenses from local storage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    updateUI();

    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (description && !isNaN(amount)) {
            const expense = {
                id: new Date().getTime(),
                description: description,
                amount: amount
            };

            expenses.push(expense);
            saveExpensesToLocalStorage();
            updateUI();
            expenseForm.reset();
        }
    });

    expenseList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            const expenseId = parseInt(e.target.parentElement.dataset.id);
            expenses = expenses.filter(expense => expense.id !== expenseId);
            saveExpensesToLocalStorage();
            updateUI();
        }
    });

    function saveExpensesToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function calculateBalance() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        return total.toFixed(2);
    }

    function updateUI() {
        expenseList.innerHTML = '';
        balanceElement.textContent = calculateBalance();

        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.dataset.id = expense.id;
            li.innerHTML = `
                <span>${expense.description}</span>
                <span>$${expense.amount.toFixed(2)}</span>
                <span class="delete">X</span>
            `;
            expenseList.appendChild(li);
        });
    }
});

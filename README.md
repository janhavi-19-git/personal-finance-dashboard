# personal-finance-dashboard
A beginner friendly personal finance dashboard built with HTML , CSS , and JAVASCRIPT
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Personal Finance Dashboard</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">

        <h1>💰 Personal Finance Dashboard</h1>

        <p class="subtitle">
            Track your income, expenses and savings.
        </p>

        <!-- Income -->
        <div class="card">
            <h2>💵 Monthly Income</h2>

            <input
                type="number"
                id="income"
                placeholder="Enter your monthly income"
            >
        </div>

        <!-- Expenses -->
        <div class="card">

            <h2>💸 Monthly Expenses</h2>

            <label>🏠 Rent</label>
            <input type="number" id="rent" placeholder="₹">

            <label>🍔 Food</label>
            <input type="number" id="food" placeholder="₹">

            <label>🚗 Travel</label>
            <input type="number" id="travel" placeholder="₹">

            <label>🛍️ Shopping</label>
            <input type="number" id="shopping" placeholder="₹">

            <label>📚 Education</label>
            <input type="number" id="education" placeholder="₹">

            <label>🎮 Entertainment</label>
            <input type="number" id="entertainment" placeholder="₹">

        </div>

        <button onclick="calculateFinance()">
            Calculate My Finances
        </button>

        <!-- Results -->
        <div class="results">

            <h2>📊 My Results</h2>

            <div class="result-box">
                <span>Total Expenses</span>
                <strong>₹<span id="total">0</span></strong>
            </div>

            <div class="result-box">
                <span>Money Remaining</span>
                <strong>₹<span id="remaining">0</span></strong>
            </div>

            <div class="result-box">
                <span>Savings Percentage</span>
                <strong><span id="savings">0</span>%</strong>
            </div>

            <p id="message"></p>

        </div>

    </div>

    <script src="script.js"></script>

</body>

</html>   
* {
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 30px;
    background: #f4f0ff;
    color: #333;
}

.container {
    max-width: 650px;
    margin: auto;
}

h1 {
    text-align: center;
    margin-bottom: 8px;
}

.subtitle {
    text-align: center;
    margin-bottom: 30px;
    color: #666;
}

.card,
.results {
    background: white;
    padding: 25px;
    margin-bottom: 20px;
    border-radius: 18px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

h2 {
    margin-top: 0;
}

label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 13px;
    margin-top: 7px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 15px;
}

input:focus {
    outline: none;
    border-color: #8b6fd8;
}

button {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 12px;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    background: #8b6fd8;
    color: white;
}

button:hover {
    opacity: 0.9;
}

.results {
    margin-top: 20px;
}

.result-box {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    margin: 10px 0;
    background: #f7f5ff;
    border-radius: 10px;
}

.result-box strong {
    font-size: 18px;
}

#message {
    text-align: center;
    font-weight: bold;
    margin-top: 20px;
}
function calculateFinance() {

    // Get income
    let income = Number(
        document.getElementById("income").value
    );

    // Get expenses
    let rent = Number(
        document.getElementById("rent").value
    );

    let food = Number(
        document.getElementById("food").value
    );

    let travel = Number(
        document.getElementById("travel").value
    );

    let shopping = Number(
        document.getElementById("shopping").value
    );

    let education = Number(
        document.getElementById("education").value
    );

    let entertainment = Number(
        document.getElementById("entertainment").value
    );


    // Check income
    if (income <= 0) {
        alert("Please enter your monthly income.");
        return;
    }


    // Calculate total expenses
    let totalExpenses =
        rent +
        food +
        travel +
        shopping +
        education +
        entertainment;


    // Calculate remaining money
    let remaining = income - totalExpenses;


    // Calculate savings percentage
    let savingsPercentage =
        (remaining / income) * 100;


    // Show results
    document.getElementById("total").textContent =
        totalExpenses.toFixed(2);

    document.getElementById("remaining").textContent =
        remaining.toFixed(2);

    document.getElementById("savings").textContent =
        savingsPercentage.toFixed(2);


    // Show a simple message
    let message = document.getElementById("message");

    if (remaining < 0) {

        message.textContent =
            "⚠️ Your expenses are higher than your income.";

    } else if (savingsPercentage >= 30) {

        message.textContent =
            "🌟 Great! You are saving a good amount.";

    } else if (savingsPercentage >= 10) {

        message.textContent =
            "👍 Good start! Try to increase your savings.";

    } else {

        message.textContent =
            "💡 Consider reducing some expenses.";

    }
}

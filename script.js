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

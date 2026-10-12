const EXPENSES = [
    { id: "rent", label: "🏠 Rent" },
    { id: "food", label: "🍔 Food" },
    { id: "travel", label: "🚗 Travel" },
    { id: "shopping", label: "🛍️ Shopping" },
    { id: "education", label: "📚 Education" },
    { id: "entertainment", label: "🎮 Entertainment" }
];

const $ = (id) => document.getElementById(id);
const getValue = (id) => Number($(id).value);

// Smoothly counts a number up/down to its new value
function animateNumber(el, to, decimals = 2) {
    const from = parseFloat(el.textContent) || 0;
    const start = performance.now();
    const duration = 450;
    function step(now) {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = (from + (to - from) * t).toFixed(decimals);
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function getMessage(remaining, pct) {
    if (remaining < 0) return "⚠️ Your expenses are higher than your income.";
    if (pct >= 30) return "🌟 Great! You are saving a good amount.";
    if (pct >= 10) return "👍 Good start! Try to increase your savings.";
    return "💡 Consider reducing some expenses.";
}

function renderBreakdown(values, total) {
    const box = $("breakdown");
    if (total <= 0) {
        box.innerHTML = '<p class="empty">Add some expenses to see the split.</p>';
        return;
    }
    box.innerHTML = EXPENSES
        .map((e, i) => ({ label: e.label, amount: values[i] }))
        .filter((e) => e.amount > 0)
        .sort((a, b) => b.amount - a.amount)
        .map((e) => {
            const share = (e.amount / total) * 100;
            return `<div class="bar-row">
                <div class="bar-label"><span>${e.label}</span><span>${share.toFixed(0)}%</span></div>
                <div class="bar-track"><div class="bar-fill" data-w="${share}"></div></div>
            </div>`;
        }).join("");
    // set width after insert so the CSS transition plays
    requestAnimationFrame(() => {
        box.querySelectorAll(".bar-fill").forEach((b) => (b.style.width = b.dataset.w + "%"));
    });
}

// manual = true when the button is clicked (shows errors); false for live updates
function calculateFinance(manual = true) {
    const income = getValue("income");
    const values = EXPENSES.map((e) => getValue(e.id));
    const error = $("error");
    error.textContent = "";

    if (values.some((v) => Number.isNaN(v) || v < 0)) {
        if (manual) error.textContent = "Expenses must be numbers, zero or more.";
        return;
    }
    if (!(income > 0)) {
        if (manual) error.textContent = "Please enter your monthly income.";
        return;
    }

    const totalExpenses = values.reduce((sum, v) => sum + v, 0);
    const remaining = income - totalExpenses;
    const pct = (remaining / income) * 100;

    animateNumber($("total"), totalExpenses);
    animateNumber($("remaining"), remaining);
    animateNumber($("savings"), pct);

    const fill = $("meterFill");
    fill.style.width = Math.max(0, Math.min(pct, 100)) + "%";
    fill.classList.toggle("bad", remaining < 0);

    const msg = $("message");
    const text = getMessage(remaining, pct);
    if (msg.textContent !== text) {
        msg.textContent = text;
        msg.classList.remove("pop");
        void msg.offsetWidth; // restart animation
        msg.classList.add("pop");
    }

    renderBreakdown(values, totalExpenses);
}

function resetFinance() {
    ["income", ...EXPENSES.map((e) => e.id)].forEach((id) => ($(id).value = ""));
    ["total", "remaining", "savings"].forEach((id) => ($(id).textContent = "0"));
    $("meterFill").style.width = "0";
    $("message").textContent = "Enter your income to begin.";
    $("error").textContent = "";
    renderBreakdown([], 0);
    $("income").focus();
}

// Live updates while typing + Enter key to calculate
document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => calculateFinance(false));
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") calculateFinance(true); });
});

renderBreakdown([], 0);

document.addEventListener('DOMContentLoaded', () => {
    
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    const resultDisplay = document.getElementById('resultDisplay');
    const historyList = document.getElementById('historyList');
    
    const themeBtn = document.getElementById('themeToggleBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');

   
    function calculate(operation) {
        const val1 = num1.value.trim();
        const val2 = num2.value.trim();

     
        if (val1 === '' || val2 === '') {
            showResult("Please enter both numbers.", "error");
            return;
        }

        const n1 = Number(val1);
        const n2 = Number(val2);
        let result = 0;
        let symbol = '';

        
        if (operation === 'add') {
            result = n1 + n2;
            symbol = '+';
        } else if (operation === 'sub') {
            result = n1 - n2;
            symbol = '-';
        } else if (operation === 'mul') {
            result = n1 * n2;
            symbol = 'x';
        } else if (operation === 'div') {
            if (n2 === 0) {
                showResult("Cannot divide by zero!", "error");
                return;
            }
            result = n1 / n2;
            symbol = '÷';
        }

       
        if (!Number.isInteger(result)) {
            result = Math.round(result * 100000) / 100000;
        }

        showResult(result, "success");
        updateHistory(n1, symbol, n2, result);
    }

    function showResult(text, type) {
        resultDisplay.textContent = text;
        resultDisplay.className = `result-box ${type}`;
    }

    function updateHistory(n1, op, n2, res) {
        const placeholder = historyList.querySelector('.empty-history');
        if (placeholder) placeholder.remove();

        const li = document.createElement('li');
        li.textContent = `${n1} ${op} ${n2} = ${res}`;
        historyList.prepend(li); 
    }

    
    document.getElementById('addBtn').addEventListener('click', () => calculate('add'));
    document.getElementById('subBtn').addEventListener('click', () => calculate('sub'));
    document.getElementById('mulBtn').addEventListener('click', () => calculate('mul'));
    document.getElementById('divBtn').addEventListener('click', () => calculate('div'));

    
    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '<li class="empty-history">No recent calculations</li>';
    });

    
    themeBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
            themeBtn.textContent = '☀️ Light Mode';
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            themeBtn.textContent = '🌙 Dark Mode';
        }
    });
});
// This object holds the conversion multipliers relative to CS:GO
const gameMultipliers = {
    'csgo': 1,
    'valorant': 3.181818,
    'overwatch': 10.606060,
    'fortnite': 13.257575
};

// Select all the new elements from the new HTML
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');

// --- Main Calculation Function ---
function calculate() {
    // Get all the values from the new form
    const fromGame = document.getElementById('from-game').value;
    const toGame = document.getElementById('to-game').value;
    const fromSens = parseFloat(document.getElementById('from-sens').value);
    const fromDpi = parseInt(document.getElementById('from-dpi').value);
    const toDpi = parseInt(document.getElementById('to-dpi').value);

    // Check if all inputs are valid numbers
    if (isNaN(fromSens) || isNaN(fromDpi) || isNaN(toDpi)) {
        // You can change this alert message to Arabic if you want
        alert('Please fill in all sensitivity and DPI fields with valid numbers.');
        return;
    }

    // --- New, more complex calculations ---
    // 1. Convert "From" sensitivity to a common base (CS:GO sens)
    const baseSens = fromSens / gameMultipliers[fromGame];

    // 2. Convert the base sensitivity to the "To" game sensitivity
    let convertedSens = baseSens * gameMultipliers[toGame];

    // 3. Adjust sensitivity for the new DPI
    convertedSens = convertedSens * (fromDpi / toDpi);

    // 4. Calculate the new eDPI
    const newEdpi = convertedSens * toDpi;

    // 5. Calculate cm/360 (based on CS:GO formula, it's a universal physical measurement)
    const baseEdpiForCm360 = baseSens * fromDpi;
    const cm360 = (360 / (0.022 * baseEdpiForCm360)) * 2.54;
    const in360 = cm360 / 2.54;

    // --- Display all the new results in their spans ---
    document.getElementById('converted-sens').textContent = convertedSens.toFixed(4);
    document.getElementById('edpi-result').textContent = newEdpi.toFixed(0);
    document.getElementById('cm360-result').textContent = cm360.toFixed(2);
    document.getElementById('in360-result').textContent = in360.toFixed(2);
}

// --- Reset Function ---
function reset() {
    // Clear all inputs
    document.getElementById('from-sens').value = '';
    document.getElementById('from-dpi').value = '';
    document.getElementById('to-dpi').value = '';
    document.getElementById('from-game').value = 'valorant'; // Reset to default
    document.getElementById('to-game').value = 'valorant';   // Reset to default

    // Reset all results to '-'
    document.getElementById('converted-sens').textContent = '-';
    document.getElementById('edpi-result').textContent = '-';
    document.getElementById('cm360-result').textContent = '-';
    document.getElementById('in360-result').textContent = '-';
}

// --- Event Listeners ---
// Link functions to buttons
calculateBtn.addEventListener('click', calculate);
resetBtn.addEventListener('click', reset);
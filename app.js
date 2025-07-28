/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
/*-------------------------------- Variables --------------------------------*/
let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForOperand = false;
/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.innerText;

    if (button.classList.contains("number")) {
      inputNumber(value);
    } else if (button.classList.contains("operator")) {
      if (value === "C") {
        clear();
      } else {
        inputOperator(value);
      }
    } else if (button.classList.contains("equals")) {
      calculate();
    }
  });
});
/*-------------------------------- Functions --------------------------------*/
function inputNumber(num) {
  if (waitingForOperand) {
    displayValue = num;
    waitingForOperand = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
  updateDisplay();
}

function inputOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);
  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const newValue = performCalculation(firstOperand, inputValue, operator);
    displayValue = String(newValue);
    firstOperand = newValue;
    updateDisplay();
  }

  operator = nextOperator;
  waitingForOperand = true;
}

function calculate() {
  const inputValue = parseFloat(displayValue);

  if (firstOperand !== null && operator) {
    const newValue = performCalculation(firstOperand, inputValue, operator);
    displayValue = String(newValue);
    firstOperand = null;
    operator = null;
    waitingForOperand = true;
    updateDisplay();
  }
}

function performCalculation(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return secondOperand !== 0 ? firstOperand / secondOperand : "Error";
    default:
      return secondOperand;
  }
}

function clear() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  waitingForOperand = false;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = displayValue;
}
// Initialize the display
updateDisplay();

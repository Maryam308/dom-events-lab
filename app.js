/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let currentDisplayValue = '0';
let firstOperand = null;
let awaitingOperand = false;
let pendingOperator = null;
/*------------------------ Cached Element References ------------------------*/
const calculatorButtons = document.querySelectorAll('.button');
const displayElement = document.querySelector('.display');
/*----------------------------- Event Listeners -----------------------------*/
calculatorButtons.forEach((button)=>{
  button.addEventListener('click',(event)=>{
    if(button.classList.contains('number')){
        console.log("Number is: "+event.target.textContent);
        inputNumber(event.target.textContent);
    } else if(button.classList.contains('operator')){
      console.log("Operator is: "+event.target.textContent);
      //if it equals C then reset the displayed value 
      if(event.target.textContent === 'C'){
        clear();
      }else{
        inputOperator(event.target.textContent);
      }
    } else if(button.classList.contains('equals')){
      handleEquals();
    }
  
  })
})
/*-------------------------------- Functions --------------------------------*/
const updateDisplay = (value) => {
  displayElement.textContent =value;
}

const inputNumber= (number) => {
  //If waiting for operand: replace display with this number, set waiting to false
  if(awaitingOperand){
    currentDisplayValue = number;
    awaitingOperand = false;
  }else {
    currentDisplayValue = currentDisplayValue === '0' ? number : currentDisplayValue + number;
  }
  updateDisplay(currentDisplayValue);
 
}

const inputOperator = (operator) => {
  const inputValue = parseFloat(currentDisplayValue);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (pendingOperator) {
    // Calculate with previous operator
    const result = calculate(firstOperand, inputValue, pendingOperator);
    updateDisplay(result);
    firstOperand = result;
  }
  pendingOperator = operator; // Store the new operator
  awaitingOperand = true;
}

const clear = () => {
  currentDisplayValue = '0';
  firstOperand = null;
  awaitingOperand = false;
  pendingOperator = null;
  updateDisplay(currentDisplayValue);
}

const calculate = (firstOperand, secondOperand, operator) => { 
  switch(operator){
    case '+':
      return firstOperand + secondOperand;
      break;
    case '-':
      return firstOperand - secondOperand;
      break;
    case '*':
      return firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        return 'Error';
        break;
      }
      return firstOperand / secondOperand;
      break;
    default:  
      return 'Invalid operator';
  }
}

const handleEquals = () => {
  const secondOperand = parseFloat(currentDisplayValue);
  if (firstOperand !== null && pendingOperator !== null) {
    const result = calculate(firstOperand, secondOperand, pendingOperator);
    updateDisplay(result);
    currentDisplayValue = result.toString();
    firstOperand = null;
    pendingOperator = null;
    awaitingOperand = true;
  }
}

//initialize the display 
updateDisplay(currentDisplayValue);

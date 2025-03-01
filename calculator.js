// calculator.js
document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const operation = urlParams.get("operation");
  const number = parseFloat(urlParams.get("number"));

  // Get DOM elements
  const titleElement = document.getElementById("title");
  const inputElement = document.getElementById("input");
  const calculateBtn = document.getElementById("calculateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const resultDisplay = document.getElementById("resultDisplay");

  // Set operation symbol and title
  let operationSymbol = "";
  switch (operation) {
    case "add":
      titleElement.textContent = "Add to " + number;
      operationSymbol = "+";
      break;
    case "subtract":
      titleElement.textContent = "Subtract from " + number;
      operationSymbol = "-";
      break;
    case "multiply":
      titleElement.textContent = "Multiply " + number + " by";
      operationSymbol = "×";
      break;
    case "divide":
      titleElement.textContent = "Divide " + number + " by";
      operationSymbol = "/";
      break;
    case "percentage":
      titleElement.textContent = "Calculate percentage of " + number;
      operationSymbol = "%";
      break;
  }

  // Focus the input field
  inputElement.focus();

  // Calculate button event listener
  calculateBtn.addEventListener("click", function () {
    const inputValue = parseFloat(inputElement.value);

    if (isNaN(inputValue)) {
      resultDisplay.textContent = "Please enter a valid number";
      resultDisplay.style.display = "block";
      copyBtn.style.display = "none";
      return;
    }

    let result;
    switch (operation) {
      case "add":
        result = number + inputValue;
        break;
      case "subtract":
        result = number - inputValue;
        break;
      case "multiply":
        result = number * inputValue;
        break;
      case "divide":
        if (inputValue === 0) {
          resultDisplay.textContent = "Cannot divide by zero";
          resultDisplay.style.display = "block";
          copyBtn.style.display = "none";
          return;
        }
        result = number / inputValue;
        break;
      case "percentage":
        result = (inputValue / 100) * number;
        break;
    }

    resultDisplay.textContent = `Result: ${number} ${operationSymbol} ${inputValue} = ${result} \u20B9`;

    resultDisplay.style.display = "block";
    copyBtn.style.display = "block";
    copyBtn.dataset.result = result.toString();
  });

  // Copy button event listener
  copyBtn.addEventListener("click", function () {
    const result = copyBtn.dataset.result;
    navigator.clipboard.writeText(result).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 1500);
    });
  });

  // Enter key to calculate
  inputElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      calculateBtn.click();
    }
  });
});

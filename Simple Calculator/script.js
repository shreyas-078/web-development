const calculatorBody = document.querySelector(".calc-body");
const resultBox = document.querySelector(".calc-output");

let resExp = "";

calculatorBody.addEventListener("click", (event) => {
  let result;
  if (resultBox.value === "Syntax Err" || resultBox.value === NaN) {
    resultBox.value = "";
  }
  if (event.target.classList.contains("calc-body")) {
    return;
  }
  if (event.target.textContent === "C") {
    resExp = String(resExp).slice(0, resExp.length - 1);
    resultBox.value = resExp;
    return;
  }
  if (event.target.textContent === "%") {
    result = resExp / 100;
    resExp = result;
    resultBox.value = result;
    return;
  }
  if (event.target.textContent === "=") {
    try {
      result = eval(resExp);
      if (result === undefined) {
        resultBox.value = "SE/Empty";
        resExp = "";
        result = "";
        return;
      }
      if (result === resultBox.value) {
        return;
      }
    } catch (error) {
      resultBox.value = "Syntax Err";
      resExp = "";
      result = "";
      return;
    }
    resultBox.value = result;
    resExp = result;
    return;
  }
  if (event.target.textContent === "AC") {
    resExp = "";
    resultBox.value = "";
    return;
  }
  resExp += event.target.textContent;
  resultBox.value = resExp;
});

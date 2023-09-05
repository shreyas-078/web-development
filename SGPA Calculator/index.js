const calculateButton = document.querySelector('.calculate-sgpa');
const validHelperText = document.querySelector('.valid-marks-helper-text');
const resetButton = document.querySelector('.reset');
const yourSgpaText = document.querySelector('.your-sgpa-text');
const sgpaDisplaySection = document.querySelector('.sgpa-display');
const totalCredits = 20;

const showValidHelperText = () => {
  validHelperText.classList.remove('invisible');
};

const hideValidHelperText = () => {
  validHelperText.classList.add('invisible');
};

const resetFields = () => {
  hideValidHelperText();
  for(let i = 1; i<=8; i++) {
    document.querySelector(`#sub${i}-marks`).value = "";
  }
  yourSgpaText.textContent = `Your SGPA is: SGPA`;
  sgpaDisplaySection.classList.add('invisible');
};

const calculateSGPA = () => {
  subjectMarks = [];
  let totalCreditScore = 0; 
  let credits = 4;
  for(let i = 1; i<=8; i++) {
    if(i>2 && i<=5) {
      credits = 3;
    } else if (i>5) {
      credits = 1;
    }
    const currentMarks = document.querySelector(`#sub${i}-marks`).value;
    if(currentMarks === "" || currentMarks < 0 || currentMarks > 100) {
      showValidHelperText();
      return;
    } else {
      if(currentMarks < 40) {
        subjectMarks.push(0);
      }
      else if(currentMarks >= 40 && currentMarks < 45) {
        subjectMarks.push(4 * credits);
      }
      else if(currentMarks >= 45 && currentMarks < 60) {
        subjectMarks.push(6 * credits);
      }
      else if(currentMarks >= 60 && currentMarks < 70) {
        subjectMarks.push(7 * credits);
      }
      else if(currentMarks >= 70 && currentMarks < 80) {
        subjectMarks.push(8 * credits);
      }
      else if(currentMarks >= 80 && currentMarks < 90) {
        subjectMarks.push(9 * credits);
      }
      else if(currentMarks >= 90 && currentMarks <= 100) {
        subjectMarks.push(10 * credits);
      }
    }
  }
  subjectMarks.forEach(element => {
      totalCreditScore += element;
    });
  let sgpaVariable = (totalCreditScore/totalCredits).toFixed(2);
  console.log(sgpaVariable);
  yourSgpaText.textContent = `Your SGPA is: ${sgpaVariable}`;
  sgpaDisplaySection.classList.remove('invisible');
};


resetButton.addEventListener('click', resetFields);
calculateButton.addEventListener('click', calculateSGPA);

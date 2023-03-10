// Call class / Id
const inputDisplay = document.querySelector('.input-area input');
const scoreDisplay = document.querySelector('.score');
const darkModeBtn = document.querySelector('.change-mode');
const textTop = document.querySelector('.text-top');
const startBtn = document.querySelector('.startBtn');

// dark mode call all items
const darkModeItems = document.querySelectorAll(
  'body,header,.page-top .change-mode,.timer,.bottom-rigth .reset-button i,.text-top,.text-bottom .input-area input,.height-score-area .height-score h3,.button-list .button-item button'
);

// Change Light Mode
darkModeBtn.addEventListener('click', () => {
  darkModeItems.forEach((item) => item.classList.toggle('active'));
});

// Veriables indentification

let index = 0;
let wordsCount = '';
let errorCount = 0;
let up = 30;
let sec = 60;
let timeR = 0;

//Create Async/Await/Fetch API

async function getText() {
  try {
    const resp = await fetch('words.txt');
    const data = await resp.text();
    let text = `${data}`;
    const typeText = document.querySelector('.text-top');
    text.split('').forEach((characters) => {
      let spanTxt = document.createElement('span');
      spanTxt.innerHTML = characters;
      typeText.appendChild(spanTxt);
    });
  } catch (error) {
    console.log(error);
  }
}
// Call getText page load display.
window.addEventListener('load', getText());

// Start button add click event and start challange

startBtn.addEventListener('click', () => {
  // Call function and click to activ
  startStop();
  timer();
});

function startStop() {
  // every clicked start button action
  clearInterval(timeR);
  const timeS = document.querySelector('.timer');
  sec = 60;
  timeS.innerHTML = `1:00`;
  inputDisplay.value = '';
  textTop.scrollTo({
    top: 0,
    position: 0,
    behavior: 'smooth',
  });
  //Clear span color
  const typeText = document.querySelectorAll('span');
  typeText.forEach((item) => {
    item.classList.remove('correct');
    item.classList.remove('incorrect');
    index = 0;
    errorCount = 0;
  });
  // textarea scroll top 0
  up = 0;
}
//Input Action
inputDisplay.addEventListener('input', (e) => {
  let userValue = inputDisplay.value.split('');
  // console.log(userValue);

  const typeText = document.querySelectorAll('span');
  // console.log(userValue);
  if (e.inputType === 'deleteContentBackward') {
    index--;
    typeText[index].classList.remove('correct');
    typeText[index].classList.remove('incorrect');
  } else if (userValue[index] === typeText[index].innerText) {
    typeText[index].classList.add('correct');
    index++;
  } else {
    typeText[index].classList.add('incorrect');
    index++;
    errorCount++;
  }
});
//Create 1 second timer
function timer() {
  const timeS = document.querySelector('.timer');
  timeR = setInterval(function () {
    sec--;
    timeS.innerHTML = `0:${sec}`;
    if (sec <= 0) {
      clearInterval(timeR);
      timeS.innerHTML = `1:00`;
      //Height scores control setting time 0 than
      wordsCount = inputDisplay.value;
      let scoreS = wordsCount.length - errorCount;
      let sessionStoragePointget = sessionStorage.getItem('score')
        ? JSON.parse(sessionStorage.getItem('score'))
        : 0;
      if (scoreS > sessionStoragePointget) {
        scoreDisplay.innerText = scoreS;
        sessionStoragePointget = scoreS;
        sessionStorage.setItem('score', JSON.stringify(sessionStoragePointget));
      } else {
        scoreDisplay.innerText = sessionStoragePointget;
        sessionStorage.setItem('score', JSON.stringify(sessionStoragePointget));
      }
      inputDisplay.value = '';
      //clear text area and textarea display
      const typeText2 = document.querySelectorAll('span');
      typeText2.forEach((item) => {
        item.classList.remove('correct');
        item.classList.remove('incorrect');
        index = 0;
      });
      textTop.scrollTo({
        top: 0,
        position: 0,
        behavior: 'smooth',
      });
    } else if (sec < 10) {
      timeS.innerHTML = `0:0${sec}`;
    }
  }, 1000);

  // Reset button action
  const btnReset = document.querySelector('.reset-btn');
  btnReset.addEventListener('click', () => {
    clearInterval(timeR);
    sec = 60;
    timeS.innerHTML = `1:00`;
    inputDisplay.value = '';
    textTop.scrollTo({
      top: 0,
      position: 0,
      behavior: 'smooth',
    });
    //Clear span color
    const typeText = document.querySelectorAll('span');
    typeText.forEach((item) => {
      item.classList.remove('correct');
      item.classList.remove('incorrect');
      index = 0;
      errorCount = 0;
    });
    // textarea scroll top 0
    up = 0;
  });
}

// Enter key fallow scroll bar
inputDisplay.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    up = up + 70;

    textTop.scrollTo(0, up);
  }
});

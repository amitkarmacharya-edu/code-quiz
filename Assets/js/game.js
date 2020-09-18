// game variable
var totalScore = 0;
var time = 10;
var timerInterval;
var timeOut;
var questionAnswer = [];
var currentQuestionIndex = 0;

// start the quiz, initial setup
function startQuiz(userInput) {
  // setupt the quesiton and answer template
  gameDiv.innerHTML = quesitonAnswerTemplate;

  // initialize the timer
  timerInterval = setInterval(timer, 1000);

  // loop through the user
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === "html") {
      questionAnswer.push(...htmlQuestions);
    }
    if (userInput[i] === "css") {
      questionAnswer.push(...cssQuestions);
    }
    if (userInput[i] === "js") {
      questionAnswer.push(...jsQuestions);
    }
  }

  //questionAnswer.push()
  shuffle(questionAnswer);
  displayQuestion(questionAnswer[currentQuestionIndex]);
}

// display question
function displayQuestion(question) {
  // get the quesiton div and answers ul
  let questionDiv = document.querySelector("#question");
  let answerUl = document.querySelector("#answers");

  // create list of option
  let li = "";
  for (let i = 0; i < question.options.length; i++) {
    li += `<li class="option list-group-item">${question.options[i]}</li>`;
  }

  // display question
  questionDiv.innerHTML = `<h4>${question.question}</h4>`;
  // display optioin
  answerUl.innerHTML = li;
  // add event listener to all the li
  optionEventListener();
}

// check answer
function checkAnswer(answer) {
  // removeListener to prevent multiple input
  removeOptionListener();

  // check for answer
  if (answer.textContent === questionAnswer[currentQuestionIndex].answer) {
    totalScore += 5;
    time += 10;
    answer.className += " correct bg-success text-white";
    document.querySelector(".score").textContent = `SCORE : ${totalScore}`;
  } else {
    answer.className += " wrong bg-danger text-white";

    if (time - 2 <= 0) {
      gameFinished();
    } else {
      time -= 2;
    }

    // update timer
    timer();
  }

  // next quesiton after 2 seconds
  timeOut = setTimeout(nextQuestion, 1000);
}

// next quesiton
function nextQuestion() {
  if (currentQuestionIndex + 1 >= questionAnswer.length) {
    gameFinished();
  } else {
    ++currentQuestionIndex;
    if(time > 0) {
        displayQuestion(questionAnswer[currentQuestionIndex]);
    }
  }
}

// game finished
function gameFinished() {

  // reset the game
  clearTimeout(timeOut);
  clearInterval(timerInterval);
  time = 0;
  questionAnswer = [];
  currentQuestionIndex = 0;


  // test wether local storage is available
  if (storageAvailable("localStorage")) {
    // local storage is available

    // display the score board template
    document.querySelector(".game").innerHTML = scoreBoardTemplate;
    document.querySelector(".score").textContent = `Score : ${totalScore}`;
    displayScores();

     // add event listener to button
    const saveBtn = document.querySelector("#save-score");
    saveBtn.addEventListener("click", function(event) {
        // prevent default behavior
      event.preventDefault();
      // get the input text
      let inputName = document.querySelector('#name');

      // hide the button
      saveBtn.hidden = true;
      // disable text input
      inputName.disabled = true;
      saveToStorage(inputName.value, totalScore);
      displayScores();
    });

  } else {
    // Too bad, no localStorage for us
    document.querySelector(".game").innerHTML = noScoreBoard;
  }

}

// timer
function timer() {
  if (time > 0) {
    document.querySelector(".time").textContent = `Time: ${time}`;
    time--;
  } else {
    clearInterval(timerInterval);
    clearTimeout(timeOut);
    time = 0;
    gameFinished();
  }
}

// remove event listener
function removeOptionListener() {
  let optionLi = document.querySelectorAll(".option");
  for (let i = 0; i < optionLi.length; i++) {
    optionLi[i].removeEventListener("click", optionListener, false);
  }
}

// add event listener to options to check for answers
function optionEventListener() {
  let optionLi = document.querySelectorAll(".option");
  for (let i = 0; i < optionLi.length; i++) {
    optionLi[i].addEventListener("click", optionListener);
  }
}

// callback function for handling event
function optionListener(event) {
  let choice = event.target;
  checkAnswer(choice);
  // console.log("inside option event listener")
}

// save to storage
function saveToStorage(name, score) {
  // get localStorage
  let localStorage = window.localStorage;

  if(localStorage.getItem("list") != null){
      let tempObject = JSON.parse(localStorage.getItem("list"));
      tempObject.push({name, score});
      localStorage.setItem("list",JSON.stringify(tempObject));
  } else {
      let tempObject = [{name, score}];
      localStorage.setItem("list", JSON.stringify(tempObject));
  }
}

// display the save data
function displayScores() {

    let localStorage = window.localStorage;
    if(localStorage.getItem('list')) {
        let list = JSON.parse(localStorage.getItem('list'));
        let li = `<li class="d-flex justify-content-around option list-group-item">
                  <span>Name</span><span>Score</span></li>`;

        for(let i = 0; i < list.length; i++) {
            li += `<li class="d-flex justify-content-around option list-group-item">
                   <span>${list[i].name}</span><span>${list[i].score}</span></li>`;
        }
        console.log(li)
        document.querySelector("#score-board").innerHTML = li;
    }
    
}

// shuffles array randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// helper function to chekc if local storage is enabled/available
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

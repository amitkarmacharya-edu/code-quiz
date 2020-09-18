

// p tag within form, holds the label and input tag element
const formP = document.querySelectorAll("form p"); 

// form element, asks the user the question type
const inputForm = document.querySelector("#questionType");

// get the reference the game container
const gameDiv = document.querySelector(".game");

// game variable , stores data for the game
var userInput = [];


// add event listener to the p tag, when clicked anywher on p tag check
for(let i = 0; i < formP.length; i++) {
    // for every p tag add the event listener
    formP[i].addEventListener('click', function(event) {
        // select the event Listener and not the child element
        let input = event.currentTarget.querySelector("input");
        // console.log(input.checked);
        // add the attrivute to checked if not present
        input.checked = !input.checked;

        // debug
        // console.log(`${input.name} checked: ${input.checked}`);
    });
}

// event listener to the form, to handle for submit
inputForm.addEventListener('submit', function(event){
    // prevent default behavior
    event.preventDefault();

    // logs form submit for debug
    // console.log('Form Submitted');

    // get the data from the form and store it in the userInput array
    let input = event.target.querySelectorAll('input');
    // console.log(input);
    for( var i = 0; i < input.length; i++ ) {
        // if it is checked than added the value to userInput array
        // console.log(input[i]);
        if(input[i].checked) {
            userInput.push(input[i].value);
            // console.log(userInput[i]);
        }
    }

    // add default : js
    if(userInput.length <= 0) {
        // javascript by default
        // console.log(userInput.length)
        userInput.push("js");
    }

    // debug
    console.log("-----------------------");
    console.log("userInput : " + userInput)
    console.log("User Input Form Submitted")
    console.log("-----------------------");

    // start the quiz
    startQuiz(userInput);
});



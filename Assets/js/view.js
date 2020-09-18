// game launcher template
const gameLauncherTemplate = `<div class="game-launcher rounded p-3 bg-info mx-auto">
<h3 class="text-center text-white">Code Quiz</h3>
<!-- input question type -->
<div class="mt-5 text-center text-white">
    <form id="questionType"  action="#">
        
        <h5 class="mb-5">Please select the question type to Include</h5>

        <!-- html question-->
        <p>
            <label class="p-3"for="html"> Html</label>
            <input type="checkbox" name="html" value="html">
        </p>
        <!-- css qustion -->
        <p>
            <label class="p-3" for="html"> CSS</label>
            <input type="checkbox" name="css" value="css">
        </p>
        <!-- javscript -->
        <p>
            <label class="p-3" for="html"> Javascript</label>
            <input type="checkbox" name="js" value ="js">
        </p>
        <span class=" d-block text-muted">default: javascript</span>

        <!-- submit -->
        <button type="submit" class="btn btn-primary px-5">Start</button>
    </form>
</div>
</div>`;

// question and answer design, template
const quesitonAnswerTemplate = `
<div class="d-flex justify-content-between">
        <span class="score bg-info p-2 text-white font-weight-bold rounded">Score : 0</span>
        <span class="time bg-info p-2 text-white font-weight-bold rounded">Time : 10</span>
</div>
<div class="card" >
    <div class="card-header bg-info">
        <div id="question" class="text-white p-3"></div>
        </div>
    <ul id="answers" class="list-group list-group-flush">
    </ul>
</div>
`;

// score board
const scoreBoardTemplate = `
<div class="card" >
    <div class="card-header bg-info">
        <form class="d-flex justify-content-between form-inline">
            <div class="d-flex justify-content-between">
                <input id="name" class="form-control mr-sm-2" type="text" placeholder="Enter Your Name" aria-label="Enter your name">
                <button id="save-score" class="btn btn-primary my-2 my-sm-0" type="submit">Save</button>
            </div>
            <span class="score bg-info p-2 text-white font-weight-bold rounded"></span>
        </form>
    </div>
    <ul id="score-board" class="list-group list-group-flush">
    </ul>
</div>
`;


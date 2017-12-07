//Store training set
var wordList = [];
var wrongSpellingList = [];
var index = 0;
var currentWord = "";
$("#login-button").click(function (event) {
    event.preventDefault();
    //Parse and load training set
    initialseInput();
    $('#formConfiguration').fadeOut(500);
    $('#wrapper').addClass('form-success');
    $('#Title').text('Training Started')
    setTimeout(func, 1000);
    function func() {
        $('#formPractice').fadeIn(500);
        loadNextItem();
    }
});

$("#next-button").click(function (event) {
    event.preventDefault();
    var _userAnswer = $("#txtUserAnswer").val();
    if (_userAnswer.toLowerCase().trim() == currentWord.toLowerCase().trim())
        correctAnswerAction()
    else
        wrongAnswerAction();
    //Clear input text
    $("#txtUserAnswer").val("");
});

$("#repeate-button").click(function (event) {
    event.preventDefault();
    readCurrentWord();
});

function initialseInput() {
    wordList = $('#txtWordList').val().split("\n");
}

function loadNextItem() {
    if (index >= 0 && index <= wordList.length - 1) {
        currentWord = wordList[index++]
        readCurrentWord();
    }
    else {
        displaySummaryReport();
        sayText("Training set completed, please review the summary report.");
    }
        
}

function readCurrentWord() {
    sayText("Please type the correct spelling for " + currentWord);
}

function wrongAnswerAction() {
    sayText("Wrong Answer");
    //Update wrong spelling list
    updateWrongSpellingList();
    readCurrentWord();
}

function correctAnswerAction() {
    sayText("Correct");
    loadNextItem();
}

function sayText(text) {
    responsiveVoice.speak(text);
}

function updateWrongSpellingList() {
    if (wrongSpellingList[currentWord] == undefined)
        wrongSpellingList[currentWord] = 1;
    else
        wrongSpellingList[currentWord] += 1;
    console.log(wrongSpellingList);
}

function generateSummaryReport() {
    var tableId = "tableSummaryReport";
    var arrayLength = wrongSpellingList.length;
    //Clear Old Content
    $("#" + tableId + " tr").remove();
    //Insert Header
    $("#" + tableId).append("<tr><th>Word</th><th>Error Score</th></tr>");
    //Fill New Content
    for (var key in wrongSpellingList) {
        $("#" + tableId).append("<tr><td>" + key + "</td><td>" + wrongSpellingList[key] + "</td></tr>");
    }
}

function displaySummaryReport() {
    $('#formPractice').hide();
    $(".report-wrapper").show();
    $('#Title').text('Summary Report')
    generateSummaryReport();
}

function resetTraining() {
    currentWord = wordList[0];
}
//Store training set
var wordList = [];
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
        readCurrentWord();
    }
});

$("#next-button").click(function (event) {
    event.preventDefault();
    var _userAnswer = $("#txtUserAnswer").val();
    if (_userAnswer == currentWord)
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
    if (index >= 0 && index < wordList.length - 1)
        currentWord = wordList[index++]
    else
        currentWord = wordList[0]
}

function readCurrentWord() {
    sayText("Please type the correct spelling for " + currentWord);
}

function wrongAnswerAction() {
    sayText("Wrong Answer");
    readCurrentWord();
}

function correctAnswerAction() {
    sayText("Correct");
    loadNextItem();
    readCurrentWord();
}

function sayText(text) {
    responsiveVoice.speak(text);
}
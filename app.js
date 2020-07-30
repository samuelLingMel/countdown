const apikey = config.dictionaryKey

let lettersBoard = [];
let numbersBoard = [];
let idOfInterval = 0;

const vowels = "aaaaaaaaaeeeeeeeeeeeeiiiiiiiiioooooooouuuu".split("");
const consonants = "bbccddddffggghhjkllllmmnnnnnnppqrrrrrrssssttttttvvwwxyyz".split("");
const displayLetters = document.querySelectorAll(".letter");
const displayNumbers = document.querySelectorAll(".number");
const stopWatch =  document.querySelector(".stopwatch");

const randomConsonant = function() {
  return(consonants[Math.floor(Math.random() * consonants.length)].toUpperCase());
}
    
const randomVowel = function() {
  return(vowels[Math.floor(Math.random() * vowels.length)].toUpperCase());
}

const refreshLettersBoard = function() {
  for (let i = 0; i < lettersBoard.length; i++) {
    displayLetters[i].textContent = lettersBoard[i];
  }
}



const handleConsonantBtn = function() {
  lettersBoard.push(randomConsonant());
  refreshLettersBoard();
}

const handleVowelBtn = function() {
  lettersBoard.push(randomVowel());
  refreshLettersBoard();
}

const handleClearLettersBtn = function() {
  lettersBoard = [];
  for (let i = 0; i < 9; i++) {
    displayLetters[i].textContent = "";
  }
}

// -------------------------------------------//
const startStopWatch = function() {
  stopWatch.textContent = Math.round(((stopWatch.textContent - 0.01) + Number.EPSILON) * 100) / 100;
  if (Number(stopWatch.textContent) <= 0 ) {
    clearInterval(idOfInterval);
  }
}

const handleStartBtn = function(e) {
  idOfInterval = setInterval(startStopWatch, 10);
  e.target.disabled = true;
}

const handleResetStopWatchBtn = function() {
  stopWatch.textContent = 30;
  document.querySelector(".start").disabled = false;
  clearInterval(idOfInterval);
}

// -------------------------------------------//
const refreshNumbersBoard = function() {
//   numbersBoard.sort(function(a, b){return b-a});
  for (let i = 0; i < numbersBoard.length; i++) {
    displayNumbers[i].textContent = numbersBoard[i];
  }
}

const handleNewTargetBtn = function() {
  document.querySelector(".display-target").textContent = Math.floor(Math.random() * 899) + 101
}

const handleLargeNumberBtn = function() {
  const largeNumbers = [25, 50, 75, 100]
  numbersBoard.push(largeNumbers[Math.floor(Math.random() * largeNumbers.length)])
  refreshNumbersBoard()
}
const handleSmallNumberBtn = function() {
  numbersBoard.push(Math.floor(Math.random() * 9 ) + 1)
  refreshNumbersBoard()
}

const handleClearNumbersBtn = function() {
  numbersBoard = [];
  for (let i = 0; i < 6; i++) {
    displayNumbers[i].textContent = "";
  }
}


document.querySelector(".consonant").addEventListener("click", handleConsonantBtn);
document.querySelector(".vowel").addEventListener("click", handleVowelBtn);
document.querySelector(".clear-letters").addEventListener("click", handleClearLettersBtn);

document.querySelector(".start").addEventListener("click", handleStartBtn);
document.querySelector(".reset-stopwatch").addEventListener("click", handleResetStopWatchBtn);

document.querySelector(".new-target").addEventListener("click", handleNewTargetBtn)
document.querySelector(".large-number").addEventListener("click", handleLargeNumberBtn)
document.querySelector(".small-number").addEventListener("click", handleSmallNumberBtn)
document.querySelector(".clear-numbers").addEventListener("click", handleClearNumbersBtn);


axios({
  "method":"GET",
  "url":"https://twinword-word-graph-dictionary.p.rapidapi.com/definition/",
  "headers":{
  "content-type":"application/octet-stream",
  "x-rapidapi-host":"twinword-word-graph-dictionary.p.rapidapi.com",
  "x-rapidapi-key":apikey,
  "useQueryString":true
  },"params":{
  "entry":"cake"
  }
  })
  .then((response)=>{
    console.log(response)
  })
  .catch((error)=>{
    console.log(error)
  })


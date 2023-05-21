const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--; // decrement maxTime by -1
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    Swal.fire({
      title: "Times Up!",
      text: `${correctWord.toUpperCase()} was the correct word`,
      icon: "error",
      confirmButtonText: "Retry",
    });
    initGame(); // calling initGame function, so the game restarts
  }, 1000);
};

const initGame = () => {
  initTimer(30); // calling initTimer function with passing 30 as maxTime value
  let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random object from words
  let wordArray = randomObj.word.split(""); // splitting each letter of random word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // getting random number
    // shuffling and swiping wordArray letters randomly
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join(""); // passing shuffled word as word text
  hintText.innerText = randomObj.hint; // passing random object hint as hint text
  correctWord = randomObj.word.toLowerCase(); // passing random word to correctWord
  inputField.value = ""; // making input field empty
  inputField.setAttribute("maxlength", correctWord.length); // setting input maxlength attr value to word length
};
initGame();

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase();
  if (!userWord)
    return Swal.fire({
      title: "Oops!",
      text: "Please enter a word",
      icon: "error",
      confirmButtonText: "Retry",
    }); // if user did not enter anything

  // if user word does not match with the correct word
  if (userWord !== correctWord)
    return Swal.fire({
      title: "Oops!",
      text: `${userWord.toUpperCase()} is not a correct word`,
      icon: "error",
      confirmButtonText: "Retry",
    });

  // if above two if conditions failed then show congrats alert because user word is correct
  Swal.fire({
    title: "Congrats!",
    text: `${userWord.toUpperCase()} is a correct word`,
    icon: "success",
    confirmButtonText: "Play Again",
  });
};
initGame();

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

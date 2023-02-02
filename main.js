let req = new XMLHttpRequest();
req.open("GET", "./category.json");
req.send();
req.onload = function () {
  if (this.status === 200 && this.readyState === 4) {
    let words = JSON.parse(this.responseText);
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let lettersArray = Array.from(letters);
    let lettersContainer = document.querySelector(".letters");
    // Generate Letters
    lettersArray.forEach(function (letter) {
      let span = document.createElement("span");
      span.textContent = `${letter}`;
      span.classList.add("letter-box");
      lettersContainer.appendChild(span);
    });
    // Get Random Property
    let allKeys = Object.keys(words);
    let randomPropNumber = Math.floor(Math.random() * allKeys.length);
    let randomPropName = allKeys[randomPropNumber];
    let randomPropValue = words[randomPropName];
    // Random Number Depend On Words
    let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
    // The Chosen Word
    let randomValueValue = randomPropValue[randomValueNumber];
    document.querySelector(
      ".game-info .category span"
    ).textContent = `${randomPropName}`;
    let lettersGuessContainer = document.querySelector(".letters-guess");
    let lettersAndSpace = Array.from(randomValueValue);
    // Create Spans Depened On Word
    lettersAndSpace.forEach(function (letter) {
      let emptySpan = document.createElement("span");
      if (letter === " ") {
        emptySpan.classList.add("with-space");
      }
      lettersGuessContainer.appendChild(emptySpan);
    });
    // Select Guess Spans
    let guessSpans = document.querySelectorAll(".letters-guess span");
    // Set Wrong Attempts
    let wrongAttempts = 0;
    let right = 0;
    let wrong = document.querySelector(".game-wrong span");
    wrong.textContent = `Wrong: ${wrongAttempts} / 7`;
    let theDraw = document.querySelector(".hangman-draw");
    // Handle Clicking On Letters
    document.addEventListener("click", function (e) {
      let theStatus = false;
      if (e.target.className == "letter-box") {
        e.target.classList.add("clicked");
        // Get Clicked Letter
        let theClickedLetter = e.target.textContent.toLowerCase();
        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        // loop
        theChosenWord.forEach(function (wordLetter, wordIndex) {
          if (theClickedLetter === wordLetter) {
            theStatus = true;
            // Game Complited
            let newWords = randomValueValue
              .split("")
              .filter(function (e) {
                return e === " " ? "" : e;
              })
              .join("");
            if (guessSpans !== "") {
              right++;
              if (right === newWords.length) {
                successGame();
                lettersContainer.classList.add("finished");
              }
            }
            // Loop On All Guess Spans
            guessSpans.forEach(function (span, spanIndex) {
              if (wordIndex === spanIndex) {
                span.innerHTML = theClickedLetter;
              }
            });
          }
        });
        if (theStatus !== true) {
          wrongAttempts++;
          wrong.textContent = `Wrong: ${wrongAttempts} / 7`;
          theDraw.classList.add(`wrong-${wrongAttempts}`);
          document.getElementById("failed").play();
          if (wrongAttempts === 7) {
            setTimeout(() => {
              endGame();
            }, 600);
            lettersContainer.classList.add("finished");
          }
        } else {
          document.getElementById("success").play();
        }
      }
    });
    function endGame() {
      let divFail = document.createElement("div");
      let btn = document.querySelector("span");
      btn.textContent = `TRY AGAIN`;
      btn.onclick = function () {
        window.location.reload();
      };
      divFail.innerHTML = `Game Over, The Word Is <p>${randomValueValue}</p>`;
      divFail.classList.add("popup-failed");
      divFail.appendChild(btn);
      document.body.appendChild(divFail);
    }
    function successGame() {
      let divSuc = document.createElement("div");
      let btn = document.querySelector("span");
      btn.textContent = `PLAY AGAIN`;
      btn.onclick = function () {
        window.location.reload();
      };
      divSuc.innerHTML = `Good, The Word Is <p>${randomValueValue}</p>`;
      divSuc.classList.add("popup-failed");
      divSuc.appendChild(btn);
      document.body.appendChild(divSuc);
    }
  }
};

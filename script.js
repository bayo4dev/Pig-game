"use strict";

//selcting element
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const curtScore = document.querySelector(".current-score");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. generating a rendom number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1; if true, switch to next player
    if (dice !== 1) {
      // add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add currentscore to acttive score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2. check if player's score is >= 100
    if (score[activePlayer] >= 10) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      //switch game to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  score = [0, 0];
  currentScore = 0;
  playing = true;
});

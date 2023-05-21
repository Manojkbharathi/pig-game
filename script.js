'use strict';
const newGame = document.getElementById('new-game');
const rollBtn = document.getElementById('btn-roll');
const holdBtn = document.getElementById('btn-hold');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const diceEl = document.getElementById('dice');
const player0 = document.getElementById('player-0');
const player1 = document.getElementById('player-1');

//global variables
let scores, currentScore, activePlayer, dice;

function init() {
  // initialy scores is 0

  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  currentScore = 0;
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0El.innerText = 0;
  current1El.innerText = 0;
  diceEl.classList.add('hidden');
}

function getRandomNumber(num) {
  return Math.trunc(Math.random() * num) + 1;
}

function switchPlayer() {
  // toggle active player if it is their it'll remove
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');

  document.getElementById(`score-${activePlayer}`).innerText =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).innerText = currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
}

rollBtn.addEventListener('click', () => {
  dice = getRandomNumber(6);
  diceEl.classList.remove('hidden');
  diceEl.src = `./images/dice-${dice}.png`;

  if (dice !== 1) {
    // adding score to current player

    currentScore = currentScore + dice;
    document.getElementById(`current-${activePlayer}`).innerText = currentScore;
  } else {
    // switch player
    switchPlayer();
    alert('you lost');
  }
});
holdBtn.addEventListener('click', () => {
  // player clicks hold button  current score of the active player goes to active player scores and active player will be change
  scores[activePlayer] = scores[activePlayer] + currentScore;
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).innerText = currentScore;
  if (scores[activePlayer] >= 20) {
    // check score
    document.getElementById(`player-${activePlayer}`).classList
      .remove`player-${activePlayer}`;

    document
      .getElementById(`player-${activePlayer}`)
      .classList.add('player-winner');
    // .classList.remove("player-active");
    diceEl.classList.add('hidden');
    alert('You won the match');
  } else {
    // switch player
    switchPlayer();
  }
});
init();
newGame.addEventListener('click', () => {
  document
    .getElementById(`player-${activePlayer}`)
    .classList.remove('player-winner');
  switchPlayer();

  if (activePlayer === 0) {
    activePlayer = 1;
  }

  init();
});

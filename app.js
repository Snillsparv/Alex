const boardEl = document.getElementById('board');
const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const phaseEl = document.getElementById('phase');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');
const modeButtons = [...document.querySelectorAll('.mode-btn')];
const paintButtons = [...document.querySelectorAll('.paint-btn')];

const SIZE = 36;
const MEMORIZE_SECONDS = 60;

let mode = 2;
let phase = 'idle';
let targetGrid = Array(SIZE).fill(0);
let userGrid = Array(SIZE).fill(0);
let secondsLeft = MEMORIZE_SECONDS;
let timerId;
let checked = false;
let selectedPaint = 0;

function buildBoard() {
  boardEl.innerHTML = '';
  for (let i = 0; i < SIZE; i += 1) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.dataset.color = '0';
    cell.setAttribute('aria-label', `Ruta ${i + 1}`);
    cell.addEventListener('click', () => onCellClick(i));
    boardEl.appendChild(cell);
  }
}

function randomPick(count, max) {
  const pool = Array.from({ length: max }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function generateTargetGrid() {
  const grid = Array(SIZE).fill(0);
  if (mode === 2) {
    const picked = randomPick(24, SIZE);
    picked.slice(0, 12).forEach((idx) => { grid[idx] = 1; });
    picked.slice(12, 24).forEach((idx) => { grid[idx] = 2; });
  } else {
    const picked = randomPick(27, SIZE);
    picked.slice(0, 9).forEach((idx) => { grid[idx] = 1; });
    picked.slice(9, 18).forEach((idx) => { grid[idx] = 2; });
    picked.slice(18, 27).forEach((idx) => { grid[idx] = 3; });
  }
  return grid;
}

function paintGrid(values) {
  [...boardEl.children].forEach((cell, index) => {
    cell.dataset.color = String(values[index]);
    cell.classList.remove('correct', 'wrong');
  });
}

function setMode(nextMode) {
  mode = nextMode;
  modeButtons.forEach((btn) => {
    const active = Number(btn.dataset.mode) === mode;
    btn.classList.toggle('active', active);
  });
  updatePaintAvailability();
}

function setSelectedPaint(color) {
  selectedPaint = color;
  paintButtons.forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.color) === selectedPaint);
  });
}

function updatePaintAvailability() {
  const blueBtn = paintButtons.find((btn) => Number(btn.dataset.color) === 3);
  if (!blueBtn) return;
  const showBlue = mode === 3;
  blueBtn.style.display = showBlue ? 'block' : 'none';
  if (!showBlue && selectedPaint === 3) {
    setSelectedPaint(0);
  }
}

function updateTimer() {
  timerEl.textContent = String(secondsLeft);
}

function beginMemorize() {
  clearInterval(timerId);
  checked = false;
  phase = 'memorize';
  secondsLeft = MEMORIZE_SECONDS;
  updateTimer();
  targetGrid = generateTargetGrid();
  userGrid = Array(SIZE).fill(0);
  setSelectedPaint(1);
  paintGrid(targetGrid);
  resultEl.textContent = '';
  phaseEl.textContent = 'Memorera mönstret.';
  checkBtn.disabled = true;

  timerId = setInterval(() => {
    secondsLeft -= 1;
    updateTimer();
    if (secondsLeft <= 0) {
      clearInterval(timerId);
      beginInput();
    }
  }, 1000);
}

function beginInput() {
  phase = 'input';
  phaseEl.textContent = 'Välj färg längst ner och klicka i rutorna. Tryck sedan på Rätta.';
  paintGrid(userGrid);
  checkBtn.disabled = false;
}

function onCellClick(index) {
  if (phase !== 'input') return;
  userGrid[index] = selectedPaint;
  const cell = boardEl.children[index];
  cell.dataset.color = String(userGrid[index]);
  if (checked) {
    checked = false;
    resultEl.textContent = 'Ändring gjord. Tryck Rätta igen för ny kontroll.';
    [...boardEl.children].forEach((node) => node.classList.remove('correct', 'wrong'));
  }
}

function checkAnswer() {
  if (phase !== 'input') return;
  checked = true;
  let exactMatches = 0;

  [...boardEl.children].forEach((cell, index) => {
    const match = userGrid[index] === targetGrid[index];
    if (match) {
      exactMatches += 1;
      if (targetGrid[index] !== 0) {
        cell.classList.add('correct');
      }
      cell.classList.remove('wrong');
    } else {
      cell.classList.remove('correct');
      if (userGrid[index] !== 0 || targetGrid[index] !== 0) {
        cell.classList.add('wrong');
      } else {
        cell.classList.remove('wrong');
      }
    }
  });

  const coloredTarget = targetGrid.filter((value) => value !== 0).length;
  const coloredCorrect = targetGrid.reduce((sum, value, idx) => {
    if (value !== 0 && value === userGrid[idx]) {
      return sum + 1;
    }
    return sum;
  }, 0);

  resultEl.textContent = `Rätt färg på ${coloredCorrect}/${coloredTarget} markerade rutor. Exakt totalträff: ${exactMatches}/36.`;
}

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setMode(Number(button.dataset.mode));
    if (phase === 'idle') {
      resultEl.textContent = 'Läge ändrat. Starta en ny omgång.';
    }
  });
});

paintButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (phase !== 'input') return;
    setSelectedPaint(Number(button.dataset.color));
  });
});

startBtn.addEventListener('click', beginMemorize);
checkBtn.addEventListener('click', checkAnswer);

setMode(2);
setSelectedPaint(0);
buildBoard();
updateTimer();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {
      // No-op: app works without SW, but offline requires successful registration.
    });
  });
}

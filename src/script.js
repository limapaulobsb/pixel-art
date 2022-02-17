let tool = 'pen';

function createPixels(n) {
  const canvasElem = document.getElementById('main-canvas');
  for (let i = 0; i < n * n; i++) {
    const newPixel = document.createElement('div');
    newPixel.className = 'pixel';
    canvasElem.appendChild(newPixel);
  }
  canvasElem.style.gridTemplateColumns = `repeat(${n}, auto)`;
  canvasElem.style.gridTemplateRows = `repeat(${n}, auto)`;
}

function removePixels() {
  const canvasElem = document.getElementById('main-canvas');
  while (canvasElem.hasChildNodes()) {
    canvasElem.removeChild(canvasElem.firstChild);
  }
}

function fillPixel(target) {
  const color = document.getElementById('color-picker').value;
  if (tool === 'pen') target.style.backgroundColor = color;
  else if (tool === 'rubber') target.style.backgroundColor = 'white';
}

function clearCanvas() {
  const pixelElems = document.querySelectorAll('.pixel');
  pixelElems.forEach((el) => (el.style.backgroundColor = 'white'));
}

function resizeCanvas(value) {
  const canvasElem = document.getElementById('main-canvas');
  canvasElem.style.height = `${value}px`;
  canvasElem.style.width = `${value}px`;
}

function toggleGrid() {
  const canvasElem = document.getElementById('main-canvas');
  const isSelected = document.getElementById('toggle-grid').checked;
  if (isSelected) canvasElem.style.gap = '1px';
  else canvasElem.style.gap = '0';
}

function selectTool(target) {
  const toolElem = document.querySelector('.selected');
  toolElem.classList.remove('selected');
  target.classList.add('selected');
  tool = target.name;
}

window.onload = () => {
  createPixels(40);

  let isMouseDown = false;

  document.addEventListener('mousedown', ({ button, target }) => {
    if (button === 0) {
      isMouseDown = true;
      if (target.matches('.pixel')) fillPixel(target);
    }
  });

  document.addEventListener('mouseup', ({ button, target }) => {
    if (button === 0) {
      isMouseDown = false;
      if (target.matches('.tool-button')) selectTool(target);
      else if (target.parentNode.matches('.tool-button')) selectTool(target.parentNode);
    }
  });

  document.addEventListener('mouseover', ({ target }) => {
    if (isMouseDown && target.matches('.pixel')) {
      fillPixel(target);
    }
  });

  document.getElementById('color-picker').addEventListener('input', ({ target }) => {
    const codeElem = document.getElementById('color-code');
    codeElem.innerHTML = `&ensp;${target.value}`;
  });

  document.getElementById('canvas-input').addEventListener('change', ({ target: { value } }) => {
    if (value >= 300 && value <= 600) resizeCanvas(value);
  });

  document.getElementById('pixel-input').addEventListener('change', ({ target: { value } }) => {
    if (value >= 10 && value <= 80) {
      removePixels();
      createPixels(value);
    }
  });

  document.getElementById('clear-canvas').addEventListener('click', clearCanvas);
  document.getElementById('toggle-grid').addEventListener('click', toggleGrid);
};

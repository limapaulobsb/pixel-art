// =====> Start Global Variables <=====
let tool = 'pen';

const canvasContainer = document.getElementById('main-canvas');
const colorInput = document.getElementById('color-input');
const toggleGridInput = document.getElementById('toggle-grid');

// =====> End Global Variables <=====
// =====> Start Function Declarations <=====

function removePixels() {
  // removes all child elements from the canvas
  while (canvasContainer.hasChildNodes()) {
    canvasContainer.removeChild(canvasContainer.firstElementChild);
  }
}

function createPixels(n) {
  // creates an n x n grid of HTML elements
  for (let i = 0; i < n * n; i++) {
    const newPixel = document.createElement('div');
    newPixel.className = 'pixel';
    canvasContainer.appendChild(newPixel);
  }

  canvasContainer.style.gridTemplateColumns = `repeat(${n}, auto)`;
  canvasContainer.style.gridTemplateRows = `repeat(${n}, auto)`;
}

function fillPixel(target) {
  // changes the background color of the element
  const color = colorInput.value;

  if (tool === 'pen') {
    target.style.backgroundColor = color;
  } else if (tool === 'rubber') {
    target.style.backgroundColor = 'white';
  }
}

function selectTool(target) {
  // selects one of the available editing tools
  const selectedButton = document.querySelector('.selected');
  selectedButton.classList.remove('selected');
  target.classList.add('selected');
  tool = target.name;
}

function clearCanvas() {
  // changes the background of all elements to white
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => (pixel.style.backgroundColor = 'white'));
}

function toggleGrid() {
  // toggles the visibility of the gridlines
  if (toggleGridInput.checked) {
    canvasContainer.style.gap = '1px';
  } else {
    canvasContainer.style.gap = '0';
  }
}

function resizeCanvas(value) {
  // changes the height and width of the screen
  canvasContainer.style.height = `${value}px`;
  canvasContainer.style.width = `${value}px`;
}

// =====> End Function Declarations <=====
// =====> Start Onload Events and Listeners setup <=====

window.onload = () => {
  createPixels(40);

  let isMouseDown = false;

  const clearCanvasButton = document.getElementById('clear-canvas');
  const canvasSizeInput = document.getElementById('canvas-input');
  const pixelCountInput = document.getElementById('pixel-input');

  clearCanvasButton.addEventListener('click', clearCanvas);

  canvasSizeInput.addEventListener('change', ({ target: { value } }) => {
    if (value >= 200 && value <= 600) {
      resizeCanvas(value);
    }
  });

  pixelCountInput.addEventListener('change', ({ target: { value } }) => {
    if (value >= 10 && value <= 80) {
      removePixels();
      createPixels(value);
    }
  });

  colorInput.addEventListener('input', ({ target }) => {
    const colorCodeContainer = document.getElementById('color-code');
    colorCodeContainer.innerHTML = `&ensp;${target.value}`;
  });

  toggleGridInput.addEventListener('click', toggleGrid);

  // Mouse events
  document.addEventListener('mousedown', ({ button, target }) => {
    // 0 means left mouse button
    if (button === 0) {
      isMouseDown = true;

      if (target.matches('.pixel')) {
        fillPixel(target);
      }
    }
  });

  document.addEventListener('mouseup', ({ button, target }) => {
    if (button === 0) {
      isMouseDown = false;

      if (target.matches('.tool-button')) {
        selectTool(target);
      } else if (target.parentNode.matches('.tool-button')) {
        selectTool(target.parentNode);
      }
    }
  });

  document.addEventListener('mouseover', ({ target }) => {
    if (isMouseDown && target.matches('.pixel')) {
      fillPixel(target);
    }
  });
};

// =====> End Onload Events and Listeners setup <=====

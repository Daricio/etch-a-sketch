const container = document.getElementById('container');

// let paintMode = 'black';

const blackModeButton = document.getElementById('black-mode-btn');
const randColorModeButton = document.getElementById('rand-color-mode-btn');
const eraserButton = document.getElementById('eraser-btn');
const shadingModeButton = document.getElementById('shading-mode-btn');

setPaintMode('black');

blackModeButton.addEventListener('click', () => {
  setPaintMode('black');
});

randColorModeButton.addEventListener('click', () => {
  setPaintMode('random-color');
});

eraserButton.addEventListener('click', () => {
  setPaintMode('eraser');
});

shadingModeButton.addEventListener('click', () => {
  setPaintMode('shading');
});

// set mode:
// disable all mode buttons
// enable new mode button
function setPaintMode(newMode) {
  const modeButtons = Array.from(document.getElementsByClassName('mode'));
  modeButtons.forEach(modeButton => {
    modeButton.classList.remove('selected');
  })

  paintMode = newMode;
  const newModeButton = document.querySelector(`.mode.${newMode}`);
  newModeButton.classList.add('selected');
}

createGrid(16);

// when button is clicked, prompt number of squares per side
const newGridButton = document.getElementById('new-grid-btn');
newGridButton.addEventListener('click', () => {
  let squaresPerSide = prompt('Enter number of squares per side (100 max):');

  if (squaresPerSide === null || squaresPerSide === '' || isNaN(+squaresPerSide)) return;
  if (squaresPerSide > 100 ) {
    alert('Maximum number of cells per side is 100.');
    return;
  }

  // remove previous grid
  removeGrid();

  // create new grid of requested size
  createGrid(squaresPerSide);

})


// create grid
function createGrid(squaresPerSide) {
  // create requested number of squares of requested size
  // set width of container children
  if (squaresPerSide < 1) return;
  const cellWidth = 1 / squaresPerSide;

  let numOfCells = squaresPerSide ** 2;
  for (let i = 0; i < numOfCells; i++) {
    let gridCell = document.createElement('div');
    gridCell.style.width = `${cellWidth * 100}%`;
    container.appendChild(gridCell);
  }

  const gridCells = document.querySelectorAll('.container > div');

  addHoveringEffect(gridCells);
  addPaintingByClick(gridCells);
  disableDrag(gridCells);
}


// add event listener for each grid div to paint black
function addHoveringEffect(gridCells) {
  gridCells.forEach(cell => {
    cell.addEventListener('mouseover', e => {
      if (e.buttons === 1) {
        paint(cell);
      }
    });
  })
}

function addPaintingByClick(gridCells) {
  gridCells.forEach(cell => {
    cell.addEventListener('mousedown', e => {
      paint(cell);
    });
  })
}

function disableDrag(gridCells) {
  gridCells.forEach(cell => {
    cell.addEventListener('dragstart', e => {
      e.preventDefault();
    })
  })
}

function paint(cell) {
  // if black, paint cell black
  // if multicolor, paint cell random color
  // if eraser, paint cell white
  switch (paintMode) {
    case 'black':
      paintBlack(cell);
      break;

    case 'random-color':
      paintRandomColor(cell);
      break;

    case 'eraser':
      erase(cell);
      break;

    case 'shading':
      darken(cell);
      break;

    default:
  }
}

function paintBlack(cell) {
  cell.style.backgroundColor = 'rgb(0, 0, 0)';
}

function paintRandomColor(cell) {
  const color = getRandomRGB();
  cell.style.backgroundColor = color;
}

function getRandomRGB() {
  const r = generateRandom(0, 256);
  const g = generateRandom(0, 256);
  const b = generateRandom(0, 256);
  return rgb = `rgb(${r}, ${g}, ${b})`;
}

function erase(cell) {
  cell.style.backgroundColor = 'rgb(255, 255, 255)';
}

function darken(cell) {
  const initialRGB = getComputedStyle(cell).backgroundColor.slice(4, -1); // "r, g, b"
  // // split rgb by comma
  const rgbArray = initialRGB.split(','); // ['r', ' g', ' b']
  // trim r, g, b
  const r = rgbArray[0].trim();
  const g = rgbArray[1].trim();
  const b = rgbArray[2].trim();
  // // convert r, g, b to numbers, substract 26
  // // if r/g/b < 0, assign 0
  const newR = (r - 26 > 0) ? (r - 26) : 0;
  const newG = (g - 26 > 0) ? (g - 26) : 0;
  const newB = (b - 26 > 0) ? (b - 26) : 0;
  // // rgb-format string with new r, g, b values
  const newRGB = `rgb(${newR}, ${newG}, ${newB})`;
  cell.style.backgroundColor = newRGB;
}

// random number in range [min, max)
function generateRandom(min, max) {
  // generate random number in range [0, 1)
  let rand = Math.random();
  // multiply this number by min-max difference - number of options, floor it
  let difference = max - min;
  rand = Math.floor(rand * difference);
  // add min
  rand += min;
  return rand;
}

function removeGrid() {
  // delete last child of container until there is no last child
  while (container.lastChild) {
    container.lastChild.remove();
  }
}

// TODO:
// second challenge with darkening effect
const container = document.getElementById('container');

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

  addHoveringEffect();
}


// add event listener for each grid div to paint black
function addHoveringEffect() {
  const gridCells = document.querySelectorAll('.container > div');
  gridCells.forEach(cell => {
    cell.addEventListener('mouseover', paintBlack);
  })
}


function paintBlack() {
  this.classList.add('black');
}

function removeGrid() {
  // delete last child of container until there is no last child
  while (container.lastChild) {
    container.lastChild.remove();
  }
}
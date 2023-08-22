const container = document.getElementById('container');

let squaresPerSide = 16;

// when button is clicked, prompt number of squares per side
// const newGridButton = document.getElementById('new-grid-btn');
// newGridButton.addEventListener('click', () => {
//   let newSquaresPerSide = prompt('Enter number of squares per side:');

//   if(!newSquaresPerSide) return;

//   // remove previous grid
//   removeGrid();

//   // create new grid of requested size
//   createGrid(newSquaresPerSide);

// })


// create grid
let numOfCells = squaresPerSide ** 2;
for (let i = 0; i < numOfCells; i++) {
  let gridCell = document.createElement('div');
  container.appendChild(gridCell);
}

// add event listener for each grid div to paint black
const gridCells = document.querySelectorAll('.container > div');
gridCells.forEach(cell => {
  cell.addEventListener('mouseover', paintBlack);
})

function paintBlack() {
  this.classList.add('black');
}

function removeGrid() {
  // delete last child of container until there is no last child
  while (container.lastChild) {
    container.lastChild.remove();
  }
}
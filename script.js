const gridContainer = document.querySelector('#grid-container');
const controlsContainer = document.querySelector('#controls-container')
let squaresPerSide = 16;
let cell = [];
let currentlyActive = false;

createGrid(squaresPerSide);


function createGrid(squaresPerSide) {
  clearGrid();
  gridContainer.style.gridTemplateColumns = (`repeat(${squaresPerSide}, 1fr`);
  gridContainer.style.gridTemplateRows = (`repeat(${squaresPerSide}, 1fr`);
  let numberOfCells = squaresPerSide * squaresPerSide;
  for(let i = 0; i<numberOfCells; i++) {
    cell[i] = document.createElement('div');
    cell[i].classList.add('cell');
    gridContainer.appendChild(cell[i]);
  }
}
function clearGrid() {
  while(gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}


gridContainer.addEventListener('click', function() { togglePen()});

function togglePen() {
  if(!currentlyActive) {
    cell.forEach(item => {
      item.addEventListener('mouseenter', activatePen);
    })
    currentlyActive = true;
  } else {
    cell.forEach(item => {
      item.removeEventListener('mouseenter', activatePen);
    })
    currentlyActive = false;
  }
}
function activatePen(e) {
  // e.target.classList.add('drawn');
  e.target.style = 'background-color: blue';
  // e.target.style = `background-color: ${randomColor()}`;
}
function randomColor() {
  let red = Math.floor(Math.random()*200);
  let green = Math.floor(Math.random()*255);
  let blue = (Math.floor(Math.random()*155)+100);
  let alpha = (0.5*Math.random()+0.5);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

const resetButton = document.querySelector('#clear');
resetButton.addEventListener('click', clear);
const newGridButton = document.querySelector('#new-grid');
newGridButton.addEventListener('click', function() {
  clear();
  createGrid(newSize.value);
})


function clear() {
  cell.forEach(item => {
    item.style = 'background-color: white';
  })
  cell.forEach(item => {
    item.removeEventListener('mouseenter', activatePen);
  })
  currentlyActive = false;
}






let newSize = document.querySelector('#new-size');
newSize.value = 16;
let displaySize = document.createElement('span');
controlsContainer.appendChild(displaySize);
displaySize.textContent = newSize.value;
newSize.addEventListener('mousemove', function() {
  console.log(newSize.value);
  displaySize.textContent = newSize.value;
})




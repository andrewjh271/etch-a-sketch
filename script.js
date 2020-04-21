const container = document.querySelector('#grid-box');

let squaresPerSide = 16;
let item = [];
let currentlyActive = false;

createGrid(squaresPerSide);


function createGrid(squaresPerSide) {
  clearGrid();
  container.style.gridTemplateColumns = (`repeat(${squaresPerSide}, 1fr`);
  container.style.gridTemplateRows = (`repeat(${squaresPerSide}, 1fr`);
  let numberOfCells = squaresPerSide * squaresPerSide;
  for(let i = 0; i<numberOfCells; i++) {
    item[i] = document.createElement('div');
    item[i].classList.add('cell');
    container.appendChild(item[i]);
  }
}
function clearGrid() {
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
}


container.addEventListener('click', function() { togglePen()});

function togglePen() {
  if(!currentlyActive) {
    item.forEach(square => {
      square.addEventListener('mouseenter', activatePen);
    })
    currentlyActive = true;
  } else {
    item.forEach(square => {
      square.removeEventListener('mouseenter', activatePen);
    })
    currentlyActive = false;
  }
}
function activatePen(e) {
  console.log(e.target);
  e.target.classList.add('drawn');
}

const reset = document.querySelector('button');
reset.addEventListener('click', function() {
  item.forEach(square => {
    square.classList.remove('drawn');
  })
  let squaresPerSide = prompt('How many squares per side would you like in the new grid?');
  createGrid(squaresPerSide);
})



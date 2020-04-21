const gridContainer = document.querySelector('#grid-container');
const controlsContainer = document.querySelector('#controls-container')
let squaresPerSide = 16;
let cell = [];
let currentlyActive = false;
let colorChoice = 0; //blue
let currentColor = [];

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
  colorChoice = +colorButtons.color.value; //converts to number
  console.log(colorChoice);
  switch(colorChoice) {
    case(0):
      currentColor = [19, 123, 214, 0.95];
      e.target.style = `background-color: rgba(${currentColor})`;
      break;
    case(1):
      currentColor = randomColor1();
      e.target.style = `background-color: rgba(${currentColor})`; //emphasizes blue
      break;
    case(2):
      currentColor = randomColor2();
      e.target.style = `background-color: rgba(${currentColor})`; //emphasizes blue
      break;
    case(3):
      currentColor = randomColor3();
      e.target.style = `background-color: rgba(${currentColor})`; //emphasizes blue
      break;
    case(4):
      currentColor = darken(e);
      e.target.style = `background-color: rgba(${currentColor})`
      break;
    case(5):
      currentColor = colorPicker.value;
      e.target.style = `background-color: ${currentColor}`;
      console.log(currentColor);
      break;
    default:
      currentColor = [19, 123, 214, 0.95];
      e.target.style = `background-color: rgba(${currentColor})`;
      break;
  }
}
function randomColor1() {
  let red = Math.floor(Math.random()*150);
  let green = Math.floor(Math.random()*220);
  let blue = (Math.floor(Math.random()*135)+120);
  let alpha = (0.5*Math.random()+0.5);
  return [red, green, blue, alpha];
} //emphasizes blue
function randomColor2() {
  // let red = Math.floor(Math.random()*100+155);
  let red = (Math.floor(Math.random()*135)+120);
  let green = Math.floor(Math.random()*100);
  let blue = Math.floor(Math.random()*255);
  let alpha = (0.6*Math.random()+0.2);
  return [red, green, blue, alpha];
} //emphasizes red
function randomColor3() {
  let red = Math.floor(Math.random()*50);
  let green = Math.floor(Math.random()*125+130);
  let blue = (Math.floor(Math.random()*255));
  let alpha = (0.5*Math.random()+0.5);
  return [red, green, blue, alpha];
} //emphasizes green
function darken(e) {
  console.log(e.target.style.backgroundColor);
  let colorString = e.target.style.backgroundColor;
  let red = (+(colorString.slice(colorString.indexOf('(')+1, colorString.indexOf(','))));
  colorString = colorString.slice(colorString.indexOf(' ')+1);
  let green = (+colorString.slice(0, colorString.indexOf(',')));
  colorString = colorString.slice(colorString.indexOf(' ')+1);
  let blue = (+colorString.slice(0, colorString.indexOf(',')));
  colorString = colorString.slice(colorString.indexOf(' ')+1, colorString.indexOf(')'));
  let alpha = +colorString;
  console.log([red, green, blue, alpha]);
  red = ((red - 25.5) < 0) ? 0 : red - 25.5;
  green = ((green - 25.5) < 0) ? 0 : green - 25.5;
  blue = ((blue - 25.5) < 0) ? 0 : blue - 25.5;
  alpha = ((alpha + 0.1) >= 1) ? 1 : alpha + 0.99;
  return [red, green, blue, alpha];
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
    // item.classList.remove('drawn');
    // item.classList.add('white');
    displaySize.textContent = newSize.value;
    item.removeEventListener('mouseenter', activatePen);
  })
  currentlyActive = false;
}




const colorButtons = document.querySelector('#radio-buttons');
colorButtons.addEventListener('change', function(){
  console.log(colorButtons.color.value)
})

const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('change', function() {
  console.log(colorPicker.value);
})
colorPicker.value = '#e490ff';


let newSize = document.querySelector('#new-size');
newSize.value = 16;
let displaySize = document.createElement('span');
// controlsContainer.appendChild(displaySize);
controlsContainer.insertBefore(displaySize, colorButtons);
displaySize.textContent = newSize.value;
newSize.addEventListener('mousemove', function() {
  // console.log(newSize.value);
  displaySize.textContent = newSize.value;
})


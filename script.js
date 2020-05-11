const gridContainer = document.querySelector('#grid-container');
const controlsContainer = document.querySelector('#controls-container')
let squaresPerSide = 16;
let cell = [];
let currentlyActive = false;
let currentColor = [];

gridContainer.addEventListener('click', function() { togglePen()});

//Controls:

//Clear:
const resetButton = document.querySelector('#clear');
resetButton.addEventListener('click', clear);

//New Grid:
const newGridButton = document.querySelector('#new-grid');
newGridButton.addEventListener('click', function() {
  clear();
  createGrid(newSize.value);
})

//Range Bar and Display:
let newSize = document.querySelector('#new-size');
newSize.value = 16;
let displaySize = document.querySelector('#size-label');
displaySize.textContent = newSize.value;
newSize.addEventListener('mousemove', function() {
  displaySize.textContent = newSize.value;
})

//Color theme radio buttons:
const colorButtons = document.querySelector('#radio-buttons');
colorButtons.addEventListener('click', function(){
  console.log(colorButtons.color.value)
  if(colorButtons.color.value == 'darken') {
    cell.forEach(item => {
      item.dataset.darken = 0; //reset # of steps needed to get to black
    })
  }
}) 
colorButtons.color.value = 'default';

//Color picker
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('change', function() {
  console.log(colorPicker.value);
})
colorPicker.value = '#7b68ee';

createGrid(squaresPerSide);

//Functions:

function createGrid(squaresPerSide) {
  removeCells();
  gridContainer.style.gridTemplateColumns = (`repeat(${squaresPerSide}, 1fr`);
  gridContainer.style.gridTemplateRows = (`repeat(${squaresPerSide}, 1fr`);
  let numberOfCells = squaresPerSide * squaresPerSide;
  for(let i = 0; i<numberOfCells; i++) {
    cell[i] = document.createElement('div');
    cell[i].classList.add('cell');
    cell[i].dataset.darken = 0; //keeps track of current step (0-9) for 'Incrementally Darken'
    cell[i].style = 'background-color: rgba(255, 255, 255, 1)'; //redundant, but deals with override of css styling
    cell[i].addEventListener('click', activatePen);
    gridContainer.appendChild(cell[i]);
  }
}
function removeCells() {
  while(gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}
function clear() {
  cell.forEach(item => {
    item.style = 'background-color: rgba(255, 255, 255, 1)';
    item.removeEventListener('mouseenter', activatePen);
    item.dataset.darken = 0; //reset # of steps needed to get to black
  })
  currentlyActive = false;
}
function togglePen() {
  if(!currentlyActive) {
    cell.forEach(item => {
      item.addEventListener('mouseleave', activatePen);
    })
    currentlyActive = true;
  } else {
    cell.forEach(item => {
      item.removeEventListener('mouseleave', activatePen);
    })
    currentlyActive = false;
  }
}
function activatePen(e) {
  colorTheme = colorButtons.color.value;
  switch(colorTheme) {
    case('random1'):
      currentColor = randomColor1();
      e.target.style = `background-color: rgba(${currentColor})`;
      break;
    case('random2'):
      currentColor = randomColor2();
      e.target.style = `background-color: rgba(${currentColor})`;
      break;
    case('random3'):
      currentColor = randomColor3();
      e.target.style = `background-color: rgba(${currentColor})`;
      break;
    case('darken'):
      currentColor = darken(e);
      e.target.style = `background-color: rgba(${currentColor})`
      break;
    case('user'):
      currentColor = colorPicker.value;
      e.target.style = `background-color: ${currentColor}`;
      console.log(currentColor);
      break;
    default:
      currentColor = [19, 123, 214, 0.95];
      e.target.style = `background-color: rgba(${currentColor})`;
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
  let red = (Math.floor(Math.random()*155)+100);
  let green = (Math.floor(Math.random()*255)+000);
  let blue = Math.floor(Math.random()*0);
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
  let oldColor = e.target.style.backgroundColor;
  console.log(oldColor);
  let rgbaString = (oldColor.charAt(3) == 'a') ? oldColor.slice(5, -1) : oldColor.slice(4, -1);
  //checks whether backgroundColor is in rgba or rgb format
  let rgbaArray = rgbaString.split(',');
  let red = rgbaArray[0];
  let green = rgbaArray[1];
  let blue = rgbaArray[2];
  let alpha = rgbaArray[3] ? rgbaArray[3] : 1;
  let currentDarkeningStep = e.target.dataset.darken;
  if(currentDarkeningStep == 9) return [0, 0, 0, 1]; //cell is already black
  console.log([red, green, blue, alpha]);
  console.log('Current darkening step: ' + currentDarkeningStep);
  let newRed = getNewColorValue(red, currentDarkeningStep, false);
  let newGreen = getNewColorValue(green, currentDarkeningStep, false);
  let newBlue = getNewColorValue(blue, currentDarkeningStep, false);
  let newAlpha = getNewColorValue(alpha, currentDarkeningStep, true);
  currentDarkeningStep++;
  e.target.dataset.darken = currentDarkeningStep;
  console.log([newRed, newGreen, newBlue, newAlpha]);
  return [newRed, newGreen, newBlue, newAlpha];
}
function getNewColorValue(currentColorValue, step, alpha) {
  let increment;
  let newValue;
  if(!alpha) {
    increment = currentColorValue / (10 - step);
    console.log('Current color value: ' + currentColorValue);
    console.log('Increment: ' + increment);
    newValue = currentColorValue - increment;
  }else {
    increment = (1 - currentColorValue) / (10 - step);
    console.log('Current color value: ' + currentColorValue);
    console.log('Increment: ' + increment);
    newValue = +currentColorValue + increment; 
  }
  console.log('New color value: ' + newValue);
  return (newValue);
}
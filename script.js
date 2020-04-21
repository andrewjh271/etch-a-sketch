const container = document.querySelector('#grid-box');

let numberOfCells = 256;
let item = [];
let currentlyActive = false;


for(let i = 0; i<numberOfCells; i++) {
  item[i] = document.createElement('div');
  item[i].classList.add('cell');
  // item.setAttribute('id', i);
  container.appendChild(item[i]);
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
})


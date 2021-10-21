const grid = document.querySelector('.grid');
const colorWheel = document.getElementById('color-wheel');
const rgb = document.getElementById('rgb');
const clear = document.getElementById('clear');
const gridSize = document.getElementById('slider');
let sizeValue = document.getElementById('sizeValue');
const colorMode = document.getElementById('color-mode');
const eraseMode = document.getElementById('eraser');

const DEFAULT_COLOR = '#40e0d0';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let colorwheelPicker = '';


eraseMode.addEventListener('click',()=>{
    currentMode = eraseMode.innerHTML;
    currentColor = '#FFFFFF';
});
    

rgb.addEventListener('click', () =>{
    currentMode = rgb.innerHTML;
});
clear.addEventListener('click', () =>{
    reloadGrid(currentSize);
});
colorWheel.onchange=(e)=>{
    colorwheelPicker = e.target.value;
    currentColor = colorwheelPicker;
    currentMode = colorMode.innerHTML;
} 
colorMode.addEventListener('click',()=>{
    currentMode = colorMode.innerHTML;
    currentColor = colorwheelPicker;
});
gridSize.onchange=(e)=>{
    currentSize = e.target.value;
    reloadGrid(currentSize);
    updateSizeValue(currentSize);
}


function updateSizeValue(value) {
    sizeValue.innerHTML = `${value}x${value}`
}

function reloadGrid(size){
    grid.innerHTML = '';
    gridMaker(size);
}

function gridMaker(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(i = 0; i<size*size; i++){
        let square = document.createElement('div');
        square.addEventListener('mouseover',changeColor);
        grid.appendChild(square);
    }
}

function changeColor(e){
    if(currentMode === 'RGB'){
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    if(currentMode === DEFAULT_MODE){
        e.target.style.backgroundColor = DEFAULT_COLOR;
    }
    if(currentMode === 'Color'){
        e.target.style.backgroundColor = currentColor;
    }
    
    if(currentMode === 'Erase'){
        e.target.style.backgroundColor = currentColor;
    }
    
}


window.onload = () =>{
    gridMaker(DEFAULT_SIZE);
}

console.log(grid)

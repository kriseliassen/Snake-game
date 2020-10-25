const grid = document.querySelector('.grid')
const btnStart = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
const width = 20
let currentSnake = [2,1,0]
let direction = 1


function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
}

function control(e) {
    if (e.keyCode === 37) {
        direction = -1
    } else if (e.keyCode === 38) {
        direction = -width
    } else if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 40) {
        direction = +width
    }
}

/* const timerId = setInterval(move, 1000) */

document.addEventListener('keydown', control)
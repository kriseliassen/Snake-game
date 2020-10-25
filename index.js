const grid = document.querySelector('.grid')
const btnStart = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let gameOverDisplay = document.getElementById('gameOver')
let squares = []
let currentSnake = [202,201,200]
let width = 20
let direction = 1
let appleIndex = 0
let timerId = 0
let score = 0
let speed = 0.9
let intervalTime = 800


function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

function gameOver() {
    gameOverDisplay.textContent = 'Game over!'
}

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [202,201,200]
    score = 0
    scoreDisplay.textContent = score
    gameOverDisplay.textContent = ""
    direction = 1
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
   if (
        /* Snake hits right wall */
        (currentSnake[0] % width === width-1 && direction === 1) ||
        /* Snake hits bottom wall */
        (currentSnake[0] + width >= width*width && direction === width) ||
        /* Snake hits left wall */
        (currentSnake[0] % width === 0 && direction === -1) ||
        /* Snake hits top wall */
        (currentSnake[0] - width < 0 && direction === +width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
        ) 
    return [clearInterval(timerId), gameOver()]
        


    /* Removes end-square from snake */
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    /* Adds length to snake in front */
    currentSnake.unshift(currentSnake[0] + direction)
    
    /* If snake gets apple */
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        intervalTime = intervalTime * speed    
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random()*squares.length)
    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}
generateApple()

function control(e) {
    if (e.keyCode === 39) {
    direction = 1
    } else if (e.keyCode === 38) {
    direction = -width
    } else if (e.keyCode === 37) {
    direction = -1
    } else if (e.keyCode === 40) {
    direction = +width
    }
}


document.addEventListener('keyup', control)
btnStart.addEventListener('click', startGame)
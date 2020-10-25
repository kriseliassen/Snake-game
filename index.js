const grid = document.querySelector(".grid")
const btnStart = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
let squares = []
const width = 20


function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()
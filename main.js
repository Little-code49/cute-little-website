const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const scl = 3
const row = Math.floor(canvas.width / scl)
const col = Math.floor(canvas.height / scl)

const mouse = { x: 0, y: 0 }

const ctx = canvas.getContext('2d')

let grid
let click = false
let wall = false

let hue = 0

function matrix(c, r) {
  let arr = new Array(c)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(r)
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0
    }
  }
  return arr
}

function setup() {
  grid = matrix(col, row)
  for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
      grid[y][x] = 0
    }
  }
}

function loop() {
  requestAnimationFrame(loop)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let nextGrid = matrix(col, row)
  for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
      if (grid[y][x] > 0) {
        if (y < col - 1 && grid[y + 1][x] === 0) {
          nextGrid[y + 1][x] = grid[y][x]
        } else if (y < col - 1 && grid[y + 1][x + 1] === 0) {
          nextGrid[y + 1][x + 1] = grid[y][x]
        } else if (y < col - 1 && grid[y + 1][x - 1] === 0) {
          nextGrid[y + 1][x - 1] = grid[y][x]
        } else {
          nextGrid[y][x] = grid[y][x]
        }
      } else if (grid[y][x] == -1) {
        nextGrid[y][x] = grid[y][x]
      }
    }
  }
  grid = nextGrid
  for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
      //ctx.strokeStyle = 'black'
      //ctx.strokeRect(x * scl, y * scl, scl, scl)
      if (grid[y][x] > 0) {
        ctx.fillStyle = `hsl(${grid[y][x]}, 100%, 50%)` 
        ctx.fillRect(x * scl, y * scl, scl, scl)
      }else if (grid[y][x] == -1){
        ctx.fillStyle = 'black'
        ctx.fillRect(x * scl, y * scl, scl, scl)
      }
    }
  }
}
canvas.addEventListener('mousedown', () => click = true)
canvas.addEventListener('mouseup', () => click = false)
addEventListener('keydown', () => wall = true)
addEventListener('keyup', () => wall = false)
canvas.addEventListener('mousemove', (evt) => {
  let x = Math.floor(evt.x / scl)
  let y = Math.floor(evt.y / scl)

  if (click) {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (grid[i][j] != null) {
          grid[(y + i) - 2][(x + j) - 2] = wall ? -1 : hue
        }
      }
    }
    hue += wall ? 0 : .5
  }
})
setup()
//setInterval(loop, 1000 / 30)
loop()
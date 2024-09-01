const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let worm = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let direction = 'RIGHT';
let growing = false;
let speed = 100;
let interval;

// Ajusta el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Maneja los eventos de teclado
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.code === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (e.code === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.code === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Función para dibujar el gusanito
function drawWorm() {
    ctx.fillStyle = 'green';
    worm.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
}

// Función para dibujar la comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Función para mover el gusanito
function moveWorm() {
    const head = { ...worm[0] };
    
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    worm.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        growing = true;
        // Nueva comida
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };
    }

    if (!growing) {
        worm.pop();
    } else {
        growing = false;
    }

    // Chequea límites
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        clearInterval(interval);
        alert('Game Over');
    }
}

// Función principal del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorm();
    drawFood();
    moveWorm();
}

// Inicia el juego
interval = setInterval(gameLoop, speed);

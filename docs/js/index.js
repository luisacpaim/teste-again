let canvas = document.getElementById ("snake");
let context = canvas.getContext ("2d");
let box = 32;

let snake = [];
snake [0] = {
    x: 8 * box,
    y: 8 * box
}

/*Variável para que a cobrinha ande: */
let direction = "right";

/*Criando comida*/
let food = {
    x: Math.floor (Math.random() * 15 + 1) * box, /* o math floor retira os decimais, limitando o random a numeros inteiros */
    y: Math.floor (Math.random() * 15 + 1) * box
}

/* funções que criam os elementos do jogo */
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect (0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "pink";
    context.fillRect(food.x, food.y, box, box)
}

/* movimento da cobrinha pela tela. (não entendi o porque dos 37 a 40) */
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

/* PRA RODAR O JOGO */

function iniciarJogo() {

    /* para a cobrinha sair e voltar pra tela */
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0; /*se a cobrinha ultrapassar a tela (.x>15) volta no 'início' (.x=0) */
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box; 
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box; 

    /* encerrando o jogo em caso de choque da cobrinha nela mesma */
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Jogo :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    /* definindo ponto de partida da cobrinha, para quando jogo for resetado */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
    snake.pop(); /*tira o ultimo elemento do array*/
    } else { 
        food.x = Math.floor (Math.random() * 15 + 1) * box;
        food.y = Math.floor (Math.random() * 15 + 1) * box; 
    }
    /*cabeça móvel da cobrinha; " 'unshift' - acrescenta uma no primeiro elemento*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}   

let jogo = setInterval (iniciarJogo, 100); /*100 milisegundos; intervalo para atualização do jogo(?) */
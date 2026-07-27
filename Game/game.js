const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

const game = document.getElementById("game");

const player = document.getElementById("player");

const scoreText = document.getElementById("score");

const gameOver = document.getElementById("gameOver");

const finalScore = document.getElementById("finalScore");

let y = 220;

const step = 50;

let score = 0;

let playing = false;

/* THREE ARROWS */

const arrows = [

{
    element: document.getElementById("arrow1"),
    x: 900,
    y: 50,
    speed: 5,
    counted: false
},

{
    element: document.getElementById("arrow2"),
    x: 1200,
    y: 150,
    speed: 10,
    counted: false
},

{
    element: document.getElementById("arrow3"),
    x: 1500,
    y: 250,
    speed: 5,
    counted: false
}

];

function randomY(){

    return Math.random() * (game.clientHeight - 30);

}

function startGame(){

    startScreen.style.display = "none";

    game.style.display = "block";

    playing = true;

    score = 0;

    scoreText.innerHTML = "Score : 0";

    y = 220;

    player.style.top = y + "px";

    arrows.forEach((a,index)=>{

        a.x = 900 + (index * 300);

        a.y = randomY();

        a.counted = false;

        a.element.style.left = a.x + "px";

        a.element.style.top = a.y + "px";

    });

    gameLoop();

}

startBtn.onclick = startGame;

/* PLAYER MOVEMENT */

document.addEventListener("keydown",function(e){

    if(e.key=="s" || e.key=="S"){

        if(!playing){

            startGame();

        }

        return;

    }

    if(!playing) return;

    if(e.key=="ArrowUp"){

        y -= step;

        if(y < 0){

            y = 0;

        }

    }

    else if(e.key=="ArrowDown"){

        y += step;

        if(y > game.clientHeight - player.clientHeight){

            y = game.clientHeight - player.clientHeight;

        }

    }

    player.style.top = y + "px";

});

/* MAIN GAME LOOP */

function gameLoop(){

    if(!playing) return;

    arrows.forEach(a=>{

        a.x -= a.speed;

        /* Arrow successfully escaped player */

        const playerLeft = game.clientWidth - 50 - player.clientWidth;

        if(!a.counted && (a.x + 70) < playerLeft){

            score++;

            scoreText.innerHTML = "Score : " + score;

                a.counted = true;

        }
        /* Respawn Arrow */

        if(a.x < -80){

            a.x = game.clientWidth + Math.random() * 400;

            a.y = randomY();

            a.counted = false;

        }

        a.element.style.left = a.x + "px";

        a.element.style.top = a.y + "px";

        checkCollision(a);

    });

    requestAnimationFrame(gameLoop);

}

/* COLLISION */

function checkCollision(a){

    const p = player.getBoundingClientRect();

    const ar = a.element.getBoundingClientRect();

    if(

        p.left < ar.right &&
        p.right > ar.left &&
        p.top < ar.bottom &&
        p.bottom > ar.top

    ){

        playing = false;

        gameOver.style.display = "flex";

        finalScore.innerHTML = "Final Score : " + score;

    }

}
const gameboard=document.querySelector("#gameboard");
const ctx=gameboard.getContext("2d")
const scoretext=document.querySelector("#scoretext");
const resetbtn=document.querySelector("buttonbtn");
const gameWidth=gameboard.width;
const gameHeight=gameboard.height;
const boardbackground="white";
const snakecolor="lightgreen";
const snakeboarder="black"
const foodcolor="red"
const unitSize=25;
let running=false;
let xvelocity=unitSize;
let yvelocity=0;
let foodX;
let foodY;
let score= 0;
let snake=[{x:unitSize*4,y:0},
{x:unitSize*3,y:0},{x:unitSize*2,y:0},{x:unitSize*1, y:0},{x:0,y:0}];


window.addEventListener("keydown",changeDirection);
buttonbtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running=true;
    scoretext.textContent=score;

    createFood();
    drawFood();
    nextTick();
    

    
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },75)
    }
    else{
        displayeGameOver();
    }
};
function clearBoard(){
ctx.fillStyle=boardbackground;
ctx.fillRect(0,0,gameWidth,gameHeight)

};
function createFood(){
    function randomFood(min,max){
        const randNum=Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    foodX=randomFood(0,gameWidth-unitSize);
    foodY=randomFood(0,gameWidth-unitSize);
};
function drawFood(){
    ctx.fillStyle=foodcolor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
};
function moveSnake(){
  const head={x:snake[0].x+xvelocity,
    y:snake[0].y+yvelocity};
  snake.unshift(head);
  if(snake[0].x==foodX&&snake[0].y==foodY){
    score+=1;
    scoretext.textContent=score;
    createFood();
  }
  else{
    snake.pop();
  }

};
function drawSnake(){
ctx.fillStyle=snakecolor;
ctx.strokeStyle=snakeboarder;
snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
    ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
    
});

};
function changeDirection(event){
    const keyPressed=event.keyCode;
    
    const LEFT=37;
    const UP=38;
    const RIGHT=39;
    const DOWN=40;

    const goingUp=(yvelocity==-unitSize);
    const goingDown=(yvelocity==unitSize);
    const goingRight=(xvelocity==unitSize);
    const goingLeft=(xvelocity==-unitSize);
    
    switch(true){
        case(keyPressed==LEFT&& !goingRight):
        xvelocity=-unitSize;
        yvelocity=0;
        break;
        case(keyPressed==UP&& !goingDown):
        xvelocity=0;
        yvelocity=-unitSize;
        break;
        case(keyPressed==RIGHT&& !goingLeft):
        xvelocity=unitSize;
        yvelocity=0;
        break;
        case(keyPressed==DOWN&& !goingUp):
        xvelocity=0;
        yvelocity=unitSize;
        break;
        
    }
    
    
   
};
function checkGameOver(){
    switch(true){
    case (snake[0].x < 0):
    running=false;
        break;
    case (snake[0].x >=gameWidth):
    running=false;
        break;
    case (snake[0].y<0):
            running=false;
                break;
    case (snake[0].y>=gameHeight):
                    running=false;
                        break;
    }
    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){

            running=false; 
        }
    }
    
     
};
function displayeGameOver(){
   ctx.font="50px MV Boli";
   ctx.fillStyle="black";
   ctx.textAlign="center";
   ctx.fillText("GAME OVER!", gameWidth/2,gameHeight/2);
   running=false;


};
function resetGame(){
    score=0;
    xvelocity=unitSize;
    yvelocity=0;
    snake=[{x:unitSize*4,y:0},
        {x:unitSize*3,y:0},{x:unitSize*2,y:0},{x:unitSize*1, y:0},{x:0,y:0}];
    gameStart();
};



 
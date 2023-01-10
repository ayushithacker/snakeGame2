//variables
const foodsound = new Audio('/sound/food.mp3');
const movesound = new Audio('/sound//movesound');
const gameoversound = new Audio('/sound/gameover.mp3');
const musicsound = new Audio('/sound/music.mp3');
var score=0;

var lastpaint=0;
var inputdir ={x:0, y:0};
var inputdir2 ={x:1, y:0};
var snake_Speed=5;
var snakearr= [
{x:5, y:7}]
var snakearr2= [
    {x:2, y:16}]
food= {x:10, y:12};

//functions

function game()
{
    // if game is over
    if(iscolide(snakearr))
    {
    inputdir = {x:0, y:0};
    inputdir2 = {x:0, y:0};
    gameoversound.play();
    musicsound.pause();
    alert("Game over");
    score=0;
    scorebox.innerHTML=" Score: "+score;
    snakearr= [{x:5, y:7}];
    snakearr2= [{x:2, y:16}];
    musicsound.play();
    }
    //update snake

    if(snakearr[0].y ===food.y && snakearr[0].x === food.x)
    {
        snakearr.unshift({x:snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        snakearr2.unshift({x:snakearr2[0].x + inputdir2.x, y: snakearr2[0].y + inputdir2.y });
        foodsound.play();
        score += 1;
        scorebox.innerHTML=" Score: "+score;
        food ={x: Math.round(Math.random()*16 ), y: Math.round(Math.random()*16 )};
    }

    //move anake
    
    for (let i = snakearr.length-2; i >= 0; i--)
    {
        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    //display snake food

    board.innerHTML=" ";
    snakearr.forEach((e,index)=>{
    snakeElement= document.createElement('div');
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index === 0)
    {
        snakeElement.classList.add('head');
    }   
    else
    {
        snakeElement.classList.add('snake');
    }     
        board.appendChild(snakeElement);
    })
    
    snakearr2.forEach((e,index)=>{
    snakeElement2= document.createElement('div');
    snakeElement2.style.gridRowStart=e.y;
    snakeElement2.style.gridColumnStart=e.x;
    snakeElement2.classList.add('snake2');
        board.appendChild(snakeElement2);
    })

    foodElement= document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');    
    board.appendChild(foodElement);
}

function paint(ct)
{
    var timesec= (ct - lastpaint) /1000;
    window.requestAnimationFrame(paint);
    if(timesec < 1/snake_Speed) return;
    lastpaint=ct;
    game();
}

function iscolide(snake)
{
    for (let i = 1; i < snakearr.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 )
    return true;
}
window.requestAnimationFrame(paint);

//main logic

window.addEventListener('keydown',e =>{
    inputdir= {x:0, y:1}
    musicsound.play();
    movesound.play();
    switch(e.key)
    {
        case "ArrowUp":
            
            inputdir.x =0;
            inputdir.y =-1;
            break;

        case "ArrowDown":
                
            inputdir.x =0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
                    
            inputdir.x =-1;
            inputdir.y =0;
            break;       
                    
        case "ArrowRight":
                   
            inputdir.x =1;
            inputdir.y =0;
            break;

        default:
                    break;
    }
})

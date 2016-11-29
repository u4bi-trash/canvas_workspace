/* game_index js*/

var canvas,ctx;
var x, y;
var dx, dy;
var ballRadius;
var paddleHeight, paddleWidth, paddleX;
var rightPressed, leftPressed;

function init(){
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  
  x = canvas.width/2;
  y = canvas.height-30;
  
  dx = 2;
  dy = -2;
  
  ballRadius = 15; //반지름
  
  paddleHeight = 10;
  paddleWidth = 75;
  paddleX = (canvas.width-paddleWidth)/2;
  /* (canvas 가로값 - paddle 가로값) 나누기 2
     paddle이 갈수 있는 limit값을 정하기 위함 */
  
  rightPressed = false;
  leftPressed = false;
  
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  
  setInterval(draw, 10);
}

function keyDownHandler(e){
  switch(e.keyCode){
    case 39: rightPressed = true; break;
    case 37: leftPressed = true; break;
    default: break;
  }
}
function keyUpHandler(e){
  switch(e.keyCode){
    case 39: rightPressed = false; break;
    case 37: leftPressed = false; break;
    default: break;
  }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  /* rect(x, y, width, height)  윤곽선만 있는 사각형을 그림 */
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
  
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  /* arc(x, y, radius, startAngle, endAngle, antiClockwise)
     좌표를 중심으로 반지름 크기의 시작점부터 끝나는 점까지 잇는 곡선을 그림 */
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();  
}

function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  
  var ydy = y+dy;
  var xdx = x+dx;
  
  if(xdx < ballRadius || xdx > canvas.width-ballRadius) dx = -dx; /* left and right bouncing */
  /*ballRadius만큼 빼줌으로써 벽안으로 눌러 들어가는 것을 방지해줌*/
  
  if(ydy < ballRadius)dy = -dy;
  else if(ydy > canvas.height-ballRadius){
    /* (canvas 세로값-공의지름) 보다 클때, 즉 캔버스 화면 하단밖으로 나갔을 경우에*/
    alert('game over');
    document.location.reload();
  }
  
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    /* paddleX보다 canvas.width - paddleWidth가 높을때 */
    paddleX += 7;
  }else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  
  x += dx;
  y += dy;
}
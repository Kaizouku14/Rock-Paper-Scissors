let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0, lose: 0, tie: 0
};

document.getElementById('paper-button').addEventListener('click', () =>{
    testResult('Paper'); 
});
document.getElementById('rock-button').addEventListener('click', () =>{
   testResult('Rock');
});
document.getElementById('scissors-button').addEventListener('click', () =>{
   testResult('Scissors');
});

document.getElementById('js-auto-play').addEventListener('click', () =>{
   autoPlayer(); 
});

document.getElementById('reset-button').addEventListener('click', () =>{
   resetScore();
});

function computerPicked(){
   let result, picked = Math.random();
      if(picked >= 0 && picked < 1 / 3) result = 'Paper'
      else if(picked >= 1 / 3 && picked < 2 / 3) result = 'Scissors'
      else if(picked >= 2 / 3 && picked < 1) result = "Rock"   
   return result;
}

function testResult(choiced){
 const computer = computerPicked();

if(choiced === 'Paper'){
  computer === 'Paper' ? result = 'Tie' : 
  computer === 'Scissors' ? result = 'You Lose' :
  result = 'You win'

}else if(choiced === 'Scissors'){
  computer === 'Scissors' ? result = 'Tie' : 
  computer === 'Rock' ? result = 'You Lose' :
  result = 'You win'

}else if(choiced === 'Rock'){
  computer === 'Rock' ? result = 'Tie' : 
  computer === 'Paper' ? result = 'You Lose' :
  result = 'You win'
}
      
result === 'You win' ? score.win++ : result === 'You Lose' ? score.lose++ : score.tie++;

 updateScore(); 
 displayResult(choiced, computer, result);   
}

function updateScore(){
  document.getElementById("win-id").innerText = score.win;
  document.getElementById("lose-id").innerText = score.lose;
  document.getElementById("tie-id").innerText = score.tie;
  localStorage.setItem('score', JSON.stringify(score));
}

document.body.addEventListener('keydown', (event) => {

   if(event.key === 'p' || event.key === 'P')
      testResult('Paper');
   else if(event.key === 'r' || event.key === 'R')
      testResult('Rock');
   else if(event.key === 's' || event.key === 'S')
      testResult('Scissors');
   else if(event.key === 'a' || event.key === 'A')
      autoPlayer();
   else if(event.key === 'q' || event.key === 'Q')
      resetScore();
});


let autoplay = false;
let intervalID;
function autoPlayer(){
  
   if(!autoplay){
      document.querySelector('.auto-play-button').innerText = 'Playing';
      intervalID = setInterval(() => {
         const play =  computerPicked();
         testResult(play);
      },1000);
      autoplay = true;
   }else{
      document.querySelector('.auto-play-button').innerText = 'Paused';
      clearInterval(intervalID);
      autoplay = false;
   }
}

function resetScore(){
   score.win = 0;
   score.lose = 0;
   score.tie = 0;
   
   document.getElementById("win-id").innerText = score.win;
   document.getElementById("lose-id").innerText = score.lose;
   document.getElementById("tie-id").innerText = score.tie;
  
   document.getElementById("result").innerText = '';
   document.getElementById("player").innerHTML = '';
   document.getElementById("computer").innerHTML = '';
   localStorage.removeItem('score');
}

function displayResult(player, computer, result){

 if(player === 'Paper')
    document.getElementById("player").innerHTML = '<i style="font-size:24px" class="fa">&#xf256;</i>';
 else if(player === 'Rock')
    document.getElementById("player").innerHTML = '<i style="font-size:24px" class="fa">&#xf255;</i>';
 else
    document.getElementById("player").innerHTML = '<i style="font-size:24px" class="fa">&#xf257;</i>';

 if(computer === 'Paper')
    document.getElementById("computer").innerHTML = '<i style="font-size:24px" class="fa">&#xf256;</i>';
 else if(computer === 'Rock')
    document.getElementById("computer").innerHTML = '<i style="font-size:24px" class="fa">&#xf255;</i>';
 else
    document.getElementById("computer").innerHTML = '<i style="font-size:24px" class="fa">&#xf257;</i>';

 document.getElementById("result").innerText = result;
}

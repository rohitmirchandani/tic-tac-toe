const GameBoard = (()=>{
  const array = new Array();
  let res = false;
  for(let i=0;i<9;i++)array.push(-1);
  const playChance = (element,index)=>{
    if(array[index]==-1 && res==false){
      array[index] = Players.human();
      element.innerText = Players.human();
       res = checkResult();
      if(res == false){
        computerChance();
      }else{
        if(res=="D"){
          showDraw();
        }else{
          showWinner(res);
        }
      }
    }
  }

  function checkResult(){
    let side=[1,3,3,1];
    let index =0;
    for(let i=1;i<=7;i+=2){
      if(array[i]!=-1 && array[i]==array[i-side[index]] && array[i]==array[i+side[index]])return array[i];
      index++;
    }
    if(array[4]!=-1){
    for(let i=1;i<=4;i++){
      if(array[4]==array[4-i] && array[4]==array[4+i])return array[4];
    }
    }
    if(!array.includes(-1))return "D";
    return false;
  }
  function showWinner(winner){
    result.innerText=winner +" is Winner!!";
    resultDiv.classList.add("show");
  }
  function showDraw(){
    result.innerText="Game Draw !";
    resultDiv.classList.add("show");
  }
  function isNew(){
    let count=0;
    for(let i=0;i<array.length;i++)if(array[i]==-1)count++;
    return count==array.length;
  }
  const computerChance = ()=>{
    let index = Computer.chance();
    array[index] = Players.computer();
    board[index].innerText=Players.computer();
    res = checkResult();
    if(res=="D"){
      showDraw();
    }else if(res==false){
      return ;
    }
    showWinner(res);
  }
  function isValid(index){
    return array[index]==-1;
  }
  const resetGame = ()=>{
    for(let i=0;i<array.length;i++){
      array[i] = -1;
    }
    board.forEach((element)=>{
      element.innerText = "";
    })
    res = false;
    resultDiv.classList.remove("show");
  }
  const removeMove=(element,index)=>{
    if(array[index]==-1){
      element.innerText="";
    }
  }
  const showMove=(element,index)=>{
    if(array[index]==-1){
      element.innerText = ""+Players.human();
    }
  }

return {playChance,isNew,isValid,resetGame,computerChance,removeMove,showMove}
 
})();

const Players = (()=>{
  let humanPlayer = "X";
  let computerPlayer = "O";
  const setHumanToX = ()=>{
    if(GameBoard.isNew()){
    changeToXButton.classList.add("clicked");
    changeToOButton.classList.remove("clicked");
    humanPlayer = "X";
    computerPlayer = "O";
    }
  }
  const setHumanToO = ()=>{
    if(GameBoard.isNew()){
    changeToXButton.classList.remove("clicked");
    changeToOButton.classList.add("clicked");
    computerPlayer = "X";
    humanPlayer = "O";
    GameBoard.computerChance();
    }
  }
 const  human = ()=>{
    return humanPlayer;
  }
  const computer = ()=>{
    return computerPlayer;
  }
  
  return {human,computer,setHumanToO,setHumanToX};
})();
 
const Computer =(()=>{
  const chance = ()=>{
    for(let i=0;i<9;i++){
      if(GameBoard.isValid(i))return i;
    }
  }
  return {chance};
})();



const changeToXButton = document.querySelector("#x-button");
const changeToOButton = document.querySelector("#o-button");
const board = document.querySelectorAll("main button");
const restartButton = document.getElementById("restart-button");
const resultDiv = document.querySelector("#result-div");
const result = document.querySelector("#result");

restartButton.addEventListener("click",GameBoard.resetGame);
changeToXButton.addEventListener("click",Players.setHumanToX);
changeToOButton.addEventListener("click",Players.setHumanToO);


board.forEach((element,index)=>{
  element.addEventListener("click",()=>{GameBoard.playChance(element,index)})
  element.addEventListener("mouseover",()=>{
    GameBoard.showMove(element,index)
  })
  element.addEventListener("mouseout",()=>{GameBoard.removeMove(element,index)})
});

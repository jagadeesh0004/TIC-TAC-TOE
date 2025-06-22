let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset"); 
let messagebox = document.querySelector(".winner");
let msg = document.querySelector("#msg");
let newgame = document.querySelector(".new");
let turnx = false;
let win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let gameover = false;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameover || box.innerText !== "") return;
    if (turnx) {
      box.style.color = "red";
      box.innerText = "X";
      turnx = false;
    } else {
      box.style.color = "blue";
      box.innerText = "O";
      turnx = true;
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  });
});


function checkWinner() {
  win.forEach((w) => {
    if (boxes[w[0]].innerText === boxes[w[1]].innerText && boxes[w[1]].innerText === boxes[w[2]].innerText && boxes[w[0]].innerText !== "") {
      gameover = true;
      msg.innerText = "Player " + boxes[w[0]].innerText + " wins";
      messagebox.classList.remove("hide");
      return;
    }
  });
}
function checkDraw() {
  let allFilled = true;

  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled && !gameover) {
    msg.innerText = "It's a draw!";
    messagebox.classList.remove("hide");
    gameover = true;
  }
}



reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msg.innerText = "";
  messagebox.classList.add("hide");
  turnx = false;
  gameover = false;
});

newgame.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msg.innerText = "";
  messagebox.classList.add("hide");
  turnx = false;
  gameover = false;
});
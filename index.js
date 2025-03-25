let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset"); 
let messagebox = document.querySelector(".winner");
let msg = document.querySelector("#msg");
let newgame = document.querySelector(".new");
let turnx = false;
let win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnx) {
      box.innerText = "X";
      turnx = false;
    } else {
      box.innerText = "O";
      turnx = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

function checkWinner() {
  win.forEach((w) => {
    if (boxes[w[0]].innerText === boxes[w[1]].innerText && boxes[w[1]].innerText === boxes[w[2]].innerText && boxes[w[0]].innerText !== "") {
      msg.innerText = "Player " + boxes[w[0]].innerText + " wins";
      messagebox.classList.remove("hide");
    }
  });
}

reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msg.innerText = "";
  messagebox.classList.add("hide");
  turnx = false;
});

newgame.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msg.innerText = "";
  messagebox.classList.add("hide");
  turnx = false;
});
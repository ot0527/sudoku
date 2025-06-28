import { sudokuData } from "./sudokuData.js";
import { finish, gameOver } from "./sudokuManager.js";
//キーボード入力処理
function keyInputCheck() {
  const inputNum = document.querySelectorAll("input");
  inputNum.forEach((num) => {
    num.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^1-9]/g, "");
      e.target.value = e.target.value.replace(/[\u3040-\u309F]/g, "");
      e.target.value = e.target.value.slice(-1);
      checkAnswer(e.target.value, e.target);
    });
  });
}
keyInputCheck();

//ボタン入力処理
function btnInputCheck() {
  const button = document.querySelectorAll(".numBtn");
  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      checkAnswer(e.target.textContent, sudokuData.currentInput);
    });
  });
}
btnInputCheck();

//入力の正誤処理
function checkAnswer(value, input) {
  sudokuData.row = parseInt(input.id.charAt(0));
  sudokuData.col = parseInt(input.id.charAt(1));
  input.classList.remove("correct", "wrong");
  if (value == "") {
    return;
  } else if (value != sudokuData.fillBoard[sudokuData.row][sudokuData.col]) {
    input.classList.add("wrong");
    sudokuData.missCount++;
    if (sudokuData.missCount == 3) {
      setTimeout(() => {
        gameOver();
      }, 10);
    }
  } else {
    input.classList.add("correct");
  }
  input.value = value;
  sudokuData.board[sudokuData.row][sudokuData.col] = value;
  setTimeout(() => {
    finish();
  }, 10);
}

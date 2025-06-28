import { sudokuData } from "./sudokuData.js";
import { sudokuAlgo } from "./generateSudoku.js";
//穴の空いた盤面をinput.valueに代入
export function displayNum(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.getElementById(`${row}${col}`);
      if (input) {
        input.value = board[row][col] == 0 ? "" : board[row][col];
        input.classList.remove("correct", "wrong", "fixed");
        if (input.value != "") {
          input.classList.add("fixed");
          input.readOnly = true;
        } else {
          input.readOnly = false;
        }
      }
    }
  }
}
//画面に問題を出力する処理
export function fillNumber() {
  const btnId = document.querySelectorAll("button");
  btnId.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      switch (e.target.id) {
        case "easy":
          sudokuData.board = sudokuAlgo();
          changeDiff(sudokuData.board, 40);
          break;
        case "normal":
          sudokuData.board = sudokuAlgo();
          changeDiff(sudokuData.board, 50);
          break;
        case "difficult":
          sudokuData.board = sudokuAlgo();
          changeDiff(sudokuData.board, 60);
          break;
      }
      displayNum(sudokuData.board);
    });
  });
}
//難易度別にマスに穴をあける
function changeDiff(board, num) {
  let count = 0;
  while (count < num) {
    const delrow = Math.floor(Math.random() * 9);
    const delcol = Math.floor(Math.random() * 9);
    if (board[delrow][delcol] !== 0) {
      board[delrow][delcol] = 0;
      count++;
    }
  }
}

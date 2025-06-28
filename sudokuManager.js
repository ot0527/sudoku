import { sudokuData } from "./sudokuData.js";
//数字の削除処理
function deleteNum() {
  if (sudokuData.currentInput && !sudokuData.currentInput.readOnly) {
    sudokuData.currentInput.value = "";
  }
}

//ゲームオーバー処理
export function gameOver() {
  sudokuData.isGameOver = true;
  alert("ゲームオーバー");
  clearSudokuData();
}

//正解処理
export function finish() {
  if (sudokuData.isGameOver) return;
  const solved = !sudokuData.board.some((row) => row.some((col) => col === 0));
  if (solved) {
    alert("正解");
    clearSudokuData();
  }
}

function clearSudokuData() {
  sudokuData.board = [];
  sudokuData.fillBoard = [];
  sudokuData.currentInput = null;
  sudokuData.missCount = 0;
  const input = document.querySelectorAll("input");
  input.forEach((input) => {
    input.value = "";
    input.readOnly = false;
  });
}

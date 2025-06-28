import { sudokuData } from "./sudokuData.js";
//フォーカスしているinputの保持
export function focusInput() {
  //inputタグ取得後、focusされているinputをcurrentInputに保存
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", () => {
      document.querySelectorAll("input").forEach((e) => {
        e.style.backgroundColor = "";
      });
      sudokuData.currentInput = input;
      sudokuData.matches = [];
      const rowId = parseInt(sudokuData.currentInput.id.charAt(0));
      const colId = parseInt(sudokuData.currentInput.id.charAt(1));
      for (let row = 0; row < 9; row++) {
        const input = document.getElementById(`${row}${colId}`);
        input.style.backgroundColor = "#dcdcdc";
      }
      for (let col = 0; col < 9; col++) {
        const input = document.getElementById(`${rowId}${col}`);
        input.style.backgroundColor = "#dcdcdc";
      }
      const threeRow = Math.floor(rowId / 3) * 3;
      const threeCol = Math.floor(colId / 3) * 3;
      for (let i = threeRow; i < threeRow + 3; i++) {
        for (let j = threeCol; j < threeCol + 3; j++) {
          const input = document.getElementById(`${i}${j}`);
          input.style.backgroundColor = "#dcdcdc";
        }
      }
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (
            sudokuData.currentInput.value != "" &&
            sudokuData.board[i][j] == sudokuData.currentInput.value
          ) {
            sudokuData.matches.push({ row: i, col: j });
            document.getElementById(`${i}${j}`).style.backgroundColor =
              "#808080";
          }
        }
      }
      sudokuData.currentInput.style.backgroundColor = "#add8e6"; // 水色
    });
  });
}

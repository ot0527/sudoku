import { focusInput } from "./focusInput.js";
import { sudokuData } from "./sudokuData.js";
import { fillNumber } from "./displayNum.js";

//数独UI作成
const createBoard = () => {
  const boardId = document.getElementById("Board");
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("autocomplete", "off");
      input.setAttribute("inputmode", "numeric");
      input.id = `${row}${col}`;
      input.classList.add("cell");
      td.appendChild(input);
      tr.appendChild(td);
    }
    boardId.appendChild(tr);
  }
};
createBoard();
focusInput();

//数独アルゴリズム
export const sudokuAlgo = () => {
  console.log(1);
  //9×9の配列作成
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  //数字のシャッフル
  function shuffleArray(board) {
    for (let i = board.length - 1; i > 0; i--) {
      const num = Math.floor(Math.random() * i + 1);
      [board[i], board[num]] = [board[num], board[i]];
    }
    return board;
  }
  //マスに数字が入るか
  function isValid(board, row, col, num) {
    //行チェック
    for (let j = 0; j < 9; j++) {
      if (board[row][j] == num) {
        return false;
      }
    }
    //列チェック
    for (let i = 0; i < 9; i++) {
      if (board[i][col] == num) {
        return false;
      }
    }
    //3×3マスチェック
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] == num) {
          return false;
        }
      }
    }
    return true;
  }

  //再帰処理で盤面に数字を入れていく
  function backTrackSudoku(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] == 0) {
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (backTrackSudoku(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  //問題生成
  backTrackSudoku(board);
  //ディープコピーでfillBoardに保存しておく。
  sudokuData.fillBoard = board.map((row) => [...row]);
  return board;
};
fillNumber();

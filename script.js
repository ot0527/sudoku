const createBoard = () => {
  const boardId = document.getElementById("Board");
  for (let i = 0; i < 9; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.id = `${i + 1}${j + 1}`;
      input.oninput = function () {
        validateInput(this);
      };
      input.classList.add("cell");
      td.appendChild(input);
      tr.appendChild(td);
    }
    boardId.appendChild(tr);
  }

  function validateInput(el) {
    el.value = el.value.replace(/[^0-9]/g, "");
  }
};

const sudokuAlgo = () => {
  // 9x9のゼロ埋め盤面を作る
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function sudokuSolver(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isValid(board, i, j, num)) {
              board[i][j] = num;
              if (sudokuSolver(board)) {
                return true;
              }
              board[i][j] = 0;
            }
          }
          return false; // どの数字も入らなければfalse
        }
      }
    }
    return true; // 全部埋まったらtrue
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    for (let y = 0; y < 9; y++) {
      if (board[y][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }
    return true;
  }
  sudokuSolver(board);
  return board;
};

const fillBoardInputs = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = document.getElementById(`${i + 1}${j + 1}`);
      if (input) {
        input.value = board[i][j] === 0 ? "" : board[i][j]; // 0なら空欄にする
      }
    }
  }
};
const removeRandomCells = (board, count) => {
  let removed = 0;
  while (removed < count) {
    const i = Math.floor(Math.random() * 9);
    const j = Math.floor(Math.random() * 9);
    if (board[i][j] !== 0) {
      board[i][j] = 0; // 空白にする（0が空白の意味）
      removed++;
    }
  }
};

// 盤面作成（input作成）
createBoard();

const displayBoard = () => {
  const btn = document.querySelectorAll("button");
  btn.forEach((button) => {
    button.addEventListener("click", (e) => {
      // 盤面生成・解決（先ほどのsudokuAlgoなどで返された盤面を使う）
      let board = sudokuAlgo();
      switch (e.target.id) {
        case "easy":
          removeRandomCells(board, 40);
          // 盤面の値をinputに反映
          fillBoardInputs(board);
          break;
        case "normal":
          removeRandomCells(board, 50);
          // 盤面の値をinputに反映
          fillBoardInputs(board);
          break;
        case "difficult":
          removeRandomCells(board, 60);
          // 盤面の値をinputに反映
          fillBoardInputs(board);
          break;
      }
    });
  });
};
displayBoard();

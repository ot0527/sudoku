//数独マス目作成
const createBoard = () => {
  const boardId = document.getElementById("Board");
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.id = `${row + 1}${col + 1}`;
      input.classList.add("cell");
      input.oninput = (e) => {
        validate(e.target);
      };
      td.appendChild(input);
      tr.appendChild(td);
    }
    boardId.appendChild(tr);
  }
  function validate(el) {
    el.value = el.value.replace(/[^0-9]/g, "");
  }
};
createBoard();

//数独アルゴリズム
const sudokuAlgo = () => {
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

  //数独盤面作成
  function backTrackSudoku(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] == 0) {
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (num of nums) {
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
  backTrackSudoku(board);
  return board;
};

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

//マスに入力された数字をinputに代入
function displayNum(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.getElementById(`${row + 1}${col + 1}`);
      if (input) {
        input.value = board[row][col] == 0 ? "" : board[row][col];
      }
    }
  }
}

function fillNumber() {
  const btnId = document.querySelectorAll("button");
  btnId.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const board = sudokuAlgo();
      switch (e.target.id) {
        case "easy":
          changeDiff(board, 40);
          displayNum(board);
          break;
        case "normal":
          changeDiff(board, 50);
          displayNum(board);
          break;
        case "difficult":
          changeDiff(board, 60);
          displayNum(board);
          break;
      }
    });
  });
}

fillNumber();

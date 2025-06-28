//数独データ初期値
const sudokuData = {
  //穴空き盤面
  board: [],
  //解答盤面
  fillBoard: [],
  //フォーカスされているinput
  currentInput: null,
  //間違えた回数
  missCount: 0,
  //行の要素番号
  row: 0,
  //列の要素番号
  col: 0,
  //クリックした数字
  matches: [],
};
//フォーカスしているinputの保持
function focusInput() {
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

  //再帰処理で盤面に数字を入れていく
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
  //問題生成
  backTrackSudoku(board);
  //ディープコピーでfillBoardに保存しておく。
  sudokuData.fillBoard = board.map((row) => [...row]);
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

//穴の空いた盤面をinput.valueに代入
function displayNum(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.getElementById(`${row}${col}`);
      if (input) {
        input.value = board[row][col] == 0 ? "" : board[row][col];
        if (input.value != "") {
          input.style.color = "black";
          input.readOnly = true;
        } else {
          input.readOnly = false;
        }
      }
    }
  }
}

//画面に問題を出力する処理
function fillNumber() {
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
fillNumber();

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
  if (value == "") {
    return;
  } else if (value != sudokuData.fillBoard[sudokuData.row][sudokuData.col]) {
    input.style.color = "red";
    sudokuData.missCount++;
    if (sudokuData.missCount == 3) {
      setTimeout(() => {
        gameOver();
      }, 10);
    }
  } else {
    input.style.color = "blue";
  }
  input.value = value;
  sudokuData.board[sudokuData.row][sudokuData.col] = value;
  finish();
}

//数字の削除処理
function deleteNum() {
  if (sudokuData.currentInput && !sudokuData.currentInput.readOnly) {
    sudokuData.currentInput.value = "";
  }
}

//ゲームオーバー処理
function gameOver() {
  alert("ゲームオーバー");
  clearSudokuData();
}

//正解処理
function finish() {
  const noNull = !sudokuData.board.includes("");
  if (noNull) {
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

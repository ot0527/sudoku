//数独データ初期値
export const sudokuData = {
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
  //ゲームオーバー
  isGameOver: false,
};

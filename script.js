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
createBoard();

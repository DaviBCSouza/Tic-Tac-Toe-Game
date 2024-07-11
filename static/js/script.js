// Declarando as variáveis
let turn = "X";
let isGameOver = false;
const boxes = document.querySelectorAll(".box");

// Função para iniciar o jogo
const initializeGame = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.addEventListener("click", handleBoxClick);
  });

  document.querySelector("#play-again").addEventListener("click", resetGame);
};

// Função para lidar com o clique nas caixas
const handleBoxClick = (event) => {
  if (!isGameOver && event.target.innerHTML === "") {
    event.target.innerHTML = turn;
    checkWin();
    checkDraw();
    changeTurn();
  }
};

// Função para verificar se houve uma vitória
const checkWin = () => {
  const winConditions = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  winConditions.forEach((condition) => {
    const [a, b, c] = condition;
    if (
      boxes[a].innerHTML &&
      boxes[a].innerHTML === boxes[b].innerHTML &&
      boxes[a].innerHTML === boxes[c].innerHTML
    ) {
      isGameOver = true;
      displayResult(`'${turn}' Ganhou`);
      highlightWinningBoxes(condition);
    }
  });
};

// Função para verificar se houve um empate
const checkDraw = () => {
  if (!isGameOver) {
    const isDraw = Array.from(boxes).every((box) => box.innerHTML !== "");
    if (isDraw) {
      isGameOver = true;
      displayResult("Empate");
    }
  }
};

// Função de trocar o turno
const changeTurn = () => {
  const bgElement = document.querySelector(".bg");
  if (turn === "X") {
    turn = "O";
    bgElement.style.left = "85px";
    bgElement.style.backgroundColor = "var(--dark-violet)";
  } else {
    turn = "X";
    bgElement.style.left = "0";
    bgElement.style.backgroundColor = "var(--bright-orange)";
  }
};

// Função para resetar o jogo
const resetGame = () => {
  isGameOver = false;
  turn = "X";
  document.querySelector(".bg").style.left = "0";
  document.querySelector(".bg").style.backgroundColor = "var(--bright-orange)";
  displayResult("");
  document.querySelector("#play-again").style.display = "none";

  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.removeProperty("background-color");
    box.style.color = "white";
  });
};

// Função para exibir o resultado
const displayResult = (message) => {
  document.querySelector("#results").innerHTML = message;
  document.querySelector("#play-again").style.display = "inline";
};

// Função para destacar a jogada vencedora
const highlightWinningBoxes = (condition) => {
  condition.forEach((index) => {
    boxes[index].style.backgroundColor = "var(--dark-violet)";
    boxes[index].style.color = "black";
  });
};

// Inicializa o jogo ao carregar a página
initializeGame();

const grid = document.querySelector(".grid");
const spanJogador = document.querySelector(".jogador");
const timer = document.querySelector(".timer");

const conteudos = [
  "comb-1",
  "resultado-1",
  "comb-2",
  "resultado-2",
  "comb-3",
  "resultado-3",
  "comb-4",
  "resultado-4",
  "comb-5",
  "resultado-5",
];

const pares = {
  "comb-1": "resultado-1",
  "resultado-1": "comb-1",
  "comb-2": "resultado-2",
  "resultado-2": "comb-2",
  "comb-3": "resultado-3",
  "resultado-3": "comb-3",
  "comb-4": "resultado-4",
  "resultado-4": "comb-4",
  "comb-5": "resultado-5",
  "resultado-5": "comb-5",
};

const criarElemento = (tag, classe) => {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  return elemento;
};

let primeiraCarta = "";
let segundaCarta = "";

const checarVencedor = () => {
  const cartasDesabilitadas = document.querySelectorAll(".desativar-carta");
  if (cartasDesabilitadas.length === conteudos.length) {
    clearInterval(this.loop);
    alert(
      `Parabéns ${localStorage.getItem("jogador")}! Você ganhou em ${
        timer.innerHTML
      } segundos!`
    );
    reiniciarJogo();
  }
};

const verificaCartas = () => {
  const primeiroConteudo = primeiraCarta.getAttribute("dado-conteudo");
  const segundoConteudo = segundaCarta.getAttribute("dado-conteudo");

  if (pares[primeiroConteudo] === segundoConteudo) {
    primeiraCarta.firstChild.classList.add("desativar-carta");
    segundaCarta.firstChild.classList.add("desativar-carta");
    primeiraCarta = "";
    segundaCarta = "";
    setTimeout(() => {
      checarVencedor();
    }, 400);
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("revela-carta");
      segundaCarta.classList.remove("revela-carta");
      primeiraCarta = "";
      segundaCarta = "";
    }, 1000);
  }
};

const revelaCarta = (evento) => {
  let card = evento.target;

  while (!card.classList.contains("card")) {
    card = card.parentNode;
    if (!card) {
      return;
    }
  }

  if (
    card.classList.contains("revela-carta") ||
    card.firstChild.classList.contains("desativar-carta")
  ) {
    return;
  }

  if (primeiraCarta === "") {
    card.classList.add("revela-carta");
    primeiraCarta = card;
  } else if (segundaCarta === "") {
    card.classList.add("revela-carta");
    segundaCarta = card;
    verificaCartas();
  }
};

const criarCard = (conteudo) => {
  const card = criarElemento("div", "card");
  const frente = criarElemento("div", "face frente");
  const verso = criarElemento("div", "face verso");

  frente.style.backgroundImage = `url(../images/${conteudo}.png)`;

  card.appendChild(frente);
  card.appendChild(verso);

  card.addEventListener("click", revelaCarta);
  card.setAttribute("dado-conteudo", conteudo);

  return card;
};

const adicionarConteudosAoGrid = () => {
  //const duplicarConteudos = [...conteudos, ...conteudos];

  const embaralharConteudos = conteudos.sort(() => Math.random() - 0.5);

  embaralharConteudos.forEach((conteudo) => {
    const card = criarCard(conteudo);
    grid.appendChild(card);
  });
};

const iniciarTimer = () => {
  this.loop = setInterval(() => {
    const tempoAtual = +timer.innerHTML;
    timer.innerHTML = tempoAtual + 1;
  }, 1000);
};

window.onload = () => {
  spanJogador.innerHTML = localStorage.getItem("jogador");
  iniciarTimer();
  adicionarConteudosAoGrid();
};

//function newFunction() {
//const conteudos = [["sdsdomb"]]; "img2", "img3";;
// return conteudos;
//}

function reiniciarJogo() {
  window.location.reload();
}

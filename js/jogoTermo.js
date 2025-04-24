const letras = document.querySelector(".letras-container");
const linhaApagarConfirmar = document.getElementById("linhaApagarConfirmar");
const primeiraLinhaTeclado = document.getElementById("primeiraLinhaTeclado");
const segundaLinhaTeclado = document.getElementById("segundaLinhaTeclado");
const terceiraLinhaTeclado = document.getElementById("terceiraLinhaTeclado");

const palavrasEducativas = [
  "AULAS",
  "LIVRO",
  "PROVA",
  "MENTE",
  "TEXTO",
  "LETRA",
  "SINAL",
  "REGRA",
  "FRASE",
  "VERSO",
  "VOGAL",
  "FORMA",
  "SUJEI",
  "VERBO",
  "POEMA",
];

const letrasPrimeiraLinha = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const letrasSegundaLinha = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const letrasTerceiraLinha = ["Z", "X", "C", "V", "B", "N", "M"];

const linhas = 6;
const colunas = 5;
let linhaAtual = 0;
let colunaAtual = 0;
let palavreco =
  palavrasEducativas[Math.floor(Math.random() * palavrasEducativas.length)];
let palavrecoMap = {};
const palpites = [];

for (let index = 0; index < palavreco.length; index++) {
  palavrecoMap[palavreco[index]] = index;
}

for (let linhaIndex = 0; linhaIndex < linhas; linhaIndex++) {
  palpites[linhaIndex] = new Array(colunas);
  const letraLinha = document.createElement("div");
  letraLinha.setAttribute("id", "linha" + linhaIndex);
  letraLinha.setAttribute("class", "linha-letra");
  for (let colunaIndex = 0; colunaIndex < colunas; colunaIndex++) {
    const letraColuna = document.createElement("div");
    letraColuna.setAttribute(
      "id",
      "linha" + linhaIndex + "coluna" + colunaIndex
    );
    letraColuna.setAttribute(
      "class",
      linhaIndex === 0 ? "coluna-letra digitando" : "coluna-letra desabilitado"
    );
    letraLinha.append(letraColuna);
    palpites[linhaIndex][colunaIndex] = "";
  }
  letras.append(letraLinha);
}

const checarPalpite = () => {
  const palpite = palpites[linhaAtual].join("").toUpperCase();
  if (palpite.length !== colunas) {
    return;
  }

  var colunasAtuais = document.querySelectorAll(".digitando");

  for (let index = 0; index < colunas; index++) {
    const letra = palpite[index];
    if (!palavreco.includes(letra)) {
      colunasAtuais[index].classList.add("incorreto");
    } else {
      if (palavreco[index] === letra) {
        colunasAtuais[index].classList.add("correto");
      } else {
        colunasAtuais[index].classList.add("lugar-errado");
      }
    }
  }

  if (palpite === palavreco) {
    alert(`Parabéns! Você acertou: ${palavreco}`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
    return;
  } else {
    if (linhaAtual === linhas - 1) {
      alert(`Game Over! A palavra era: ${palavreco}`);
      setInterval(() => {
        window.location.reload();
      }, 2000);
      return;
    } else {
      proximaLinha();
    }
  }
};

const proximaLinha = () => {
  linhaAtual++;
  colunaAtual = 0;
  const colunasAtuais = document.querySelectorAll(".digitando");
  colunasAtuais.forEach((coluna) => {
    coluna.classList.remove("digitando");
    coluna.classList.add("desabilitado");
  });
  const novaLinha = document.querySelector("#linha" + linhaAtual);
  const colunasNovaLinha = novaLinha.querySelectorAll(".coluna-letra");
  colunasNovaLinha.forEach((coluna) => {
    coluna.classList.remove("desabilitado");
    coluna.classList.add("digitando");
  });
};

const cliqueTeclado = (tecla) => {
  if (colunaAtual === colunas) {
    return;
  }
  const letraAtual = document.querySelector(
    "#linha" + linhaAtual + "coluna" + colunaAtual
  );
  letraAtual.textContent = tecla;
  palpites[linhaAtual][colunaAtual] = tecla;
  colunaAtual++;
};

const criarLinhaTeclado = (teclas, linhaTeclado) => {
  teclas.forEach((tecla) => {
    var botaoElemento = document.createElement("button");
    botaoElemento.textContent = tecla;
    botaoElemento.setAttribute("id", tecla);
    botaoElemento.addEventListener("click", () => cliqueTeclado(tecla));
    primeiraLinhaTeclado.append(botaoElemento);
  });
};

criarLinhaTeclado(letrasPrimeiraLinha, primeiraLinhaTeclado);
criarLinhaTeclado(letrasSegundaLinha, segundaLinhaTeclado);
criarLinhaTeclado(letrasTerceiraLinha, terceiraLinhaTeclado);

const backspace = () => {
  if (colunaAtual === 0) {
    return;
  }
  colunaAtual--;
  const letraAtual = document.querySelector(
    "#linha" + linhaAtual + "coluna" + colunaAtual
  );
  letraAtual.textContent = "";
  palpites[linhaAtual][colunaAtual] = "";
};

const botaoBackspace = document.createElement("button");
botaoBackspace.addEventListener("click", backspace);
botaoBackspace.textContent = "<";
linhaApagarConfirmar.append(botaoBackspace);

const botaoEnter = document.createElement("button");
botaoEnter.addEventListener("click", checarPalpite);
botaoEnter.textContent = "ENTER";
linhaApagarConfirmar.append(botaoEnter);

document.addEventListener("keydown", (event) => {
  const tecla = event.key.toUpperCase();
  if (letrasPrimeiraLinha.includes(tecla)) {
    cliqueTeclado(tecla);
  } else if (letrasSegundaLinha.includes(tecla)) {
    cliqueTeclado(tecla);
  } else if (letrasTerceiraLinha.includes(tecla)) {
    cliqueTeclado(tecla);
  } else if (tecla === "BACKSPACE") {
    backspace();
  } else if (tecla === "ENTER") {
    checarPalpite();
  }
});

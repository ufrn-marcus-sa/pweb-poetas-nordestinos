// Receita 4: JavaScript Arrays (map e join)
// Guarda a lista inicial de cervejas que será exibida e manipulada na página.
const beerList = [
  'Cerveja de Trigo',
  'Cerveja Puro Malte',
  'IPA Nordestina',
  'Stout do Sertão',
  'Lager de Sabores'
];

// Receita 4: JavaScript Arrays (map e join)
// Essa função recebe uma lista de nomes e monta a tabela dinamicamente no HTML.
const renderBeerTable = (items) => {
  const tbody = document.getElementById('beerTableBody');

  // Se a tabela não existir na página, a função termina.
  if (!tbody) return;

  // Limpa o conteúdo atual da tabela antes de renderizar novos itens.
  tbody.innerHTML = '';

  // Para cada nome da lista, cria uma linha e uma célula na tabela.
  items.forEach((beer) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = beer;
    row.appendChild(cell);
    tbody.appendChild(row);
  });
};

// Receita 4: JavaScript Arrays (map e join)
// Cria uma cópia da lista original, ordena em ordem alfabética e repinta a tabela.
const sortBeerList = () => {
  const sorted = [...beerList].sort();
  renderBeerTable(sorted);
};

// Receita 4: JavaScript Arrays (map e join)
// Embaralha os elementos da lista usando uma lógica de troca aleatória.
const shuffleBeerList = () => {
  const shuffled = [...beerList];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  renderBeerTable(shuffled);
};

// Receita 4: JavaScript Arrays (map e join)
// Associa os botões de ordenação e embaralhamento aos eventos de clique.
const setupBeerButtons = () => {
  const sortButton = document.getElementById('sortBeersBtn');
  const shuffleButton = document.getElementById('shuffleBeersBtn');

  if (sortButton) {
    sortButton.addEventListener('click', sortBeerList);
  }

  if (shuffleButton) {
    shuffleButton.addEventListener('click', shuffleBeerList);
  }

  // Exibe a tabela com a ordem inicial ao carregar a página.
  renderBeerTable(beerList);
};

// Receita 3: Basic JavaScript (DOM and Events)
// Controla o botão que mostra ou esconde o nome da bebida em um campo da página.
const setupBeerToggle = () => {
  const button = document.getElementById('beerToggleButton');
  const display = document.getElementById('beerDisplay');

  if (!button || !display) return;

  button.addEventListener('click', () => {
    // Se o campo estiver vazio, mostra o texto da bebida com efeito de transição.
    if (display.textContent.trim() === '') {
      display.classList.add('fade');
      setTimeout(() => {
        display.innerHTML = '<strong>Cerveja de Trigo</strong>';
        display.classList.remove('fade');
      }, 200);
      return;
    }

    // Se o campo já tiver texto, limpa o conteúdo com o mesmo efeito visual.
    display.classList.add('fade');
    setTimeout(() => {
      display.innerHTML = '';
      display.classList.remove('fade');
    }, 200);
  });
};

// Esse trecho garante que o código será executado somente depois do HTML ter sido carregado.
// Isso evita erros ao tentar acessar elementos que ainda não existem na página.
window.addEventListener('DOMContentLoaded', () => {
  setupBeerButtons();
  setupBeerToggle();
});

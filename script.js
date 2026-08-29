const beerList = [
  'Cerveja de Trigo',
  'Cerveja Puro Malte',
  'IPA Nordestina',
  'Stout do Sertão',
  'Lager de Sabores'
];

const renderBeerTable = (items) => {
  const tbody = document.getElementById('beerTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  items.forEach((beer) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = beer;
    row.appendChild(cell);
    tbody.appendChild(row);
  });
};

const sortBeerList = () => {
  const sorted = [...beerList].sort();
  renderBeerTable(sorted);
};

const shuffleBeerList = () => {
  const shuffled = [...beerList];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  renderBeerTable(shuffled);
};

const setupBeerButtons = () => {
  const sortButton = document.getElementById('sortBeersBtn');
  const shuffleButton = document.getElementById('shuffleBeersBtn');

  if (sortButton) {
    sortButton.addEventListener('click', sortBeerList);
  }

  if (shuffleButton) {
    shuffleButton.addEventListener('click', shuffleBeerList);
  }

  renderBeerTable(beerList);
};

const setupBeerToggle = () => {
  const button = document.getElementById('beerToggleButton');
  const display = document.getElementById('beerDisplay');

  if (!button || !display) return;

  button.addEventListener('click', () => {
    if (display.textContent.trim() === '') {
      display.classList.add('fade');
      setTimeout(() => {
        display.innerHTML = '<strong>Cerveja de Trigo</strong>';
        display.classList.remove('fade');
      }, 200);
      return;
    }

    display.classList.add('fade');
    setTimeout(() => {
      display.innerHTML = '';
      display.classList.remove('fade');
    }, 200);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  setupBeerButtons();
  setupBeerToggle();
});

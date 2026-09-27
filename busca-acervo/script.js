// FEATURE:  Busca e ordenação do acervo de poetas nordestinos
// ORIGEM:   Receita 5 - JS: Arrow e Callback Functions
// TÉCNICAS: arrow function, callback function, refatoração, const, let,
//           map, filter, sort, join, evento input, preventDefault
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. renderAcervo() recebe o vetor por parâmetro e opera sobre ele,
//      nunca sobre a global ACERVO.
//   2. Ordenações reescritas inteiramente em arrow functions.
//   3. A ordenação é disparada por <a> (links), não por <button>.

// Chave da ordenação escolhida. Precisa ser let e não const porque muda a cada clique.
let ordemEscolhida = 'az';

const siglaEstado = { PB: 'Paraíba', CE: 'Ceará', BA: 'Bahia' };

// Cada linha é montada por uma arrow function anônima passada direto ao map.
// Ela é ao mesmo tempo arrow function, callback function e função anônima:
// ninguém a chama, o Array chama, uma vez por poeta.
const gerarLinha = (poeta) => `
  <article class="linha-poeta">
    <div class="avatar" aria-hidden="true">${poeta.nome.charAt(0)}</div>
    <div class="linha-dados">
      <h3>${poeta.nome}</h3>
      <p>
        ${poeta.apelido} — ${poeta.nascimento} a ${poeta.morte ?? 'atualidade'}
        · ${siglaEstado[poeta.estado] ?? poeta.estado}
      </p>
    </div>
  </article>
`;

// EXERCÍCIO 1: o vetor chega por parâmetro. A global ACERVO não é lida aqui dentro,
// e sim pelo chamador, que a passa como argumento.
const renderAcervo = (itens) => {
  const lista = document.getElementById('listaPoetas');
  const contador = document.getElementById('contador');

  if (!lista || !contador) return;

  if (!itens.length) {
    lista.innerHTML = '<p class="status status-vazio">Nenhum poeta encontrado para esse termo.</p>';
    contador.textContent = '0 de 0 poetas';
    return;
  }

  // map devolve um array de strings; join transforma tudo numa string só.
  lista.innerHTML = itens.map(gerarLinha).join('\n');
  contador.textContent = `${itens.length} de ${window.ACERVO.length} poetas`;
};

// EXERCÍCIO 2: todas as ordenações em arrow function.
// O sort não altera o vetor original porque primeiro fazemos uma cópia com
// o operador spread — [...lista] — que também é arrow function.
const ordenar = (itens, ordem) => {
  const copia = [...itens];

  const criterios = {
    az: (a, b) => a.nome.localeCompare(b.nome, 'pt-BR'),
    za: (a, b) => b.nome.localeCompare(a.nome, 'pt-BR'),
    antigo: (a, b) => Number(a.nascimento) - Number(b.nascimento),
    recente: (a, b) => Number(b.nascimento) - Number(a.nascimento),
    estado: (a, b) =>
      a.estado.localeCompare(b.estado, 'pt-BR') || a.nome.localeCompare(b.nome, 'pt-BR')
  };

  return copia.sort(criterios[ordem] ?? criterios.az);
};

// EXERCÍCIO 3: o filtro por texto também é arrow function, e o evento input
// deixa a busca acontecer enquanto o usuário digita, sem botão.
const filtrar = (itens, termo) => {
  const alvo = termo.trim().toLowerCase();

  if (!alvo) return itens;

  return itens.filter((poeta) => {
    const texto = `${poeta.nome} ${poeta.apelido} ${poeta.estado} ${poeta.nascimento} ${poeta.nota}`;
    return texto.toLowerCase().includes(alvo);
  });
};

// Junta os dois passos: filtra e já entrega ordenado ao renderAcervo.
const atualizar = () => {
  const campo = document.getElementById('campoBusca');
  const termo = campo ? campo.value : '';

  renderAcervo(ordenar(filtrar(window.ACERVO, termo), ordemEscolhida));
};

const marcarChipAtivo = (chipAtivo) => {
  document
    .querySelectorAll('#opcoesOrdenacao .chip')
    .forEach((chip) => chip.setAttribute('aria-pressed', String(chip === chipAtivo)));
};

const setupBusca = () => {
  const campo = document.getElementById('campoBusca');
  const opcoes = document.getElementById('opcoesOrdenacao');

  if (campo) campo.addEventListener('input', atualizar);

  // EXERCÍCIO 3: os chips são <a>, não <button>. O papel de link fica no
  // teclado e no leitor de tela, mas precisamos impedir a navegação,
  // senão a página recarrega a cada clique.
  if (opcoes) {
    opcoes.addEventListener('click', (evento) => {
      const chip = evento.target.closest('.chip');

      if (!chip) return;

      evento.preventDefault();
      ordemEscolhida = chip.dataset.ordem;
      marcarChipAtivo(chip);
      atualizar();
    });
  }

  atualizar();
};

window.addEventListener('DOMContentLoaded', setupBusca);

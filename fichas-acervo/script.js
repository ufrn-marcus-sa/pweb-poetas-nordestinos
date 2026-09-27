// FEATURE:  Fichas e tabela do acervo, montadas a partir de objetos JSON
// ORIGEM:   Receita 6 - Objetos JSON
// TÉCNICAS: JSON, propriedade, dot notation, destructuring, indexação do
//           objeto como mapa, parâmetros default, destructuring com default
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. A ficha pode ser vista como tabela, com cabeçalho, e não só como divs.
//   3. Propriedades acrescidas ao acervo (apelido, nota) e exibidas.
//   4. carregarDiv() recebe o id do elemento de destino; default 'fichaDiv'.
//   5. Títulos de coluna arbitrários; default ['Poeta','Estado','Nascimento','Falecimento'].
//   6. Propriedades configuráveis; default ['nome','estado','nascimento','morte'].
//      A MESMA função renderiza também o vetor REGIOES, de outras propriedades.

// Passo 5 da receita: indexação. O objeto é tratado como mapa, e a chave é
// uma string. É a única das três formas que aceita a chave vinda de uma
// variável, e por isso é a única que a função genérica consegue usar para
// renderizar propriedades escolhidas em tempo de execução.
const linhaIndice = (item, propriedades) =>
  `<tr>${propriedades
    .map((chave) => {
      const valor = item[chave];
      // A coluna de falecimento é a única que aceita valor nulo: um poeta vivo
      // não tem data de morte, e null é o valor honesto para isso.
      if (chave === 'morte' && valor === null) return '<td>atualidade</td>';
      return `<td>${valor === undefined || valor === null || valor === '' ? '—' : valor}</td>`;
    })
    .join('')}</tr>`;

// Passo 5 da receita: dot notation. A propriedade é escrita no código, com o
// ponto. Repare que a lista de propriedades não entra: com dot notation a
// chave fica escrita à mão, e não dá para escolher em tempo de execução.
const linhaPonto = (item) =>
  `<tr>
    <td>${item.nome}</td>
    <td>${item.estado}</td>
    <td>${item.nascimento}</td>
    <td>${item.morte ?? 'atualidade'}</td>
  </tr>`;

// Passo 5 da receita: desestruturação. As propriedades viram variáveis
// independentes, sem precisar do ponto nem dos colchetes. Repare que,
// por haver um parâmetro só, os parênteses puderam ser omitidos.
const linhaDesestruturacao = ({ nome, estado, nascimento, morte }) =>
  `<tr>
    <td>${nome}</td>
    <td>${estado}</td>
    <td>${nascimento}</td>
    <td>${morte ?? 'atualidade'}</td>
  </tr>`;

const montadores = {
  indice: linhaIndice,
  ponto: linhaPonto,
  desestruturacao: linhaDesestruturacao
};

// ---------------------------------------------------------------------------
// A função genérica.
//
// Os quatro primeiros parâmetros têm valor default, e o quinto escolhe apenas
// COMO a linha é montada. Quem chama decide o que vai para a tabela; a função
// só obedece.
// ---------------------------------------------------------------------------
const carregarDiv = (
  itens,
  idElemento = 'fichaDiv',
  [
    primeiro = 'Poeta',
    segundo = 'Estado',
    terceiro = 'Nascimento',
    quarto = 'Falecimento'
  ] = [],
  propriedades = ['nome', 'estado', 'nascimento', 'morte'],
  montarLinha = linhaIndice
) => {
  const destino = document.getElementById(idElemento);

  if (!destino) {
    console.warn(`carregarDiv: não achei o elemento com id "${idElemento}".`);
    return;
  }

  if (!Array.isArray(itens) || !itens.length) {
    destino.innerHTML = '<p class="status status-vazio">Nada para mostrar aqui.</p>';
    return;
  }

  const cabecalho = [primeiro, segundo, terceiro, quarto]
    .map((titulo) => `<th scope="col">${titulo}</th>`)
    .join('');

  // É o map recebendo uma callback function. A função não é chamada por nós:
  // quem a executa, uma vez por objeto do vetor, é o próprio Array. Por isso
  // cada montador precisa aceitar os mesmos dois argumentos, mesmo os que
  // não usem o segundo.
  const linhas = itens.map((item) => montarLinha(item, propriedades)).join('\n');

  destino.innerHTML = `
    <div class="conteudo-tabela">
      <table class="tabela-dados">
        <thead><tr>${cabecalho}</tr></thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>
  `;
};

// A visão em fichas, que é a apresentação padrão da página.
const renderFichas = (itens) => {
  const destino = document.getElementById('fichaDiv');

  if (!destino) return;

  if (!itens.length) {
    destino.innerHTML = '<p class="status status-vazio">Acervo vazio.</p>';
    return;
  }

  const ficha = (poeta) => `
    <article class="cartao">
      <div class="linha-poeta" style="border: 0; background: transparent; padding: 0;">
        <div class="avatar" aria-hidden="true">${poeta.nome.charAt(0)}</div>
        <div class="linha-dados">
          <h3 class="cartao-titulo">${poeta.nome}</h3>
          <p class="cartao-subtitulo">${poeta.apelido}</p>
        </div>
      </div>
      <p class="cartao-subtitulo">
        ${poeta.estado} · ${poeta.nascimento} a ${poeta.morte ?? 'atualidade'}
      </p>
      <p class="cartao-texto">${poeta.nota}</p>
    </article>
  `;

  destino.innerHTML = `<div class="grade grade-cartoes">${itens.map(ficha).join('\n')}</div>`;
};

const setupFichas = () => {
  const seletorVisualizacao = document.getElementById('formaVisualizacao');
  const seletorAcesso = document.getElementById('formaAcesso');

  const desenhar = () => {
    const forma = seletorVisualizacao ? seletorVisualizacao.value : 'cartoes';

    if (forma === 'cartoes') {
      renderFichas(window.ACERVO);
      return;
    }

    // EXERCÍCIO 6: as propriedades default são as do acervo. Trocando o
    // montador, a mesma função passa a ler as propriedades de outra maneira.
    carregarDiv(
      window.ACERVO,
      'fichaDiv',
      ['Poeta', 'Estado', 'Nascimento', 'Falecimento'],
      ['nome', 'estado', 'nascimento', 'morte'],
      seletorAcesso ? montadores[seletorAcesso.value] : linhaIndice
    );
  };

  if (seletorVisualizacao) seletorVisualizacao.addEventListener('change', desenhar);
  if (seletorAcesso) seletorAcesso.addEventListener('change', desenhar);

  desenhar();

  // EXERCÍCIOS 4, 5 e 6: o id do elemento, os títulos das colunas e as
  // propriedades são todos configuráveis. Aqui nada do que aparece abaixo foi
  // escrito dentro de carregarDiv.
  carregarDiv(
    window.REGIOES,
    'regioesDiv',
    ['Estado', 'Nome', 'Capital', 'Poetas no acervo'],
    ['sigla', 'nome', 'capital', 'poetas']
  );
};

window.addEventListener('DOMContentLoaded', setupFichas);

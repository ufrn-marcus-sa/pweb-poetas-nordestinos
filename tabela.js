// RENDERIZADORES GENÉRICOS
// Funções que transformam uma lista de objetos JSON em interface com o usuário,
// sem saber nada sobre o conteúdo dos objetos. Recebem o vetor e devolvem HTML.
//
// Originais de: Receita 7 (Fetch) — exercício 4, "faça uma função genérica para
// montar uma tabela de qualquer coisa, ponha essa função num arquivo .js separado".
// Reaproveitadas também pela Receita 8 (Promessas) e pela feature de fichas.
//
// Exposto em window para funcionar via tag <script> classical, sem build.
// Módulos ES não carregam por file:// por causa do CORS, e o professor pediu
// um .js separado, não um módulo.

/**
 * Lê um valor em profundidade dentro de um objeto.
 * Aceita caminho com pontos, por exemplo 'endereco.cidade' ou 'ciao.nome'.
 */
const obterValor = (objeto, caminho) => {
  if (!objeto || !caminho) return undefined;

  return caminho.split('.').reduce((parte, chave) => {
    return parte === undefined || parte === null ? undefined : parte[chave];
  }, objeto);
};

/**
 * Monta uma tabela a partir de um vetor de objetos JSON.
 *
 * @param {Array<Object>} itens          vetor de objetos a renderizar
 * @param {Object}        [opcoes]
 * @param {string}        opcoes.idElemento    id do div destino. Default 'tabelaDiv'.
 * @param {Array<string>} opcoes.cabecalhos    títulos das colunas. Default: as chaves do 1º objeto.
 * @param {Array<string>} opcoes.propriedades chaves a ler. Default: as chaves do 1º objeto.
 * @param {string}        opcoes.classe        classe extra na <table>.
 * @param {string}        opcoes.vazio         mensagem quando o vetor não tem itens.
 * @returns {HTMLTableElement|null} a tabela criada, ou null se não houver o que renderizar
 */
const montarTabela = (itens, opcoes = {}) => {
  const {
    idElemento = 'tabelaDiv',
    cabecalhos = null,
    propriedades = null,
    classe = '',
    vazio = 'Nenhum registro encontrado.'
  } = opcoes;

  const destino = document.getElementById(idElemento);

  if (!destino) {
    console.warn(`montarTabela: não achei o elemento com id "${idElemento}".`);
    return null;
  }

  destino.innerHTML = '';

  const lista = Array.isArray(itens) ? itens : [];

  if (!lista.length) {
    destino.innerHTML = `<p class="status status-vazio">${vazio}</p>`;
    return null;
  }

  // Sem colunas informadas, usamos as chaves do primeiro objeto como padrão.
  const colunas = propriedades && propriedades.length ? propriedades : Object.keys(lista[0]);
  const titulos = cabecalhos && cabecalhos.length ? cabecalhos : colunas;

  // map devolve um array de strings; join junta tudo numa string só.
  const linhas = lista
    .map((item) => {
      const celulas = colunas
        .map((chave) => {
          const valor = obterValor(item, chave);
          const texto = valor === undefined || valor === null || valor === '' ? '—' : valor;
          return `<td>${texto}</td>`;
        })
        .join('');

      return `<tr>${celulas}</tr>`;
    })
    .join('');

  const cabecalho = titulos
    .map((titulo) => `<th scope="col">${titulo}</th>`)
    .join('');

  destino.innerHTML = `
    <div class="conteudo-tabela">
      <table class="tabela-dados ${classe}">
        <thead><tr>${cabecalho}</tr></thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>
  `;

  return destino.querySelector('table');
};

/**
 * Monta uma grade de cartões a partir de um vetor de objetos JSON.
 * Cada objeto vira um <article> com título, subtítulo, imagem e texto.
 *
 * @param {Array<Object>} itens   vetor de objetos a renderizar
 * @param {Object}        [opcoes]
 * @param {string}        opcoes.idElemento  id do div destino. Default 'cartoesDiv'.
 * @param {string}        opcoes.tituloProp  chave do título. Default 'titulo'.
 * @param {string}        opcoes.subtituloProp chave do subtítulo. Default 'subtitulo'.
 * @param {string}        opcoes.imagemProp  chave da URL da imagem. Default 'imagem'.
 * @param {string}        opcoes.textoProp   chave do texto corrido. Default 'texto'.
 * @param {string}        opcoes.linkProp    chave que vira o link do título. Default 'link'.
 * @param {string}        opcoes.vazio       mensagem quando o vetor não tem itens.
 * @returns {Element|null}
 */
const montarCartoes = (itens, opcoes = {}) => {
  const {
    idElemento = 'cartoesDiv',
    tituloProp = 'titulo',
    subtituloProp = 'subtitulo',
    imagemProp = 'imagem',
    textoProp = 'texto',
    linkProp = 'link',
    vazio = 'Nenhum registro encontrado.'
  } = opcoes;

  const destino = document.getElementById(idElemento);

  if (!destino) {
    console.warn(`montarCartoes: não achei o elemento com id "${idElemento}".`);
    return null;
  }

  destino.innerHTML = '';

  const lista = Array.isArray(itens) ? itens : [];

  if (!lista.length) {
    destino.innerHTML = `<p class="status status-vazio">${vazio}</p>`;
    return null;
  }

  const cartoes = lista.map((item) => {
    const titulo = obterValor(item, tituloProp) ?? '';
    const subtitulo = obterValor(item, subtituloProp);
    const imagem = obterValor(item, imagemProp);
    const texto = obterValor(item, textoProp);
    const link = obterValor(item, linkProp);

    const tituloHtml = link
      ? `<a href="${link}" target="_blank" rel="noreferrer">${titulo}</a>`
      : titulo;

    const imagemHtml = imagem
      ? `<img class="miniatura" src="${imagem}" alt="" loading="lazy" />`
      : '';

    const subtituloHtml = subtitulo ? `<p class="cartao-subtitulo">${subtitulo}</p>` : '';
    const textoHtml = texto ? `<p class="cartao-texto">${texto}</p>` : '';

    return `
      <article class="cartao">
        ${imagemHtml}
        <h3 class="cartao-titulo">${tituloHtml}</h3>
        ${subtituloHtml}
        ${textoHtml}
      </article>
    `;
  }).join('');

  destino.innerHTML = `<div class="grade grade-cartoes">${cartoes}</div>`;

  return destino.firstElementChild;
};

window.obterValor = obterValor;
window.montarTabela = montarTabela;
window.montarCartoes = montarCartoes;

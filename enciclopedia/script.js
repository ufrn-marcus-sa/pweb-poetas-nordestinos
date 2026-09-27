// FEATURE:  Enciclopédia de poetas — busca e consulta de verbetes na Wikipédia
// ORIGEM:   Receita 7 - Fetch
// TÉCNICAS: fetch, await, async, try/catch, response.ok, response.json(),
//           estado de carregamento, resposta vazia, renderizador genérico externo
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Exibe id da página, posição na busca, data da última edição e miniatura.
//   2. Página estilizada com o CSS do repositório.
//   3. O seletor troca o termo consultado; a mesma função serve a qualquer busca.
//   4. montarTabela(), vindo de ../tabela.js, monta duas tabelas de origens
//      diferentes: o resultado da API e o acervo local.

const API = 'https://pt.wikipedia.org/w/api.php';
const LIMITE = 6;

// URL quebrada de propósito, para o botão "Testar erro" exercitar o catch.
const API_QUEBRADA = 'https://pt.wikipedia.org/w/api-invalida/v2';

const montarUrl = (termo, limite = LIMITE) => {
  const parametros = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: termo,
    gsrlimit: String(limite),
    prop: 'extracts|pageimages',
    exintro: '1',
    explaintext: '1',
    piprop: 'thumbnail',
    pithumbsize: '200',
    format: 'json',
    // origin=* é o que autoriza a requisição vinda do navegador, sem login.
    origin: '*'
  });

  return `${API}?${parametros.toString()}`;
};

const cortar = (texto, limite = 320) => {
  const limpo = (texto ?? '').trim();

  if (limpo.length <= limite) return limpo;

  return `${limpo.slice(0, limite).trim()}...`;
};

// A resposta real vem com as páginas indexadas por id. Transformamos em vetor
// e em objetos com os nomes de propriedade que os renderizadores entendem.
const normalizar = (resposta) => {
  const paginas = resposta?.query?.pages;

  if (!paginas) return [];

  return Object.values(paginas)
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .map((pagina) => ({
      titulo: pagina.title,
      posicao: pagina.index ?? '—',
      verbeteId: pagina.pageid ?? '—',
      editadoEm: pagina.timestamp ?? '—',
      subtitulo: `posição ${pagina.index ?? '?'} · verbete ${pagina.pageid ?? '?'} · editado em ${
        pagina.timestamp ?? '?'
      }`,
      temFoto: pagina.thumbnail?.source ? 'sim' : 'não',
      imagem: pagina.thumbnail?.source ?? null,
      texto: cortar(pagina.extract),
      link: `https://pt.wikipedia.org/wiki/${encodeURIComponent(
        String(pagina.title ?? '').replace(/ /g, '_')
      )}`
    }));
};

const mostrarStatus = (texto, variante = 'status-ok') => {
  const status = document.getElementById('status');

  if (!status) return;

  if (!texto) {
    status.hidden = true;
    return;
  }

  status.className = `status ${variante}`;
  status.textContent = texto;
  status.hidden = false;
};

const comBotaoOcupado = (ocupado) => {
  const botao = document.getElementById('botaoConsultar');

  if (!botao) return;

  botao.disabled = ocupado;
  botao.textContent = ocupado ? 'Consultando...' : 'Consultar';
};

const desenharTabelaDoResultado = (verbetes) => {
  // EXERCÍCIO 4: a função vem de ../tabela.js e é a mesma que desenha o
  // acervo local mais abaixo. Nada aqui diz o que é um verbete.
  window.montarTabela(verbetes, {
    idElemento: 'tabelaApi',
    cabecalhos: ['Verbete', 'Posição', 'ID', 'Editado em', 'Foto'],
    propriedades: ['titulo', 'posicao', 'verbeteId', 'editadoEm', 'temFoto'],
    vazio: 'Nenhum verbete retornado.'
  });
};

// A consulta propriamente dita. É async porque usa await; o try/catch existe
// porque tanto o fetch quanto o json podem lançar exceção.
const consultar = async (url) => {
  comBotaoOcupado(true);
  mostrarStatus('Requisitando a Wikipédia...', 'status-carregando');

  try {
    const resposta = await fetch(url);

    // Uma página de erro do servidor vem com status 400/404 e corpo HTML.
    // Sem esta checagem, o json() é quem quebra e a mensagem fica confusa.
    if (!resposta.ok) {
      throw new Error(`a API respondeu ${resposta.status}`);
    }

    const dados = await resposta.json();
    const verbetes = normalizar(dados);

    if (!verbetes.length) {
      window.montarCartoes([], { idElemento: 'cartoesDiv', vazio: 'Nada encontrado.' });
      mostrarStatus('A busca não retornou nenhum verbete.', 'status-vazio');
      return;
    }

    window.montarCartoes(verbetes, { idElemento: 'cartoesDiv' });
    desenharTabelaDoResultado(verbetes);
    mostrarStatus(`${verbetes.length} verbetes encontrados.`, 'status-ok');
  } catch (erro) {
    // O enunciado pede para o script lidar com a exceção em vez de sumir em
    // silêncio. Mostramos o que deu errado e limpamos a lista.
    window.montarCartoes([], { idElemento: 'cartoesDiv', vazio: 'Consulta falhou.' });
    mostrarStatus(`Não foi possível consultar a API: ${erro.message}`, 'status-erro');
  } finally {
    // O finally roda tanto no caminho feliz quanto no da exceção, então o
    // botão nunca fica preso em "Consultando...".
    comBotaoOcupado(false);
  }
};

const setupEnciclopedia = () => {
  const campo = document.getElementById('campoBusca');
  const seletor = document.getElementById('seletorTermo');
  const botao = document.getElementById('botaoConsultar');
  const botaoErro = document.getElementById('botaoErro');

  // EXERCÍCIO 3: o seletor muda o termo, não o código. Qualquer consulta
  // serve, e a mesma sequência de código monta o resultado.
  if (seletor) {
    seletor.addEventListener('change', () => {
      if (campo) campo.value = seletor.value;
    });
  }

  if (botao) {
    botao.addEventListener('click', () => {
      const termo = campo && campo.value.trim() ? campo.value.trim() : 'repentista';
      consultar(montarUrl(termo));
    });
  }

  if (botaoErro) {
    botaoErro.addEventListener('click', () => consultar(API_QUEBRADA));
  }

  // EXERCÍCIO 4, segunda metade: o acervo local, renderizado pela mesma
  // função genérica, com colunas que não têm nada a ver com as do verbete.
  window.montarTabela(window.ACERVO, {
    idElemento: 'tabelaAcervo',
    cabecalhos: ['Poeta', 'Estado', 'Nascimento', 'Falecimento'],
    propriedades: ['nome', 'estado', 'nascimento', 'morte'],
    vazio: 'Acervo vazio.'
  });
};

window.addEventListener('DOMContentLoaded', setupEnciclopedia);

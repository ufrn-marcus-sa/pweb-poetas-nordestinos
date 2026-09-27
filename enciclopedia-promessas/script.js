// FEATURE:  Busca de verbetes na Wikipédia enquanto o usuário digita
// ORIGEM:   Receita 8 - Promessas
// TÉCNICAS: Promise, then, catch, encadeamento, segundo parâmetro do then,
//           debounce, descarte de requisição obsoleta
//
// A feature de busca, que é o que está em cima da página, NÃO usa nenhum async
// nem nenhum await: todo o trabalho assíncrono dela é feito por .then() e
// .catch(). A única exceção é o painel comparativo lá no fim, que precisa do
// await justamente para mostrar a diferença de ordem de execução entre as duas
// abordagens — sem ele não haveria o que comparar.
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Todos os exercícios da Receita 7 refeitos com Promise/then/catch:
//      resultados em tabela com propriedades extras, página bonitificada e a
//      função genérica montarTabela() importada de ../tabela.js.

const API = 'https://pt.wikipedia.org/w/api.php';
const LIMITE = 6;
const ESPERA_DIGITACAO = 350;

let temporizador = null;
let requisicaoAtual = 0;

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
    origin: '*'
  });

  return `${API}?${parametros.toString()}`;
};

const cortar = (texto, limite = 260) => {
  const limpo = (texto ?? '').trim();

  if (limpo.length <= limite) return limpo;

  return `${limpo.slice(0, limite).trim()}...`;
};

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
      temFoto: pagina.thumbnail?.source ? 'sim' : 'não',
      subtitulo: `posição ${pagina.index ?? '?'} · verbete ${pagina.pageid ?? '?'}`,
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

const desenhar = (verbetes) => {
  window.montarCartoes(verbetes, { idElemento: 'cartoesDiv' });

  // Exercício 1 da Receita 7, refeito com then: a mesma função genérica de
  // ../tabela.js, agora alimentada por uma promessa em vez de um array fixo.
  window.montarTabela(verbetes, {
    idElemento: 'tabelaDiv',
    cabecalhos: ['Verbete', 'Posição', 'ID', 'Editado em', 'Foto'],
    propriedades: ['titulo', 'posicao', 'verbeteId', 'editadoEm', 'temFoto'],
    vazio: 'Nenhum verbete retornado.'
  });
};

// A consulta. Devolve a promessa do fetch e já encadeia o resto.
//
// O primeiro then é chamado sobre a promessa do fetch; o segundo, sobre a
// promessa que o res.json() devolve. Como essa segunda callback retorna o
// resultado do json(), as duas se encadeiam naturalmente.
const consultar = (termo) => {
  const numero = ++requisicaoAtual;

  mostrarStatus('Requisitando a Wikipédia...', 'status-carregando');

  return fetch(montarUrl(termo))
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`a API respondeu ${resposta.status}`);
      }

      return resposta.json();
    })
    .then((dados) => {
      // Chegou uma resposta velha, de uma busca que já foi superada por outra.
      // Desenhar agora sobrescreveria o resultado correto com um antigo.
      if (numero !== requisicaoAtual) return;

      const verbetes = normalizar(dados);

      if (!verbetes.length) {
        desenhar([]);
        mostrarStatus('A busca não retornou nenhum verbete.', 'status-vazio');
        return;
      }

      desenhar(verbetes);
      mostrarStatus(`${verbetes.length} verbetes para "${termo}".`, 'status-ok');
    })
    .catch((erro) => {
      if (numero !== requisicaoAtual) return;

      desenhar([]);
      mostrarStatus(`Não foi possível consultar a API: ${erro.message}`, 'status-erro');
    });
};

// Cada tecla limpa o temporizador da tecla anterior e começa outro. A busca só
// sai ESPERA_DIGITACAO milissegundos depois da última letra, o que evita uma
// requisição por tecla.
const agendarBusca = (termo) => {
  if (temporizador) clearTimeout(temporizador);

  temporizador = setTimeout(() => {
    if (termo.trim().length < 3) {
      requisicaoAtual += 1;
      desenhar([]);
      mostrarStatus('Digite ao menos 3 letras.', 'status-vazio');
      return;
    }

    consultar(termo.trim());
  }, ESPERA_DIGITACAO);
};

// ---------------------------------------------------------------------------
// Painel de ordem de execução.
//
// Reproduz o exemplo do enunciado da receita. A diferença está no MESMO ponto:
// a linha "3" fica logo depois da chamada da requisição, tanto no then quanto
// no await. O que muda é o que o interpretador faz antes de chegar nela.
//
//   then:  a chamada não bloqueia, então a linha 3 roda antes de a função de
//          fora terminar.  Ordem: 1, 2, 3, 4.
//   await: a função devolve o controle no await, então a função de fora
//          termina antes.              Ordem: 1, 2, 4, 3.
//
// O "R" é a resposta chegando, que só pode acontecer depois de todo o código
// síncrono -- e por isso aparece por último nos dois casos.
// ---------------------------------------------------------------------------
const registrarOrdem = (passo) => {
  const painel = document.getElementById('ordemConsole');

  if (painel) painel.textContent += passo;
};

const respostaAoFinal = () => registrarOrdem('\nR (resposta chegou)');

const comThen = () => {
  const painel = document.getElementById('ordemConsole');

  if (painel) painel.textContent = '';

  registrarOrdem('1 (a função de fora começa)\n');

  const funcaoInterna = () => {
    registrarOrdem('2 (chamando fetch)\n');
    fetch(montarUrl('repentista', 1)).then(respostaAoFinal);
    registrarOrdem('3 (linha logo depois da chamada)\n');
  };

  funcaoInterna();

  registrarOrdem('4 (a função de fora terminou)');
};

const comAwait = () => {
  const painel = document.getElementById('ordemConsole');

  if (painel) painel.textContent = '';

  registrarOrdem('1 (a função de fora começa)\n');

  const funcaoInterna = async () => {
    registrarOrdem('2 (chamando fetch)\n');
    await fetch(montarUrl('repentista', 1));
    registrarOrdem('3 (linha logo depois da chamada)\n');
  };

  // Chamada sem await: é a mesma situação do then, e é aí que a ordem muda.
  funcaoInterna();

  registrarOrdem('4 (a função de fora terminou)');
  respostaAoFinal();
};

const setupPromessas = () => {
  const campo = document.getElementById('campoBusca');
  const botaoThen = document.getElementById('botaoComThen');
  const botaoAwait = document.getElementById('botaoComAwait');

  if (campo) campo.addEventListener('input', () => agendarBusca(campo.value));

  if (botaoThen) botaoThen.addEventListener('click', comThen);
  if (botaoAwait) botaoAwait.addEventListener('click', comAwait);
};

window.addEventListener('DOMContentLoaded', setupPromessas);

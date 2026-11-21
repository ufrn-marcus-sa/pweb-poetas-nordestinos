// FUNÇÕES DE ACESSO À WIKIPÉDIA
// Usadas pelas receitas 16 a 21. São funções JavaScript comuns, sem hook e sem
// diretiva "use client"/"use server", por isso servem tanto ao servidor quanto
// ao navegador. Quem decide onde elas rodam é quem as importa.
//
// É a mesma API das receitas 7 e 8 (Unidade 1). O professor usa a OMDb, de
// filmes; aqui a fonte é a Wikipédia em português, para o portal continuar
// falando de poetas nordestinos. A lógica das receitas é a mesma.

export const API_WIKIPEDIA = 'https://pt.wikipedia.org/w/api.php'

// A Wikimedia pede que programas que acessam a API se identifiquem pelo
// cabeçalho User-Agent. O navegador não deixa o JavaScript mudar esse cabeçalho,
// então ele só é enviado pelas chamadas feitas no servidor. Faz o papel da
// "API key" das receitas: um detalhe de acesso que só existe no back-end.
export const CABECALHOS_SERVIDOR = {
  'User-Agent': 'PortalPoetasNordestinos/1.0 (trabalho academico de Programacao Web)'
}

export const LIMITE_PADRAO = 8
export const LIMITES = [4, 8, 12, 20]

// Monta a URL de busca. O parâmetro origin=* é o que autoriza a chamada vinda
// direto do navegador (Receita 18); no servidor ele é ignorado.
export function montarUrlBusca(termo, limite = LIMITE_PADRAO) {
  const parametros = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrsearch: termo,
    gsrlimit: String(limitar(limite)),
    prop: 'extracts|pageimages',
    exintro: '1',
    explaintext: '1',
    exlimit: 'max',
    piprop: 'thumbnail',
    pithumbsize: '320'
  })

  return `${API_WIKIPEDIA}?${parametros}`
}

// URL de um verbete só, pelo id numérico da página (Receita 21).
export function montarUrlVerbete(id) {
  const parametros = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    pageids: String(id),
    prop: 'extracts|pageimages|info',
    exintro: '1',
    explaintext: '1',
    piprop: 'thumbnail',
    pithumbsize: '480',
    inprop: 'url'
  })

  return `${API_WIKIPEDIA}?${parametros}`
}

// A API não devolve um vetor: devolve um objeto indexado pelo id de cada
// página, fora de ordem. Object.values() vira vetor, e o sort usa a posição
// que a busca atribuiu a cada página. Depois o map traduz para um formato
// nosso, que é o que os componentes entendem.
export function normalizarVerbetes(resposta) {
  const paginas = resposta?.query?.pages

  if (!paginas) return []

  return Object.values(paginas)
    .filter((pagina) => !('missing' in pagina) && !('invalid' in pagina))
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .map(normalizarPagina)
}

export function normalizarPagina(pagina) {
  return {
    id: String(pagina.pageid),
    titulo: pagina.title,
    resumo: pagina.extract ?? '',
    imagem: pagina.thumbnail?.source ?? null,
    largura: pagina.thumbnail?.width ?? null,
    altura: pagina.thumbnail?.height ?? null,
    link:
      pagina.fullurl ??
      `https://pt.wikipedia.org/wiki/${encodeURIComponent(String(pagina.title).replace(/ /g, '_'))}`
  }
}

export function cortar(texto, limite = 220) {
  const limpo = (texto ?? '').trim()

  if (limpo.length <= limite) return limpo

  return `${limpo.slice(0, limite).trim()}...`
}

export function limitar(valor) {
  const numero = Number(valor)

  return LIMITES.includes(numero) ? numero : LIMITE_PADRAO
}

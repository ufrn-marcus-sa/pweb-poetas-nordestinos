// RECEITA 19 - Implementação de API
// Um "API endpoint": a rota termina em route.js, não em page.js. Não devolve
// página para gente, devolve JSON para programa.
//
// Teste no navegador:
//   http://localhost:3000/api/verbetes?termo=cordel
//   http://localhost:3000/api/verbetes?termo=cordel&limite=4
//
// O que só o servidor sabe fica aqui dentro: o cabeçalho de identificação
// exigido pela Wikimedia (o papel da API key da receita) e o formato da
// resposta bruta da Wikipédia. O cliente só conhece a URL /api/verbetes.

import { CABECALHOS_SERVIDOR, limitar, montarUrlBusca, normalizarVerbetes } from '../../../lib/wikipedia'

// O nome da função é o método HTTP que ela atende.
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const termo = (searchParams.get('termo') ?? '').trim()
  const limite = limitar(searchParams.get('limite'))

  if (!termo) {
    return Response.json({ erro: 'Informe o parâmetro termo.' }, { status: 400 })
  }

  try {
    const httpRes = await fetch(montarUrlBusca(termo, limite), { headers: CABECALHOS_SERVIDOR })

    if (!httpRes.ok) {
      return Response.json({ erro: `A Wikipédia respondeu ${httpRes.status}.` }, { status: 502 })
    }

    const jsonRes = await httpRes.json()
    const verbetes = normalizarVerbetes(jsonRes)

    return Response.json({ fonte: 'wikipedia', termo, limite, total: verbetes.length, verbetes })
  } catch (erro) {
    return Response.json({ erro: `Falha ao consultar a Wikipédia: ${erro.message}` }, { status: 502 })
  }
}

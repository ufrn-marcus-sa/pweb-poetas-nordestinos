'use server'

// RECEITA 20 - Server Actions
// Funções que rodam no servidor, mas que o navegador chama como se fossem
// locais: importa, passa o FormData, recebe o objeto de volta. Sem fetch, sem
// URL, sem montar parâmetros e sem converter a resposta em JSON. O Next faz a
// requisição HTTP por baixo dos panos.
//
// Este diretório não tem page.js nem route.js, então não é uma rota que alguém
// possa abrir no navegador; é só um lugar para guardar as actions.
//
// EXERCÍCIO DA RECEITA ATENDIDO:
//   Um campo a mais no formulário (tema) refina a pesquisa: o tema escolhido é
//   somado ao termo, e a Wikipédia procura páginas que tenham as duas coisas.
//   "Zé" sozinho traz qualquer Zé; "Zé" com tema "repentista" traz os poetas.

import { CABECALHOS_SERVIDOR, montarUrlBusca, normalizarVerbetes } from '../../lib/wikipedia'

export async function buscarVerbetes(formData) {
  const termo = String(formData.get('termo') ?? '').trim()
  const tema = String(formData.get('tema') ?? '').trim()
  const limite = formData.get('limite')

  if (!termo) return { termo, verbetes: [] }

  const consulta = tema ? `${termo} ${tema}` : termo

  try {
    const httpRes = await fetch(montarUrlBusca(consulta, limite), { headers: CABECALHOS_SERVIDOR })

    if (!httpRes.ok) return { termo: consulta, verbetes: [], erro: `A Wikipédia respondeu ${httpRes.status}.` }

    const jsonRes = await httpRes.json()

    // O retorno precisa ser algo que viaje pela rede: objetos, vetores,
    // strings, números. Por isso devolvemos o vetor já normalizado.
    return { termo: consulta, verbetes: normalizarVerbetes(jsonRes) }
  } catch (err) {
    return { termo: consulta, verbetes: [], erro: `Erro na requisição: ${err.message}` }
  }
}

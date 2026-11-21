// RECEITA 16 - Data fetching I
// Server component: a função da página é async e faz o fetch no servidor,
// antes de o HTML ser enviado. O navegador recebe a página já montada e nunca
// fala com a Wikipédia diretamente.
//
// Parâmetros pela URL, como no passo 6:
//   http://localhost:3000/verbetes                       -> busca "repentista"
//   http://localhost:3000/verbetes?termo=cordel          -> busca "cordel"
//   http://localhost:3000/verbetes?termo=cordel&limite=4 -> e só 4 resultados
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Pesquisa refinada com outro parâmetro da API: limite (gsrlimit).
//   2. Além do título, cada resultado mostra a imagem do verbete.

import ListaVerbetes from '../../components/ListaVerbetes'
import { CABECALHOS_SERVIDOR, limitar, montarUrlBusca, normalizarVerbetes } from '../../lib/wikipedia'

export const metadata = { title: 'Verbetes' }

export default async function Verbetes({ searchParams }) {
  // searchParams é uma promessa; o await entrega o objeto com os parâmetros.
  // O valor depois do = é o default, usado quando o parâmetro não vem na URL.
  const { termo = 'repentista', limite = '8' } = await searchParams

  let verbetes = []
  let erro = null

  try {
    const res = await fetch(montarUrlBusca(termo, limite), { headers: CABECALHOS_SERVIDOR })

    if (!res.ok) throw new Error(`a Wikipédia respondeu ${res.status}`)

    const data = await res.json()
    verbetes = normalizarVerbetes(data)
  } catch (e) {
    erro = e.message
  }

  return (
    <section className="receita">
      <h3>
        Verbetes para “{termo}”
      </h3>
      <p className="contador">
        Montado no servidor. Limite pedido: {limitar(limite)} · encontrados: {verbetes.length}
      </p>

      {erro ? (
        <p className="status status-erro">Não foi possível consultar a Wikipédia: {erro}</p>
      ) : (
        <ListaVerbetes verbetes={verbetes} vazio={`A busca por “${termo}” não retornou nenhum verbete.`} />
      )}
    </section>
  )
}

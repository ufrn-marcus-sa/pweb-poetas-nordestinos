// RECEITA 17 - Formulário de pesquisa
// Equivalente à rota movieSearch da receita: uma página só com o formulário.
// O Form tem action="/verbetes", então quem pesquisa de fato é a página da
// Receita 16. O usuário não precisa mais digitar ?termo=... na barra de endereço.
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Formulário com mais um campo de pesquisa (limite), em components/FormPesquisa.js.
//   2. Mini-desafio (formulário e resultados na mesma página, sem refazer o
//      formulário): ver app/verbetes/layout.js.

import FormPesquisa from '../../components/FormPesquisa'

export const metadata = { title: 'Pesquisa' }

export default function Pesquisa() {
  return (
    <section className="receita">
      <h3>Pesquisar verbetes de poetas</h3>
      <p>
        Ao clicar em Pesquisar, o formulário leva você para <code>/verbetes</code> com os campos na
        URL, e a página de lá faz a busca no servidor.
      </p>
      <FormPesquisa />
    </section>
  )
}

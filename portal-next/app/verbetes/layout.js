// RECEITA 17 - mini-desafio
// "O formulário deve aparecer na mesma página dos resultados, e a parte do
// formulário não deve ser recarregada ao enviar; só a parte dos resultados."
//
// A solução vem da Receita 15: layout não é montado de novo quando a navegação
// fica dentro dele. O formulário mora aqui, no layout de /verbetes, e o
// resultado é o children (app/verbetes/page.js). Ao pesquisar, o Form navega
// para /verbetes?termo=... e só o children é refeito. O texto digitado
// continua no campo porque o campo nunca foi redesenhado.
//
// Nada foi copiado: FormPesquisa é o mesmo componente de /pesquisa, importado.

import FormPesquisa from '../../components/FormPesquisa'

export default function VerbetesLayout({ children }) {
  console.log('montando layout de verbetes')

  return (
    <div>
      <section className="hero">
        <h2>Verbetes da Wikipédia</h2>
        <p>
          Esta página é um server component: a busca acontece no servidor do Next, e o navegador
          recebe o resultado pronto. O formulário fica no layout, então só a lista é refeita a cada
          pesquisa.
        </p>
        <FormPesquisa />
      </section>
      {children}
    </div>
  )
}

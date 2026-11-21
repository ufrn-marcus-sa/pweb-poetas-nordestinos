'use client'

// Se page.js lançar um erro (a Wikipédia fora do ar ou recusando requisições),
// o Next mostra este componente no lugar da página, em vez de uma tela de erro
// genérica. O menu do layout continua funcionando. error.js precisa ser um
// client component porque recebe a função reset, que tenta de novo.

import Link from 'next/link'

export default function Erro({ reset }) {
  return (
    <section className="receita">
      <p className="status status-erro">Não foi possível carregar este verbete agora.</p>
      <div className="links-externos">
        <button type="button" onClick={() => reset()}>
          Tentar de novo
        </button>
        <Link href="/verbetes">Voltar aos verbetes</Link>
      </div>
    </section>
  )
}

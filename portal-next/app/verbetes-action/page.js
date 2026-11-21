'use client'

// RECEITA 20 - Server Actions
// A mesma página das receitas 18 e 19, mas a busca é uma linha:
//     const res = await buscarVerbetes(formData)
// buscarVerbetes roda no servidor (está num arquivo com 'use server'). Procure
// o código dela no código-fonte desta página no navegador: não está lá.
//
// Exercício: campo Tema, que a action usa para refinar a pesquisa.

import { useCallback, useState } from 'react'
import { buscarVerbetes } from '../actions/verbeteActions'
import { FormVerbetes, StatusBusca, TabelaVerbetes } from '../../components/VerbetesCliente'

const CAMPO_TEMA = {
  name: 'tema',
  rotulo: 'Tema',
  padrao: 'poeta',
  opcoes: [
    { valor: '', rotulo: 'Qualquer' },
    { valor: 'poeta', rotulo: 'Poeta' },
    { valor: 'cordel', rotulo: 'Cordel' },
    { valor: 'repentista', rotulo: 'Repentista' },
    { valor: 'cantoria', rotulo: 'Cantoria' }
  ]
}

export default function Home() {
  const [data, setData] = useState(null)

  const handleAction = useCallback(async (formData) => {
    const res = await buscarVerbetes(formData)
    setData(res)
  }, [])

  console.log('desenhando Home')

  return (
    <div>
      <section className="hero">
        <h2>Busca via Server Action</h2>
        <p>
          O formulário chama <code>buscarVerbetes(formData)</code> como uma função qualquer. Ela
          está em <code>app/actions/verbeteActions.js</code> e roda no servidor; o Next cuida da
          requisição. Experimente o termo “Zé” com o tema Qualquer e depois com Repentista.
        </p>
        <FormVerbetes aoPesquisar={handleAction} campoExtra={CAMPO_TEMA} />
      </section>

      <section className="receita">
        <StatusBusca resultado={data} />
        {data?.verbetes && <TabelaVerbetes verbetes={data.verbetes} />}
      </section>
    </div>
  )
}

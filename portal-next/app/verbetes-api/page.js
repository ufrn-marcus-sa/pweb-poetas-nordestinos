'use client'

// RECEITA 19 - exercício 1
// "Faça um client component que interaja com a sua API em vez de com a API
// externa." É a página da Receita 18 com uma diferença: o fetch vai para
// /api/verbetes ou /api/acervo, rotas do nosso próprio servidor. Inspecione o
// código-fonte ou a aba Rede do navegador: a Wikipédia não aparece em lugar
// nenhum, só a nossa API.
//
// O campo Fonte escolhe entre as duas rotas da receita: a que repassa a
// Wikipédia e a do desafio, que lê a base local.

import { useCallback, useState } from 'react'
import { FormVerbetes, StatusBusca, TabelaVerbetes } from '../../components/VerbetesCliente'

// Constante de módulo: é o mesmo objeto em toda renderização, o que mantém
// o memo do formulário funcionando.
const CAMPO_FONTE = {
  name: 'fonte',
  rotulo: 'Fonte',
  padrao: 'verbetes',
  opcoes: [
    { valor: 'verbetes', rotulo: 'Wikipédia' },
    { valor: 'acervo', rotulo: 'Acervo local' }
  ]
}

export default function Home() {
  const [resultado, setResultado] = useState(null)

  const handleAction = useCallback(async (formData) => {
    const termo = String(formData.get('termo') ?? '').trim()
    const fonte = formData.get('fonte') === 'acervo' ? 'acervo' : 'verbetes'
    const parametros = new URLSearchParams({ termo, limite: formData.get('limite') })

    try {
      const httpRes = await fetch(`/api/${fonte}?${parametros}`)
      const jsonRes = await httpRes.json()

      if (!httpRes.ok) throw new Error(jsonRes.erro ?? `a API respondeu ${httpRes.status}`)

      setResultado({ termo: termo || 'todo o acervo', verbetes: jsonRes.verbetes })
    } catch (erro) {
      setResultado({ termo, verbetes: [], erro: `Não foi possível consultar: ${erro.message}` })
    }
  }, [])

  console.log('desenhando Home')

  return (
    <div>
      <section className="hero">
        <h2>Busca via API própria</h2>
        <p>
          Esta página roda no navegador, mas não fala com a Wikipédia. Ela chama{' '}
          <code>/api/verbetes</code> ou <code>/api/acervo</code>, duas rotas{' '}
          <code>route.js</code> deste projeto. Com a fonte Acervo local, o termo pode ficar vazio
          para listar todos os poetas.
        </p>
        <FormVerbetes aoPesquisar={handleAction} campoExtra={CAMPO_FONTE} />
      </section>

      <section className="receita">
        <StatusBusca resultado={resultado} />
        <TabelaVerbetes verbetes={resultado?.verbetes ?? []} />
      </section>
    </div>
  )
}

'use client'

// RECEITA 18 - Data fetching e Client Components
// Com "use client", esta página é renderizada no navegador. A busca também:
// o fetch sai do navegador direto para a Wikipédia (o origin=* da URL é o que
// a Wikipédia exige para aceitar). Os exercícios estão comentados em
// components/VerbetesCliente.js, onde moram o formulário e a tabela.
//
// A estrutura do desafio das galáxias está preservada: Home tem o formulário
// e a tabela dentro de si, e o estado com o resultado mora no Home.

import { useCallback, useState } from 'react'
import { FormVerbetes, StatusBusca, TabelaVerbetes } from '../../components/VerbetesCliente'
import { montarUrlBusca, normalizarVerbetes } from '../../lib/wikipedia'

export default function Home() {
  // Hook sempre no início da função, nunca dentro de if.
  const [resultado, setResultado] = useState(null)

  // useCallback devolve a mesma função em todas as renderizações. Sem ele,
  // cada redesenho do Home criaria uma handleAction nova, o memo do formulário
  // veria uma propriedade diferente e redesenharia o formulário também.
  const handleAction = useCallback(async (formData) => {
    const termo = String(formData.get('termo') ?? '').trim()
    const limite = formData.get('limite')

    if (!termo) {
      setResultado({ termo, verbetes: [], erro: 'Digite um termo para pesquisar.' })
      return
    }

    try {
      const httpRes = await fetch(montarUrlBusca(termo, limite))
      if (!httpRes.ok) throw new Error(`a Wikipédia respondeu ${httpRes.status}`)
      const jsonRes = await httpRes.json()
      setResultado({ termo, verbetes: normalizarVerbetes(jsonRes) })
    } catch (erro) {
      setResultado({ termo, verbetes: [], erro: `Não foi possível consultar: ${erro.message}` })
    }
  }, [])

  console.log('desenhando Home')

  return (
    <div>
      <section className="hero">
        <h2>Busca no navegador</h2>
        <p>
          Esta página é um client component. O fetch para a Wikipédia sai do seu navegador, e o
          resultado volta para um <code>useState</code>; quando o estado muda, o React redesenha a
          tabela.
        </p>
        <FormVerbetes aoPesquisar={handleAction} />
      </section>

      <section className="receita">
        <StatusBusca resultado={resultado} />
        <TabelaVerbetes verbetes={resultado?.verbetes ?? []} />
      </section>
    </div>
  )
}

'use client'

// RECEITA 18 - Data fetching e Client Components
// O MovieForm e o MovieTable da receita, aqui FormVerbetes e TabelaVerbetes.
// Estão num arquivo à parte porque as receitas 18, 19 e 20 usam os mesmos
// dois componentes; cada page.js importa em vez de copiar.
//
// EXERCÍCIOS DA RECEITA 18 ATENDIDOS AQUI:
//   1. O formulário não zera depois da busca: o texto digitado fica no estado
//      do próprio formulário (useState), em vez de num campo solto.
//   2. O botão fica desabilitado enquanto a requisição está em andamento:
//      BotaoPesquisar usa o hook useFormStatus, que sabe se o form está enviando.
//   3. Enter envia o formulário: o botão é type="submit" dentro do form, e o
//      navegador já envia o form quando se tecla Enter num campo de texto.
//   4. Estilo: classes do app/globals.css na tabela e no formulário.
//   5. Desafio das galáxias: só a tabela é redesenhada a cada busca. Ver o
//      comentário de FormVerbetes e o useCallback em cada page.js.
//      Abra o console do navegador: a cada busca aparecem "desenhando Home" e
//      "desenhando TabelaVerbetes", mas não "desenhando FormVerbetes".

import Form from 'next/form'
import Link from 'next/link'
import { memo, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { LIMITES, LIMITE_PADRAO, cortar } from '../lib/wikipedia'

// O memo diz ao React: "só redesenhe este componente se as propriedades
// mudarem". Quando o Home muda de estado (chegou resultado), ele é redesenhado
// e chama <FormVerbetes aoPesquisar={...}/> de novo. Como a função passada é
// sempre a mesma (o useCallback no Home garante isso) e campoExtra é uma
// constante de módulo, as propriedades não mudaram e o React pula o formulário.
//
// O formulário ainda é redesenhado quando você digita, porque o estado do
// texto mora nele. Isso é o que tem que acontecer: o que não pode é ele ser
// refeito só porque a tabela mudou.
export const FormVerbetes = memo(function FormVerbetes({ aoPesquisar, campoExtra = null }) {
  console.log('desenhando FormVerbetes')

  const [termo, setTermo] = useState('')
  const [limite, setLimite] = useState(String(LIMITE_PADRAO))
  const [extra, setExtra] = useState(campoExtra?.padrao ?? '')

  // A action recebe um FormData, não um evento (os "dois podes e um deve" do
  // passo 2 da receita). Os campos são controlados, então o React não os
  // limpa quando a action termina.
  return (
    <Form action={aoPesquisar} className="formulario">
      <div className="campo">
        <label htmlFor="idTermoCliente">Termo</label>
        <input
          id="idTermoCliente"
          name="termo"
          type="search"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="repentista, cordel, Zé Limeira..."
        />
      </div>

      <div className="campo campo-curto">
        <label htmlFor="idLimiteCliente">Resultados</label>
        <select id="idLimiteCliente" name="limite" value={limite} onChange={(e) => setLimite(e.target.value)}>
          {LIMITES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {campoExtra && (
        <div className="campo campo-curto">
          <label htmlFor="idExtraCliente">{campoExtra.rotulo}</label>
          <select id="idExtraCliente" name={campoExtra.name} value={extra} onChange={(e) => setExtra(e.target.value)}>
            {campoExtra.opcoes.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.rotulo}
              </option>
            ))}
          </select>
        </div>
      )}

      <BotaoPesquisar />
    </Form>
  )
})

// useFormStatus só funciona num componente que está dentro do form.
function BotaoPesquisar() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Pesquisando...' : 'Pesquisar'}
    </button>
  )
}

// Os links usam prefetch={false} pelo mesmo motivo explicado em ListaVerbetes.js.
export function TabelaVerbetes({ verbetes = [] }) {
  console.log('desenhando TabelaVerbetes')

  if (!verbetes.length) return null

  return (
    <div className="conteudo-tabela">
      <table className="tabela-dados tabela-verbetes">
        <thead>
          <tr>
            <th scope="col">Foto</th>
            <th scope="col">Verbete</th>
            <th scope="col">Resumo</th>
          </tr>
        </thead>
        <tbody>
          {verbetes.map((v) => (
            <tr key={v.id}>
              <td>
                {v.imagem ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.imagem} alt="" loading="lazy" />
                ) : (
                  '—'
                )}
              </td>
              <td>
                <Link href={`/poeta/${v.id}`} prefetch={false}>{v.titulo}</Link>
              </td>
              <td>{cortar(v.resumo, 180) || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Linha de status acima da tabela: nada pesquisado ainda, erro, vazio ou total.
export function StatusBusca({ resultado }) {
  if (!resultado) {
    return <p className="status status-vazio">Digite um termo e clique em Pesquisar.</p>
  }

  if (resultado.erro) {
    return <p className="status status-erro">{resultado.erro}</p>
  }

  if (!resultado.verbetes.length) {
    return <p className="status status-vazio">Nada encontrado para “{resultado.termo}”.</p>
  }

  return (
    <p className="status status-ok">
      {resultado.verbetes.length} verbetes para “{resultado.termo}”.
    </p>
  )
}

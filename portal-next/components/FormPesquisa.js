// RECEITA 17 - Formulário de pesquisa
// O Form do Next, com action apontando para a rota que já sabe pesquisar
// (/verbetes, da Receita 16). Ao enviar, o Form navega para
// /verbetes?termo=...&limite=... sem recarregar a página inteira.
//
// O name de cada campo tem que bater exatamente com o que a página de
// /verbetes desestrutura de searchParams: termo e limite.
//
// Exercício 1 da receita: o campo limite é o "mais um campo de pesquisa".

import Form from 'next/form'
import { LIMITES, LIMITE_PADRAO } from '../lib/wikipedia'

export default function FormPesquisa({ action = '/verbetes', termo = '', limite = LIMITE_PADRAO }) {
  return (
    <Form action={action} className="formulario">
      <div className="campo">
        <label htmlFor="idTermo">Termo</label>
        <input id="idTermo" name="termo" type="search" defaultValue={termo} placeholder="repentista, cordel, Zé Limeira..." required />
      </div>
      <div className="campo campo-curto">
        <label htmlFor="idLimite">Resultados</label>
        <select id="idLimite" name="limite" defaultValue={String(limite)}>
          {LIMITES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Pesquisar</button>
    </Form>
  )
}

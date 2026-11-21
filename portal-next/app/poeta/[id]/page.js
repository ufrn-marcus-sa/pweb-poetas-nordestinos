// RECEITA 21 - Rotas dinâmicas e geração estática (SSG)
// O [id] no nome do diretório é a parte variável da rota. Em
// http://localhost:3000/poeta/1278824, id vale '1278824', o número da página
// do Cego Aderaldo na Wikipédia. O nome entre colchetes e o nome que sai de
// params têm que ser iguais: [id] -> const { id } = await params.
//
// Passo 3: app/poeta/[id]/loading.js aparece enquanto esta página não fica pronta.
// Passo 4: generateStaticParams lista os ids que o Next pré-renderiza no build.
// Passo 5: só se vê o efeito com npm run build e npm start (no modo dev o
//          Next não pré-renderiza nada).
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Os resultados de todas as buscas anteriores (receitas 16 a 20) são
//      Links para esta rota: ver components/ListaVerbetes.js e
//      components/VerbetesCliente.js.
//   2. A foto do poeta usa a marca Image do Next (o domínio está liberado em
//      next.config.mjs).

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ACERVO, poetaPorVerbete } from '../../../data/acervo'
import { CABECALHOS_SERVIDOR, montarUrlVerbete, normalizarPagina } from '../../../lib/wikipedia'

// ISR: cada página pré-renderizada vale por um dia (o valor é em segundos,
// 60 * 60 * 24). Depois disso o Next a refaz no acesso seguinte. O Next exige
// um número literal aqui, por isso não dá para escrever a conta.
export const revalidate = 86400

// dynamicParams fica no padrão (true): um id que não foi pré-renderizado,
// vindo de uma busca, é montado na primeira visita e guardado para as
// próximas. Com false, só os sete poetas do acervo existiriam; o resto daria 404.
// export const dynamicParams = false

// A receita usa uma busca da API só para ilustrar, porque a OMDb não deixa
// listar a base inteira. Aqui temos uma base nossa, o acervo, então a função
// devolve exatamente os sete poetas que ele tem.
export async function generateStaticParams() {
  return ACERVO.map((poeta) => ({ id: poeta.verbeteId }))
}

async function buscarVerbete(id) {
  // fetch + then + await, como na receita. O res.ok vem antes do json(): se a
  // Wikipédia recusar (por excesso de requisições, por exemplo), a resposta é
  // texto e não JSON. O erro lançado aqui é mostrado por ./error.js.
  const resposta = await fetch(montarUrlVerbete(id), { headers: CABECALHOS_SERVIDOR }).then((res) => {
    if (!res.ok) throw new Error(`a Wikipédia respondeu ${res.status}`)
    return res.json()
  })
  const pagina = Object.values(resposta?.query?.pages ?? {})[0]

  if (!pagina || 'missing' in pagina || 'invalid' in pagina) return null

  return normalizarPagina(pagina)
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const verbete = /^\d+$/.test(id) ? await buscarVerbete(id) : null

  return { title: verbete?.titulo ?? 'Poeta não encontrado' }
}

export default async function Poeta({ params }) {
  const { id } = await params

  // Só ids numéricos fazem sentido; o resto nem vai à API.
  if (!/^\d+$/.test(id)) notFound()

  const verbete = await buscarVerbete(id)

  if (!verbete) notFound()

  const doAcervo = poetaPorVerbete(id)

  return (
    <article className="receita">
      <Link className="voltar" href="/verbetes">
        &larr; Voltar aos verbetes
      </Link>

      <div className="ficha">
        <div>
          {verbete.imagem ? (
            <Image
              className="ficha-foto"
              src={verbete.imagem}
              alt={`Imagem do verbete ${verbete.titulo}`}
              width={verbete.largura}
              height={verbete.altura}
              sizes="(max-width: 700px) 100vw, 260px"
              priority
            />
          ) : (
            <div className="avatar" aria-hidden="true">
              {verbete.titulo.slice(0, 1)}
            </div>
          )}
        </div>

        <div>
          <h2>{verbete.titulo}</h2>

          {doAcervo && (
            <dl>
              <dt>Conhecido como</dt>
              <dd>{doAcervo.apelido}</dd>
              <dt>Estado</dt>
              <dd>{doAcervo.estado}</dd>
              <dt>Vida</dt>
              <dd>{doAcervo.morte ? `${doAcervo.nascimento}–${doAcervo.morte}` : `nascido em ${doAcervo.nascimento}`}</dd>
            </dl>
          )}

          {verbete.resumo.split('\n').filter(Boolean).map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}

          <p className="card-meta">
            Verbete {verbete.id} da{' '}
            <a href={verbete.link} target="_blank" rel="noreferrer">
              Wikipédia em português
            </a>
            . {doAcervo ? 'Pré-renderizado no build (está no acervo).' : 'Montado na primeira visita e guardado em cache.'}
          </p>
        </div>
      </div>
    </article>
  )
}

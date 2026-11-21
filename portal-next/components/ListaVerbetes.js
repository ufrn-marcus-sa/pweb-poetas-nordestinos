// Grade de cartões de verbetes. Não tem hook nem diretiva: serve tanto a
// server components (Receita 16) quanto a client components.
//
// Receita 16, exercício 2: além do título, mostra a imagem (o "pôster").
// Receita 21, exercício 1: o título é um Link para a rota dinâmica /poeta/[id].
// prefetch={false}: em produção o Link pré-carrega toda página que aparece na
// tela. Numa lista de 20 resultados isso seriam 20 consultas à Wikipédia de
// uma vez, e ela responde "too many requests". Aqui só carrega no clique.

import Link from 'next/link'
import { cortar } from '../lib/wikipedia'

export default function ListaVerbetes({ verbetes = [], vazio = 'Nenhum verbete encontrado.' }) {
  if (!verbetes.length) {
    return <p className="status status-vazio">{vazio}</p>
  }

  return (
    <div className="grade grade-cartoes">
      {verbetes.map((v) => (
        <article key={v.id} className="cartao">
          {v.imagem ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="miniatura" src={v.imagem} alt={`Imagem do verbete ${v.titulo}`} loading="lazy" />
          ) : (
            <div className="miniatura-vazia">sem imagem</div>
          )}
          <h3 className="cartao-titulo">
            <Link href={`/poeta/${v.id}`} prefetch={false}>{v.titulo}</Link>
          </h3>
          <p className="cartao-texto">{cortar(v.resumo)}</p>
        </article>
      ))}
    </div>
  )
}

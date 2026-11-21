// RECEITA 13 - Next.js: aplicação e páginas
// Esta é a rota raiz (/). A página é a função exportada por default; o Next a
// chama sozinho, a gente nunca chama Home().
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Novas rotas com page.js próprio: app/sobre, app/repente, app/verbetes...
//      (http://localhost:3000/sobre é a mais simples delas).
//   2. Trova e CartaoReceita são exportadas sem default. Não viram rota, mas são
//      importadas e usadas em app/sobre/page.js e em app/repente/mote/page.js.
//
// RECEITA 15 - Next.js: layouts e links
// O passo 2 está no fim da página: um Link do Next e uma marca <a> comum para a
// mesma rota, para comparar no terminal quantas vezes o layout é montado.

import Link from 'next/link'

export const RECEITAS = [
  {
    numero: 13,
    titulo: 'Aplicação e páginas',
    href: '/sobre',
    rota: '/ e /sobre',
    resumo: 'Projeto criado com npm init e npm i next; cada page.js dentro de app vira uma rota.'
  },
  {
    numero: 14,
    titulo: 'Páginas e componentes',
    href: '/repente',
    rota: '/repente e /repente/mote',
    resumo: 'Componentes que viram marcas, com e sem propriedades, importados de outro arquivo.'
  },
  {
    numero: 15,
    titulo: 'Layouts e links',
    href: '/repente',
    rota: 'app/layout.js',
    resumo: 'Menu no layout raiz, layouts por subdiretório e navegação com o Link do Next.'
  },
  {
    numero: 16,
    titulo: 'Data fetching I',
    href: '/verbetes?termo=cordel',
    rota: '/verbetes?termo=...',
    resumo: 'Server component assíncrono que lê searchParams e busca verbetes na Wikipédia.'
  },
  {
    numero: 17,
    titulo: 'Formulário de pesquisa',
    href: '/pesquisa',
    rota: '/pesquisa',
    resumo: 'O componente Form do Next envia a busca para /verbetes sem ninguém digitar URL.'
  },
  {
    numero: 18,
    titulo: 'Client components',
    href: '/verbetes-cliente',
    rota: '/verbetes-cliente',
    resumo: 'A busca roda no navegador, com useState guardando o resultado.'
  },
  {
    numero: 19,
    titulo: 'Implementação de API',
    href: '/verbetes-api',
    rota: '/api/verbetes e /api/acervo',
    resumo: 'Rotas route.js próprias, uma repassando a Wikipédia e outra servindo o acervo local.'
  },
  {
    numero: 20,
    titulo: 'Server Actions',
    href: '/verbetes-action',
    rota: '/verbetes-action',
    resumo: 'O navegador chama uma função do servidor como se fosse local, sem fetch nem URL.'
  },
  {
    numero: 21,
    titulo: 'Rotas dinâmicas e SSG',
    href: '/poeta/1278824',
    rota: '/poeta/[id]',
    resumo: 'Uma página por poeta, pré-renderizada no build com generateStaticParams.'
  }
]

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h2>Portfólio Poético, agora em Next.js</h2>
        <p>
          O portal da Unidade 1 era HTML, CSS e JavaScript puro. Nesta segunda unidade ele virou uma
          aplicação Next.js: cada receita, da 13 à 21, é uma rota funcionando.
        </p>
      </section>

      <section className="receita">
        <h3>Receitas 13 a 21</h3>
        <div className="grade">
          {RECEITAS.map((receita) => (
            <CartaoReceita key={receita.numero} {...receita} />
          ))}
        </div>
      </section>

      <Trova />

      <section className="receita">
        <h3>Receita 15: Link do Next contra a marca a</h3>
        <p>
          Os dois links levam para a mesma rota. Abra o terminal onde o servidor está rodando e veja
          quantas vezes aparece a mensagem <code>montando layout</code> em cada caso.
        </p>
        <div className="links-externos">
          <Link href="/repente">Repente, com Link</Link>
          <a href="/repente">Repente, jeito antigo (marca a)</a>
        </div>
      </section>
    </div>
  )
}

// Componentes exportados sem default (exercício 2 da Receita 13).

export function Trova({ titulo = 'Trova' }) {
  return (
    <section className="poesia">
      <h3>{titulo}</h3>
      <p>Quem vem de longe gosta</p>
      <p className="mote">De um sertão sem fim,</p>
      <p className="mote">Onde o sol conversa</p>
      <p>Com a poeira do caminho.</p>
    </section>
  )
}

export function CartaoReceita({ numero, titulo, href, rota, resumo }) {
  return (
    <article className="card">
      <h4>
        <Link href={href}>
          Receita {numero}: {titulo}
        </Link>
      </h4>
      <p>{resumo}</p>
      <p className="card-meta">
        <code>{rota}</code>
      </p>
    </article>
  )
}

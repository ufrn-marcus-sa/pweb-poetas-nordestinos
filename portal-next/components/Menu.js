'use client'

// Menu principal (Receita 15, exercício 2: o menu saiu da página e foi para o
// layout). É um client component só porque usa o hook usePathname para
// destacar a rota atual. Todos os links usam o Link do Next.

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ROTAS = [
  { href: '/', rotulo: 'Início' },
  { href: '/repente', rotulo: 'Repente' },
  { href: '/verbetes', rotulo: 'Verbetes' },
  { href: '/pesquisa', rotulo: 'Pesquisa' },
  { href: '/verbetes-cliente', rotulo: 'Busca no navegador' },
  { href: '/verbetes-api', rotulo: 'Busca via API' },
  { href: '/verbetes-action', rotulo: 'Busca via action' },
  { href: '/poeta/1278824', rotulo: 'Cego Aderaldo' }
]

export default function Menu() {
  const caminho = usePathname()

  return (
    <nav className="menu" aria-label="Principal">
      {ROTAS.map(({ href, rotulo }) => {
        const ativo = caminho === href || (href !== '/' && caminho.startsWith(`${href}/`))

        return (
          <Link key={href} href={href} aria-current={ativo ? 'page' : undefined}>
            {rotulo}
          </Link>
        )
      })}
    </nav>
  )
}

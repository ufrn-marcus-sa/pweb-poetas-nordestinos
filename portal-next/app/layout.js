// RECEITA 15 - Next.js: layouts e links
// O layout raiz. O Next renderiza este componente e passa em children o que a
// página da rota pedida retornou.
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Por que isso é interessante: veja o console.log abaixo. Ele aparece uma
//      vez no terminal do servidor e nunca no console do navegador. Ao navegar
//      pelos links do menu (componente Link), o layout não é montado de novo:
//      só a parte de children muda. Com uma marca <a> comum, a página inteira é
//      pedida outra vez ao servidor, e o log aparece de novo. Menos trabalho
//      no servidor, menos dados na rede e o menu não "pisca".
//   2. O menu, que na Receita 13 era um div dentro de app/page.js, mora agora
//      aqui no layout (componente Menu).
//   3. Layouts de subdiretórios: app/repente/layout.js e app/verbetes/layout.js.

import Link from 'next/link'
import Menu from '../components/Menu'
import './globals.css'

export const metadata = {
  title: {
    default: 'Poetas Nordestinos',
    template: '%s | Poetas Nordestinos'
  },
  description: 'Portal dos poetas populares do Nordeste, feito em Next.js nas receitas 13 a 21 de Programação Web.'
}

export default function RootLayout({ children }) {
  // Gambiarra didática da receita: mostra quando o layout é montado.
  console.log('montando layout')

  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          <Menu />
          <h1>
            <Link href="/">Poetas Nordestinos</Link>
          </h1>
        </header>

        <main className="container">{children}</main>

        <footer className="container credito">
          <p>
            Portal dos Poetas Nordestinos, Unidade 2 de Programação Web. Textos de apoio, exemplos e
            exercícios: Fabrício Vale.
          </p>
          <p>Verbetes e imagens: Wikipédia em português e Wikimedia Commons.</p>
        </footer>
      </body>
    </html>
  )
}

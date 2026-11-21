// RECEITA 15 - exercício 3: layout de um subdiretório.
// Envolve /repente e /repente/mote. O RootLayout continua por fora; este fica
// dentro dele, e children aqui é a página de cada uma das duas rotas.

import Link from 'next/link'

export default function RepenteLayout({ children }) {
  console.log('montando layout do repente')

  return (
    <div>
      <nav className="submenu" aria-label="Repente">
        <Link className="chip" href="/repente">
          Estrofes
        </Link>
        <Link className="chip" href="/repente/mote">
          Mote e glosa
        </Link>
      </nav>
      {children}
    </div>
  )
}

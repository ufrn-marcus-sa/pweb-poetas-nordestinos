// RECEITA 14 - exercícios 1 e 2
// Rota /repente/mote, num subdiretório de /repente. Usa Glosa, componente
// escrito em app/repente/page.js, e Estrofe, de app/repente/componentes.js.

import { Glosa } from '../page'
import { Estrofe } from '../componentes'

export const metadata = { title: 'Mote e glosa' }

export default function Mote() {
  return (
    <section className="receita">
      <h3>Mote e glosa</h3>
      <p>
        Na cantoria, o mote é o verso dado ao cantador, e a glosa é a estrofe que ele improvisa a
        partir dele. Abaixo, a glosa vem de outro <code>page.js</code>; a segunda estrofe é o mesmo
        componente com outros parâmetros.
      </p>

      <Glosa autor="Glosa importada de app/repente/page.js" />

      <Estrofe
        autor="Estrofe montada aqui, com outros versos"
        mote="Quem canta seus males espanta"
        versos={[
          'Quem canta seus males espanta,',
          'Diz o povo do sertão;',
          'Por isso o repentista canta',
          'Com a viola na mão.'
        ]}
      />
    </section>
  )
}

// RECEITA 14 - Next.js: páginas e componentes
// A página da rota /repente usa os componentes de ./componentes como marcas.
// Note o ./ no import e a ausência do .js no nome do arquivo.
//
// EXERCÍCIOS DA RECEITA ATENDIDOS:
//   1. Novas páginas em subdiretório: app/repente/mote/page.js.
//   2. Uma página usando componente escrito num page.js: Glosa, exportada
//      daqui, é usada por app/repente/mote/page.js.
//   3. Componente com parâmetros: Estrofe recebe versos, autor e mote.

import { MoteFixo, Estrofe } from './componentes'

export const metadata = { title: 'Repente' }

export default function Repente() {
  return (
    <div>
      <section className="hero">
        <MoteFixo />
        <p>
          O título acima é a marca <code>{'<MoteFixo/>'}</code>. O Next troca a marca pelo que a
          função <code>MoteFixo()</code> retorna antes de mandar o HTML para o navegador.
        </p>
      </section>

      <section className="receita">
        <h3>Estrofes com parâmetros</h3>
        <p>
          O mesmo componente <code>Estrofe</code>, chamado duas vezes com propriedades diferentes.
        </p>

        <Estrofe
          autor="Trova da página inicial"
          mote="De um sertão sem fim,"
          versos={[
            'Quem vem de longe gosta',
            'De um sertão sem fim,',
            'Onde o sol conversa',
            'Com a poeira do caminho.'
          ]}
        />

        <Glosa />
      </section>
    </div>
  )
}

// Exportada sem default: não é página, é componente. Mas mora num page.js e
// é importada por outra rota (exercício 2).
export function Glosa({ autor = 'Quadra de exemplo, escrita para o portal' }) {
  return (
    <Estrofe
      autor={autor}
      mote="Cantador de pé-de-serra"
      versos={[
        'Cantador de pé-de-serra',
        'Tira o verso do juízo,',
        'Não carece de papel',
        'Nem de ensaio nem de aviso.'
      ]}
    />
  )
}

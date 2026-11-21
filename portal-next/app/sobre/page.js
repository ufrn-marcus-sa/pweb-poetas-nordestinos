// RECEITA 13 - exercícios 1 e 2
// Exercício 1: um diretório novo dentro de app com um page.js vira a rota /sobre.
// Exercício 2: Trova e CartaoReceita foram escritas em app/page.js com export
// simples (não default). Aqui elas são importadas e usadas como marcas.

import { Trova, CartaoReceita, RECEITAS } from '../page'

export const metadata = { title: 'Sobre' }

export default function Sobre() {
  const [primeira] = RECEITAS

  return (
    <div>
      <section className="hero">
        <h2>Sobre o portal</h2>
        <p>
          Esta rota existe porque há um arquivo <code>app/sobre/page.js</code> exportando uma
          função por default. Só isso. O Next encontra o arquivo e associa a função ao endereço{' '}
          <code>/sobre</code>.
        </p>
      </section>

      <section className="receita">
        <h3>Componentes emprestados de app/page.js</h3>
        <p>
          O cartão e a trova abaixo não foram escritos aqui. São funções exportadas sem default em{' '}
          <code>app/page.js</code>, importadas com <code>{"import { Trova, CartaoReceita } from '../page'"}</code>.
        </p>
        <div className="grade">
          <CartaoReceita {...primeira} />
        </div>
      </section>

      <Trova titulo="A mesma trova da página inicial" />
    </div>
  )
}

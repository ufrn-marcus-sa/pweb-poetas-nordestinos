// RECEITA 14 - Next.js: páginas e componentes
// Componentes: funções exportadas sem default, fora de page.js. Não estão
// associadas a rota nenhuma; viram marcas dentro de outras funções.

// O equivalente do MariaPrea() da receita: sem parâmetro, sempre o mesmo verso.
export function MoteFixo() {
  return <h2>Morreu Maria Preá...</h2>
}

// EXERCÍCIO 3: componente que recebe parâmetros. As propriedades da marca
// (<Estrofe autor="..." versos={[...]} />) chegam aqui desestruturadas.
// O parâmetro mote tem valor default, como no searchParams da Receita 16.
export function Estrofe({ versos = [], autor, mote = null }) {
  return (
    <blockquote className="estrofe">
      {versos.map((verso, posicao) => (
        <p key={posicao} className={verso === mote ? 'mote' : undefined}>
          {verso}
        </p>
      ))}
      {autor && <footer>{autor}</footer>}
    </blockquote>
  )
}

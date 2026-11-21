// Mesma técnica do app/poeta/[id]/loading.js (Receita 21): enquanto a página
// de /verbetes espera a Wikipédia, o Next já mostra isto no lugar do children.
// O formulário, que está no layout, continua visível e usável.

export default function Loading() {
  return (
    <section className="receita">
      <p className="status status-carregando carregando">Consultando a Wikipédia...</p>
    </section>
  )
}

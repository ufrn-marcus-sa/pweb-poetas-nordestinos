// RECEITA 21 - passo 3: streaming de interface.
// Enquanto app/poeta/[id]/page.js espera a Wikipédia, o Next envia isto na
// hora; quando a página fica pronta, ela substitui este conteúdo sozinha.
// Nas páginas pré-renderizadas (os sete poetas do acervo, em produção) isto
// nem aparece, porque a página já está pronta.

export default function Loading() {
  return (
    <section className="receita">
      <h2 className="carregando">Carregando o verbete...</h2>
    </section>
  )
}

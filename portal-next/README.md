# Portal dos Poetas Nordestinos em Next.js (Receitas 13 a 21)

Unidade 2 de Programação Web. O portal da Unidade 1 (HTML, CSS e JS puro, na
pasta de cima) virou uma aplicação Next.js. Cada receita é uma rota
funcionando, e o comentário no topo de cada arquivo diz de qual receita ele vem
e quais exercícios atende.

Como na Unidade 1, a fonte de dados é a API da **Wikipédia em português**, e não
a OMDb (filmes) dos enunciados, para manter o tema dos poetas. A sequência das
receitas é a mesma: `searchParams`, `<Form>`, `useState`, `route.js`, server
action, rota dinâmica com `generateStaticParams`.

## Como rodar

Precisa de Node.js instalado.

```bash
npm install
npm run dev          # desenvolvimento, em http://localhost:3000
```

Para ver a geração estática da Receita 21 (passo 5), rode em modo produção:

```bash
npm run build        # gera as páginas dos 7 poetas do acervo
npm start
```

## Onde está cada receita

| # | Assunto | Rota | Arquivos |
|---|---|---|---|
| 13 | Aplicação e páginas | `/`, `/sobre` | `app/page.js`, `app/sobre/page.js` |
| 14 | Páginas e componentes | `/repente`, `/repente/mote` | `app/repente/componentes.js`, `app/repente/page.js`, `app/repente/mote/page.js` |
| 15 | Layouts e links | todas | `app/layout.js`, `app/repente/layout.js`, `components/Menu.js` |
| 16 | Data fetching I (server component) | `/verbetes?termo=cordel&limite=4` | `app/verbetes/page.js` |
| 17 | Formulário de pesquisa | `/pesquisa` | `components/FormPesquisa.js`, `app/pesquisa/page.js`, `app/verbetes/layout.js` |
| 18 | Data fetching e client components | `/verbetes-cliente` | `app/verbetes-cliente/page.js`, `components/VerbetesCliente.js` |
| 19 | Implementação de API | `/api/verbetes`, `/api/acervo`, `/verbetes-api` | `app/api/verbetes/route.js`, `app/api/acervo/route.js`, `app/verbetes-api/page.js` |
| 20 | Server Actions | `/verbetes-action` | `app/actions/verbeteActions.js`, `app/verbetes-action/page.js` |
| 21 | Rotas dinâmicas e SSG | `/poeta/1278824` | `app/poeta/[id]/page.js`, `loading.js`, `error.js`, `next.config.mjs` |

## Exercícios

- **13:** novas rotas (`/sobre`); componentes exportados sem default em
  `app/page.js` (`Trova`, `CartaoReceita`) usados em outra rota.
- **14:** subdiretório `/repente/mote`; componente `Glosa` escrito num `page.js`
  e usado por outra página; componente `Estrofe` com parâmetros.
- **15:** o `console.log('montando layout')` mostra que o layout é montado só uma
  vez quando se navega com `Link` (a página inicial compara `Link` e `<a>`); o
  menu foi para o layout; `app/repente` e `app/verbetes` têm layout próprio.
- **16:** parâmetro extra `limite`; imagem de cada verbete.
- **17:** campo extra `limite`. Mini-desafio: o formulário fica em
  `app/verbetes/layout.js`, então ao pesquisar só a lista é refeita.
- **18:** o formulário mantém o texto depois da busca; o botão fica desabilitado
  durante a requisição (`useFormStatus`); Enter envia; CSS na tabela e no form.
  Desafio: `memo` no formulário + `useCallback` no `Home`, e o formulário não
  é redesenhado quando o resultado chega (veja o console do navegador).
- **19:** client component falando com a própria API. Desafio: `/api/acervo`
  responde a partir da base local `data/acervo.js`.
- **20:** campo extra `tema` refina a pesquisa na server action.
- **21:** todos os resultados de busca levam a `/poeta/[id]` com `Link`; a foto
  usa `Image` do Next. `revalidate` de um dia (ISR).

## Arquivos de apoio

```
lib/wikipedia.js      monta URLs e normaliza a resposta da Wikipédia
data/acervo.js        os 7 poetas da Unidade 1, com o id do verbete de cada um
components/           Menu, FormPesquisa, ListaVerbetes, VerbetesCliente
```

## Créditos

Textos de apoio, exemplos e exercícios: **Fabrício Vale**, receitas da
disciplina de Programação Web. Verbetes e imagens: Wikipédia em português e
Wikimedia Commons.

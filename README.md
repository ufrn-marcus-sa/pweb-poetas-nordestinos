# pweb-poetas-nordestinos

Portfólio poético da disciplina de **Programação Web (PWEB)**. O projeto é um portal
web modular sobre poetas populares do Nordeste, e ao mesmo tempo o registro das
receitas práticas da Unidade 1.

Cada receita virou uma **funcionalidade do portal**, não uma página de demonstração.
A página é a ferramenta funcionando; a técnica usada nela e a receita de onde veio
estão anotadas no comentário do código e num rodapé discreto em cada página.

- **Repositório:** https://github.com/ufrn-marcus-sa/pweb-poetas-nordestinos
- **Tecnologias:** HTML5, CSS3 (folha externa) e JavaScript (scripts clássicos, sem build)

## Como rodar

Basta abrir `index.html` no navegador para as receitas 1 a 6.

As receitas **7 e 8 fazem requisição de rede**, e alguns navegadores bloqueiam
`fetch` em páginas abertas por `file://`. Se a enciclopédia não buscar nada, abra
por um servidor local:

```bash
npx serve .
# ou, se tiver Python:
python -m http.server 8000
```

E acesse `http://localhost:8000`.

## As oito receitas

| # | Onde está | Assunto | O que virou no portal |
|---|---|---|---|
| 1 | `index.html` | HTML básico | Tabelas com `<caption>`, `<thead>` e `<tbody>` |
| 2 | `poetas/*.html` | CSS externo | Tabela de bebidas com links, classes reutilizáveis |
| 3 | `poetas/*.html` | JS: DOM e eventos | Botão que mostra e esconde um campo com transição |
| 4 | `index.html` | JS: arrays | Ordenar e embaralhar (Fisher-Yates) uma lista |
| 5 | `busca-acervo/` | Arrow e callback functions | Filtro e ordenação do acervo enquanto o usuário digita |
| 6 | `fichas-acervo/` | Objetos JSON | Acervo em fichas ou tabela, com renderizador genérico |
| 7 | `enciclopedia/` | Fetch | Consulta verbetes e fotos na Wikipédia |
| 8 | `enciclopedia-promessas/` | Promessas | A mesma busca, sem botão, só com `then`/`catch` |

## Arquivos

```
index.html                     página inicial, com as oito entregas
estilo.css                     folha de estilo única do projeto
script.js                      Receitas 1 a 4
acervo.js                      base local de 7 poetas (window.ACERVO e window.REGIOES)
tabela.js                      renderizadores genéricos (window.montarTabela / montarCartoes)
favicon.png
poetas/                        páginas das Receitas 2 e 3
busca-acervo/                  Receita 5
fichas-acervo/                 Receita 6
enciclopedia/                   Receita 7
enciclopedia-promessas/         Receita 8
```

`acervo.js` e `tabela.js` são compartilhados por mais de uma página de propósito:
a função genérica de tabela é usada tanto pela receita 7 quanto pela 8, e pelos
dois formatos de dado diferentes, o que é o exercício 4 da receita 7.

## API usada

As receitas 7 e 8 consultam a **API MediaWiki da Wikipédia em português**:

```
https://pt.wikipedia.org/w/api.php?action=query&generator=search&prop=extracts|pageimages...
```

É uma API diferente da `random-data-api`, que saiu do ar — o enunciado pedia
justamente essa troca. A escolha mantém o projeto no tema: os dados são em
português, sobre poetas nordestinos, e vêm com fotografia.

Um detalhe que o enunciado simplifica: essa API não devolve um vetor, e sim um
objeto indexado pelo id de cada verbete. Por isso o `Object.values()` aparece nas
duas features, comentado como o passo extra que a API real exige.

## Dados

Os sete poetas de `acervo.js` e as datas foram conferidos na Wikipédia em
setembro de 2026. As imagens exibidas nas receitas 7 e 8 pertencem à
Wikimedia Commons e são servidas pela própria API.

## Créditos

Textos de apoio, exemplos e exercícios: **Fabrício Vale** — receitas da disciplina
de Programação Web da UFRN.

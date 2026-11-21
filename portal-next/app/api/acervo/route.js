// RECEITA 19 - desafio: "faça com que sua API acesse uma base de dados sua em
// vez de uma outra API".
// A base aqui é o acervo local de data/acervo.js. A resposta tem o mesmo
// formato da /api/verbetes, então o mesmo client component lê as duas.
//
// Teste no navegador:
//   http://localhost:3000/api/acervo              -> todos os poetas
//   http://localhost:3000/api/acervo?termo=pb     -> os da Paraíba
//   http://localhost:3000/api/acervo?termo=cordel -> busca também na nota

import { buscarNoAcervo } from '../../../data/acervo'
import { limitar } from '../../../lib/wikipedia'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const termo = (searchParams.get('termo') ?? '').trim()
  const limite = limitar(searchParams.get('limite'))

  const verbetes = buscarNoAcervo(termo)
    .slice(0, limite)
    .map((poeta) => ({
      id: poeta.verbeteId,
      titulo: poeta.nome,
      resumo: `${poeta.apelido} (${poeta.estado}, ${
        poeta.morte ? `${poeta.nascimento}–${poeta.morte}` : `nascido em ${poeta.nascimento}`
      }). ${poeta.nota}`,
      imagem: null
    }))

  return Response.json({ fonte: 'acervo', termo, limite, total: verbetes.length, verbetes })
}

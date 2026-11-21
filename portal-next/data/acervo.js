// ACERVO DE POETAS NORDESTINOS
// A mesma base local da Unidade 1 (../acervo.js), agora como módulo ES para ser
// importada pelo Next. Faz o papel de "base de dados nossa":
//   - Receita 19, desafio: a rota /api/acervo responde a partir daqui;
//   - Receita 21: generateStaticParams lê os ids daqui para pré-renderizar
//     a página de cada poeta no build.
//
// O campo verbeteId é o id da página do poeta na Wikipédia em português,
// conferido na API em 21/11/2026. É ele que vai na rota /poeta/[id].

export const ACERVO = [
  {
    verbeteId: '1278824',
    nome: 'Cego Aderaldo',
    apelido: 'Aderaldo Ferreira de Araújo',
    estado: 'CE',
    nascimento: '1878',
    morte: '1967',
    nota: 'Poeta popular cearense, de raciocínio tão rápido que improvisava rimas e trovas. Venceu Zé Pretinho numa disputa de rimas registrada no cordel A peleja de Cego Aderaldo e Zé Pretinho.'
  },
  {
    verbeteId: '1143645',
    nome: 'Zé Limeira',
    apelido: 'O Poeta do Absurdo',
    estado: 'PB',
    nascimento: '1886',
    morte: '1954',
    nota: 'Cordelista e repentista paraibano. Nasceu no sítio Tauá, em Teixeira, principal reduto de repentistas do século XIX.'
  },
  {
    verbeteId: '6231322',
    nome: 'Muniz Barreto',
    apelido: 'Francisco Muniz Barreto',
    estado: 'BA',
    nascimento: '1804',
    morte: '1868',
    nota: 'Poeta, militar e escriturário da Alfândega da Bahia, considerado o maior repentista do Império segundo Sacramento Blake.'
  },
  {
    verbeteId: '432590',
    nome: 'Leandro Gomes de Barros',
    apelido: 'Poeta do Pombal',
    estado: 'PB',
    nascimento: '1865',
    morte: '1918',
    nota: 'Poeta de literatura de cordel. Nasceu em 19 de novembro, data comemorada como o Dia do Cordelista.'
  },
  {
    verbeteId: '4617631',
    nome: 'Apolônio Cardoso',
    apelido: 'O advogado campinense',
    estado: 'PB',
    nascimento: '1938',
    morte: '2014',
    nota: 'Advogado, poeta e repentista. Considerado um dos mais significativos e importantes da poesia da região Nordeste.'
  },
  {
    verbeteId: '2412514',
    nome: 'Alberto Porfírio da Silva',
    apelido: 'Xilogravurista de Quixadá',
    estado: 'CE',
    nascimento: '1926',
    morte: '2009',
    nota: 'Escultor, xilogravurista, poeta cordelista e repentista. Expoente da poesia popular cearense.'
  },
  {
    verbeteId: '3478499',
    nome: 'Júnior Cordeiro',
    apelido: 'José Valni Cordeiro Lima Júnior',
    estado: 'PB',
    nascimento: '1982',
    morte: null,
    nota: 'Cantor, compositor e poeta de São João do Cariri, terra de cantadores.'
  }
]

export function buscarNoAcervo(termo = '') {
  const chave = normalizarTexto(termo)

  if (!chave) return ACERVO

  return ACERVO.filter((poeta) =>
    [poeta.nome, poeta.apelido, poeta.estado, poeta.nota].some((campo) =>
      normalizarTexto(campo).includes(chave)
    )
  )
}

export function poetaPorVerbete(id) {
  return ACERVO.find((poeta) => poeta.verbeteId === String(id)) ?? null
}

// Tira acentos e caixa, para "ze limeira" achar "Zé Limeira".
function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

// ACERVO DE POETAS NORDESTINOS
// Base de dados local do portal, consumida pelas features de busca e de fichas.
// Os dados biográficos foram conferidos na Wikipédia em 26/09/2026.
// Fonte: https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1

window.ACERVO = [
  {
    nome: 'Cego Aderaldo',
    apelido: 'Aderaldo Ferreira de Araújo',
    estado: 'CE',
    nascimento: '1878',
    morte: '1967',
    nota: 'Poeta popular cearense, de raciocínio tão rápido que improvisava rimas e tropecas. Venceu Zé Pretinho numa disputa de rimas registrada no cordel A peleja de Cego Aderaldo e Zé Pretinho.'
  },
  {
    nome: 'Zé Limeira',
    apelido: 'O Poeta do Absurdo',
    estado: 'PB',
    nascimento: '1886',
    morte: '1954',
    nota: 'Cordelista e repentista paraibano. Nasceu no sítio Tauá, em Teixeira, principal reduto de repentistas do século XIX.'
  },
  {
    nome: 'Muniz Barreto',
    apelido: 'Francisco Muniz Barreto',
    estado: 'BA',
    nascimento: '1804',
    morte: '1868',
    nota: 'Poeta, militar e escriturário da Alfândega da Bahia, considerado o maior repentista do Império segundo Sacramento Blake.'
  },
  {
    nome: 'Leandro Gomes de Barros',
    apelido: 'Poeta do Pombal',
    estado: 'PB',
    nascimento: '1865',
    morte: '1918',
    nota: 'Poeta de literatura de cordel. Nasceu em 19 de novembro, data comemorada como o Dia do Cordelista.'
  },
  {
    nome: 'Apolônio Cardoso',
    apelido: 'O advogado campinense',
    estado: 'PB',
    nascimento: '1938',
    morte: '2014',
    nota: 'Advogado, poeta e repentista. Considerado um dos mais significativos e importantes da poesia da região Nordeste.'
  },
  {
    nome: 'Alberto Porfírio da Silva',
    apelido: 'Xilogravurista de Quixadá',
    estado: 'CE',
    nascimento: '1926',
    morte: '2009',
    nota: 'Escultor, xilogravurista, poeta cordelista e repentista. Expoente da poesia popular cearense.'
  },
  {
    nome: 'Júnior Cordeiro',
    apelido: 'José Valni Cordeiro Lima Júnior',
    estado: 'PB',
    nascimento: '1982',
    morte: null,
    nota: 'Cantor, compositor e poeta de São João do Cariri, terra de cantadores.'
  }
];

// Segundo conjunto de dados, com propriedades de nomes diferentes do acervo.
// Existe para provar que a mesma função de renderização sabe trabalhar com
// qualquer formato de objeto, e não apenas com o formato do ACERVO.
window.REGIOES = [
  { sigla: 'PB', nome: 'Paraíba', capital: 'João Pessoa', poetas: 4 },
  { sigla: 'CE', nome: 'Ceará', capital: 'Fortaleza', poetas: 2 },
  { sigla: 'BA', nome: 'Bahia', capital: 'Salvador', poetas: 1 }
];

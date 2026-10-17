// Lista de exemplo: atualizações que "apareceram" para quatro bibliotecas imaginárias.
// "intervalo" é o que está escrito no package.json de cada uma.
module.exports = [
  // Só o PATCH mudou (correção de bug): é o caso mais seguro.
  { pacote: "biblioteca-a", atual: "1.4.2", nova: "1.4.3", intervalo: "^1.4.2" },
  // O MINOR mudou (funcionalidade nova), mas o intervalo "~2.3.0" só aceita PATCH, então o npm não pega sozinho.
  { pacote: "biblioteca-b", atual: "2.3.0", nova: "2.4.0", intervalo: "~2.3.0" },
  // O MAJOR mudou (pode quebrar o seu código): o "^3.1.0" nunca aceita sozinho.
  { pacote: "biblioteca-c", atual: "3.1.0", nova: "4.0.0", intervalo: "^3.1.0" },
  // Armadilha do 0.x: em versões 0.x, até o MINOR é tratado como mudança que pode quebrar.
  { pacote: "biblioteca-d", atual: "0.5.1", nova: "0.6.0", intervalo: "^0.5.1" },
];

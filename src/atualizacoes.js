// ============================================================
// atualizacoes.js - funções que ajudam a decidir sobre atualizar uma dependência
// ============================================================

// Importa a biblioteca "semver": ela sabe ler e comparar números de versão no formato MAJOR.MINOR.PATCH.
// Esta é uma DEPENDÊNCIA do projeto: código escrito por outras pessoas que a gente reutiliza.
const semver = require("semver");

// Importa a biblioteca "lodash": uma caixa de ferramentas com funções prontas (aqui usamos groupBy e countBy).
// Esta é a SEGUNDA dependência do projeto.
const _ = require("lodash");

// Descobre que TIPO de mudança existe entre duas versões: "patch", "minor", "major" ou "nenhuma".
function tipoDeMudanca(atual, nova) {
  // semver.diff compara os dois números e diz qual parte mudou; devolve null se forem iguais.
  const tipo = semver.diff(atual, nova);
  // Troca null por uma palavra legível, para o relatório não mostrar "null".
  return tipo === null ? "nenhuma" : tipo;
}

// Responde: "se eu rodar npm install, o npm instalaria essa versão nova SOZINHO?"
// "intervalo" é o texto que fica no package.json, por exemplo "^1.4.2" ou "~2.3.0".
function npmInstalariaSozinho(intervalo, versaoNova) {
  // semver.satisfies devolve true se a versão cabe dentro do intervalo, e false se não cabe.
  return semver.satisfies(versaoNova, intervalo);
}

// Recebe uma lista de atualizações disponíveis e devolve um resumo agrupado por tipo de mudança.
function resumir(atualizacoes) {
  // Para cada atualização, acrescenta o campo "tipo" (patch, minor, major...).
  const comTipo = atualizacoes.map((u) => ({ ...u, tipo: tipoDeMudanca(u.atual, u.nova) }));
  return {
    // groupBy separa a lista em grupos: { patch: [...], minor: [...], major: [...] }
    porTipo: _.groupBy(comTipo, "tipo"),
    // countBy só conta quantos itens existem em cada grupo: { patch: 1, minor: 2, major: 1 }
    contagem: _.countBy(comTipo, "tipo"),
  };
}

// Deixa as três funções disponíveis para outros arquivos (o cli.js e os testes).
module.exports = { tipoDeMudanca, npmInstalariaSozinho, resumir };

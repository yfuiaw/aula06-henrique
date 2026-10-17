// ============================================================
// cli.js - mostra no terminal o relatório de atualizações (rode com: npm start)
// ============================================================

// Traz as funções que criamos em atualizacoes.js.
const { tipoDeMudanca, npmInstalariaSozinho, resumir } = require("./atualizacoes");
// Traz a lista de exemplo.
const exemplo = require("./exemplo");

console.log("RELATÓRIO DE ATUALIZAÇÕES\n");

// Cabeçalho da tabela; padEnd(n) completa com espaços até a coluna ter n caracteres.
console.log("pacote".padEnd(14) + "atual -> nova".padEnd(16) + "mudança".padEnd(10) + "npm instala sozinho?");

// Uma linha para cada atualização da lista.
for (const u of exemplo) {
  const tipo = tipoDeMudanca(u.atual, u.nova);
  const sozinho = npmInstalariaSozinho(u.intervalo, u.nova) ? "sim" : "não";
  console.log(
    u.pacote.padEnd(14) + `${u.atual} -> ${u.nova}`.padEnd(16) + tipo.padEnd(10) + `${sozinho}  (intervalo ${u.intervalo})`
  );
}

// Mostra o resumo: quantas atualizações de cada tipo.
console.log("\nResumo:", resumir(exemplo).contagem);

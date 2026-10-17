// ============================================================
// atualizacoes.test.js - testes automatizados (rode com: npm test)
// ============================================================

// "node:test" é o executor de testes que já vem dentro do Node.js (não precisa instalar nada).
const { test } = require("node:test");
// "assert" compara o resultado obtido com o resultado esperado; se forem diferentes, o teste FALHA.
const assert = require("node:assert/strict");

// Traz as funções que serão testadas.
const { tipoDeMudanca, npmInstalariaSozinho, resumir } = require("../src/atualizacoes");

test("detecta mudança de PATCH", () => {
  assert.equal(tipoDeMudanca("1.2.3", "1.2.4"), "patch");
});

test("detecta mudança de MINOR", () => {
  assert.equal(tipoDeMudanca("1.2.3", "1.3.0"), "minor");
});

test("detecta mudança de MAJOR", () => {
  assert.equal(tipoDeMudanca("1.2.3", "2.0.0"), "major");
});

test("versões iguais não têm mudança", () => {
  assert.equal(tipoDeMudanca("1.2.3", "1.2.3"), "nenhuma");
});

test("acento circunflexo (^) aceita minor, mas não major", () => {
  assert.equal(npmInstalariaSozinho("^1.2.3", "1.9.0"), true);
  assert.equal(npmInstalariaSozinho("^1.2.3", "2.0.0"), false);
});

test("til (~) aceita só patch", () => {
  assert.equal(npmInstalariaSozinho("~1.2.3", "1.2.9"), true);
  assert.equal(npmInstalariaSozinho("~1.2.3", "1.3.0"), false);
});

test("armadilha do 0.x: o ^ não aceita nem o minor", () => {
  assert.equal(npmInstalariaSozinho("^0.5.1", "0.5.9"), true);
  assert.equal(npmInstalariaSozinho("^0.5.1", "0.6.0"), false);
});

test("resumo conta as atualizações por tipo", () => {
  const lista = [
    { pacote: "a", atual: "1.0.0", nova: "1.0.1" },
    { pacote: "b", atual: "1.0.0", nova: "1.0.2" },
    { pacote: "c", atual: "1.0.0", nova: "2.0.0" },
  ];
  assert.deepEqual(resumir(lista).contagem, { patch: 2, major: 1 });
});

test("versão inválida gera erro (em vez de resposta enganosa)", () => {
  assert.throws(() => tipoDeMudanca("abc", "1.0.0"));
});

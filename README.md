# Aula 06 - Gerenciamento de Componentes e Dependências

Repositório-modelo da prática da Aula 06 de **Integração e Entrega Contínua (ISW032)** - Fatec Zona Leste, curso de DSM.

## O que é este projeto

Um programa pequeno que recebe uma lista de atualizações de bibliotecas e informa:

- que **tipo** de mudança cada uma representa (`patch`, `minor` ou `major`);
- se o `npm install` instalaria essa versão **sozinho**, dado o intervalo escrito no `package.json`.

Ele usa duas bibliotecas de terceiros (as **dependências** do projeto):

| Biblioteca | Para que serve aqui |
|---|---|
| `semver` | Ler e comparar números de versão (MAJOR.MINOR.PATCH) |
| `lodash` | Agrupar e contar as atualizações por tipo |

## Atenção: este projeto começa "doente" de propósito

As versões travadas no `package-lock.json` têm **vulnerabilidades conhecidas**. O pipeline (aba **Actions**) fica **vermelho** no começo. O objetivo da aula é entender por quê, e deixar o pipeline **verde** do jeito certo.

## Estrutura

```
src/atualizacoes.js    -> as funções (usam semver e lodash)
src/exemplo.js         -> lista de atualizações de exemplo
src/cli.js             -> mostra o relatório no terminal
test/                  -> testes automatizados
package.json           -> a LISTA DE COMPRAS (dependências e intervalos de versão)
package-lock.json      -> a NOTA FISCAL (versões exatas de toda a árvore)
.github/workflows/     -> o pipeline (ci.yml)
.github/dependabot.yml -> configuração do robô Dependabot
```

## Comandos úteis

```bash
npm ci               # instala EXATAMENTE o que está no package-lock.json
npm test             # roda os testes automatizados
npm start            # mostra o relatório de atualizações
npm ls               # mostra a árvore de dependências instaladas
npm outdated         # mostra o que tem versão mais nova (atual / permitida / última)
npm audit            # consulta a base de vulnerabilidades conhecidas
```

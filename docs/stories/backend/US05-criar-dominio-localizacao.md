# US05 — Criar domínio Location

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Média

## contexto

A barra de busca da home tem campos "Local de retirada" e "Local de devolução". O usuário seleciona de onde pega e onde devolve o carro. Precisamos de um domínio Location que represente as filiais/pontos de retirada da locadora.

É uma entidade simples por enquanto — lista de locais com nome e endereço. Futuramente pode ter relação com veículos (quais carros estão em qual filial), mas isso fica pra quando precisar.

## queries

- `locations` — retorna todos os locais. Sem paginação (lista curta).

## regras

- Campos do modelo: `id` (cuid), `name` (string), `address` (string), `city` (string), `state` (string, 2 chars), `createdAt`, `updatedAt`.
- A query `locations` retorna ordenado por `name` ASC.
- Seed com pelo menos 3 locais de exemplo (cidades diferentes).
- `name` é unique — não ter dois locais com o mesmo nome.

## restrições

- Não criar CRUD completo. Apenas query de leitura. Locais são gerenciados via seed/admin futuro.
- Não criar relação com Vehicle ainda. YAGNI — quando precisar, faz uma migration.
- Usar `nest generate` pra scaffoldar — não criar arquivos manualmente.

## stack e padrões

- Scaffold: `cd apps/api && npx nest generate module locations && npx nest generate resolver locations`
- Modelo Prisma em `prisma/schema.prisma`
- Model GraphQL em `src/locations/location.model.ts`
- Resolver em `src/locations/locations.resolver.ts`
- Injetar `PrismaService` (mesmo padrão dos outros resolvers)
- Seed idempotente no mesmo `prisma/seed.ts` de US02
- Importar `LocationsModule` no `AppModule`

## critérios de aceite

- query `locations` retorna lista de locais com `id`, `name`, `address`, `city`, `state`
- locais ordenados por nome
- seed cria pelo menos 3 locais em cidades diferentes
- seed roda múltiplas vezes sem duplicatas
- módulo importado e funcionando no `AppModule`

## verificação

- rodar `pnpm --filter @hermex/api test` — todos os testes devem passar
- rodar seed e conferir locais no banco
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que usou `nest generate` e que o seed é idempotente

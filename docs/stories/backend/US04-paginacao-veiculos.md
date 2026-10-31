# US04 — Paginação na listagem de veículos

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Média
**Depende de:** US03

## contexto

O design mostra um grid 3x3 com veículos e indicação de mais itens abaixo. Com o crescimento do catálogo, a query `vehicles` precisa de paginação pra não retornar centenas de registros de uma vez. Paginação offset-based simples é suficiente pro MVP.

## queries

- `vehicles(categoryId: ID, skip: Int, take: Int)` — estende a query existente com paginação
- retorno muda de `[Vehicle!]!` para `VehiclePage` (type novo)

## regras

- `skip`: offset, default `0`.
- `take`: limit, default `9` (compatível com grid 3x3).
- `take` máximo: `27` (3 páginas). Não permitir o client pedir mil registros.
- `totalCount`: total de veículos que atendem o filtro (sem paginação), pra o front calcular páginas.
- A paginação funciona combinada com o filtro `categoryId` e `available: true`.

## restrições

- Não implementar cursor-based pagination. Offset é suficiente pro MVP.
- Não adicionar campo `hasNextPage` ou `pageInfo` — o front calcula com `totalCount`, `skip` e `take`.
- O `VehiclePage` type é simples: `items: [Vehicle!]!` e `totalCount: Int!`. Sem overengineering.
- Se `take` vier acima de 27, clampar pra 27 silenciosamente (não erro).

## stack e padrões

- Criar `VehiclePage` como `@ObjectType()` no mesmo arquivo ou em `vehicle-page.model.ts`
- Usar `PrismaService.vehicle.findMany({ skip, take })` e `PrismaService.vehicle.count()` em paralelo (`Promise.all`)
- Testes: validar defaults, validar clamp, validar combinação com filtro

## critérios de aceite

- `vehicles()` sem args retorna os 9 primeiros veículos e o totalCount
- `vehicles(skip: 9, take: 9)` retorna a segunda "página"
- `vehicles(take: 100)` retorna no máximo 27 itens
- `vehicles(categoryId: "x")` retorna totalCount apenas da categoria "x"
- totalCount reflete o total filtrado, não o total geral do banco

## verificação

- rodar `pnpm --filter @hermex/api test` — todos os testes devem passar
- testar no GraphQL playground com diferentes combinações de skip/take/categoryId
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que `findMany` e `count` rodam em paralelo (não sequencial)

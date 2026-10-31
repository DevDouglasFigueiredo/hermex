# US03 — Filtrar veículos por categoria

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Alta
**Depende de:** US01, US02

## contexto

O dropdown "Selecione a categoria" na home filtra o grid de veículos. O frontend vai enviar o `categoryId` como argumento opcional na query `vehicles`. Quando informado, retorna só veículos daquela categoria. Quando omitido, retorna todos.

Além do filtro, a query deve retornar apenas veículos disponíveis (`available: true`) — a home não mostra carros indisponíveis.

## queries

- `vehicles(categoryId: ID)` — query existente recebe argumento opcional

## regras

- `categoryId` é opcional. Se omitido, retorna todos os veículos disponíveis.
- Sempre filtrar por `available: true` — veículos indisponíveis não aparecem na home.
- Retornar o veículo com a categoria populada (`category { id, name }`).
- Usar `where` condicional do Prisma — não fazer dois métodos separados.

## restrições

- Não criar uma query nova. Estender a query `vehicles` existente com o argumento.
- Não fazer a filtragem em memória (JS). Usar `where` do Prisma direto no banco.
- Não retornar veículos com `available: false` em nenhum cenário desta query.

## stack e padrões

- Argumento GraphQL via decorator `@Args` com `{ nullable: true }`
- `PrismaService.vehicle.findMany({ where: { ... }, include: { category: true } })`
- Testes com mock do PrismaService (mesmo padrão do resolver existente)

## critérios de aceite

- `vehicles()` sem argumentos retorna todos os veículos com `available: true`
- `vehicles(categoryId: "x")` retorna apenas veículos da categoria "x" com `available: true`
- `vehicles(categoryId: "inexistente")` retorna lista vazia (não erro)
- cada veículo retornado inclui `category { id, name }`
- veículos com `available: false` nunca aparecem no resultado

## verificação

- rodar `pnpm --filter @hermex/api test` — todos os testes devem passar
- testar no GraphQL playground (`localhost:3001/graphql`) com e sem categoryId
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

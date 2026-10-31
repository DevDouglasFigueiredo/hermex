# US01 — Adicionar campos `category` e `imageUrl` ao Vehicle

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Alta

## contexto

O modelo Vehicle atual tem: brand, model, year, licensePlate, dailyRate, available. O design da home mostra cards com imagem e categoria (ex: "Hatch Manual", "SUV Automático"). Precisamos desses campos no backend antes de qualquer trabalho no frontend.

A relação com Category é 1:N — uma categoria tem muitos veículos, um veículo pertence a uma categoria. Depende de US02 existir primeiro (ou ser feita junto na mesma migration).

## queries afetadas

- `vehicles` — já existe, precisa retornar os novos campos `imageUrl` e `category { id, name }`

## regras

- `imageUrl`: String opcional. URL da imagem do veículo. Pode ser null pra veículos já existentes.
- `categoryId`: relação obrigatória com o modelo Category (FK). Veículos existentes sem categoria precisam ser tratados na migration (default ou nullable temporariamente).
- `transmission`: enum `MANUAL` | `AUTOMATIC`. O design mostra "Hatch Manual", "Hatch Automático" — a transmissão é do veículo, não da categoria.
- A query `vehicles` deve incluir a categoria no retorno via relation do Prisma (não fazer N+1).

## restrições

- Não quebrar a query `vehicles` existente — os campos novos devem ser adicionados sem remover os anteriores.
- Não criar resolver separado pra buscar categoria do veículo. Usar `include` ou `relation` do Prisma.
- Não usar enum do Prisma pra transmission se o projeto ainda não usa enums — usar `registerEnumType` do NestJS/GraphQL e string no banco.

## stack e padrões

- Prisma schema em `apps/api/prisma/schema.prisma`
- Model GraphQL em `apps/api/src/vehicles/vehicle.model.ts` usando decorators `@Field`, `@ObjectType`
- Enum GraphQL via `registerEnumType` do `@nestjs/graphql`
- Prisma Client gerado em `apps/api/src/generated/prisma/`
- Rodar `pnpm db:migrate` e `pnpm db:generate` após alterar o schema
- Testes com Jest: `pnpm --filter @hermex/api test`

## critérios de aceite

- query `vehicles` retorna `imageUrl` (string ou null) em cada veículo
- query `vehicles` retorna `category { id, name }` em cada veículo
- query `vehicles` retorna `transmission` (MANUAL ou AUTOMATIC) em cada veículo
- migration roda sem erros no banco existente
- testes do resolver `vehicles` passam com os novos campos

## verificação

- rodar `pnpm --filter @hermex/api test` — todos os testes devem passar
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que a migration é segura pra dados existentes (não dropar coluna, não NOT NULL sem default)

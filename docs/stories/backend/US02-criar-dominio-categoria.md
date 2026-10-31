# US02 — Criar domínio Category

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Alta

## contexto

O design da home tem um dropdown "Selecione a categoria" que filtra os veículos. As categorias visíveis são: Hatch, Sedan, SUV, Minivan, Picape. Precisamos de um domínio Category no backend com modelo, módulo NestJS e query GraphQL.

Esse domínio é consumido por US01 (relação Vehicle → Category) e US03 (filtro por categoria).

## queries

- `categories` — retorna todas as categorias cadastradas. Sem paginação (lista curta e fixa).

## regras

- Campos do modelo: `id` (cuid), `name` (string, unique), `createdAt`, `updatedAt`.
- A query `categories` retorna ordenado por `name` ASC.
- Seed obrigatório com as categorias: Hatch, Sedan, SUV, Minivan, Picape.
- O seed deve ser idempotente (rodar múltiplas vezes sem duplicar).

## restrições

- Não criar CRUD completo (create, update, delete). Apenas a query de leitura. Categorias são gerenciadas via seed/migration por enquanto.
- Não adicionar campos extras "por precaução" (description, icon, etc). YAGNI.
- Usar `nest generate` pra scaffoldar o módulo — não criar arquivos manualmente.

## stack e padrões

- Scaffold: `cd apps/api && npx nest generate module categories && npx nest generate resolver categories`
- Modelo Prisma em `prisma/schema.prisma`
- Model GraphQL em `src/categories/category.model.ts`
- Resolver em `src/categories/categories.resolver.ts`
- Injetar `PrismaService` no resolver (mesmo padrão de `VehiclesResolver`)
- Seed em `prisma/seed.ts` (criar se não existir)
- Importar `CategoriesModule` no `AppModule`

## critérios de aceite

- query `categories` retorna lista de categorias com `id` e `name`
- categorias estão ordenadas por nome
- seed cria as 5 categorias (Hatch, Sedan, SUV, Minivan, Picape)
- seed roda múltiplas vezes sem erro ou duplicata
- módulo importado e funcionando no `AppModule`

## verificação

- rodar `pnpm --filter @hermex/api test` — todos os testes devem passar
- rodar seed e confirmar categorias no banco (`pnpm db:studio`)
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que usou `nest generate` e não criou arquivos manualmente

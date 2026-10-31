# US13 — Integrar listagem de veículos via GraphQL

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Depende de:** US04 (backend), US12 (frontend)

## contexto

A home precisa exibir veículos reais vindos da API GraphQL. Até agora os organismos são presentacionais — esta story conecta com dados reais. A API está em `http://localhost:3001/graphql` e já tem a query `vehicles` com paginação (US04).

Importante: o Next.js 16 tem mudanças no data fetching. Consultar `node_modules/next/dist/docs/` antes de implementar.

## componentes afetados

- `app/page.tsx` — faz o fetch e passa dados pro template

## regras

- Usar fetch nativo do Next.js em Server Component pra SSR. Não adicionar lib de GraphQL (Apollo, urql) a menos que seja realmente necessário.
- Query GraphQL: `vehicles(take: 9)` com campos: `items { id, brand, model, imageUrl, dailyRate, transmission, category { id, name } }`, `totalCount`.
- Mapear os dados da API pros props do `HomeTemplate` / `VehicleGrid`.
- O `name` do VehicleCard deve ser composto: `"${brand} ${model}"` (ex: "Hyundai HB20 1.0").
- O `category` do VehicleCard deve ser composto: `"${category.name} ${transmission}"` (ex: "Hatch Manual").
- Loading state: mostrar skeleton ou mensagem enquanto carrega.
- Error state: se a API falhar, mostrar mensagem amigável — não quebrar a página.

## restrições

- Não adicionar Apollo Client ou urql pro MVP. Fetch nativo é suficiente pra SSR.
- Não criar um `/lib/graphql-client.ts` elaborado. Um helper simples com `fetch` é suficiente.
- Não fazer cache infinito. Usar revalidação do Next.js (ex: `revalidate: 60`).
- Não duplicar tipos — criar types compartilhados que mapeiam a response GraphQL.

## stack e padrões

- Fetch em Server Component (`app/page.tsx`)
- URL da API: `process.env.API_URL` ou fallback `http://localhost:3001/graphql`
- Types em `src/types/` ou inline no page
- Consultar docs do Next.js 16 em `node_modules/next/dist/docs/` pra data fetching

## critérios de aceite

- home exibe veículos reais da API (não mock)
- cards mostram imagem, nome composto, categoria composta, preço
- SSR funciona (dados visíveis no HTML inicial)
- erro na API não quebra a página (fallback amigável)
- query busca apenas 9 veículos por padrão

## verificação

- rodar `pnpm api:dev` e `pnpm web:dev` simultaneamente
- abrir `localhost:3000` e confirmar que veículos aparecem
- desligar a API e confirmar que a home não quebra
- view source do HTML pra confirmar SSR
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

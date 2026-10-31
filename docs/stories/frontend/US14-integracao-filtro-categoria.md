# US14 — Integrar filtro por categoria

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Média
**Depende de:** US03 (backend), US13 (frontend)

## contexto

O dropdown "Selecione a categoria" já existe visualmente (US10). Esta story conecta ele com a API — carrega categorias reais e filtra veículos ao selecionar.

## componentes afetados

- `app/page.tsx` ou um Client Component wrapper que gerencia o estado do filtro

## regras

- Carregar categorias via query `categories` na montagem da página.
- Ao selecionar categoria, re-executar query `vehicles(categoryId: "x")`.
- Opção "Todas as categorias" (ou equivalente) limpa o filtro e busca sem categoryId.
- Sincronizar filtro com URL via query param: `?categoria=<id>`. Isso permite compartilhar link filtrado.
- Transição: mostrar loading discreto (opacity ou spinner) enquanto filtra. Não trocar toda a página.

## restrições

- O filtro é interação do usuário → precisa de Client Component. Não tentar fazer tudo em Server Component.
- Não usar `router.push` pra cada mudança de filtro. Usar `useSearchParams` + `useRouter` com `replace`.
- Não fazer debounce no dropdown (é seleção discreta, não input de texto).
- Não buscar veículos e categorias em chamadas separadas se puder otimizar (mas não overcomplicar).

## stack e padrões

- Client Component pra gerenciar estado do filtro
- `useSearchParams` do Next.js pra sync com URL
- Fetch GraphQL pro client (pode ser um helper reutilizável do US13)
- Consultar docs do Next.js 16 em `node_modules/next/dist/docs/` pra client-side data fetching

## critérios de aceite

- dropdown carrega categorias reais da API
- selecionar categoria filtra o grid (mostra só veículos da categoria)
- "Todas as categorias" mostra todos os veículos
- URL atualiza com `?categoria=<id>` ao filtrar
- acessar URL com `?categoria=<id>` direto já mostra filtrado
- loading state discreto durante transição

## verificação

- rodar `pnpm api:dev` e `pnpm web:dev`
- testar filtro por cada categoria
- copiar URL com filtro, abrir em nova aba, confirmar que abre filtrado
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

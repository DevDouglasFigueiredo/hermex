# US15 — Integrar busca de veículos disponíveis

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Média
**Depende de:** US06 (backend), US13 (frontend)

## contexto

A SearchBar (US09) já renderiza os campos de busca. Esta story conecta com a API — ao clicar "Buscar", executa a query `searchVehicles` e atualiza o grid com os resultados.

## componentes afetados

- `app/page.tsx` ou Client Component wrapper
- `SearchBar` recebe callback `onSearch`
- `VehicleGrid` atualiza com resultados da busca

## regras

- Ao clicar "Buscar", executar query `searchVehicles(input: { ... })` com os dados da SearchBar.
- O resultado substitui a listagem padrão no grid.
- Campos de local: no MVP, usar texto livre. Quando a query `locations` estiver integrada, trocar por autocomplete.
- Validação no client: `returnDate` deve ser posterior a `pickupDate`. Mostrar mensagem de erro inline se não for.
- Botão "Limpar busca" (ou equivalente) volta pra listagem padrão (query `vehicles` sem filtro de busca).
- Combinável com filtro de categoria: se o usuário buscou e depois filtra por categoria, aplicar ambos.

## restrições

- Não redirecionar pra outra página. A busca filtra in-place no grid da home.
- Não adicionar lib de form (react-hook-form, formik). Estado local com `useState` é suficiente pros 6 campos.
- Não bloquear a UI durante a busca. Mostrar loading no grid, manter SearchBar interagível.

## stack e padrões

- Client Component pra gerenciar estado da busca
- Fetch GraphQL pro client (helper reutilizável)
- Validação simples com comparação de datas (Date nativo)

## critérios de aceite

- clicar "Buscar" executa a query e atualiza o grid
- data de devolução antes da retirada mostra erro no client
- resultados da busca aparecem no grid (substituem listagem padrão)
- "Limpar busca" volta pra listagem padrão
- loading state no grid durante a busca
- filtro de categoria funciona combinado com busca

## verificação

- rodar `pnpm api:dev` e `pnpm web:dev`
- testar busca com datas válidas
- testar busca com data inválida (devolução antes de retirada)
- testar combinação busca + filtro de categoria
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

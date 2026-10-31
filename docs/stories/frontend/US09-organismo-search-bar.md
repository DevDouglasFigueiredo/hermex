# US09 — Criar organismo SearchBar

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta

## contexto

A barra de busca fica sobreposta ao hero banner e permite o usuário buscar veículos por local, data e hora de retirada/devolução. É o componente mais complexo da home — dois blocos de campos + botão "Buscar".

No design: fundo `brand-secondary-pure`, campos com estilo outlined (borda branca), botão laranja "Buscar".

## componentes

- `SearchBar` em `src/components/organisms/SearchBar.tsx`

## regras

- **Linha 1 (Retirada):** campo "Local de retirada" (TextField, ícone `location_on`) + campo Data (ícone `calendar_today`) + campo Hora (ícone `schedule`)
- **Linha 2 (Devolução):** campo "Local de devolução" (TextField, ícone `location_on`) + campo Data (ícone `calendar_today`) + campo Hora (ícone `schedule`) + Botão "Buscar"
- Todos os campos usam `TextField` com `variant="outlined"`.
- Botão usa `Button` com `variant="primary"`.
- Fundo `brand-secondary-pure` com padding.
- Callback `onSearch` recebe objeto tipado: `{ pickupLocation, returnLocation, pickupDate, pickupTime, returnDate, returnTime }`.
- Campos de data e hora: usar `input type="date"` e `input type="time"` nativos (estilizados via TextField). Não adicionar lib de datepicker.

## restrições

- Não fazer fetch de dados (locations, etc). A SearchBar é presentacional — recebe callbacks via props.
- Não validar datas aqui. A validação é responsabilidade de quem chama `onSearch` (ou do backend).
- Não adicionar lib de date picker (react-datepicker, etc). Inputs nativos por enquanto.
- Não criar átomos novos `DateField` ou `TimeField`. Usar `TextField` com `type="date"` e `type="time"`.

## stack e padrões

- Componente em `src/components/organisms/SearchBar.tsx`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/SearchBar.stories.tsx`
- Reutilizar `TextField` (molecules) e `Button` (atoms)
- Tailwind CSS pra layout (grid ou flexbox)
- Client Component (`"use client"`) por causa do estado dos inputs e callback

## critérios de aceite

- dois blocos de campos renderizam (retirada e devolução)
- cada bloco tem: local, data, hora
- botão "Buscar" na segunda linha à direita
- fundo `brand-secondary-pure`
- campos com estilo outlined (borda branca, texto branco)
- `onSearch` é chamado com dados estruturados ao clicar "Buscar"
- responsivo: empilha campos em mobile
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm web:dev` e conferir visualmente no browser
- comparar com o design do Figma
- testar que `onSearch` é chamado corretamente via story com action
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

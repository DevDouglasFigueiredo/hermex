# US10 — Criar organismo VehicleGrid

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta

## contexto

A seção principal da home é o grid de veículos — cards organizados em 3 colunas com um dropdown de filtro por categoria no topo. O componente `VehicleCard` já existe e deve ser reutilizado.

## componentes

- `VehicleGrid` em `src/components/organisms/VehicleGrid.tsx`

## regras

- Dropdown "Selecione a categoria" no topo, usando componente `Dropdown` existente.
- Grid de cards: 3 colunas no desktop, 2 no tablet, 1 no mobile.
- Cada card usa `VehicleCard` existente (imageSrc, name, category, pricePerDay, onDetailsClick).
- Props do VehicleGrid:
  - `vehicles`: array de veículos a exibir
  - `categories`: array de categorias pro dropdown
  - `selectedCategoryId`: categoria selecionada (ou null)
  - `onCategoryChange(categoryId: string | null)`: callback do dropdown
  - `onDetailsClick(vehicleId: string)`: callback do botão "Ver detalhes"
- Estado vazio: mensagem "Nenhum veículo encontrado" quando a lista é vazia.
- Fundo: `neutral-white` ou cinza claro (conforme design).

## restrições

- Não fazer fetch de dados. Recebe tudo via props.
- Não implementar paginação visual nesta story. Isso pode ser uma story separada.
- Não modificar o `VehicleCard` existente. Se precisar de ajustes, abrir outra story.
- Não adicionar loading skeleton aqui. Loading é responsabilidade da integração (US13).

## stack e padrões

- Componente em `src/components/organisms/VehicleGrid.tsx`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/VehicleGrid.stories.tsx`
- Reutilizar `VehicleCard` (molecules) e `Dropdown` (molecules)
- Tailwind CSS grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`)

## critérios de aceite

- dropdown de categoria renderiza no topo com as categorias passadas via props
- grid mostra cards de veículos em 3 colunas (desktop)
- grid adapta pra 2 colunas (tablet) e 1 coluna (mobile)
- `onCategoryChange` é chamado ao selecionar categoria
- `onDetailsClick` é chamado ao clicar "Ver detalhes" em um card
- lista vazia mostra mensagem "Nenhum veículo encontrado"
- story no Storybook renderiza com dados mock

## verificação

- rodar `pnpm web:dev` e conferir visualmente no browser
- testar responsividade em diferentes larguras
- comparar com o design do Figma
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

# US12 — Criar template HomePage

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta
**Depende de:** US07, US08, US09, US10, US11

## contexto

O template compõe todos os organismos da home na ordem e layout correto. É a cola entre os organismos e a página (`page.tsx`). Seguindo Atomic Design, o template define a estrutura/layout e recebe dados via props — não faz fetch.

## componentes

- `HomeTemplate` em `src/components/templates/HomeTemplate.tsx`

## regras

- Ordem dos organismos: Header → HeroBanner (com SearchBar sobreposto) → VehicleGrid → Footer.
- A SearchBar deve ficar visualmente sobre o HeroBanner (overlap). Usar margin negativo ou posicionamento relativo no template — não nos organismos individuais.
- Props tipadas: o template recebe os dados necessários pra todos os organismos (vehicles, categories, callbacks).
- O `page.tsx` da home usa este template e passa os dados (via Server Component fetch ou hook).

## restrições

- Não fazer fetch de dados no template. O template é presentacional.
- Não adicionar estado no template. Estado fica no `page.tsx` ou em Client Components que wrappam o template.
- Não colocar lógica de negócio. Apenas composição visual.
- O overlap da SearchBar sobre o HeroBanner é responsabilidade deste template, não dos organismos.

## stack e padrões

- Componente em `src/components/templates/HomeTemplate.tsx`
- Exportar via barrel em `src/components/templates/index.ts`
- Story em `src/components/templates/HomeTemplate.stories.tsx`
- Atualizar `app/page.tsx` pra usar `HomeTemplate`

## critérios de aceite

- todos os organismos renderizam na ordem correta
- SearchBar visualmente sobreposta ao HeroBanner
- page.tsx usa o HomeTemplate
- layout geral confere com o design do Figma
- responsivo: funciona em desktop, tablet e mobile
- story no Storybook renderiza com dados mock

## verificação

- rodar `pnpm web:dev` e conferir a home completa no browser
- comparar a composição geral com o design do Figma
- testar em diferentes resoluções
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que o overlap SearchBar/HeroBanner está no template e não nos organismos

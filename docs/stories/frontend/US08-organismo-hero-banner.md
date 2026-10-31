# US08 — Criar organismo HeroBanner

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta

## contexto

O hero banner é a seção de destaque da home, logo abaixo do header. Ocupa a largura toda com uma chamada de ação e uma imagem grande de uma pessoa sorrindo dentro de um carro. É a primeira impressão visual do site.

## componentes

- `HeroBanner` em `src/components/organisms/HeroBanner.tsx`

## regras

- Título: "Encontre o carro **ideal** para todas as ocasiões". A palavra "ideal" deve ser estilizada diferente (itálico, conforme design).
- Tipografia do título: `font-heading` (Exo2), tamanho grande, cor branca.
- Imagem: mulher sorrindo dentro de um carro, posicionada à direita. Usar `next/image` com `priority`.
- Setas decorativas: chevrons laranja (>>) à direita da imagem. SVG ou CSS.
- Fundo: gradiente ou cor sólida que contrasta com o texto branco. O design sugere um tom de laranja/imagem de fundo.
- Largura: 100% da viewport.
- A SearchBar (US09) vai ser posicionada sobre o banner — prever espaço/overlap no padding inferior.

## restrições

- Não fazer fetch de dados. Conteúdo é estático.
- Não hardcodar a imagem inline em base64. Usar arquivo em `public/` com `next/image`.
- Não usar `position: absolute` no banner inteiro. O overlap com a SearchBar é responsabilidade do template (US12).
- Assets (imagem hero, setas SVG) precisam ser exportados do Figma ou criados. Se não estiverem disponíveis, usar placeholder com dimensões corretas e `TODO` no código.

## stack e padrões

- Componente em `src/components/organisms/HeroBanner.tsx`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/HeroBanner.stories.tsx`
- `next/image` pra imagem hero
- Tailwind CSS pra layout e tipografia

## critérios de aceite

- título renderiza com "ideal" em itálico e fonte heading
- imagem de destaque posicionada à direita
- setas decorativas laranja visíveis
- fundo contrasta com texto branco
- responsivo: em mobile, imagem pode ficar abaixo do texto
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm web:dev` e conferir visualmente no browser
- comparar lado a lado com o design do Figma
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: conferir que a imagem usa `next/image` com `priority` e não base64

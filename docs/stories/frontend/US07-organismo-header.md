# US07 — Criar organismo Header

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta

## contexto

O header é o topo de todas as páginas. No design da home ele aparece com fundo escuro (`brand-secondary-pure`), logo invertido, campo de busca textual e links de navegação.

Já existem componentes prontos que devem ser reutilizados: `Logo` (variant inverted), `TextField` (variant outlined), `NavLink`. O header é um organismo — composição de moléculas e átomos.

## componentes

- `Header` em `src/components/organisms/Header.tsx`

## regras

- Layout: logo à esquerda, campo de busca ao centro, links à direita.
- Fundo: `brand-secondary-pure` (#1D2F40), largura 100%.
- Logo: usar `Logo` com `variant="inverted"`.
- Busca: usar `TextField` com `variant="outlined"`, ícone `search`, placeholder "O que você procura?".
- Links: usar `NavLink` para "Cadastro" (ícone `person_add`, href `/cadastro`) e "Login" (ícone `login`, href `/login`).
- Responsivo: em mobile, o campo de busca pode ser omitido ou virar ícone. Links mantidos.
- O header não faz fetch de dados. É puro presentacional.

## restrições

- Não criar componentes novos. Usar os átomos e moléculas que já existem.
- Não adicionar lógica de autenticação (mostrar/esconder login). Isso é outra story.
- Não adicionar lógica de busca (onSubmit, redirect). O campo é visual por enquanto.
- Não usar `position: fixed` ou `sticky` a menos que o design exija explicitamente.

## stack e padrões

- Componente em `src/components/organisms/Header.tsx`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/Header.stories.tsx`
- Atomic Design: organismo compõe moléculas (`TextField`, `NavLink`) e átomos (`Logo`)
- Tailwind CSS com os tokens do projeto (cores, fontes definidas em `globals.css`)

## critérios de aceite

- header renderiza com fundo `brand-secondary-pure`
- logo Hermex invertido visível à esquerda
- campo de busca com placeholder "O que você procura?" ao centro
- links Cadastro e Login com ícones corretos à direita
- responsivo: não quebra em telas pequenas
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm web:dev` e conferir visualmente no browser
- abrir Storybook e validar o componente isolado
- comparar lado a lado com o design do Figma
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

# US11 — Criar organismo Footer

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Frontend
**Prioridade:** Alta

## contexto

O footer aparece no fundo de todas as páginas. Fundo escuro com logo invertido, créditos e links pra redes sociais. Componentes `Logo` e `SocialIcon` já existem.

## componentes

- `Footer` em `src/components/organisms/Footer.tsx`

## regras

- **Esquerda:** Logo Hermex invertido + texto "Desenvolvido por Alura. Projeto fictício sem fins comerciais." + subtexto "O carro ideal para sua viagem."
- **Direita:** texto "Siga nossas redes:" + ícones WhatsApp, Instagram, TikTok.
- Fundo: `brand-secondary-pure` (#1D2F40).
- Textos: cor branca.
- Logo: usar `Logo` com `variant="inverted"`.
- Ícones sociais: usar `SocialIcon` com `platform` e `href`.
- Os hrefs das redes sociais são props do Footer (não hardcodar URLs).
- Largura: 100%.

## restrições

- Não criar componentes novos. Reutilizar `Logo` e `SocialIcon`.
- Não fazer fetch de dados. Conteúdo estático, links via props.
- Textos de créditos são fixos — não precisam ser props.

## stack e padrões

- Componente em `src/components/organisms/Footer.tsx`
- Exportar via barrel em `src/components/organisms/index.ts`
- Story em `src/components/organisms/Footer.stories.tsx`
- Tailwind CSS pra layout (flex, justify-between)

## critérios de aceite

- footer renderiza com fundo `brand-secondary-pure`
- logo invertido visível à esquerda
- textos de créditos em branco
- ícones de redes sociais à direita com links funcionais
- responsivo: empilha em mobile
- story no Storybook renderiza corretamente

## verificação

- rodar `pnpm web:dev` e conferir visualmente
- comparar com o design do Figma
- clicar nos ícones sociais e confirmar que abrem em nova aba
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido

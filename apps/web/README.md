# @hermex/web

Next.js com App Router, TypeScript e Tailwind CSS via PostCSS.
Componentes organizados por Atomic Design em `src/components`.

Execute na raiz: `pnpm dev:web`.
Compilação de produção com Webpack para compatibilidade com este ambiente.
Autenticação Auth.js está planejada; veja `src/lib/auth/README.md`.

Configuração e comandos completos: [README do projeto](../../README.md).

## Biblioteca de componentes e Storybook

Os átomos, moléculas e organismos VehicleGrid e Footer da página inicial
do Figma estão implementados isoladamente.
Consulte o [inventário e os contratos](src/components/README.md).

Na raiz do monorepo:

```bash
pnpm --filter @hermex/web storybook
pnpm --filter @hermex/web build-storybook
```

Storybook: http://localhost:6006. O build estático vai para
`apps/web/storybook-static` (ignorado pelo Git). Não exige API nem PostgreSQL.
Cada um dos 22 componentes tem documentação automática, controls e histórias
colocadas ao lado do código, totalizando 60 exemplos. Oito histórias `play`
verificam cliques, digitação e seleção com `storybook/test` no navegador.
O Storybook usa Vite e o mesmo PostCSS/Tailwind do aplicativo; o build Next.js
continua usando Webpack.

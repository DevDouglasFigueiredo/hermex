# Hermex

Monorepo PNPM de uma locadora de veículos, desenvolvido por etapas.

## Requisitos

- Node.js 24 (ver `.nvmrc`)
- PNPM 12.14.0
- Docker com Compose

## Executar localmente

Na raiz do projeto:

```bash
pnpm install
cp .env.example .env
pnpm db:up
pnpm db:generate
pnpm --filter @hermex/api exec prisma migrate deploy
pnpm dev
```

O `.env` local já foi criado na montagem inicial. Não sobrescreva configurações
existentes. Se alterar banco, usuário, senha ou porta, ajuste também `DATABASE_URL`.
As credenciais do exemplo são exclusivas de desenvolvimento.

- Web: http://localhost:3000
- API GraphQL: http://localhost:3001/graphql

Verificação real do banco:

```bash
curl http://localhost:3001/graphql -H 'Content-Type: application/json' --data '{"query":"{ health }"}'
```

Resposta esperada: `{"data":{"health":"ok"}}`.
A API exige PostgreSQL disponível para iniciar.

## Organização

```text
apps/web/src/app/           Rotas Next.js (App Router)
apps/web/src/components/   atoms, molecules, organisms e templates
apps/web/src/lib/auth/     Decisões para a próxima etapa de autenticação
apps/api/src/              Módulos NestJS e GraphQL code-first
apps/api/src/prisma/       Serviço de acesso ao banco
apps/api/prisma/           Schema e futuras migrations
```

Atomic Design: atoms são elementos básicos; molecules combinam atoms;
organisms compõem seções; templates definem a estrutura das páginas.
As páginas ficam em `src/app`. Os átomos e moléculas da página inicial estão
disponíveis isoladamente; veja o [inventário](apps/web/src/components/README.md).
A montagem da página ainda não foi implementada.

## Comandos na raiz

| Comando | Função |
| --- | --- |
| `pnpm dev` | Inicia web e API |
| `pnpm dev:web` / `pnpm dev:api` | Inicia uma aplicação |
| `pnpm build` | Gera Prisma Client e compila as aplicações |
| `pnpm typecheck` | Verifica tipos das aplicações |
| `pnpm test` / `pnpm test:e2e` | Executa testes da API |
| `pnpm db:up` | Inicia PostgreSQL e aguarda healthcheck |
| `pnpm db:down` | Para os contêineres, preservando o volume |
| `pnpm db:logs` | Acompanha os logs do banco |
| `pnpm db:validate` | Valida o schema Prisma |
| `pnpm db:generate` | Gera Prisma Client |
| `pnpm db:migrate --name nome` | Cria/aplica migrations após definir modelos |
| `pnpm db:studio` | Abre Prisma Studio |

O PostgreSQL 18 persiste dados no volume nomeado `postgres_data`, montado em
`/var/lib/postgresql`. O banco é exposto somente em localhost. Não existem
outros modelos de negócio além de `Vehicle`. A migration inicial de Vehicle deve
ser aplicada antes de consultar a listagem.

## Autenticação e próximas etapas

Decidido: Auth.js, e-mail/senha, Google e cadastro público. Login, cadastro,
persistência de usuários e proteção da API ainda não estão implementados.
O provedor Credentials exige estratégia JWT. Os perfis de acesso permanecem
pendentes e não foram atribuídos automaticamente a novos usuários.
Consulte `PRD.md` para decisões e pendências.

O build do front-end usa Webpack com Tailwind/PostCSS porque o Turbopack
encontrou um bloqueio de portas neste ambiente.

## Validação

```bash
pnpm db:validate
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Os testes e2e substituem o serviço Prisma; verificam a integração HTTP/GraphQL,
sem exigir banco. A query `health` com API em execução valida a conexão real.

## Storybook

```bash
pnpm --filter @hermex/web storybook
pnpm --filter @hermex/web build-storybook
```

Acesse http://localhost:6006 para explorar os 20 componentes da página inicial
em 54 histórias, organizadas em Átomos e Moléculas. Não requer API nem banco.
A configuração fica em `apps/web/.storybook`; os estilos usam Tailwind e os
assets/fontes do design são locais. Detalhes no [README do front-end](apps/web/README.md).

## Consulta inicial de veículos

Com banco e API em execução, abra http://localhost:3001/graphql no navegador
(GraphiQL em desenvolvimento) e execute:

```graphql
query {
  vehicles {
    model
  }
}
```

A query lê os veículos persistidos no PostgreSQL; sem registros, retorna
`{"data":{"vehicles":[]}}`. Também expõe `id`, `brand`, `year`, `licensePlate`,
`dailyRate` e `available`. Cadastro ainda não foi implementado.

Teste adicional com banco real e rollback das fixtures:

```bash
pnpm --filter @hermex/api test:integration
```

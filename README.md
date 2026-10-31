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
`/var/lib/postgresql`. O banco é exposto somente em localhost. Existem
`Vehicle`, `Category` e `Location` como modelos de negócio. Aplique as migrations
versionadas antes de consultar as listagens.

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

Acesse http://localhost:6006 para explorar os 22 componentes da página inicial
em 60 histórias, organizadas em Átomos, Moléculas e Organismos. Não requer API nem banco.
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

## Categorias — HER-6

Após aplicar as migrations e gerar o client, execute na raiz:

```bash
pnpm --filter @hermex/api exec prisma db seed
```

O seed cria Hatch, Sedan, SUV, Minivan e Picape. Pode ser repetido sem duplicar
registros ou substituir categorias existentes. No Prisma 7, o seed é explícito;
execute-o também em novos ambientes. O runner TypeScript `tsx` é dependência de
desenvolvimento da API.

```graphql
query {
  categories {
    id
    name
  }
}
```

A consulta retorna todas as categorias em ordem crescente por nome, sem paginação.
Não há mutations de categoria. A relação com veículos está em HER-5; o filtro
está implementado em HER-7. O teste de integração de categorias exige migration e seed
aplicados; verifica os registros reais sem removê-los.

## Locais — HER-9

Aplique as migrations e execute o seed compartilhado, na raiz:

```bash
pnpm --filter @hermex/api exec prisma migrate deploy
pnpm db:generate
pnpm --filter @hermex/api exec prisma db seed
```

O seed mantém as categorias e adiciona três locais fictícios em Belo Horizonte/MG,
Rio de Janeiro/RJ e São Paulo/SP. Endereços são de demonstração. Repetir o comando
preserva IDs e dados já existentes, sem duplicar registros por nome.

```graphql
query {
  locations {
    id
    name
    address
    city
    state
  }
}
```

Retorna todos os locais ordenados por nome ASC; banco vazio retorna `[]`.
Nome é único e `state` exige exatamente dois caracteres, sem validar catálogo de
UFs ou normalizar valores. Não há CRUD nem relação com veículos nesta etapa.
O frontend poderá consumir esta consulta nos seletores de retirada e devolução;
a busca por data/local pertence à HER-10.

`pnpm --filter @hermex/api test:integration` também verifica restrições de Location
com rollback de fixtures e executa o seed compartilhado duas vezes, conferindo
idempotência e preservação dos registros existentes. Os exemplos do seed ficam
persistidos; execute essa suíte no PostgreSQL de desenvolvimento.

## Categoria, imagem e transmissão — HER-5

Após aplicar as migrations e gerar o client, a consulta aceita:

```graphql
query {
  vehicles {
    id
    model
    imageUrl
    category { id name }
    transmission
  }
}
```

`imageUrl` pode ser null. Categoria e transmissão são obrigatórias; transmissão
aceita `MANUAL` ou `AUTOMATIC`. A consulta antiga `vehicles { model }` continua
válida. A HER-5 não adicionou filtro ou mutation; o filtro está descrito na HER-7.

A migration `20261031202117_add_vehicle_category_image_transmission` adiciona
campos sem defaults de negócio e preserva as restrições de placa e diária.
Foi aplicada no PostgreSQL local sem veículos. Se outro ambiente tiver veículos,
a migration aborta antes das alterações: é necessário definir o mapeamento
explícito de categoria e transmissão e preparar o backfill antes de aplicá-la.
Não apague registros nem resete o banco para contornar essa proteção.

Os testes unitários e e2e cobrem o contrato; `test:integration` verifica FK,
transmissões, obrigatoriedade e restrições anteriores no PostgreSQL real com
rollback das fixtures. Worktrees isolam código e dependências, mas este ambiente
utiliza o mesmo banco local: esta migration também altera o schema visto pelas
outras worktrees.

## Filtro de veículos — HER-7

A consulta existente agora retorna somente veículos disponíveis. Para filtrar
por categoria, envie o ID obtido em `categories`:

```graphql
query Vehicles($categoryId: ID) {
  vehicles(categoryId: $categoryId) {
    id
    model
    available
    category { id name }
    imageUrl
    transmission
  }
}
```

Sem `categoryId`, ou com null, retorna disponíveis de todas as categorias.
Categoria inexistente ou string vazia retorna `[]`, sem erro. Veículos com
`available: false` não aparecem em nenhum caso. A filtragem acontece no PostgreSQL
via Prisma, incluindo a categoria sem consultas por veículo. A query antiga
`vehicles { model }` continua válida, com a nova regra de disponibilidade.

Não há migration nova, paginação ou alteração de frontend. A implementação da
HER-7 foi baseada no commit `b421fd5` da HER-5; essa dependência precisa estar
integrada antes do merge desta entrega. Verifique com testes unitários, e2e
(Prisma substituído) e `pnpm --filter @hermex/api test:integration` (PostgreSQL
real, duas categorias e disponíveis/indisponíveis com rollback de fixtures).

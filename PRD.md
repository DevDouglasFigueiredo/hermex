# Hermex

Uma locadora de veículos que utiliza o conceito de monorepo para organizar o front-end e back-end em um único repositório.

## monorepo

PNPM workspace
Com atalhos  no package.json o --filter para evitar navegar entre pastas antes de executar os scripts

## Front-end

App Next.js (criado via NPX)
Estilos com tailwindCSS
Organização de componoentes com atomic design
Preparado para autenticação

## Back-end

Nest.js (criado usando cli do projeto nest)
Com graphql
ORM: prisma
Banco de dados: PostgreSQL (docker-compose.yaml para rodar localmente com volumes montado)

## Decisões confirmadas

- Front-end em `apps/web`; back-end em `apps/api`.
- TypeScript e GraphQL code-first no NestJS.
- PostgreSQL local com volume Docker nomeado e configuração em `.env.example`.
- Auth.js para login por e-mail/senha e Google.
- Cadastro público.
- Perfis de acesso (funcionários/clientes) e permissões: **pendentes**.
- Desenvolvimento por etapas; requisitos de negócio serão fornecidos ao longo do projeto.

## Etapa inicial

Estrutura do workspace PNPM, aplicações geradas pelas CLIs oficiais, Tailwind,
Atomic Design, GraphQL e integração Prisma/PostgreSQL. Autenticação é a próxima
etapa: ainda não implementada. Credentials no Auth.js exige sessões JWT;
a sugestão inicial de sessões no banco foi substituída por essa restrição.

## Pendências

- Definir perfis e permissões.
- Implementar cadastro público e autenticação (senha e Google), incluindo proteção da API.
- Fornecer credenciais OAuth do Google quando a integração for configurada.
- Definir os módulos e regras da locadora antes de modelar o domínio.

## Componentes da página inicial

- Referência: Figma Hermex, frame `2:3` (1920 | Página Inicial).
- Implementados 9 átomos e 11 moléculas com Tailwind, isolados da página.
- Storybook em `apps/web`, com 54 histórias e documentação de cada componente.
- Página, organismos, integração de busca, categorias reais, horários, links sociais
  oficiais e navegação de detalhes dependem das próximas etapas.
- Inventário e decisões visuais: `apps/web/src/components/README.md`.

## API de veículos — HER-20

- Módulo `vehicles` criado pela CLI do NestJS; query code-first lê o PostgreSQL via serviço e Prisma.
- `Vehicle`: `id` CUID automático; `brand`, `model`, `licensePlate` textos obrigatórios;
  `year` inteiro obrigatório (ano-modelo, sem limite de negócio);
  `dailyRate` obrigatório em BRL, `Decimal(10,2)` positivo e sem padrão;
  `available` obrigatório com padrão `true`.
- Placa única, normalizada no banco para maiúsculas, sem hífen ou espaços.
- GraphQL expõe `id: ID!`, textos `String!`, `year: Int!`, `dailyRate: Float!`
  (conversão explícita de Decimal) e `available: Boolean!`.
- Banco vazio retorna `[]`; nenhuma carga inicial foi adicionada.
- Migration inicial cria a tabela, índice único, CHECK da diária positiva/finita e trigger de normalização da placa.
- GraphiQL habilitado fora de produção; a consulta `vehicles { model }` continua válida.
- Cadastro/CRUD e paginação ficam para outras issues; campos de catálogo estão em HER-5 e filtro em HER-7.

## Domínio de categorias — HER-6

- `Category`: `id` CUID automático, `name` único, `createdAt` e `updatedAt`.
- Query GraphQL `categories { id name }`, sem paginação, ordenada por `name` ASC;
  sem registros retorna `[]`. Datas são campos de persistência.
- Seed idempotente com Hatch, Sedan, SUV, Minivan e Picape, via upsert pelo nome.
- Gerenciamento por seed/migration; sem mutations de CRUD.
- Confirmado: resolver delega ao `CategoriesService`, que acessa o `PrismaService`,
  seguindo o padrão atual da API em lugar da injeção direta citada no card.
- Relação Vehicle → Category entregue em HER-5; filtro de veículos entregue em HER-7.

## Domínio de locais — HER-9

- `Location`: CUID automático, `name` único, `address`, `city`, `state`,
  `createdAt` e `updatedAt`; todos obrigatórios.
- Confirmado: `state` exige exatamente dois caracteres por CHECK no PostgreSQL,
  sem catálogo de UFs ou normalização automática.
- GraphQL `locations { id name address city state }`, sem argumentos/paginação,
  ordenada por nome ASC; sem registros retorna `[]`. Datas ficam na persistência.
- Resolver delega ao `LocationsService`, que usa o `PrismaService`.
- Seed compartilhado com categorias, idempotente por nome e sem sobrescrever
  registros existentes. Confirmados três exemplos fictícios em Belo Horizonte/MG,
  Rio de Janeiro/RJ e São Paulo/SP, com endereços identificados como demonstração.
- Sem CRUD ou relação com Vehicle. Consumo pelos seletores e busca por data/local
  (HER-10) ficam para as próximas entregas.

## Campos de catálogo do veículo — HER-5

- `Vehicle` agora exige `categoryId` (FK para Category) e `transmission`, sem defaults.
- Confirmado: veículos existentes exigem mapeamento explícito de categoria e
  transmissão. O banco local estava vazio na aplicação. A migration transacional
  bloqueia a tabela e aborta antes de alterar o schema se encontrar veículos;
  em outro ambiente com registros, definir o mapeamento antes da aplicação.
- `transmission` é string no PostgreSQL com CHECK para MANUAL/AUTOMATIC e enum
  `Transmission` no GraphQL. `imageUrl` é opcional, sem validação adicional de URL.
- A query mantém os campos anteriores e adiciona `imageUrl: String`,
  `category: Category!` e `transmission: Transmission!`. Categoria vem por include
  no Prisma, sem consulta por veículo; diária continua convertida para número.
- Sem CRUD, filtros, paginação ou mudanças de interface. HER-7 implementa o filtro.

## Filtro de veículos — HER-7

- `vehicles(categoryId: ID)` retorna apenas `available: true`, com categoria populada.
- Sem argumento ou com null, lista todas as categorias; um ID informado aplica
  igualdade exata no banco. Categoria inexistente ou ID vazio retorna `[]`.
- Resolver delega ao serviço; um único findMany usa where condicional e include.
  Sem filtragem em memória, consulta nova ou migration.
- Mudança intencional: veículos indisponíveis deixam de aparecer também nas
  consultas antigas sem argumento. Retorno permanece `[Vehicle!]!`.
- Integração do dropdown pertence à HER-18; paginação e busca permanecem pendentes.

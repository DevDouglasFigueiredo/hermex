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

# API — instruções específicas

Leia também o `AGENTS.md` da raiz.

- Para criar novos módulos de domínio, use a CLI local do NestJS via
  `pnpm --filter @hermex/api exec nest generate module <dominio>` na raiz.
  Não crie a estrutura de módulos manualmente. Use também `nest generate`
  para gerar os serviços, resolvers e demais estruturas necessárias, ajustando
  depois o código gerado às convenções da aplicação.
- Use módulos NestJS e GraphQL code-first. Gere o schema a partir dos decorators;
  não mantenha um schema SDL manual como fonte de verdade.
- Siga o ESM configurado: imports locais TypeScript usam extensão `.js`.
- Mantenha regras de negócio em serviços; resolvers/controllers delegam a eles.
- Acesse PostgreSQL pelo `PrismaService`, que gerencia conexão e encerramento.
- Altere `prisma/schema.prisma` e gere o client pelo comando na raiz;
  não edite `src/generated/prisma`.
- Ao adicionar modelos, gere e revise migrations. Não aplique mudanças destrutivas
  sobre dados existentes sem uma decisão explícita do usuário.
- A configuração local usa o `.env` da raiz; não duplique credenciais aqui.
- Testes usam Vitest. Os e2e em `test/` substituem Prisma e não precisam do banco.
- Para verificar esta aplicação, execute na raiz
  `pnpm --filter @hermex/api typecheck`, `pnpm test`, `pnpm test:e2e` e
  `pnpm --filter @hermex/api build`, conforme a mudança.
- Não há telemetria NestJS Observe configurada. Não instale ou conecte serviços
  externos de observabilidade sem que façam parte do escopo solicitado.

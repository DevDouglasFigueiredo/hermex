# Hermex — instruções para agentes

## Contexto

Hermex é uma locadora de veículos em um monorepo PNPM. Leia `PRD.md` para
requisitos e decisões, e `README.md` para configuração e execução local.
Leia também o `AGENTS.md` da aplicação antes de alterar seus arquivos.
As instruções locais complementam estas regras no respectivo diretório.

## Forma de trabalhar

- Converse com o usuário em português e desenvolva por etapas, dentro do escopo solicitado.
- Pergunte quando faltar uma definição de produto, regra de negócio ou decisão
  arquitetural que afete a implementação. Não preencha lacunas por suposição.
  Continue apenas o trabalho independente da resposta.
- Consulte o código, as versões instaladas e a documentação oficial correspondente
  antes de alterar APIs ou configurações de frameworks.
- Mantenha mudanças focadas e preserve alterações existentes do usuário.
- Registre decisões confirmadas e pendências de produto no `PRD.md`; atualize o
  `README.md` quando mudar a configuração ou os comandos de execução.
- Para trabalho longo ou em várias etapas, apresente um plano curto com resultado
  esperado, dependências e verificações. Não crie documentos de processo extras
  para alterações simples.

## Organização e convenções

- `apps/web`: Next.js com App Router, TypeScript, Tailwind CSS e Atomic Design.
- `apps/api`: NestJS, TypeScript, GraphQL code-first e Prisma.
- PostgreSQL local: `docker-compose.yaml`, com volume nomeado.
- Use PNPM e preserve `pnpm-lock.yaml`; não introduza outros lockfiles.
- Use `pnpm install` para instalar dependências já declaradas e `pnpm add` para
  adicionar novas bibliotecas, com o filtro da aplicação e `-D` quando forem
  dependências de desenvolvimento. Deixe o PNPM atualizar o manifesto e o
  lockfile; nunca edite `package.json` manualmente.
- Execute comandos a partir da raiz, usando os atalhos ou `pnpm --filter`.
- Siga o estilo dos arquivos próximos e evite abstrações sem uso concreto.
- Não edite artefatos gerados (`node_modules`, `.next`, `dist`, Prisma Client).

## Decisões e limites

- Autenticação definida: Auth.js, e-mail/senha, Google e cadastro público.
- Login e cadastro ainda não estão implementados nesta base. Confira o código e
  atualize esta indicação quando forem entregues.
- Perfis e permissões estão pendentes. Não invente papéis ou privilégios para
  funcionários e clientes.
- Os módulos e modelos da locadora dependem dos próximos requisitos do usuário.
- Não exponha segredos em código, logs ou documentação. Documente variáveis no
  `.env.example` sem credenciais reais e preserve o `.env` local existente.
- Não apague volumes nem execute resets de banco para resolver falhas de rotina.

## Comandos e verificação

Requisitos: Node.js 24 e PNPM indicado no `package.json`.

| Comando na raiz | Uso |
| --- | --- |
| `pnpm install` | Instalar dependências |
| `pnpm dev` | Iniciar web e API |
| `pnpm dev:web` / `pnpm dev:api` | Iniciar uma aplicação |
| `pnpm db:up` / `pnpm db:down` | Iniciar/parar banco preservando o volume |
| `pnpm db:validate` / `pnpm db:generate` | Validar schema/gerar Prisma Client |
| `pnpm typecheck` | Verificar tipos das aplicações |
| `pnpm test` | Testes unitários da API |
| `pnpm test:e2e` | Integração HTTP/GraphQL com Prisma substituído |
| `pnpm build` | Compilar API e web |

Execute verificações proporcionais à mudança. Para código, verifique tipos e
compilação da aplicação afetada e execute testes relevantes ao comportamento
alterado. Mudanças somente de documentação não exigem build. Alterações no banco
exigem validação do schema e revisão da migration gerada.

Os e2e não comprovam conexão real ao banco; a query GraphQL `{ health }` com a API
em execução faz essa verificação. No retorno, informe mudanças, verificações
executadas e pendências reais. Não declare testes ou funcionalidades concluídos
sem evidência.

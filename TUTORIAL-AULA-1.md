# Aula 1 — Fundação do Hermex: do PRD ao primeiro push

**Registro:** 31 de outubro de 2026.  
**Projeto:** Hermex, uma locadora de veículos.  
**Marco da aula:** branch `aula-1`, commit `818b84c`.  
**Repositório:** [DevDouglasFigueiredo/hermex](https://github.com/DevDouglasFigueiredo/hermex).

Este tutorial explica como começamos o projeto: decisões, organização, ferramentas, comandos, configurações, problemas encontrados e verificações realizadas. Serve para revisar a aula e compartilhar o raciocínio com outras pessoas.

O documento descreve a base entregue na aula 1. Exemplos marcados como **futuros** ou **didáticos** não representam funcionalidades já implementadas. Os comandos de geração de projetos pertencem à criação inicial e não devem ser executados novamente sobre as aplicações existentes.

## Sumário

1. [Objetivo e decisões iniciais](#1-objetivo-e-decisões-iniciais)
2. [Arquitetura do monorepo](#2-arquitetura-do-monorepo)
3. [Ambiente e versões](#3-ambiente-e-versões)
4. [Criação das aplicações](#4-criação-das-aplicações)
5. [PNPM workspace e comandos na raiz](#5-pnpm-workspace-e-comandos-na-raiz)
6. [Front-end: Next.js, Tailwind e Atomic Design](#6-front-end-nextjs-tailwind-e-atomic-design)
7. [Back-end: NestJS e GraphQL code-first](#7-back-end-nestjs-e-graphql-code-first)
8. [Banco local com Docker Compose](#8-banco-local-com-docker-compose)
9. [Prisma e conexão da API](#9-prisma-e-conexão-da-api)
10. [Autenticação: decisões e pendências](#10-autenticação-decisões-e-pendências)
11. [Validações e evidências](#11-validações-e-evidências)
12. [Problemas encontrados e soluções](#12-problemas-encontrados-e-soluções)
13. [Codex e instruções persistentes](#13-codex-e-instruções-persistentes)
14. [Git: um repositório e a branch da aula](#14-git-um-repositório-e-a-branch-da-aula)
15. [Executar o projeto já existente](#15-executar-o-projeto-já-existente)
16. [Como continuar nas próximas aulas](#16-como-continuar-nas-próximas-aulas)
17. [Glossário e referências](#17-glossário-e-referências)

## 1. Objetivo e decisões iniciais

O ponto de partida foi o [PRD.md](PRD.md). PRD significa *Product Requirements Document*: um documento que registra o produto e seus requisitos. Nossa versão inicial era curta e definia principalmente a stack e a organização técnica.

Antes de implementar, levantamos perguntas sobre escopo, autenticação, abordagem GraphQL e configuração do banco. O usuário pediu explicitamente que lacunas fossem perguntadas, em vez de preenchidas com suposições.

Na primeira leitura, o PRD estava vazio no disco porque o conteúdo ainda não havia sido salvo no editor. Depois de salvá-lo, foi possível examinar as instruções. Esse detalhe reforça uma prática útil: confirmar o conteúdo efetivamente disponível no projeto antes de agir com base apenas no que aparece no editor.

As decisões confirmadas foram:

| Tema | Decisão |
| --- | --- |
| Produto | Locadora de veículos Hermex |
| Organização | Monorepo com PNPM workspace |
| Front-end | Next.js em `apps/web` |
| Back-end | NestJS em `apps/api` |
| Linguagem | TypeScript |
| Estilos | Tailwind CSS |
| Componentes | Atomic Design |
| API | GraphQL com abordagem code-first |
| Persistência | Prisma com PostgreSQL |
| Banco local | Docker Compose e volume nomeado |
| Autenticação futura | Auth.js com e-mail/senha e Google |
| Entrada de usuários | Cadastro público |
| Perfis e permissões | Pendentes |
| Evolução | Etapas orientadas pelos próximos requisitos do usuário |

A aula terminou com uma base executável e validada. Não houve definição de cadastro de veículos, reservas, contratos, pagamentos ou regras de disponibilidade. Esses assuntos dependem das próximas aulas.

**Padrão de decisão adotado:** implementar o que foi definido, registrar o que está pendente e não apresentar uma escolha de tecnologia como se fosse uma funcionalidade pronta.

## 2. Arquitetura do monorepo

Monorepo significa manter os projetos relacionados no mesmo repositório Git. Aqui, web e API compartilham histórico, documentação e gestão de dependências, mas continuam sendo aplicações distintas.

A estrutura principal é:

```text
hermex/
├── AGENTS.md
├── PRD.md
├── README.md
├── TUTORIAL-AULA-1.md
├── .env.example
├── .gitignore
├── .nvmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── docker-compose.yaml
└── apps/
    ├── web/
    │   ├── AGENTS.md
    │   ├── package.json
    │   ├── next.config.ts
    │   ├── postcss.config.mjs
    │   ├── public/
    │   └── src/
    │       ├── app/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── globals.css
    │       ├── components/
    │       │   ├── atoms/
    │       │   ├── molecules/
    │       │   ├── organisms/
    │       │   └── templates/
    │       └── lib/auth/README.md
    └── api/
        ├── AGENTS.md
        ├── package.json
        ├── nest-cli.json
        ├── prisma.config.ts
        ├── prisma/schema.prisma
        ├── src/
        │   ├── main.ts
        │   ├── app.module.ts
        │   ├── app.controller.ts
        │   ├── app.controller.spec.ts
        │   ├── app.service.ts
        │   ├── health/health.resolver.ts
        │   └── prisma/
        │       ├── prisma.module.ts
        │       └── prisma.service.ts
        └── test/app.e2e-spec.ts
```

O `.env` existe localmente, mas não faz parte do Git. O tutorial foi escrito após o commit inicial e, portanto, não pertence ao conteúdo daquele commit.

### Responsabilidade de cada camada

| Camada | Responsabilidade nesta base |
| --- | --- |
| Web | Renderizar a aplicação no Next.js |
| API | Inicializar o NestJS e expor o endpoint GraphQL |
| Resolver | Resolver a query `health` |
| PrismaService | Gerenciar acesso ao PostgreSQL |
| PostgreSQL | Oferecer o banco relacional local |
| Docker Compose | Executar o banco e preservar seu volume |

Fluxo **efetivamente validado** na aula:

```mermaid
flowchart LR
    C[Cliente HTTP: curl] -->|POST /graphql| A[NestJS / Apollo]
    A --> H[HealthResolver]
    H --> P[PrismaService]
    P -->|SELECT 1| D[(PostgreSQL no Docker)]
    D --> P
    P --> H
    H -->|health: ok| C
```

A futura comunicação funcional da web com a API ainda não foi implementada. O front-end da aula contém uma página inicial simples com o nome Hermex.

### O que esta arquitetura não implica

Ter dois projetos no monorepo não transforma a aplicação em microsserviços. Também não significa que já aplicamos DDD completo, arquitetura hexagonal ou Clean Architecture. A base usa a organização modular do NestJS e separa a interface web da API. Novos padrões deverão ser adotados quando houver um problema concreto que os justifique.

Não criamos um diretório de pacotes compartilhados sem uso real, nem adicionamos ferramentas extras de orquestração do monorepo. Os scripts PNPM são suficientes para a etapa atual.

## 3. Ambiente e versões

A base foi preparada com Node.js 24. A versão principal está registrada no [.nvmrc](.nvmrc):

```text
24
```

O manifesto raiz declara PNPM `12.14.0`, Node `>=24 <25` e PNPM `>=12 <13`.

Algumas versões declaradas no marco da aula:

| Ferramenta | Declaração no projeto |
| --- | --- |
| Next.js | `16.4.3` |
| React / React DOM | `19.3.0` |
| Tailwind CSS | `^4` |
| NestJS core/common | `^12.0.1` |
| Nest GraphQL | `^14.1.0` |
| Nest Apollo | `^14.1.1` |
| Apollo Server | `^5.0.0` |
| GraphQL | `^16.11.0` |
| Prisma Client / CLI / adapter-pg | `7.10.1` |
| PostgreSQL | Imagem `postgres:18-alpine` |
| TypeScript web | `^5` |
| TypeScript API | `^6.0.2` |
| Vitest | `^4.1.2` |

Uma faixa como `^12.0.1` permite versões compatíveis dentro da mesma versão principal. A versão efetivamente resolvida fica no `pnpm-lock.yaml`. Portanto, a tabela acima não deve ser confundida com a lista exata de todas as versões instaladas.

Para reproduzir o checkout, preserve o lockfile. Não troque automaticamente as versões por `latest`: esse marcador pode apontar para versões diferentes no futuro e, como vimos com Prisma, até para um release candidate.

Comandos de inspeção usados ou úteis para consulta:

```bash
node --version
npm --version
pnpm --version
docker --version
```

O npm/NPX apareceu na geração inicial, conforme solicitado pelo PRD. A instalação de dependências do projeto ficou a cargo do PNPM.

## 4. Criação das aplicações

### 4.1 Front-end com o gerador oficial

O comando de criação usado foi:

```bash
npx --yes create-next-app@latest apps/web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --use-pnpm \
  --skip-install \
  --disable-git \
  --import-alias '@/*' \
  --yes
```

| Opção | Finalidade na criação |
| --- | --- |
| `apps/web` | Destino do front-end |
| `--typescript` | Gerar TypeScript |
| `--tailwind` | Preparar Tailwind |
| `--eslint` | Incluir configuração de lint |
| `--app` | Usar App Router |
| `--src-dir` | Organizar fontes em `src` |
| `--use-pnpm` | Selecionar PNPM |
| `--skip-install` | Adiar a instalação para a configuração do workspace |
| `--disable-git` | Evitar criar um repositório dentro da web |
| `--import-alias '@/*'` | Configurar o alias de importação |
| `--yes` | Executar sem as perguntas interativas padrão |

Na primeira tentativa, o gerador informou que o caminho não era gravável. Criamos a pasta intermediária e repetimos o comando com sucesso:

```bash
mkdir -p apps
```

Esses comandos explicam o histórico; não são necessários para executar o projeto já criado. A referência do gerador está na [documentação do create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 4.2 Back-end com a CLI do NestJS

A API foi gerada com:

```bash
npx --yes @nestjs/cli@latest new api \
  --directory apps/api \
  --package-manager pnpm \
  --skip-install \
  --skip-git \
  --strict
```

A CLI produziu a aplicação inicial, configurações TypeScript, testes e arquivos próprios do NestJS. O projeto gerado nesta aula utiliza ESM e Vitest. Não copiamos indiscriminadamente exemplos antigos de NestJS que pressupõem CommonJS ou Jest.

Os argumentos `--skip-install` e `--skip-git` tiveram o mesmo propósito do front-end: centralizar instalação e versionamento no monorepo.

Referência: [Nest CLI — comandos e opções](https://docs.nestjs.com/cli/usages).

### 4.3 Regras consolidadas depois da criação

Durante a montagem inicial, houve ajustes diretos dos manifestos e criação manual de alguns arquivos de infraestrutura. Depois disso, o usuário estabeleceu regras que passam a orientar as próximas alterações:

1. Criar novos módulos/domínios da API com `nest generate`.
2. Usar PNPM para instalar bibliotecas Node.js, com preferência explícita por `pnpm install`.
3. Nunca editar `package.json` manualmente.

Esse registro distingue o histórico da aula da convenção que valerá daqui em diante.

## 5. PNPM workspace e comandos na raiz

### 5.1 Descoberta das aplicações

O arquivo [pnpm-workspace.yaml](pnpm-workspace.yaml) declara:

```yaml
packages:
  - 'apps/*'
```

Assim, os projetos em `apps/` integram o workspace. Seus nomes são:

```text
@hermex/web
@hermex/api
```

Esses nomes são os seletores usados nos comandos com `--filter`. O caminho do diretório e o nome do pacote são conceitos diferentes, embora aqui tenham uma relação fácil de reconhecer.

Exemplos reais:

```bash
pnpm --filter @hermex/web dev
pnpm --filter @hermex/api dev
pnpm --filter @hermex/api exec nest --help
```

O filtro permite executar scripts e ferramentas da aplicação sem entrar em sua pasta. Veja [Filtering no PNPM](https://pnpm.io/filtering).

### 5.2 Scripts como interface do monorepo

Os atalhos do [package.json](package.json) da raiz dão uma interface única para as tarefas comuns:

| Comando | Comportamento |
| --- | --- |
| `pnpm dev` | Executa web e API em paralelo |
| `pnpm dev:web` | Inicia apenas a web |
| `pnpm dev:api` | Inicia apenas a API |
| `pnpm build` | Compila API e depois web |
| `pnpm typecheck` | Verifica tipos da API e depois web |
| `pnpm test` | Executa testes unitários da API |
| `pnpm test:e2e` | Executa testes HTTP/GraphQL da API |
| `pnpm db:up` | Sobe PostgreSQL e aguarda seu healthcheck |
| `pnpm db:down` | Para os serviços sem apagar o volume |
| `pnpm db:logs` | Acompanha logs do banco |
| `pnpm db:generate` | Gera Prisma Client |
| `pnpm db:validate` | Valida o schema Prisma |
| `pnpm db:migrate --name nome` | Cria/aplica migration quando houver modelos |
| `pnpm db:studio` | Executa Prisma Studio |

Por exemplo, o script `dev` usa:

```text
pnpm --parallel --filter @hermex/web --filter @hermex/api dev
```

Já o build usa uma sequência: a segunda aplicação só começa se a primeira terminar com sucesso.

### 5.3 Instalação, lockfile e uma ressalva de CLI

Para instalar as dependências já declaradas:

```bash
pnpm install
```

Para uma instalação que não possa alterar o lockfile, como em reprodução controlada:

```bash
pnpm install --frozen-lockfile
```

Esse segundo comando falha se manifesto e lockfile estiverem inconsistentes. Isso é útil para detectar divergências em vez de corrigi-las silenciosamente. Referência: [pnpm install](https://pnpm.io/cli/install).

**Ressalva encontrada durante a documentação:** o `pnpm install --help` da versão instalada anuncia `pnpm install [OPTIONS]`; `-D` é descrito ali como seleção de dependências de desenvolvimento para instalação. Não foi verificado suporte a `pnpm install <biblioteca>` nessa CLI. Portanto, este tutorial não apresenta esse formato como um comando comprovado para adicionar pacotes novos. Quando chegar a próxima instalação de biblioteca, será necessário alinhar a sintaxe suportada com a regra explícita do usuário, preservando a proibição de editar o manifesto manualmente.

### 5.4 Scripts de instalação das dependências

Algumas dependências precisam executar scripts próprios durante a instalação. A configuração final registra permissões específicas:

```yaml
allowBuilds:
  '@nestjs/core': true
  '@apollo/protobufjs': true
  '@prisma/engines': true
  prisma: true
  esbuild: true
  sharp: true
  unrs-resolver: true
```

Na primeira instalação, o PNPM bloqueou scripts e retornou `ERR_PNPM_IGNORED_BUILDS`. Depois de configurar `allowBuilds`, a instalação terminou com sucesso.

Também removemos um `pnpm-workspace.yaml` criado dentro da web pelo gerador: havia um workspace principal na raiz, e a configuração aninhada não se aplicava da forma esperada. A configuração relevante ficou centralizada.

## 6. Front-end: Next.js, Tailwind e Atomic Design

### 6.1 App Router

No front-end, as rotas ficam em `apps/web/src/app`:

| Arquivo | Papel |
| --- | --- |
| `layout.tsx` | Estrutura raiz, metadados, idioma e CSS global |
| `page.tsx` | Página da rota `/` |
| `globals.css` | Estilos globais e importação de Tailwind |

O layout foi ajustado para `lang="pt-BR"`, título Hermex e descrição da locadora. A página inicial contém o nome do produto, sua descrição e a indicação de desenvolvimento.

O App Router usa Server Components por padrão. Quando houver interação que exija recursos do navegador ou estado de interface, delimitaremos o componente necessário com `"use client"`. Isso é uma orientação para construir as próximas telas, não uma integração já realizada.

Referências: [Layouts e páginas](https://nextjs.org/docs/app/getting-started/layouts-and-pages) e [Server e Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).

### 6.2 Atomic Design

A estrutura de componentes foi preparada desta forma:

| Nível | Responsabilidade | Exemplo didático futuro |
| --- | --- | --- |
| Atoms | Elementos pequenos e básicos | Botão, campo de entrada, texto |
| Molecules | Combinação de elementos básicos | Campo com rótulo e mensagem de erro |
| Organisms | Seção composta da interface | Formulário de cadastro |
| Templates | Estrutura de composição da página | Layout de uma área de acesso |
| Pages | Rota com sua composição concreta | Página em `src/app` |

Os diretórios têm arquivos `.gitkeep` para serem preservados no Git enquanto estão vazios. Não existem ainda componentes de negócio nesses níveis.

Atomic Design organiza a interface. Ele não define automaticamente regras de domínio, autorização ou persistência. Também não exige transformar qualquer trecho de HTML em um componente: a extração deve ter finalidade clara.

### 6.3 Alias e TypeScript

O alias `@/*` aponta para `src/*`. Isso permitirá imports como o exemplo futuro:

```tsx
import { Button } from "@/components/atoms/button";
```

Esse componente não existe nesta etapa; o exemplo mostra apenas como o alias será usado.

O TypeScript está em modo estrito. A verificação da web roda:

```text
next typegen && tsc --noEmit
```

Primeiro são gerados os tipos de rotas do Next.js; depois o compilador verifica tipos sem emitir JavaScript. A configuração pode ser consultada em [apps/web/tsconfig.json](apps/web/tsconfig.json).

### 6.4 Tailwind CSS via PostCSS

A configuração final em `postcss.config.mjs` é:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

O CSS global contém:

```css
@import "tailwindcss";
```

As classes utilitárias são usadas diretamente no JSX. Não foi criado um sistema visual completo nem uma biblioteca de componentes. A referência de integração é [CSS no Next.js](https://nextjs.org/docs/app/getting-started/css).

Também substituímos as fontes Google do template por fontes de sistema. O layout final não depende de buscar aquelas fontes para compilar.

### 6.5 Webpack na compilação de produção

O script final de build é:

```text
next build --webpack
```

A tentativa com Turbopack encontrou um erro de abertura de porta durante o processamento de CSS. A configuração foi simplificada, e Tailwind passou a usar PostCSS.

Isso resolveu a compilação neste ambiente. Não concluímos que Turbopack é inadequado em geral. Além disso, o script `dev` permanece `next dev`: escolher Webpack para o build não altera automaticamente o bundler de desenvolvimento.

## 7. Back-end: NestJS e GraphQL code-first

### 7.1 Inicialização e composição

O `main.ts` cria a aplicação NestJS, carrega a configuração, habilita CORS, registra os hooks de encerramento e inicia a API.

A porta configurada para desenvolvimento é `3001`, evitando conflito com a web em `3000`. O servidor da API escuta em `0.0.0.0`; isso é diferente do PostgreSQL, cuja publicação Docker foi limitada a `127.0.0.1`.

O `AppModule` reúne:

- `ConfigModule`, para ambiente;
- `PrismaModule`, para persistência;
- `GraphQLModule`, para a API GraphQL;
- `AppController` e `AppService`, que vieram da base gerada;
- `HealthResolver`, para verificar o banco.

### 7.2 Módulos, serviços e injeção de dependência

O NestJS organiza funcionalidades em módulos. Um módulo declara os providers que oferece e o que exporta para outros módulos.

Nesta base, `PrismaModule` fornece e exporta `PrismaService`. O resolver recebe esse serviço no construtor. O contêiner do NestJS resolve a dependência, em vez de cada resolver abrir sua própria conexão manualmente.

A convenção para evoluir é manter regras de negócio em serviços e deixar resolvers/controllers delegarem a eles. A query técnica de health é pequena e usa Prisma diretamente; ela não constitui um domínio de locação.

### 7.3 GraphQL code-first

O trecho central da configuração é:

```ts
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
  sortSchema: true,
  introspection: process.env.NODE_ENV !== 'production',
})
```

Neste projeto, os decorators TypeScript definem a interface GraphQL. `autoSchemaFile: true` gera o schema em memória; não há um arquivo SDL manual como fonte principal. A introspecção fica desativada quando `NODE_ENV` é `production`. Referência: [GraphQL no NestJS](https://docs.nestjs.com/graphql/quick-start).

O schema GraphQL descreve as operações expostas. O schema Prisma descreve a persistência. Eles têm finalidades diferentes, mesmo que no futuro alguns dados apareçam em ambos.

### 7.4 Query de verificação

O método do `HealthResolver` executa:

```ts
@Query(() => String, { description: 'Verifica a conexão da API com o PostgreSQL.' })
async health(): Promise<string> {
  await this.prisma.$queryRaw`SELECT 1`;
  return 'ok';
}
```

A consulta SQL não precisa de uma tabela de negócio. Ela permite verificar a integração com o banco antes de definir modelos.

O fluxo é: receber a query GraphQL, executar SQL por Prisma e retornar `ok` somente após a operação terminar. Essa verificação é mais representativa da conexão do que uma resposta fixa que ignora o banco.

O endpoint REST `/` ainda retorna `Hello World!`, herdado do gerador. Ele comprova o funcionamento dessa rota, mas sua resposta, isoladamente, não comprova a execução de SQL.

### 7.5 ESM e extensões de importação

A API declara `"type": "module"` e usa `module`/`moduleResolution` como `nodenext`. Os imports locais escritos no TypeScript usam `.js`, por exemplo:

```ts
import { AppModule } from './app.module.js';
```

O arquivo de origem é TypeScript, mas a extensão corresponde ao módulo emitido. A regra evita misturar convenções incompatíveis com a configuração atual.

### 7.6 Gerar novos domínios pela CLI

Para uma próxima etapa **após definir o domínio**, a regra do projeto é executar na raiz:

```bash
# Exemplo futuro: não executado na aula 1.
pnpm --filter @hermex/api exec nest generate module vehicles
pnpm --filter @hermex/api exec nest generate service vehicles
pnpm --filter @hermex/api exec nest generate resolver vehicles
```

`vehicles` é apenas ilustrativo; não é uma decisão de nomenclatura de domínio. A CLI gera a estrutura inicial. Depois revisamos imports, decorators, integração com módulos e testes para adequar o resultado ao projeto.

Não se deve criar manualmente o esqueleto de um novo módulo como atalho. Também não se deve presumir que um CRUD gerado representa as regras de negócio reais.

## 8. Banco local com Docker Compose

O [docker-compose.yaml](docker-compose.yaml) descreve o serviço PostgreSQL. Nesta etapa, apenas o banco roda em contêiner; Next.js e NestJS são executados pelo PNPM no host.

Trechos importantes:

```yaml
name: hermex
services:
  postgres:
    image: postgres:18-alpine
    restart: unless-stopped
    ports:
      - "127.0.0.1:${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql
volumes:
  postgres_data:
```

A porta à esquerda é a publicada no host. A porta à direita é a usada dentro do contêiner. A publicação em `127.0.0.1` limita o acesso ao banco pela interface local do host.

Como a API roda fora do Docker, o `DATABASE_URL` usa `localhost`. Se a API passar a rodar em um contêiner na mesma rede, o endereço deverá ser revisto: `localhost` dentro de um contêiner se refere ao próprio contêiner.

### Persistência em volume nomeado

O volume lógico `postgres_data` mantém os dados além do ciclo de vida do contêiner. Na execução da aula, o Compose criou o volume `hermex_postgres_data`.

O caminho `/var/lib/postgresql` corresponde à configuração da imagem PostgreSQL 18 usada aqui; não o substitua automaticamente pelo caminho de tutoriais de versões anteriores. Consulte a [imagem oficial PostgreSQL](https://hub.docker.com/_/postgres).

Parar os contêineres com o script atual preserva o volume:

```bash
pnpm db:down
```

Não acrescente opções de remoção de volumes como solução de rotina: isso pode apagar os dados de desenvolvimento.

### Healthcheck

O Compose usa `pg_isready` para observar a disponibilidade do PostgreSQL. O script `db:up` executa `docker compose up -d --wait postgres`, aguardando o healthcheck.

O `$$` nas variáveis do comando do healthcheck preserva o cifrão para expansão dentro do contêiner, em vez da substituição antecipada pelo Compose.

O healthcheck indica disponibilidade do serviço. A query GraphQL `health` adiciona outra verificação: o caminho entre a aplicação e o banco.

### Variáveis de ambiente

O [.env.example](.env.example) documenta somente valores locais de exemplo:

```dotenv
POSTGRES_DB=hermex
POSTGRES_USER=hermex
POSTGRES_PASSWORD=hermex_dev
POSTGRES_PORT=5432
DATABASE_URL=postgresql://hermex:hermex_dev@localhost:5432/hermex?schema=public
API_PORT=3001
WEB_ORIGIN=http://localhost:3000
```

Esses valores são públicos e exclusivamente didáticos/de desenvolvimento. O tutorial não reproduz o conteúdo privado do `.env` local.

Se alterar usuário, senha, porta ou nome do banco, ajuste também `DATABASE_URL`. A aplicação não monta essa URL automaticamente a partir das outras variáveis.

Variáveis de inicialização da imagem não devem ser tratadas como uma ferramenta automática para alterar usuários e senhas de um banco já persistido. Com volume existente, mudanças de configuração precisam considerar o estado real do PostgreSQL.

## 9. Prisma e conexão da API

### 9.1 Schema sem modelos de negócio

O schema atual é:

```prisma
generator client {
  provider = "prisma-client"
  output = "../src/generated/prisma"
  moduleFormat = "esm"
}

datasource db {
  provider = "postgresql"
}
```

Não há modelos como `User`, `Vehicle` ou `Reservation`. Isso é intencional: não havíamos definido os respectivos requisitos.

A geração do Prisma Client e a query SQL técnica funcionaram nessa base sem modelos. Portanto, não foi necessário inventar uma tabela apenas para provar conectividade.

### 9.2 Configuração e adapter

O projeto mantém Prisma CLI, client e adapter-pg em `7.10.1`. A configuração usa `prisma.config.ts`, client gerado em caminho explícito e o adapter `PrismaPg`. Essa escolha segue a configuração da geração 7 do Prisma; exemplos de outras versões podem precisar de adaptação. Referência: [guia oficial do Prisma 7](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7).

No nosso arquivo `prisma.config.ts`:

- `schema` aponta para `prisma/schema.prisma`;
- `migrations.path` reserva `prisma/migrations` para futuras migrations;
- `datasource.url` obtém `DATABASE_URL`;
- `dotenv` carrega o `.env` da raiz, resolvido a partir da localização do arquivo.

Isso é configuração da CLI. Na aplicação NestJS, quem carrega o ambiente é o `ConfigModule`.

### 9.3 PrismaService e ciclo de vida

O `PrismaService` estende o client gerado e recebe `ConfigService`. Seu construtor cria o adapter com `DATABASE_URL`, usando `getOrThrow` para exigir a variável.

Os hooks chamam:

```ts
async onModuleInit() { await this.$connect(); }
async onModuleDestroy() { await this.$disconnect(); }
```

O bootstrap também chama `enableShutdownHooks()`. A aplicação conecta no início e disponibiliza o encerramento pelo ciclo de vida do NestJS.

Como a conexão ocorre durante a inicialização, o PostgreSQL deve estar disponível antes de subir a API real.

### 9.4 Generate não é migrate

| Operação | Efeito |
| --- | --- |
| `pnpm db:validate` | Verifica a validade do schema Prisma |
| `pnpm db:generate` | Gera o código do client |
| `pnpm db:migrate --name nome` | Cria/aplica alterações de banco quando há modelos e mudanças |

Gerar o client não cria tabelas. Na aula 1, não foram criadas migrations de negócio.

O build e o typecheck da API executam `db:generate` antes de compilar/verificar os fontes. Isso prepara os imports do client em um checkout novo, mesmo que o diretório gerado esteja fora do Git.

## 10. Autenticação: decisões e pendências

A escolha final foi:

- Auth.js;
- e-mail e senha;
- Google como provedor social;
- cadastro público;
- perfis e permissões ainda pendentes.

Inicialmente foi sugerida uma sessão persistida no banco. Depois da escolha de Auth.js e da consulta à documentação de Credentials, registramos o ajuste: esse provedor exige estratégia JWT e não persiste automaticamente os usuários autenticados dessa forma. O cadastro e o armazenamento de credenciais continuam sendo responsabilidade da implementação. Referência: [Credentials no Auth.js](https://authjs.dev/reference/core/providers/credentials).

Uma sessão JWT do Auth.js não deve ser confundida com um contrato de autorização já pronto para a API NestJS. A integração de identidade entre web e API ainda precisará ser projetada e implementada.

O diretório `apps/web/src/lib/auth` contém apenas um README de decisões. O pacote de autenticação não foi instalado nem configurado nesta aula. Não existem telas funcionais de login/cadastro, schema de usuários, integração OAuth ou proteção de recursos de negócio.

Também não foram decididos recuperação de senha, verificação de e-mail ou regras de vinculação entre contas. Esses temas precisarão de requisitos na etapa de autenticação. Cadastro público não implica permitir privilégios administrativos a quem se cadastrar.

## 11. Validações e evidências

O objetivo das verificações foi separar quatro perguntas: o código tem tipos válidos? Compila? As operações HTTP/GraphQL funcionam no teste? A API consegue consultar o PostgreSQL real?

### 11.1 Schema e tipos

Executamos:

```bash
pnpm db:validate
pnpm typecheck
```

O schema foi aceito, Prisma Client foi gerado e as verificações TypeScript da API e da web passaram.

Tipos ajudam a detectar inconsistências entre partes do código. Eles não substituem validação de entrada em runtime. Não foi entregue nesta aula uma camada geral de validação de DTOs ou de regras de locação.

### 11.2 Teste unitário da API

Executamos:

```bash
pnpm test
```

O teste inicial valida o comportamento do controller gerado, que retorna `Hello World!` a partir do serviço. Resultado observado: **1 teste passou**.

Esse teste cobre o comportamento simples do scaffold; não é evidência de regras de negócio de uma locadora.

### 11.3 Testes e2e com Prisma substituído

Executamos:

```bash
pnpm test:e2e
```

Os testes usam Nest Testing, Supertest e Vitest. Na configuração do módulo de teste, o provider real é substituído:

```ts
.overrideProvider(PrismaService)
.useValue({ $queryRaw: async () => [{ value: 1 }] })
```

São verificados:

1. `GET /` retorna HTTP 200 e `Hello World!`.
2. `POST /graphql` com `{ health }` retorna `{"data":{"health":"ok"}}`.

Resultado observado: **2 testes passaram** após executar com a permissão necessária para abrir uma porta local.

Embora o script tenha o nome e2e, a fronteira do banco é simulada. Ele verifica a composição HTTP/GraphQL e o resolver com o substituto de Prisma, não uma jornada completa com PostgreSQL real ou com o navegador.

### 11.4 Build

Executamos:

```bash
pnpm build
```

A API foi compilada pelo NestJS, e a web terminou a compilação de produção com Webpack. O Next.js gerou a página inicial e a página padrão de rota não encontrada.

Um build aprovado não comprova sozinho acessibilidade, aparência em vários dispositivos, OAuth ou regras de negócio. Não foi realizada uma sessão de QA visual no navegador nesta aula.

### 11.5 Conexão real com PostgreSQL

O Compose iniciou o banco e informou estado saudável. Em seguida, iniciamos a API compilada:

```bash
pnpm --filter @hermex/api start:prod
```

Em outro terminal, executamos:

```bash
curl --fail --silent --show-error \
  http://localhost:3001/graphql \
  -H 'Content-Type: application/json' \
  --data '{"query":"{ health }"}'
```

Resposta realmente observada:

```json
{"data":{"health":"ok"}}
```

Essa é a evidência da execução de `SELECT 1` pelo caminho NestJS → Prisma → PostgreSQL real. Depois da consulta, o processo temporário da API foi encerrado.

### 11.6 Compatibilidade de dependências

Executamos:

```bash
pnpm peers check
```

O resultado final não apresentou problemas de peer dependencies. Antes da correção, a versão inicialmente escolhida de `@nestjs/config` não declarava compatibilidade com NestJS 12; atualizamos a configuração para `^12.0.1`.

### 11.7 Matriz do que foi comprovado

| Verificação | Resultado | Limite |
| --- | --- | --- |
| Schema Prisma | Válido | Não testa uma regra de negócio |
| Typecheck | Aprovado nas duas aplicações | Não valida dados externos em runtime |
| Teste unitário | 1 aprovado | Scaffold do controller |
| Testes e2e | 2 aprovados | Prisma substituído |
| Build | Aprovado nas duas aplicações | Não equivale a QA visual |
| Query real `health` | Retornou `ok` | Consulta técnica, sem tabelas de domínio |
| Peer dependencies | Sem problemas ao final | Não comprova todo comportamento das libs |
| Git aninhado | Apenas `.git` raiz encontrado | Inspeção do checkout da aula |

## 12. Problemas encontrados e soluções

### PRD vazio no disco

O conteúdo do editor ainda não havia sido salvo. A implementação aguardou o arquivo salvo e a definição das lacunas relevantes.

### Rede restrita na instalação

Uma consulta ao registro npm falhou com erro de resolução de endereço (`EAI_AGAIN`). Repetimos o acesso usando o mecanismo de aprovação do ambiente. Não foi necessário mudar código de aplicação para tratar uma limitação de rede da ferramenta.

### Scripts de dependências bloqueados

A primeira instalação do PNPM terminou com scripts ignorados. Ajustamos `allowBuilds` para os pacotes necessários e repetimos a instalação. Não desabilitamos globalmente o controle para qualquer pacote.

### Versão mais recente versus versão estável

A consulta a `prisma@latest` retornou um release candidate da versão 8. Mantivemos Prisma `7.10.1`, com client e adapter alinhados. A lição é conferir os dist-tags e a compatibilidade em vez de presumir que `latest` sempre atende à intenção de usar uma versão estável.

### Acesso ao Docker

O sandbox não tinha acesso ao socket Docker. A inicialização do PostgreSQL exigiu execução aprovada fora dessa restrição. O Compose em si foi validado e o contêiner ficou saudável.

### Portas locais nos testes e no build

Supertest falhou inicialmente com `EPERM` ao abrir uma porta. A execução aprovada permitiu concluir os testes.

Turbopack também encontrou bloqueio de abertura de porta durante o build. A nova tentativa aprovada ainda falhou; adotamos Webpack com PostCSS e a compilação terminou.

Essas aprovações são mecanismos do ambiente do agente, não flags que precisam ser copiadas para o terminal de uma pessoa. Não recomendamos executar comandos com `sudo` indiscriminadamente para contornar falhas.

### Escrita no diretório Git

No momento de criar a branch e preparar o commit, `.git` estava montado como somente leitura para o sandbox. Os comandos de mutação do Git foram executados pelo fluxo de aprovação e concluídos normalmente.

## 13. Codex e instruções persistentes

### 13.1 Função do AGENTS.md

O `AGENTS.md` reúne orientações de trabalho para o agente: contexto, convenções, limites, comandos e verificações. Ele ajuda a preservar decisões entre tarefas sem depender de recontar toda a conversa.

Seguimos a orientação oficial de colocar regras gerais na raiz e regras específicas perto do código. A documentação explica a descoberta e a precedência dos arquivos ao longo do caminho de diretórios. Veja [Custom instructions with AGENTS.md — documentação oficial da OpenAI](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Estrutura adotada:

```text
AGENTS.md              Regras do Hermex e do monorepo
apps/web/AGENTS.md     Regras específicas da web
apps/api/AGENTS.md     Regras específicas da API
```

Ao trabalhar em uma aplicação, nossa própria orientação raiz pede a leitura do arquivo local. Isso é especialmente útil quando o agente foi iniciado na raiz e vai editar um diretório mais profundo.

### 13.2 O que aconteceu com /init

O comando `/init` pode gerar um `AGENTS.md` a partir do contexto do diretório. É uma forma de preparar instruções; não é um pré-requisito para criar a aplicação. Referência: [fluxos de desenvolvimento com Codex — OpenAI](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex).

**Histórico real desta aula:** não executamos `/init`. Os arquivos iniciais das aplicações vieram dos geradores Next.js e NestJS. Depois criamos diretamente o arquivo raiz e adaptamos as instruções locais com base na documentação oficial.

Para alguém começando outro projeto, o comando pode ser usado no campo de entrada de uma sessão Codex que o ofereça:

```text
/init
```

Esse é um comando da interface Codex, não um comando Bash nem algo a executar com PNPM. No Hermex, os arquivos já foram produzidos e revisados; não há necessidade de repetir a inicialização apenas por formalidade.

### 13.3 Regras gerais registradas

Entre as regras persistidas estão:

- conversar em português;
- evoluir por etapas;
- perguntar sobre lacunas de produto e arquitetura;
- preservar alterações existentes do usuário;
- consultar versões e documentação adequadas;
- usar PNPM e preservar o lockfile;
- não editar `package.json` manualmente;
- gerar novos módulos NestJS pela CLI;
- não inventar perfis, permissões ou modelos de domínio;
- preservar segredos e o `.env` local;
- verificar mudanças proporcionalmente ao seu efeito;
- informar limitações e não alegar testes não executados.

### 13.4 Ajustes dos arquivos gerados

**Web:** preservamos o bloco de instruções criado pelo Next.js, que orienta consultar a documentação da versão instalada em `apps/web/node_modules/next/dist/docs/`. Acrescentamos as convenções do Hermex abaixo desse bloco.

**API:** substituímos o texto padrão que sugeria telemetria de produção com NestJS Observe. Essa integração não estava configurada no código, então seria incorreto documentá-la como parte da infraestrutura existente. O arquivo final descreve a API real e impede conectar observabilidade externa sem que isso faça parte da tarefa.

### 13.5 Documentos com funções diferentes

| Documento | Finalidade |
| --- | --- |
| `PRD.md` | Requisitos, decisões de produto e pendências |
| `README.md` | Execução e comandos de consulta rápida |
| `AGENTS.md` | Instruções persistentes para o agente |
| `TUTORIAL-AULA-1.md` | Explicação didática e histórico da fundação |

A OpenAI apresenta documentos adicionais de planejamento como convenções opcionais. Não criamos automaticamente `GOALS.md`, `PLANS.md`, múltiplas skills ou uma árvore de processos apenas para imitar um exemplo. Um plano mais detalhado pode ser adotado quando uma tarefa realmente exigir esse nível de acompanhamento.

## 14. Git: um repositório e a branch da aula

### 14.1 Evitar repositórios aninhados

O usuário inicializou o Git na raiz e configurou:

```bash
git remote add origin git@github.com:DevDouglasFigueiredo/hermex.git
```

Os geradores haviam sido executados com flags para não inicializar Git nas aplicações. Mesmo assim, fizemos uma inspeção explícita:

```bash
find . -name node_modules -prune \
  -o -name .next -prune \
  -o -name .git -print
```

Resultado observado:

```text
./.git
```

Esse comando ignora diretórios pesados de dependências/build, mas examina a estrutura das aplicações. Nenhum `.git` aninhado foi encontrado; não foi necessário remover repositórios de Next.js ou NestJS.

### 14.2 Revisar o conteúdo antes do commit

Conferimos o estado do repositório, remoto e arquivos ignorados:

```bash
git status --short --branch
git remote -v
git status --short --ignored
```

O `.gitignore` mantém fora do histórico:

- `.env` e arquivos de ambiente locais, com exceção de `.env.example`;
- `node_modules`;
- `.next` e `dist`;
- cobertura e cache TypeScript;
- Prisma Client gerado;
- outros artefatos locais listados no arquivo.

O `pnpm-lock.yaml` foi versionado. Os arquivos `.gitkeep` permitem preservar diretórios vazios de componentes.

### 14.3 Branch, commit e push

Os comandos executados foram:

```bash
git switch -c aula-1
git add .
git diff --cached --stat
git diff --cached --check
git commit -m "chore: inicia monorepo Hermex (aula-1)"
git push -u origin aula-1
```

Também inspecionamos o índice para procurar entradas de submódulos, `.env` ou caminhos `.git` indevidos. Nenhum entrou no commit.

Resultado:

| Item | Valor |
| --- | --- |
| Branch | `aula-1` |
| Commit | `818b84c` |
| Mensagem | `chore: inicia monorepo Hermex (aula-1)` |
| Arquivos do commit | 54 |
| Remoto | `origin` via SSH |
| Rastreamento | `aula-1` acompanha `origin/aula-1` |

O `-u` configurou o upstream da branch. Ao final, o diretório de trabalho estava limpo e a branch sincronizada.

A operação foi feita pelo Git local e pelo remoto SSH existente. Não houve necessidade de usar GitHub CLI/MCP para esse push. Também não criamos pull request, merge ou uma cópia do commit em `main`.

Este tutorial foi criado posteriormente. Criar o arquivo de documentação não implica que ele já tenha sido commitado ou enviado ao GitHub.

## 15. Executar o projeto já existente

Esta seção é o roteiro para outra pessoa abrir a base, sem repetir os geradores.

### 15.1 Clonar o marco da aula

Com acesso ao repositório via SSH:

```bash
git clone --branch aula-1 git@github.com:DevDouglasFigueiredo/hermex.git
cd hermex
```

Para examinar exatamente o commit inicial, é possível usar:

```bash
git show 818b84c --stat
```

A branch poderá receber commits depois da aula; o hash identifica o marco original.

### 15.2 Preparar ambiente e dependências

Tenha Node.js 24, PNPM 12.14.0 e Docker com Compose disponíveis. Para quem já usa NVM:

```bash
nvm use
```

Depois:

```bash
pnpm install --frozen-lockfile
```

Não instale dependências separadamente dentro de cada aplicação e não gere lockfiles de npm ou Yarn.

### 15.3 Criar o ambiente local sem sobrescrever configurações

Na primeira execução, se ainda não houver `.env`:

```bash
if [ ! -f .env ]; then
  cp .env.example .env
fi
```

Revise os valores locais conforme necessário. O projeto não usa credenciais reais para esse banco didático.

### 15.4 Iniciar banco e aplicações

Na raiz:

```bash
pnpm db:up
pnpm db:generate
pnpm dev
```

Endereços esperados:

| Serviço | Endereço |
| --- | --- |
| Web | `http://localhost:3000` |
| GraphQL | `http://localhost:3001/graphql` |
| PostgreSQL no host | `localhost:5432`, salvo alteração em `POSTGRES_PORT` |

O `db:generate` precisa de configuração válida de ambiente, mas não cria tabelas. Não há migration de negócio para executar no marco inicial.

Em outro terminal, valide a query real conforme a seção de testes. Para acompanhar problemas do banco:

```bash
pnpm db:logs
```

### 15.5 Encerrar

Use `Ctrl+C` no terminal do `pnpm dev` para parar as aplicações. Para parar o banco preservando os dados:

```bash
pnpm db:down
```

Esses processos são independentes: encerrar o terminal do Next/Nest não remove o banco nem seu volume.

## 16. Como continuar nas próximas aulas

O próximo trabalho deve começar pela leitura de `PRD.md`, dos `AGENTS.md` aplicáveis e do código existente. A ordem sugerida é:

1. Receber o requisito da etapa e identificar decisões que realmente faltam.
2. Perguntar sobre lacunas antes de implementar comportamento dependente delas.
3. Consultar a documentação das versões usadas.
4. Definir o resultado esperado e as verificações relevantes.
5. Gerar novos módulos pela CLI e implementar somente o escopo combinado.
6. Revisar mudanças de banco e configuração, quando existirem.
7. Executar verificações e registrar o que foi comprovado.
8. Atualizar os documentos afetados e preparar o próximo marco Git quando solicitado.

Para autenticação, ainda precisaremos tratar o modelo de usuários, cadastro e senha, Google OAuth, sessão e proteção da API. Perfis continuam pendentes. Não se deve resolver essa pendência silenciosamente ao criar uma tabela ou um campo de permissões.

### O que a aula 1 entregou

- Estrutura de monorepo com dois projetos reais.
- Comandos centralizados na raiz.
- Página inicial Next.js e preparação Atomic Design.
- API NestJS com GraphQL code-first.
- PostgreSQL persistente local e integração Prisma.
- Verificações de tipos, build, testes e conexão real.
- Instruções persistentes para trabalhar com Codex.
- Primeiro commit e push da branch `aula-1`.

### O que não foi entregue

- Fluxo funcional de login ou cadastro.
- Integração Google OAuth.
- Modelo de usuários ou perfis de acesso.
- CRUD de veículos, clientes, reservas ou contratos.
- Integração funcional da web com operações de negócio na API.
- Migrations de domínio.
- Pipeline CI/CD, deploy ou observabilidade externa.
- Testes automatizados de interface ou QA visual em navegador.

Esses limites preservam uma referência fiel do estágio do projeto. Uma fundação validada permite evoluir com clareza, mas não substitui as próximas decisões de produto.

## 17. Glossário e referências

| Termo | Significado neste projeto |
| --- | --- |
| PRD | Documento de requisitos e decisões do produto |
| Monorepo | Repositório que reúne web e API |
| Workspace | Conjunto de pacotes gerenciados pelo PNPM |
| Scaffold | Estrutura inicial produzida por um gerador |
| Code-first | Definição da API GraphQL a partir de código e decorators |
| Resolver | Classe/método que atende operações GraphQL |
| Provider | Dependência gerenciada pelo NestJS |
| ORM | Ferramenta de acesso e modelagem de persistência |
| Migration | Alteração versionada da estrutura do banco |
| Volume nomeado | Armazenamento Docker persistente gerenciado por nome |
| ESM | Sistema de módulos JavaScript usado na API |
| Typecheck | Verificação estática de tipos |
| Mock/substituto | Implementação controlada usada no lugar de uma dependência no teste |
| Upstream | Branch remota acompanhada pela branch local |
| AGENTS.md | Instruções persistentes para agentes no projeto |

Fontes para continuar estudando, consultadas como apoio técnico e distintas das evidências do nosso repositório:

- [OpenAI — instruções com AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
- [OpenAI — desenvolvimento iterativo com Codex e papel do /init](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex).
- [PNPM — install](https://pnpm.io/cli/install).
- [PNPM — filtros](https://pnpm.io/filtering).
- [Next.js — create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- [Next.js — layouts e páginas](https://nextjs.org/docs/app/getting-started/layouts-and-pages).
- [Next.js — Server e Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- [Next.js — CSS](https://nextjs.org/docs/app/getting-started/css).
- [NestJS — CLI](https://docs.nestjs.com/cli/usages).
- [NestJS — GraphQL](https://docs.nestjs.com/graphql/quick-start).
- [Prisma — configuração e mudanças da versão 7](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7).
- [Docker Hub — imagem oficial PostgreSQL](https://hub.docker.com/_/postgres).
- [Auth.js — Credentials](https://authjs.dev/reference/core/providers/credentials).

Para uma consulta operacional rápida, prefira o [README.md](README.md). Para decisões de produto, consulte o [PRD.md](PRD.md). Para regras de trabalho do agente, use o [AGENTS.md](AGENTS.md) e o arquivo específico da aplicação.

# @hermex/api

NestJS, GraphQL code-first (Apollo) e Prisma com PostgreSQL.

Execute na raiz: `pnpm db:up`, `pnpm db:generate`, `pnpm --filter @hermex/api exec prisma migrate deploy` e `pnpm dev:api`.
A API lê o `.env` da raiz e inicia em http://localhost:3001.
A query `{ health }` verifica a conexão real com PostgreSQL.

Configuração e comandos completos: [README do projeto](../../README.md).

## Consulta inicial de veículos

Com o PostgreSQL e a API em execução, abra http://localhost:3001/graphql.
O GraphiQL fica habilitado fora de produção. Execute:

```graphql
query {
  vehicles {
    model
  }
}
```

Com banco vazio: `{"data":{"vehicles":[]}}`. A query lê o PostgreSQL pelo
VehiclesService. Campos adicionais: `id`, `brand`, `year`, `licensePlate`,
`dailyRate` e `available`, todos obrigatórios no GraphQL. Não há mutation de cadastro.

## Persistência — HER-20

- `id`: CUID automático; textos obrigatórios: brand, model e licensePlate.
- `year`: ano-modelo inteiro, sem limites de negócio (respeita Int de 32 bits).
- `dailyRate`: BRL em Decimal(10,2), positivo, finito e sem valor padrão;
  convertido explicitamente para Float na resposta GraphQL.
- `available`: booleano, padrão true; a listagem ainda inclui indisponíveis.
- Placa única normalizada para maiúsculas e sem hífen/espaços por trigger.
- Nenhum seed foi adicionado. Categoria, imagem e transmissão ficam para US01.

A migration foi gerada com `pnpm db:migrate --name create_vehicle --create-only`,
revisada e aplicada com `pnpm db:migrate`. O CHECK de preço e a trigger são SQL
customizado: preservar esses objetos nas próximas migrations. Evite `db push`
para reconstruir ambientes, pois não reproduz o SQL customizado.

Para aplicar migrations já versionadas em outro ambiente:

```bash
pnpm --filter @hermex/api exec prisma migrate deploy
pnpm db:generate
```

## Validação

```bash
pnpm --filter @hermex/api typecheck
pnpm test
pnpm test:e2e
pnpm --filter @hermex/api test:integration
pnpm --filter @hermex/api build
```

Unitários e e2e usam Prisma substituído. O teste de integração exige o PostgreSQL
com migration aplicada e testa persistência, placa normalizada/única, diária
positiva, valores de ano sem limites de negócio, leitura pelo serviço e conversão
Decimal. Ele usa transação com rollback, sem inserir carga inicial nem apagar dados
existentes. Pode ser executado novamente sem acumular fixtures.

## Categorias — HER-6

`CategoriesModule` expõe `categories { id name }`, ordenada por nome ASC.
O resolver delega ao serviço, com acesso ao banco pelo `PrismaService`.
`Category` persiste CUID, nome único e datas de criação/atualização.

Após aplicar migrations e gerar o client, execute na raiz:

```bash
pnpm --filter @hermex/api exec prisma db seed
```

O seed usa upsert por nome para Hatch, Sedan, SUV, Minivan e Picape, sem duplicar
registros nas próximas execuções. Não há CRUD. A relação com Vehicle fica para HER-5.
O teste real de categorias requer migration e seed aplicados e preserva os dados.

## Locais — HER-9

`LocationsModule` publica `locations { id name address city state }` por resolver
que delega ao serviço e ao Prisma. Lista completa, ordenada por nome ASC e sem
paginação. Campos públicos obrigatórios; datas ficam no banco.

`Location` tem CUID, nome único, endereço, cidade, state e datas. O CHECK
`Location_state_length_check` na migration exige exatamente dois caracteres em
state, sem normalização ou validação contra UFs brasileiras. Preserve esse CHECK
nas próximas migrations. Sem CRUD ou relação com Vehicle.

Após aplicar migrations e gerar o client, `pnpm --filter @hermex/api exec prisma db seed`
na raiz cria três locais fictícios em cidades distintas e mantém as categorias.
O upsert pelo nome não altera registros existentes. Configuração e consulta de
exemplo estão no README da raiz.

A suíte `test:integration` verifica restrições com rollback e executa o seed duas
vezes no banco real, preservando IDs e dados existentes. Os exemplos são mantidos
no banco de desenvolvimento. E2e continuam usando Prisma substituído.

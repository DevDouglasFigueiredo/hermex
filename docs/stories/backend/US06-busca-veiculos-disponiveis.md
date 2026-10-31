# US06 — Busca de veículos disponíveis por data e local

**Épico:** [EP01 — Página Home](../../epicos/EP01-pagina-home.md)
**Tipo:** Backend
**Prioridade:** Média
**Depende de:** US03, US05

## contexto

A barra de busca da home tem: local de retirada, local de devolução, data/hora de cada um, e botão "Buscar". Quando o usuário preenche e clica, precisa ver só veículos disponíveis naquele período e local.

No MVP, ainda não temos modelo de Reservation — então a busca vai filtrar por `available: true` e pelo local (quando a relação Vehicle ↔ Location existir). A ideia é já criar a query com a interface certa pra quando as reservas existirem, só precisar trocar a lógica interna.

## queries

- `searchVehicles(input: SearchVehiclesInput!)` — query nova, separada de `vehicles`

## regras

- Input type `SearchVehiclesInput`:
  - `pickupLocationId`: ID, obrigatório
  - `returnLocationId`: ID, obrigatório
  - `pickupDate`: DateTime, obrigatório
  - `returnDate`: DateTime, obrigatório
  - `categoryId`: ID, opcional (filtro adicional)
- Validação: `returnDate` deve ser posterior a `pickupDate`. Se não for, retornar erro GraphQL com mensagem clara.
- MVP: retorna veículos com `available: true`. Filtra por `categoryId` se informado. Os campos de location e data são aceitos mas não filtram de verdade ainda (só quando tiver Reservation).
- Retorna no formato `VehiclePage` (mesmo de US04): `items` + `totalCount`.
- Aceita `skip` e `take` (mesmas regras de US04).

## restrições

- Não criar modelo Reservation nesta story. Vai ter sua própria spec quando for a hora.
- Não ignorar os campos de input silenciosamente — aceitar e logar (ou comentar no código) que o filtro real de disponibilidade será implementado com Reservation.
- Não duplicar lógica de filtragem. Reusar o que puder do resolver `vehicles`.

## stack e padrões

- `SearchVehiclesInput` como `@InputType()` do NestJS/GraphQL
- Validação de datas com class-validator (`@IsDateString`, custom validator pra returnDate > pickupDate) ou validação manual no resolver
- Mesmo `VehiclePage` return type de US04
- Testes: happy path, data inválida (return antes de pickup), categoryId opcional

## critérios de aceite

- `searchVehicles` aceita todos os campos do input e retorna veículos disponíveis
- input com `returnDate` anterior a `pickupDate` retorna erro descritivo
- filtro por `categoryId` funciona quando informado
- paginação funciona (skip/take)
- a query funciona no playground com todos os parâmetros

## verificação

- rodar `pnpm --filter @hermex/api test` — todos os testes devem passar
- testar no GraphQL playground com datas válidas e inválidas
- o agent deve comparar a implementação com esta spec e listar qualquer item não atendido
- review humano: confirmar que a interface do input está pronta pra receber lógica de Reservation no futuro sem breaking change

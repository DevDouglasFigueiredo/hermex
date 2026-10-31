# EP01 — Página Home

## Descrição

Como usuário da Hermex, quero acessar a página inicial da locadora de veículos para visualizar os veículos disponíveis, filtrar por categoria e iniciar uma busca por datas e localização de retirada/devolução.

## Link do Design

[Figma — Home](https://www.figma.com/design/iOawCgebUgNt26RCPTG0d7/Hermex-%7C-Locadora-de-ve%C3%ADculos--Acervo---Fa%C3%A7a-uma-c%C3%B3pia---Community-?node-id=2-3)

## Seções Identificadas no Design

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | Header | Logo Hermex, campo de busca textual, links "Cadastro" e "Login" |
| 2 | Barra de Busca de Veículos | Dois blocos: retirada (local, data, hora) e devolução (local, data, hora) + botão "Buscar" |
| 3 | Hero Banner | Título "Encontre o carro ideal para todas as ocasiões", imagem de destaque, setas decorativas |
| 4 | Filtro por Categoria | Dropdown "Selecione a categoria" acima do grid |
| 5 | Grid de Veículos | Cards em 3 colunas com: imagem, nome, categoria/tipo, preço diária, botão "Ver detalhes" |
| 6 | Footer | Logo invertido, créditos Alura, texto "O carro ideal para sua viagem", ícones redes sociais |

## Abordagem: Spec-Driven Development

Cada story é uma **spec completa** — não um ticket vago. A spec define: contexto, regras, restrições, stack/padrões, critérios de aceite e verificação. O agent implementa seguindo a spec como source of truth.

O ciclo de cada story:
1. **Ler a spec** — entender o que precisa ser construído e por quê
2. **Implementar** — seguindo as regras e restrições da spec
3. **Verificar** — rodar testes, comparar com critérios de aceite, auto-avaliar contra a spec

**Backend primeiro** — todas as queries GraphQL e modelos prontos antes do frontend consumir. Sem código mockado.

## User Stories

### Backend

| ID | Título | Prioridade | Depende de |
|----|--------|------------|------------|
| [US01](../stories/backend/US01-adicionar-campos-vehicle.md) | Adicionar campos `category`, `imageUrl` e `transmission` ao Vehicle | Alta | US02 |
| [US02](../stories/backend/US02-criar-dominio-categoria.md) | Criar domínio Category | Alta | — |
| [US03](../stories/backend/US03-filtrar-veiculos-por-categoria.md) | Filtrar veículos por categoria | Alta | US01, US02 |
| [US04](../stories/backend/US04-paginacao-veiculos.md) | Paginação na listagem de veículos | Média | US03 |
| [US05](../stories/backend/US05-criar-dominio-localizacao.md) | Criar domínio Location | Média | — |
| [US06](../stories/backend/US06-busca-veiculos-disponiveis.md) | Busca de veículos disponíveis por data e local | Média | US03, US05 |

### Frontend

| ID | Título | Prioridade | Depende de |
|----|--------|------------|------------|
| [US07](../stories/frontend/US07-organismo-header.md) | Criar organismo Header | Alta | — |
| [US08](../stories/frontend/US08-organismo-hero-banner.md) | Criar organismo HeroBanner | Alta | — |
| [US09](../stories/frontend/US09-organismo-search-bar.md) | Criar organismo SearchBar | Alta | — |
| [US10](../stories/frontend/US10-organismo-vehicle-grid.md) | Criar organismo VehicleGrid | Alta | — |
| [US11](../stories/frontend/US11-organismo-footer.md) | Criar organismo Footer | Alta | — |
| [US12](../stories/frontend/US12-template-home-page.md) | Criar template HomePage | Alta | US07–US11 |
| [US13](../stories/frontend/US13-integracao-listagem-graphql.md) | Integrar listagem de veículos via GraphQL | Alta | US04, US12 |
| [US14](../stories/frontend/US14-integracao-filtro-categoria.md) | Integrar filtro por categoria | Média | US03, US13 |
| [US15](../stories/frontend/US15-integracao-busca-veiculos.md) | Integrar busca de veículos disponíveis | Média | US06, US13 |

## Ordem Sugerida de Implementação

```
US02 → US01 → US03 → US04        (backend base)
US05 → US06                       (backend busca)
US07 → US08 → US09 → US10 → US11 (frontend organismos — parallelizável)
US12                               (frontend template)
US13 → US14 → US15                (frontend integrações)
```

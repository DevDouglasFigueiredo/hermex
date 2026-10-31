# Componentes da página inicial

Referência: [Figma, frame 2:3 — 1920 | Página Inicial](https://www.figma.com/design/1j7KP1FuPPVQoPmEVZsHkk/?node-id=2-3).
Analisada com o MCP oficial do Figma. Escopo: componentes isolados; a página em
`src/app/page.tsx` permanece como estava.

## Plano e inventário Atomic Design

| Camada | Componente | Uso na referência / contrato |
| --- | --- | --- |
| Átomo | Icon | Seis glifos Material Icons observados na tela; decorativo, nome acessível no controle pai |
| Átomo | Button | Primário laranja (detalhes) e secundário azul (buscar); click, submit e disabled nativos |
| Átomo | TextInput | Base de edição; tom normal/inverso, atributos HTML, estado inválido |
| Átomo | Select | Base nativa de seleção por teclado; opções fornecidas pelo consumidor |
| Átomo | Text | Inter regular, 16 ou 20 px |
| Átomo | Heading | Exo 2 bold, 25 ou até 76 px; nível HTML independente do tamanho |
| Átomo | Logo | Dois grupos SVG originais, nas versões de header e footer |
| Átomo | SocialIcon | SVG original de WhatsApp, Instagram e TikTok; decorativo |
| Átomo | VehicleImage | Imagem dinâmica, fundo cinza 280×160 e enquadramentos da referência |
| Molécula | IconLink | Ícone + link: cadastro e login; destino obrigatório |
| Molécula | IconField | Label acessível + Icon + TextInput + erro opcional; composição compartilhada |
| Molécula | SearchField | Busca geral com lupa; sem filtragem ou requisição embutida |
| Molécula | LocationField | Retirada ou devolução com marcador; texto livre, sem catálogo de agências |
| Molécula | DateField | Calendário nativo com label de retirada/devolução; min/max externos |
| Molécula | SelectField | Label + Select + chevron; base compartilhada de seletores |
| Molécula | TimeSelect | Placeholder Horário, tom inverso; opções externas |
| Molécula | CategoryFilter | Placeholder Selecione a categoria; opções externas |
| Molécula | DailyRate | Valor BRL formatado + unidade /diária |
| Molécula | SocialLinks | Conjunto de links sociais com nomes acessíveis; URLs externas ao componente |
| Molécula | VehicleCard | Imagem + identificação + preço + ação; dados e callback externos |

O card é tratado como molécula por representar uma unidade de conteúdo simples,
sem busca, lista, estado de domínio ou acesso a dados. `DailyRate` é uma molécula
por combinar valor e unidade; não precisamos criar átomos para cada `span`.
A classificação serve à composição e não exige componentes para todo elemento HTML.

Header, busca completa (duas linhas + botão), banner, grade, seção social com título
e rodapé são composições de organismos/templates. Não foram implementados.
Os assets exclusivos do banner não foram baixados nem expostos como componentes.

## Tokens e fidelidade

Tokens em `src/styles/design-system.css`, registrados no Tailwind 4 via `@theme`:
primária #f29849, primária escura #e28634, secundária #1d2f40,
secundária escura #23384d, texto #444 e detalhes #e7e7e7. Espaçamentos usam a
escala Tailwind de 4 px (4/8/12/16/24/32). Borda/radius 4 px, campo de cerca de
44 px, sombra de card 0 0 20 px #84848433.

Inter 400, Exo 2 700 e Material Icons são servidas localmente em `public/fonts`.
Fontes obtidas pelo Google Fonts; preservar seus avisos de licença na distribuição.
Assets extraídos pelo MCP e baixados para `public/design/home`: dois pares de
vetores da marca, três redes e nove imagens de veículos. As histórias demonstram
os nove veículos, inclusive os enquadramentos individuais fornecidos pelo Figma.
Os nomes `img*` mantêm rastreabilidade com as constantes retornadas pelo MCP.
Não há URLs temporárias do Figma em tempo de execução.

Diferenças deliberadas de comportamento:

- Campos são controles HTML reais, com teclado, label e foco; não `div`s estáticas.
- DateField usa calendário nativo: máscara, ícone nativo adicional e popup variam
  por navegador/idioma. O Figma só especifica o campo fechado “Data”; não há
  calendário customizado definido. Não foi inventado um popup.
- Preço usa `R$` em vez de reproduzir o texto `RS` da referência.
- Tipografia grande é fluida até 76 px; cards e campos encolhem com o contêiner.
- Foco, disabled e erro são estados técnicos adicionais. Não representam novas
  regras de produto. As cores do estado normal preservam a referência; o contraste
  do branco sobre o laranja da marca merece revisão de design antes da produção.

## Storybook e integração futura

Cada componente tem um `*.stories.tsx` ao lado do código e documentação automática.
Histórias incluem exemplos preenchidos, opções, variantes e interações quando
aplicáveis. Dados de horário/categoria e links com `#` são exclusivamente exemplos;
não definem horários de funcionamento, catálogo, rotas ou contas oficiais.

Componentes usam props HTML e dados explícitos. Quando houver requisito de negócio,
a página/organismo será responsável por buscar dados, validar período, decidir
navegação e conectar callbacks. Não há integração com API, login, reserva ou filtros
funcionais de catálogo nesta etapa.

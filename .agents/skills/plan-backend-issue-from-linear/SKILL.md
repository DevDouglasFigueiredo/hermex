---
name: plan-backend-issue-from-linear
description: Planeja e implementa issues backend do Linear sobre APIs, GraphQL, serviços, regras de negócio, Prisma e banco de dados, recebidas por ID, nome ou URL, atualizando status e comentários conforme a execução evolui. Use para trabalho backend; issues exclusivamente de interface pertencem à skill de frontend.
---

# Planejar e desenvolver issue backend do Linear

Transforme a especificação da issue em um plano de tarefas e, quando a execução estiver autorizada e o modo ativo permitir, entregue o backend implementado e verificado contra os critérios de aceite. Em modo de planejamento, encerre no plano, sem implementar.

## Fluxo e autorização no Linear

- Descubra as ferramentas disponíveis no MCP do Linear, atualmente `get_issue`, `list_issue_statuses`, `save_issue`, `list_comments` e `save_comment`; não dependa de um prefixo fixo.
- Em pedidos somente de planejamento ou em Plan Mode, consulte o Linear sem alterar status ou publicar comentários.
- Ao executar uma issue com esta skill, as transições e os comentários descritos abaixo fazem parte do fluxo autorizado, salvo restrição do usuário. Isso não autoriza alterar descrição, atribuição ou prioridade.
- Em cada execução, identifique o time da issue e consulte seus estados disponíveis com `list_issue_statuses`. Resolva os estados de andamento, revisão e conclusão pelos nomes e significados do time; se houver ambiguidade ou faltar um estado necessário, pergunte sem criar estados ou escolher um substituto arbitrário.
- Antes de cada transição, releia a issue com `get_issue`. Se já estiver no estado desejado, não repita a alteração. Não reabra issues concluídas ou canceladas sem orientação; não retroceda uma issue em revisão apenas por retomar a sessão, sem confirmar que há retrabalho a executar.
- Atualize somente `id` e `state` com `save_issue` e confirme o resultado retornado; se ele não comprovar o novo estado, consulte a issue novamente.
- Antes de publicar um comentário de entrega ou bloqueio, consulte os comentários existentes para evitar repetir a mesma atualização em retomadas. Em caso de resposta incerta ou falha, confira o estado e os comentários antes de tentar novamente. Não repita tentativas sem nova evidência; informe o que não foi sincronizado e continue o trabalho independente.

## 1. Obter a spec da issue do Linear

- Use o MCP do Linear para buscar a issue pelo ID, nome ou URL informado. Se houver mais de uma correspondência plausível, esclareça qual é a issue antes de planejar.
- Leia descrição, critérios de aceite e referências relevantes, incluindo anexos, comentários e issues relacionadas quando necessários para compreender o requisito.
- Se o MCP estiver indisponível ou uma referência essencial não puder ser acessada, informe a limitação e solicite o conteúdo necessário; não invente a especificação.
- Nesta etapa de obtenção e leitura da spec, não altere a issue. As atualizações de andamento seguem os marcos definidos nesta skill.

## 2. Ler a spec da issue do Linear

Localize e leia as seções da estrutura do card no Linear, preservando sua organização ao extrair os requisitos:

- **Contexto:** problema, objetivo e escopo da issue.
- **Query:** consulta ou operação especificada, incluindo exemplos de entrada e saída quando fornecidos.
- **Regras:** regras de negócio que a implementação deve cumprir.
- **Restrições:** limites, dependências e comportamentos fora do escopo.
- **Stack e padrões:** tecnologias e convenções indicadas para a solução.
- **Critérios de aceite:** condições objetivas para considerar a entrega atendida.
- **Verificação:** procedimentos, comandos e cenários definidos para validar a entrega.

Reconheça títulos equivalentes sem exigir correspondência literal. Se uma seção estiver ausente, procure a informação no restante da descrição e nas referências relevantes; sinalize o que continuar pendente, sem inventar conteúdo. Esclareça lacunas ou conflitos que afetem a solução antes de implementar a parte dependente.

Use os requisitos extraídos dessas seções para orientar as tarefas e a conferência final dos critérios de aceite.

## 3. Investigar o backend existente

- Leia os arquivos AGENTS.md da raiz e da aplicação, o PRD.md e os READMEs relevantes antes de propor mudanças.
- Confira as versões instaladas e consulte a documentação oficial correspondente antes de alterar APIs ou configurações de NestJS, GraphQL, Prisma ou outras dependências.
- Procure módulos, serviços, resolvers, modelos, migrations e testes semelhantes para manter a coesão da base.
- Confira os contratos GraphQL existentes, o schema Prisma e a configuração de testes. Identifique consumidores e impactos de compatibilidade antes de alterar contratos.
- Não trate autenticação, perfis ou permissões pendentes como funcionalidades já disponíveis ou decisões confirmadas.

## 4. Planejar as tarefas

Apresente uma lista ordenada de tarefas, com resultado esperado, dependências e verificações. Conforme o escopo da issue, cubra:

- Módulos e serviços envolvidos, mantendo regras de negócio nos serviços e delegação pelos resolvers/controllers.
- Queries, mutations ou endpoints necessários, entradas, saídas, nulabilidade, validações e tratamento de erros conforme os requisitos e padrões existentes.
- Modelos, relações, restrições de integridade e migrations; transações quando necessárias para manter a consistência da operação.
- Impactos sobre dados existentes e consumidores da API, incluindo dependências frontend ou de serviços externos.
- Testes de comportamento, integração e vínculo entre tarefas e critérios de aceite.

Antes de finalizar, releia a issue e confronte o plano com o código para evitar regressões e padrões desalinhados. Pergunte quando faltar uma definição de produto, regra de negócio ou decisão arquitetural que afete a solução; continue apenas tarefas independentes da resposta. Não invente políticas de autorização, limites de negócio, paginação ou novos contratos para preencher lacunas.

## 5. Iniciar e implementar dentro do escopo backend

Antes de começar a implementação autorizada, mova a issue para o estado de andamento confirmado no time (por exemplo, `In Progress`), seguindo as regras de transição acima.

- Siga o plano e as instruções da aplicação. Preserve alterações existentes do usuário.
- Use a CLI local do NestJS para gerar módulos e demais estruturas, conforme apps/api/AGENTS.md. Preserve GraphQL code-first, imports ESM com extensão `.js` e acesso ao banco pelo PrismaService.
- Altere o schema Prisma como fonte dos modelos e gere o client pelos comandos do projeto; não edite artefatos gerados. Gere e revise migrations quando houver mudanças no banco.
- Não apague volumes nem execute resets para contornar falhas. Mudanças destrutivas em dados existentes exigem decisão explícita do usuário.
- Necessidades de telas, componentes, navegação e consumo da API são dependências frontend: descreva o contrato e o impacto, sem implementar a interface nesta skill.
- Se a issue for exclusivamente frontend, informe que ela está fora do escopo desta skill e indique a skill plan-frontend-issue-from-linear. Para issues mistas, delimite as tarefas backend e as dependências frontend.
- Registre decisões confirmadas e pendências no PRD.md; atualize README e exemplos de variáveis quando houver mudança de configuração ou execução, sem expor segredos.

## 6. Testar e verificar

- Para mudanças de código backend, execute na raiz `pnpm --filter @hermex/api typecheck` e `pnpm --filter @hermex/api build`.
- Escreva ou ajuste testes proporcionais ao comportamento alterado, cobrindo sucesso, validações e falhas relevantes. Execute `pnpm test` e `pnpm test:e2e` conforme o impacto da mudança.
- Para alterações no banco, execute `pnpm db:validate`, gere o Prisma Client e revise a migration gerada quanto à integridade e preservação dos dados.
- Distinga testes unitários, e2e com Prisma substituído e integração com PostgreSQL real. Os e2e não comprovam conexão nem persistência real.
- Quando a mudança exigir verificação com banco real, use os testes de integração pertinentes, como `pnpm --filter @hermex/api test:integration`, e confira as operações afetadas. A query GraphQL `{ health }` com a API em execução verifica a conexão, mas não substitui os testes da regra de negócio ou da migration.
- Investigue falhas para distinguir regressões introduzidas de problemas preexistentes. Corrija regressões dentro do escopo; se a solução depender de regra de negócio não prevista ou ampliar o escopo, pergunte antes de prosseguir.
- Informe verificações indisponíveis ou bloqueadas e suas limitações. Não declare testes, migrations aplicadas ou integração real concluídos sem evidência.

## 7. Conferir contra a issue

Releia a especificação e entregue um checklist dos critérios de aceite, indicando para cada item a evidência de atendimento ou a pendência. Resuma as mudanças, verificações executadas, impactos nos contratos e dados, dependências frontend e decisões ainda necessárias. Em planejamento, apresente as verificações previstas como futuras, sem marcar critérios como implementados.


## 8. Atualizar a entrega ou registrar bloqueio

- Só mova a issue para revisão (por exemplo, `In Review`) quando o código estiver pronto, as verificações necessárias passarem e todos os critérios de aceite estiverem validados. Testes falhando, validações essenciais indisponíveis ou dúvidas que afetem a entrega impedem essa transição.
- Em issues mistas, não mova a issue inteira para revisão enquanto houver critérios pendentes de outro escopo; relate a parte entregue e as dependências restantes.
- Ao entregar para revisão, publique um comentário com resumo curto da implementação, arquivos principais alterados, checklist dos critérios de aceite com evidências e instruções de verificação (comandos, operações da API ou telas pertinentes). Registre limitações reais sem marcar itens pendentes como atendidos.
- Se houver bloqueio que impeça continuar, publique um comentário com causa, impacto e ação necessária para desbloquear. Use um estado de bloqueio somente se existir no time e seu significado estiver confirmado; caso contrário, mantenha o estado atual. Nunca use `Canceled` como substituto de bloqueio. Continue apenas o trabalho independente.
- Não mova para `Done` ao entregar para revisão. Após merge autorizado e confirmado, consulte a issue para verificar se a integração já a concluiu; se não, atualize para o estado de conclusão confirmado no time. Não presuma que a integração existe.
- Informe ao usuário o estado final confirmado e qualquer comentário ou transição que tenha ficado pendente.

## 9. Oferecer commit e próximos passos

Após apresentar a entrega validada, pergunte ao usuário se deseja criar um commit. A pergunta deve partir da skill; não execute o commit antes da resposta afirmativa. Se o usuário já solicitou explicitamente o commit nesta tarefa, use essa autorização sem pedir novamente.

Quando autorizado, revise as alterações e inclua somente arquivos e trechos da tarefa, preservando mudanças alheias. Use Conventional Commits com descrição em português (por exemplo, `feat(api): ...` ou `feat(web): ...`, conforme a aplicação). PR e merge exigem solicitações próprias; autorização para commit não os autoriza. Em planejamento ou entrega bloqueada, não apresente o trabalho como validado nem avance para esse fluxo de commit.

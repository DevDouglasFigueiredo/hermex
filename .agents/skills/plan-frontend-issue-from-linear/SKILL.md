---
name: plan-frontend-issue-from-linear
description: Planeja e implementa issues frontend do Linear sobre telas, componentes, navegação e integração com APIs, recebidas por ID, nome ou URL, atualizando status e comentários conforme a execução evolui. Use para trabalho frontend; issues exclusivamente de backend pertencem à skill de backend.
---

# Planejar e desenvolver issue frontend do Linear

Transforme a especificação da issue em um plano de tarefas e, quando a execução estiver autorizada e o modo ativo permitir, entregue o frontend implementado e verificado contra os critérios de aceite. Em modo de planejamento, encerre no plano, sem implementar.

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

- **Contexto:** problema, objetivo, fluxos do usuário e escopo da issue.
- **Query:** consulta ou operação especificada para consumo pelo frontend, incluindo exemplos de entrada e saída quando fornecidos.
- **Regras:** regras de negócio e comportamentos da interface que a implementação deve cumprir.
- **Restrições:** limites, dependências e comportamentos fora do escopo.
- **Stack e padrões:** tecnologias e convenções indicadas para a solução.
- **Critérios de aceite:** condições objetivas para considerar a entrega atendida.
- **Verificação:** procedimentos, comandos e cenários definidos para validar a entrega.

Reconheça títulos equivalentes sem exigir correspondência literal. Se uma seção estiver ausente, procure a informação no restante da descrição e nas referências relevantes; sinalize o que continuar pendente, sem inventar conteúdo. Uma issue exclusivamente visual pode não exigir query ou integração com API. Esclareça lacunas ou conflitos que afetem a solução antes de implementar a parte dependente.

Relacione também as referências visuais às seções correspondentes. Use os requisitos extraídos para orientar as tarefas e a conferência final dos critérios de aceite.

## 3. Investigar o frontend existente

- Leia os arquivos AGENTS.md da raiz e da aplicação, o PRD.md e os READMEs relevantes antes de propor mudanças.
- Confira as versões instaladas e consulte a documentação oficial correspondente antes de alterar APIs ou configurações. Para Next.js, observe também a documentação local indicada em apps/web/AGENTS.md.
- Procure telas, componentes, tokens, assets e histórias semelhantes. Preserve os padrões existentes antes de propor novos elementos.
- Consulte as referências visuais vinculadas à issue com as ferramentas disponíveis; quando houver Figma, examine os frames e assets relevantes. Não substitua decisões de design ausentes por uma proposta inventada.
- Confira os contratos reais da API e o código de consumo existente. Exemplos e dados de Storybook não estabelecem regras de negócio nem contratos de produção.

## 4. Planejar as tarefas

Apresente uma lista ordenada de tarefas, com resultado esperado, dependências e verificações. Conforme o escopo da issue, cubra:

- Rotas, páginas e layouts no App Router; composição de atoms, molecules, organisms e templates, reutilizando componentes existentes.
- Responsabilidades de Server Components e dos limites interativos com `"use client"`.
- Props, eventos, estado e fluxo de dados; queries ou mutations existentes que serão consumidas e tratamento das respostas.
- Estados relevantes de carregamento, vazio, erro, sucesso e validação de formulários, conforme os requisitos e padrões da base.
- Fidelidade visual, comportamento responsivo, semântica, teclado, foco e nomes acessíveis.
- Histórias e testes necessários, vinculando tarefas aos critérios de aceite.

Antes de finalizar, releia a issue e confronte o plano com o código para evitar regressões e padrões desalinhados. Pergunte quando uma lacuna de produto, negócio, arquitetura ou design afetar a solução; continue apenas tarefas independentes da resposta.

## 5. Iniciar e implementar dentro do escopo frontend

Antes de começar a implementação autorizada, mova a issue para o estado de andamento confirmado no time (por exemplo, `In Progress`), seguindo as regras de transição acima.

- Siga o plano e os padrões de Next.js, TypeScript, Tailwind CSS e Atomic Design do projeto. Preserve alterações existentes do usuário.
- Consuma os contratos existentes. Mudanças necessárias em schema GraphQL, resolvers, regras do servidor, persistência ou banco são dependências backend: descreva o comportamento necessário e seu impacto, sem implementá-las nesta skill.
- Não invente contratos, permissões, regras de negócio ou funcionalidades ausentes. Não use mocks para apresentar uma integração como concluída; dados demonstrativos devem ficar claramente identificados nos contextos apropriados.
- Se a issue for exclusivamente backend, informe que ela está fora do escopo desta skill e indique a skill plan-backend-issue-from-linear. Para issues mistas, delimite as tarefas frontend e as dependências backend.
- Atualize histórias quando mudanças em componentes justificarem exemplos de variantes, estados ou interações. Registre decisões confirmadas e pendências no PRD.md e atualize documentação quando exigido pelas instruções do projeto.

## 6. Testar e verificar

- Execute, a partir da raiz, `pnpm --filter @hermex/web typecheck` e `pnpm --filter @hermex/web build` para mudanças de código frontend.
- Execute os testes relevantes disponíveis e acrescente testes proporcionais ao comportamento alterado quando necessários. Não instale infraestrutura de testes automaticamente para toda issue; se ela for necessária, esclareça a decisão antes de adicioná-la.
- Para mudanças em histórias ou na configuração do Storybook, execute `pnpm --filter @hermex/web build-storybook` quando pertinente.
- Com navegador disponível, confira as telas afetadas, responsividade, acessibilidade e interações. Verifique os estados e fluxos exigidos pela issue e compare o resultado com a referência visual quando houver.
- Investigue falhas para distinguir regressões introduzidas de problemas preexistentes. Corrija regressões dentro do escopo; se a solução depender de regra de negócio não prevista ou ampliar o escopo, pergunte antes de prosseguir.
- Informe verificações indisponíveis ou bloqueadas e suas limitações. Não declare validação visual, integração real ou testes concluídos sem evidência.

## 7. Conferir contra a issue

Releia a especificação e entregue um checklist dos critérios de aceite, indicando para cada item a evidência de atendimento ou a pendência. Resuma as mudanças, verificações executadas, dependências backend e decisões ainda necessárias. Em planejamento, apresente as verificações previstas como futuras, sem marcar critérios como implementados.


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

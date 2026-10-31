<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Hermex — instruções específicas

Leia também o `AGENTS.md` da raiz.

- Mantenha rotas, páginas e layouts em `src/app` (App Router).
- Organize componentes em `src/components/atoms`, `molecules`, `organisms`
  e `templates`; crie componentes conforme o uso real das telas.
- Use Server Components por padrão e delimite componentes interativos com
  `"use client"` quando necessário.
- Use Tailwind CSS via PostCSS. O build usa Webpack devido ao bloqueio de portas
  encontrado com Turbopack neste ambiente.
- Preserve o bloco gerado pelo Next.js acima e consulte a documentação local da
  versão instalada antes de alterar suas APIs ou configurações.
- Mantenha segredos no servidor; variáveis `NEXT_PUBLIC_*` são públicas.
- Auth.js está definido para a próxima etapa; veja `src/lib/auth/README.md`.
  Não apresente login ou cadastro como funcionais antes da implementação.
- Para verificar esta aplicação, execute na raiz
  `pnpm --filter @hermex/web typecheck` e `pnpm --filter @hermex/web build`.
  Para mudanças visuais, verifique responsividade, acessibilidade e interações
  quando houver navegador disponível; informe limitações da validação.

# Autenticação — próxima etapa

Decisões aprovadas: Auth.js, e-mail e senha, Google e cadastro público.
Perfis (funcionários/clientes) e permissões: pendentes.

Credentials exige estratégia JWT no Auth.js. Usuários e hashes de senha precisam
ser persistidos explicitamente; Auth.js não implementa cadastro por senha.
A integração segura entre a sessão do Next.js e os recursos protegidos do NestJS
será implementada junto ao fluxo de autenticação. Nenhuma rota de negócio está
protegida nesta etapa, e ainda não existe login ou cadastro funcional.

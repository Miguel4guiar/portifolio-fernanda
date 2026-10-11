# RAIO — Sanity Studio

Este é o painel de conteúdo usado para publicar, editar e apagar imagens e vídeos do portfólio.

1. Crie um projeto em https://www.sanity.io/manage e copie o Project ID.
2. Copie `.env.example` para `.env` e preencha `SANITY_STUDIO_PROJECT_ID`.
3. Rode `npm install` e `npm run dev` dentro desta pasta.
4. Faça login com sua conta Sanity e selecione o projeto/dataset correto.
5. Para disponibilizar o painel pela internet: `npm run deploy`.
6. Configure `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET=production` e `VITE_SANITY_STUDIO_URL` no ambiente de deploy do site.

Não coloque tokens de escrita do Sanity no frontend. A autenticação e as permissões de edição ficam no Sanity Studio.

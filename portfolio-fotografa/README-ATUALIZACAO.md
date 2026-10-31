# FESHOOTS — atualização visual editorial

Esta versão reformula o frontend com uma direção visual editorial inspirada na apresentação minimalista de portfólios de fotografia: fundo em tom de papel, tipografia serifada, imagens em destaque, grid assimétrico, navegação discreta e transições suaves. O conteúdo, nome e dados de Fernanda foram preservados.

## Sanity preservado

O site continua consultando o mesmo projeto e dataset:
- Project ID: `dsc1bcf0`
- Dataset: `production`
- Studio: https://raio-portfolio-studio.sanity.studio/

Não foi criado outro projeto/dataset e nenhuma migração ou exclusão de documentos foi executada. A consulta continua lendo documentos `_type == "photo"`, incluindo imagem, thumbnail, vídeo, categoria, ano, featured e flags de exibição. As fotos publicadas continuam aparecendo no site conforme esses campos.

## Publicar na Vercel

1. Descompacte o ZIP e abra a pasta que contém `package.json`.
2. Substitua os arquivos do repositório atual pelos arquivos desta versão, mantendo `.env` local fora do Git.
3. No projeto Vercel, configure **Root Directory** como `./` (raiz do repositório, onde está este `package.json`).
4. Configure **Framework Preset**: Vite; **Build Command**: `npm run build`; **Output Directory**: `dist`; **Install Command**: `npm install`.
5. Em **Settings → Environment Variables**, cadastre:
   - `VITE_SANITY_PROJECT_ID` = `dsc1bcf0`
   - `VITE_SANITY_DATASET` = `production`
6. Faça commit e push para o GitHub. A Vercel fará um novo deploy.

O `vercel.json` foi simplificado porque o anterior apontava para uma subpasta `portfolio-fotografa` que não corresponde à raiz do projeto quando o repositório contém diretamente este `package.json`.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Para validar a compilação:

```bash
npm run build
```

## Sanity Studio

O Studio existente está na pasta `studio`. Para trabalhar nele:

```bash
cd studio
npm install
npm run dev
```

O Studio hospedado continua em `https://raio-portfolio-studio.sanity.studio/`. Não é necessário publicar um novo Studio para atualizar somente o layout do site.

## Observações

- `.env`, `studio/.env`, `node_modules`, `.git` e saídas compiladas não são incluídos no ZIP.
- O build não foi validado neste ambiente porque o `node_modules` recebido contém dependências nativas do Rollup incompatíveis com o sistema operacional do ambiente. Execute `npm install` e `npm run build` no computador antes do push; isso não indica, por si só, um erro no código-fonte.

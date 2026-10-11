# Ajustes aplicados

- Frontend configurado para usar o projeto Sanity `dsc1bcf0` e dataset `production` via variáveis Vite.
- Consulta pública ao Sanity atualizada para documentos publicados, com normalização de URLs de imagem e campos opcionais de vídeo.
- Archive atualizado para exibir estados de carregamento/erro, filtros e conteúdo publicado.
- Cursor customizado renovado com aro suave, ponto central, rótulos em elementos interativos e respeito à preferência de movimento reduzido/dispositivos touch.
- Labels e IDs de campos do formulário administrativo explicitamente associados.

## Executar localmente

1. Confira o arquivo `.env` na raiz; ele deve conter `VITE_SANITY_PROJECT_ID=dsc1bcf0` e `VITE_SANITY_DATASET=production`.
2. No terminal da pasta principal, execute `npm install` e depois `npm run dev`.
3. No Sanity Studio, confirme que a foto foi publicada no dataset `production` e que o tipo de documento é `photo`, com o campo de imagem chamado `image`.

Observação: o build automatizado não pôde ser concluído neste ambiente porque as dependências Vite do ZIP não estavam executáveis e a reinstalação de dependências excedeu o tempo disponível. Execute `npm install` localmente antes de testar.

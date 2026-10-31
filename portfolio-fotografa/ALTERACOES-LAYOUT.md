# Atualização visual do portfólio

O layout principal foi atualizado para seguir a referência visual da pasta `site fernanda`:
- navegação lateral fixa no desktop e menu recolhível em telas menores;
- galeria horizontal com rolagem pelo mouse, arraste e snap;
- paleta clara em tons de papel, lilás, rosa, sálvia e vinho;
- tipografia monoespaçada, legendas editoriais e efeitos de hover;
- páginas Sobre e Contato no mesmo sistema visual;
- lightbox para visualizar e navegar entre os projetos.

A integração existente com o Sanity (`useManagedPhotos` e `cms.js`) foi preservada. As imagens são carregadas do Sanity quando o projeto está configurado. Nenhuma imagem da pasta de referência `site fernanda` foi copiada.

## Executar localmente

1. Instale as dependências com `npm install`.
2. Configure as variáveis do Sanity no arquivo `.env` conforme `.env.example`.
3. Execute `npm run dev`.

O arquivo `.env` não é incluído no ZIP por segurança; configure suas credenciais localmente.

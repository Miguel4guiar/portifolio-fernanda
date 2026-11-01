# Álbuns e seleção de fotos no Sanity

O portfólio agora trabalha com documentos do tipo **Álbum / Projeto** no Sanity. Cada álbum tem sua própria capa, categoria e uma lista selecionável de fotos.

## Como cadastrar um álbum

1. Abra o Sanity Studio do projeto.
2. Crie primeiro os documentos de foto em **Item do portfólio**. Em cada foto, preencha título, categoria, ano e envie a imagem (ou vídeo, conforme o caso). Publique os documentos.
3. Abra **Álbum / Projeto** e clique em criar.
4. Informe o nome do projeto, escolha a categoria, adicione uma foto de capa e, na seção **Fotos do álbum**, selecione somente as fotos que deseja incluir. É possível reordenar a lista.
5. Marque **Exibir no site** e publique o álbum.

A capa aparece na categoria escolhida. Ao clicar nela no site, o visitante entra no álbum e vê apenas as fotos selecionadas naquele documento. Clicar em uma foto abre a visualização ampliada; as setas navegam pelas fotos daquele mesmo álbum.

## Adicionar ou trocar fotos depois

Edite o documento do álbum e altere a lista **Fotos que pertencem a este álbum**: adicione novas referências, remova as que não deseja e arraste para mudar a ordem. Publique novamente.

## Observações importantes

- Uma mesma foto pode ser referenciada em mais de um álbum, se você quiser reutilizá-la.
- Para uma foto aparecer dentro de um álbum, ela precisa estar publicada no Sanity e selecionada na lista daquele álbum.
- O site atualiza o acervo ao receber alterações publicadas no Sanity.
- Depois de adicionar os novos tipos de documento ao schema, publique/deploy o Sanity Studio para que o menu **Álbum / Projeto** apareça na interface de administração. A aplicação do site também precisa ser publicada novamente para disponibilizar a nova navegação.
- O arquivo `.env` com credenciais locais não foi incluído no ZIP. Preserve o seu `.env` existente; use `.env.example` como referência caso precise recriá-lo.

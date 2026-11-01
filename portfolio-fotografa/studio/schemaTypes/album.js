/** Álbuns/projetos: cada documento reúne uma capa e as fotos escolhidas pela fotógrafa. */
export default {
  name: 'album',
  title: 'Álbum / Projeto',
  type: 'document',
  groups: [
    { name: 'content', title: 'Projeto', default: true },
    { name: 'photos', title: 'Fotos do álbum' },
    { name: 'placement', title: 'Publicação' },
  ],
  fields: [
    { name: 'title', title: 'Nome do álbum / projeto', type: 'string', group: 'content', validation: (Rule) => Rule.required().max(100) },
    { name: 'category', title: 'Categoria', type: 'string', group: 'content', options: { list: [{ title: 'Trap / Rap', value: 'TRAP / RAP' }, { title: 'Pop', value: 'POP' }, { title: 'Backstage', value: 'BACKSTAGE' }, { title: 'Editorial', value: 'EDITORIAL' }] }, validation: (Rule) => Rule.required() },
    { name: 'artist', title: 'Artista / cliente', type: 'string', group: 'content' },
    { name: 'year', title: 'Ano', type: 'number', group: 'content', initialValue: new Date().getFullYear() },
    { name: 'description', title: 'Descrição', type: 'text', rows: 3, group: 'content' },
    { name: 'coverImage', title: 'Foto de capa', type: 'image', group: 'content', options: { hotspot: true }, validation: (Rule) => Rule.required() },
    { name: 'photos', title: 'Fotos que pertencem a este álbum', type: 'array', group: 'photos', of: [{ type: 'reference', to: [{ type: 'photo' }], options: { disableNew: false } }], validation: (Rule) => Rule.min(1), description: 'Selecione aqui as fotos que deseja exibir dentro deste álbum. Você pode adicionar, remover e reordenar.' },
    { name: 'published', title: 'Exibir no site', type: 'boolean', group: 'placement', initialValue: true },
    { name: 'orderRank', title: 'Ordem manual', type: 'number', group: 'placement', description: 'Número menor aparece primeiro.' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
    prepare({ title, subtitle, media }) { return { title: title || 'Álbum sem título', subtitle, media }; },
  },
};

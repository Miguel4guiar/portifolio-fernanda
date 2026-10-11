/** Schema para itens do portfólio no Sanity Studio v3. */
export default {
  name: 'photo',
  title: 'Item do portfólio',
  type: 'document',
  groups: [
    { name: 'content', title: 'Conteúdo', default: true },
    { name: 'placement', title: 'Onde aparece' },
  ],
  fields: [
    { name: 'title', title: 'Título do trabalho', type: 'string', group: 'content', validation: (Rule) => Rule.required().max(100) },
    { name: 'mediaType', title: 'Tipo de mídia', type: 'string', group: 'content', initialValue: 'image', options: { list: [{ title: 'Fotografia', value: 'image' }, { title: 'Vídeo / filme', value: 'video' }], layout: 'radio' }, validation: (Rule) => Rule.required() },
    { name: 'category', title: 'Categoria', type: 'string', group: 'content', options: { list: [{ title: 'Trap / Rap', value: 'Trap/Rap' }, { title: 'Pop', value: 'Pop' }, { title: 'Backstage', value: 'Backstage' }, { title: 'Editorial', value: 'Editorial' }, { title: 'Fashion', value: 'Fashion' }, { title: 'Publicidade', value: 'Publicidade' }, { title: 'Documentário', value: 'Documentário' }] }, validation: (Rule) => Rule.required() },
    { name: 'artist', title: 'Artista / cliente / projeto', type: 'string', group: 'content', validation: (Rule) => Rule.required() },
    { name: 'year', title: 'Ano', type: 'number', group: 'content', initialValue: new Date().getFullYear(), validation: (Rule) => Rule.required().min(1990).max(2100) },
    { name: 'event', title: 'Contexto / descrição curta', type: 'string', group: 'content', description: 'Turnê, campanha, clipe, festival ou contexto do trabalho.' },
    { name: 'image', title: 'Imagem', type: 'image', group: 'content', options: { hotspot: true }, description: 'Obrigatória para fotografia. Para vídeo, pode ser usada como capa.' , hidden: ({ document }) => document?.mediaType === 'video' && Boolean(document?.video) },
    { name: 'video', title: 'Arquivo de vídeo', type: 'file', group: 'content', options: { accept: 'video/mp4,video/webm,video/quicktime' }, description: 'Envie um MP4/WebM/MOV ao Sanity. Para filmes longos ou arquivos muito pesados, prefira Vimeo/YouTube usando o campo abaixo.', hidden: ({ document }) => document?.mediaType !== 'video' },
    { name: 'videoUrl', title: 'Ou link de vídeo', type: 'url', group: 'content', description: 'YouTube, Vimeo ou URL direta de MP4. Use arquivo OU link.', hidden: ({ document }) => document?.mediaType !== 'video' },
    { name: 'thumbnail', title: 'Capa do vídeo', type: 'image', group: 'content', options: { hotspot: true }, description: 'Recomendado: imagem horizontal/vertical que represente o filme.', hidden: ({ document }) => document?.mediaType !== 'video' },
    { name: 'featured', title: 'Destacar na página inicial', type: 'boolean', group: 'content', initialValue: false },
    { name: 'showInGallery', title: 'Mostrar na Galeria', type: 'boolean', group: 'placement', initialValue: true },
    { name: 'showInArchive', title: 'Mostrar no Archive', type: 'boolean', group: 'placement', initialValue: true },
    { name: 'orderRank', title: 'Ordem manual (opcional)', type: 'number', group: 'placement', description: 'Número menor aparece primeiro. Deixe vazio para ordenar por data.' },
  ],
  validation: (Rule) => Rule.custom((doc) => {
    if (doc?.mediaType === 'image' && !doc?.image) return { message: 'Adicione uma imagem para este item.' , path: ['image'] };
    if (doc?.mediaType === 'video' && !doc?.video && !doc?.videoUrl) return { message: 'Envie um arquivo de vídeo ou informe um link.', path: ['video'] };
    return true;
  }),
  preview: {
    select: { title: 'title', subtitle: 'artist', media: 'image', mediaType: 'mediaType' },
    prepare({ title, subtitle, media, mediaType }) { return { title: `${mediaType === 'video' ? '▶ ' : '▧ '}${title || 'Sem título'}`, subtitle }; },
  },
};

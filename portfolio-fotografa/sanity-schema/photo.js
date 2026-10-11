/**
 * Schema do documento "photo" para o Sanity Studio.
 *
 * Como usar:
 * 1. Crie o Studio (passo 2 do guia): npm create sanity@latest
 * 2. Copie este arquivo para schemaTypes/photo.js dentro do projeto do Studio
 * 3. Importe e registre em schemaTypes/index.js (exemplo no fim deste arquivo)
 */
export default {
  name: 'photo',
  title: 'Foto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Trap/Rap', value: 'Trap/Rap' },
          { title: 'Pop', value: 'Pop' },
          { title: 'Backstage', value: 'Backstage' },
          { title: 'Editorial', value: 'Editorial' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'artist',
      title: 'Artista',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Ano',
      type: 'number',
      validation: (Rule) => Rule.required().min(1990).max(2100),
    },
    {
      name: 'event',
      title: 'Evento / contexto',
      type: 'string',
      description: 'Ex: nome da turnê, festival ou publicação',
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true }, // permite escolher o ponto focal do crop
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Destaque na Home',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artist',
      media: 'image',
    },
  },
};

/**
 * ——— schemaTypes/index.js ———
 * import photo from './photo';
 * export const schemaTypes = [photo];
 */

/** Projetos editoriais / direção criativa: foto à esquerda e texto completo à direita. */
export default {
  name: 'project',
  title: 'Projetos (Foto + Texto)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo / Cliente / Ano (Opcional)',
      type: 'string',
      description: 'Ex: Direção Criativa · 2026',
    },
    {
      name: 'image',
      title: 'Foto do Projeto (Lado Esquerdo)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Texto do Projeto (Lado Direito)',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link Externo (Opcional)',
      type: 'url',
      description: 'Caso queira um botão levando para o projeto completo, clipe ou matéria.',
    },
    {
      name: 'orderRank',
      title: 'Ordem manual (opcional)',
      type: 'number',
      description: 'Número menor aparece primeiro (ex: 1, 2, 3...).',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Projeto sem título',
        subtitle,
        media,
      };
    },
  },
};
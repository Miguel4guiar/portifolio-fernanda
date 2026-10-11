/**
 * Shape espelha o schema sugerido para o CMS (Sanity/Supabase):
 * { id, title, category, artist, year, event, image, featured }
 * Em produção, este arquivo é substituído por um fetch ao CMS
 * (ver src/lib/cms.js para o adapter).
 */
export const CATEGORIES = ['All', 'Trap/Rap', 'Pop', 'Backstage', 'Editorial'];

export const photos = [
  {
    id: 'ph-001',
    title: 'Luz Vermelha',
    category: 'Trap/Rap',
    artist: 'Matuê',
    year: 2024,
    event: 'Trap Fest SP',
    image: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'ph-002',
    title: 'Bastidor 04h',
    category: 'Backstage',
    artist: 'Marina Sena',
    year: 2023,
    event: 'Turnê De Primeira',
    image: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'ph-003',
    title: 'Contorno',
    category: 'Editorial',
    artist: 'Djonga',
    year: 2024,
    event: 'Editorial Revista Vibe',
    image: 'https://images.unsplash.com/photo-1571266028243-e4bb35a49b28?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'ph-004',
    title: 'Palco Sujo',
    category: 'Pop',
    artist: 'Anitta',
    year: 2022,
    event: 'Festival Popload',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'ph-005',
    title: 'Fumaça e Néon',
    category: 'Trap/Rap',
    artist: 'Travis Scott',
    year: 2023,
    event: 'Circo Loco BR',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'ph-006',
    title: 'Camarim 3',
    category: 'Backstage',
    artist: 'Djonga',
    year: 2021,
    event: 'Turnê Heresia',
    image: 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'ph-007',
    title: 'Frame 21A',
    category: 'Editorial',
    artist: 'Marina Sena',
    year: 2024,
    event: 'Capa — Rolling Stone BR',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'ph-008',
    title: 'Grito de Massa',
    category: 'Pop',
    artist: 'Anitta',
    year: 2023,
    event: 'Rock in Rio',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
];

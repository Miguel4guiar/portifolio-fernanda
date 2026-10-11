/** Cliente público do Sanity: leitura apenas de documentos publicados. */
import { createClient } from '@sanity/client';
import { photos as mockPhotos } from '../data/photos.js';

const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID || '').trim();
const dataset = (import.meta.env.VITE_SANITY_DATASET || 'production').trim();
export const isSanityConfigured = Boolean(projectId && dataset);

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-02-19',
      useCdn: false,
      perspective: 'published',
    })
  : null;

// Os aliases cobrem os campos usados pela galeria e pelo Archive.
const QUERY = `*[_type == "photo"] | order(coalesce(orderRank, 999999) asc, year desc, _createdAt desc) {
  "id": _id,
  title,
  category,
  artist,
  year,
  event,
  mediaType,
  "image": coalesce(image.asset->url, photo.asset->url, coverImage.asset->url, thumbnail.asset->url),
  "thumbnail": coalesce(thumbnail.asset->url, image.asset->url, photo.asset->url, coverImage.asset->url),
  "videoThumbnail": videoThumbnail.asset->url,
  "videoAsset": video.asset->url,
  videoUrl,
  featured,
  "showInGallery": coalesce(showInGallery, true),
  "showInArchive": coalesce(showInArchive, true),
  orderRank,
  _createdAt
}`;

function normalize(item = {}) {
  const image = item.image || item.thumbnail || item.videoThumbnail || '';
  const videoUrl = item.videoUrl || item.videoAsset || '';
  return {
    ...item,
    id: item.id || item._id || `${item.title || 'media'}-${item._createdAt || Math.random().toString(36).slice(2)}`,
    title: item.title || item.artist || 'Untitled project',
    artist: item.artist || 'Projeto visual',
    category: item.category || (videoUrl ? 'Filme' : 'Fotografia'),
    image,
    thumbnail: item.thumbnail || image,
    videoUrl,
    mediaType: item.mediaType || (videoUrl ? 'video' : 'image'),
    showInGallery: item.showInGallery !== false,
    showInArchive: item.showInArchive !== false,
  };
}

export async function getPhotos() {
  if (!client) return mockPhotos.map(normalize);
  const result = await client.fetch(QUERY);
  return (Array.isArray(result) ? result : []).map(normalize).filter((item) => item.image || item.videoUrl);
}

export async function getFeaturedPhotos() {
  const all = await getPhotos();
  return all.filter((item) => item.featured && item.mediaType !== 'video' && item.image);
}

export function subscribeToPhotos(onChange, onError = () => {}) {
  if (!client) return () => {};
  const subscription = client.listen('*[_type == "photo"]', {}, { visibility: 'query' }).subscribe({
    next: () => getPhotos().then(onChange).catch(onError),
    error: onError,
  });
  return () => subscription.unsubscribe();
}

/** Cliente público do Sanity: leitura apenas de documentos publicados. */
import { createClient } from '@sanity/client';
import { photos as mockPhotos } from '../data/photos.js';

const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID || '').trim();
const dataset = (import.meta.env.VITE_SANITY_DATASET || 'production').trim();
export const isSanityConfigured = Boolean(projectId && dataset);

const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion: '2025-02-19', useCdn: false, perspective: 'published' })
  : null;

function getYouTubeThumb(url) {
  if (!url) return '';
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : '';
}

const PHOTO_FIELDS = `"id": _id, title, category, artist, year, event, description, mediaType,
  "image": coalesce(image.asset->url, photo.asset->url, coverImage.asset->url, thumbnail.asset->url),
  "thumbnail": coalesce(thumbnail.asset->url, image.asset->url, photo.asset->url, coverImage.asset->url),
  "videoThumbnail": videoThumbnail.asset->url, "videoAsset": video.asset->url, videoUrl,
  featured, "showInGallery": coalesce(showInGallery, true), "showInArchive": coalesce(showInArchive, true), orderRank, _createdAt`;

const PHOTO_QUERY = `*[_type == "photo"] | order(coalesce(orderRank, 999999) asc, year desc, _createdAt desc) { ${PHOTO_FIELDS} }`;

const ALBUM_QUERY = `*[_type == "album" && published != false] | order(coalesce(orderRank, 999999) asc, year desc, _createdAt desc) {
  "id": _id, title, category, artist, year, description,
  "cover": coverImage.asset->url,
  "photos": photos[]->{ ${PHOTO_FIELDS} }, orderRank, _createdAt
}`;

const PROJECT_QUERY = `*[_type == "project"] | order(coalesce(orderRank, 999999) asc, _createdAt desc) {
  "id": _id,
  title,
  subtitle,
  description,
  link,
  "image": coalesce(image.asset->url, coverImage.asset->url),
  orderRank,
  _createdAt
}`;

function normalize(item = {}) {
  const videoUrl = item.videoUrl || item.videoAsset || '';
  const ytThumb = getYouTubeThumb(videoUrl);
  const image = item.image || item.thumbnail || item.videoThumbnail || ytThumb || '';

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
  const result = await client.fetch(PHOTO_QUERY);
  return (Array.isArray(result) ? result : [])
    .map(normalize)
    .filter((item) => item.image || item.videoUrl);
}

export async function getAlbums() {
  if (!client) return [];
  const result = await client.fetch(ALBUM_QUERY);
  return (Array.isArray(result) ? result : [])
    .map((album) => {
      const normalizedPhotos = (album.photos || [])
        .filter(Boolean)
        .map(normalize)
        .filter((photo) => photo.image || photo.videoUrl);

      const cover = album.cover || normalizedPhotos[0]?.image || '';

      return {
        ...album,
        cover,
        photos: normalizedPhotos,
      };
    })
    .filter((album) => album.cover || album.photos.length > 0);
}

export async function getProjects() {
  if (!client) return [];
  const result = await client.fetch(PROJECT_QUERY);
  return (Array.isArray(result) ? result : []).filter((item) => item.image || item.title);
}

export async function getFeaturedPhotos() {
  const all = await getPhotos();
  return all.filter((item) => item.featured && item.mediaType !== 'video' && item.image);
}

export function subscribeToPhotos(onChange, onError = () => {}) {
  if (!client) return () => {};
  const subscription = client
    .listen('*[_type in ["photo", "album", "project"]]', {}, { visibility: 'query' })
    .subscribe({
      next: () =>
        Promise.all([getPhotos(), getAlbums(), getProjects()])
          .then(([photos, albums, projects]) => onChange(photos, albums, projects))
          .catch(onError),
      error: onError,
    });
  return () => subscription.unsubscribe();
}
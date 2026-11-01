import { useEffect, useState } from 'react';
import { getPhotos, getAlbums, subscribeToPhotos } from './cms.js';

/** Carrega fotos e álbuns publicados no Sanity e acompanha alterações em tempo real. */
export function useManagedPhotos() {
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([getPhotos(), getAlbums()])
      .then(([photoData, albumData]) => {
        if (!mounted) return;
        setPhotos(Array.isArray(photoData) ? photoData : []);
        setAlbums(Array.isArray(albumData) ? albumData : []);
        setError(null);
      })
      .catch((err) => { if (mounted) { setError(err); console.error('[Sanity] Falha ao carregar o portfólio:', err); } })
      .finally(() => { if (mounted) setLoading(false); });

    const unsubscribe = subscribeToPhotos((photoData, albumData) => {
      if (!mounted) return;
      setPhotos(Array.isArray(photoData) ? photoData : []);
      if (Array.isArray(albumData)) setAlbums(albumData);
    }, (err) => { if (mounted) { setError(err); console.error('[Sanity] Falha na atualização em tempo real:', err); } });
    return () => { mounted = false; unsubscribe(); };
  }, []);

  return { photos, albums, loading, error };
}

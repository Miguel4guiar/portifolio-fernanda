import { useCallback, useEffect, useState } from 'react';
import { getPhotos, subscribeToPhotos } from './cms.js';

const STORAGE_KEY = 'raio_uploaded_photos_v1';

/** Carrega o acervo publicado e mantém atualizações do Sanity em tempo real. */
export function useManagedPhotos() {
  const [basePhotos, setBasePhotos] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUploaded(JSON.parse(raw));
    } catch {
      setUploaded([]);
    }

    getPhotos()
      .then((data) => {
        if (!mounted) return;
        setBasePhotos(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
        console.error('[Sanity] Não foi possível carregar as fotos publicadas:', err);
      })
      .finally(() => { if (mounted) setLoading(false); });

    const unsubscribe = subscribeToPhotos(
      (data) => { if (mounted) { setBasePhotos(Array.isArray(data) ? data : []); setError(null); } },
      (err) => { if (mounted) { setError(err); console.error('[Sanity] Falha na atualização em tempo real:', err); } }
    );

    return () => { mounted = false; unsubscribe(); };
  }, []);

  const persist = useCallback((list) => {
    setUploaded(list);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (err) {
      console.warn('Não foi possível salvar as fotos locais neste navegador.', err);
    }
  }, []);

  const addPhoto = useCallback((photo) => {
    const withId = { ...photo, id: `up-${Date.now()}`, uploadedByUser: true };
    persist([withId, ...uploaded]);
    return withId;
  }, [uploaded, persist]);

  const deletePhoto = useCallback((id) => {
    persist(uploaded.filter((photo) => photo.id !== id));
  }, [uploaded, persist]);

  return {
    photos: [...uploaded, ...basePhotos],
    loading,
    error,
    addPhoto,
    deletePhoto,
  };
}

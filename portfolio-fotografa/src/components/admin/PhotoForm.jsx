import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, ImagePlus, Check, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../../data/photos.js';

const MAX_DIMENSION = 1800;
const JPEG_QUALITY = 0.82;

function processImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      };
      img.onerror = () => reject(new Error('Arquivo de imagem inválido.'));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

const emptyForm = { artist: '', category: CATEGORIES[1], featured: false };

/**
 * Formulário enxuto: só pede a foto, o nome do artista e a categoria.
 * Título, ano e evento são preenchidos automaticamente e podem ser
 * ajustados depois direto no Sanity, quando ele for conectado.
 */
export default function PhotoForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const reset = () => {
    setForm(emptyForm);
    setPreview(null);
    setRawImage(null);
    setError('');
  };

  const handleFile = async (file) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Envie um arquivo de imagem (JPG, PNG ou WebP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('Imagem muito grande — tente um arquivo de até 15MB.');
      return;
    }
    try {
      const dataUrl = await processImageFile(file);
      setPreview(dataUrl);
      setRawImage(dataUrl);
    } catch {
      setError('Não foi possível processar essa imagem. Tente outro arquivo.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rawImage) {
      setError('Escolha uma foto antes de publicar.');
      return;
    }
    if (!form.artist.trim()) {
      setError('Preencha o nome do artista.');
      return;
    }
    onAdd({
      title: `${form.artist} — ${form.category}`,
      artist: form.artist.trim(),
      category: form.category,
      year: new Date().getFullYear(),
      event: '',
      featured: form.featured,
      image: rawImage,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      reset();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:flex-row sm:gap-6">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden border-2 border-dashed border-smoke/40 bg-void transition-colors hover:border-acid sm:w-52"
      >
        {preview ? (
          <img src={preview} alt="Pré-visualização" className="h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-2 px-4 text-center font-mono text-xs uppercase tracking-widest2 text-smoke">
            <UploadCloud size={26} />
            Toque para escolher a foto
          </span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </button>

      <div className="flex flex-1 flex-col gap-4">
        <div className="border-b border-smoke/30 pb-2 transition-colors focus-within:border-acid">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest2 text-smoke">
            Artista
          </span>
          <input
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
            placeholder="Nome do artista"
            className="w-full bg-transparent font-body text-base text-bone focus:outline-none"
          />
        </div>

        <div className="border-b border-smoke/30 pb-2 transition-colors focus-within:border-acid">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest2 text-smoke">
            Categoria
          </span>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-transparent font-body text-base text-bone focus:outline-none"
          >
            {CATEGORIES.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c} className="bg-asphalt">{c}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest2 text-smoke">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="h-4 w-4 accent-acid"
          />
          Destacar na home
        </label>

        {error && (
          <p className="flex items-center gap-2 font-mono text-xs text-blood">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="mt-auto flex items-center justify-center gap-2 border border-acid px-6 py-3.5 font-mono text-xs uppercase tracking-widest2 text-acid transition-colors hover:bg-acid hover:text-void"
        >
          {saved ? (
            <>
              <Check size={16} /> Publicado
            </>
          ) : (
            <>
              <ImagePlus size={16} /> Publicar
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

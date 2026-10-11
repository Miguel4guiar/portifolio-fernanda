import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogOut, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../lib/useAdminAuth.js';
import { useManagedPhotos } from '../lib/useManagedPhotos.js';
import PhotoForm from '../components/admin/PhotoForm.jsx';
import PhotoManageList from '../components/admin/PhotoManageList.jsx';

function goHome() {
  window.location.hash = '';
}

function LoginGate({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError('Senha incorreta. Tente de novo.');
      setPassword('');
    }
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-void px-6">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full max-w-xs"
      >
        <Lock className="mb-5 text-acid" size={28} />
        <h1 className="mb-2 font-display text-2xl font-bold uppercase text-bone">
          Área da fotógrafa
        </h1>
        <p className="mb-8 font-mono text-xs text-smoke">
          Espaço reservado para adicionar fotos ao site.
        </p>

        <div className="mb-4 border-b border-smoke/30 pb-2 transition-colors focus-within:border-acid">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            autoFocus
            className="w-full bg-transparent font-body text-base text-bone placeholder:text-smoke/50 focus:outline-none"
          />
        </div>

        {error && (
          <p className="mb-4 flex items-center gap-2 font-mono text-xs text-blood">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full border border-acid py-3.5 font-mono text-xs uppercase tracking-widest2 text-acid transition-colors hover:bg-acid hover:text-void"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={goHome}
          className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-smoke transition-colors hover:text-bone"
        >
          <ArrowLeft size={14} /> Voltar pro site
        </button>
      </motion.form>
    </div>
  );
}

function Panel({ onLogout }) {
  const { photos, addPhoto, deletePhoto } = useManagedPhotos();

  return (
    <div className="min-h-[100svh] bg-void px-4 py-10 sm:px-6 sm:py-14 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <button
              onClick={goHome}
              className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-smoke transition-colors hover:text-bone"
            >
              <ArrowLeft size={14} /> Ver site
            </button>
            <h1 className="font-display text-3xl font-bold uppercase text-bone sm:text-4xl">
              Adicionar fotos
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-smoke transition-colors hover:text-blood"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>

        <div className="mb-12 border border-smoke/20 bg-asphalt p-5 sm:p-8">
          <PhotoForm onAdd={addPhoto} />
        </div>

        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest2 text-smoke">
          Suas fotos publicadas
        </h2>
        <PhotoManageList photos={photos} onDelete={deletePhoto} />

        <p className="mt-10 max-w-lg font-mono text-[11px] leading-relaxed text-smoke">
          Essas fotos ficam salvas neste navegador. Para elas aparecerem em
          qualquer aparelho, para qualquer visitante, é preciso ligar o
          Sanity (veja o README do projeto) — depois disso, essa mesma tela
          deixa de ser necessária e o cadastro passa a ser direto pelo
          Studio do Sanity.
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { authed, ready, login, logout } = useAdminAuth();

  if (!ready) return null;
  if (!authed) return <LoginGate onLogin={login} />;
  return <Panel onLogout={logout} />;
}

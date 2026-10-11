import { useCallback, useEffect, useState } from 'react';

const AUTH_KEY = 'raio_admin_authed';

/**
 * Proteção simples por senha para a área da fotógrafa.
 * A senha vem de VITE_ADMIN_PASSWORD (arquivo .env) — se não for definida,
 * usa "raio2026" como padrão (troque isso antes de publicar o site!).
 *
 * Limitação importante e honesta: como o site não tem servidor próprio,
 * essa senha fica dentro do código que roda no navegador. Isso barra
 * visitantes casuais, mas não é segurança de verdade (alguém muito
 * insistente, olhando o código-fonte, conseguiria descobrir a senha).
 * Quando o Sanity estiver conectado (ver README), o login de cadastro de
 * fotos passa a ser o login do próprio Sanity Studio — aí sim com
 * segurança de verdade.
 */
export function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const password = import.meta.env.VITE_ADMIN_PASSWORD || 'raio2026';

  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === 'true');
    setReady(true);
  }, []);

  const login = useCallback(
    (attempt) => {
      if (attempt === password) {
        localStorage.setItem(AUTH_KEY, 'true');
        setAuthed(true);
        return true;
      }
      return false;
    },
    [password]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }, []);

  return { authed, ready, login, logout };
}

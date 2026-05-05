'use client';

import { useState, useEffect, type ReactNode } from 'react';

/**
 * Layout del panel admin de Natura Esencials.
 *
 * Estrategia de seguridad (regla del proyecto):
 *   - Credenciales hardcoded (NO usa Supabase Auth).
 *   - Sesión persistida en localStorage.
 *   - El panel admin no expone datos sensibles: solo edita catálogo público.
 *
 * Para cambiar credenciales: editar las constantes ADMIN_USER / ADMIN_PASS abajo
 * y redeploy. (Más adelante se moverán a env vars con NEXT_PUBLIC_ no necesario
 * porque la verificación es solo UX — la verificación real al guardar la harán
 * las API routes.)
 */

const ADMIN_USER = 'natura-admin';
const ADMIN_PASS = 'natura2026'; // Carlos: cambia esto antes de deploy
const SESSION_KEY = 'natura-admin-session';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const session = typeof window !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null;
    setAuthed(session === 'ok');
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem(SESSION_KEY, 'ok');
      setAuthed(true);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <span className="text-graphite text-sm">Cargando…</span>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-pad-x">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-paper p-8 rounded-xl border border-ink/10 shadow-sm space-y-5"
        >
          <h1 className="font-display text-3xl text-center mb-1">
            Admin <em className="font-italic">Natura</em>
          </h1>
          <p className="text-center text-graphite text-sm">
            Acceso al panel de administración del catálogo.
          </p>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              required
              className="w-full px-3 py-2.5 border border-ink/15 rounded-sm focus:border-ink/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-graphite block mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-3 py-2.5 border border-ink/15 rounded-sm focus:border-ink/40 focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-ink text-paper text-sm uppercase tracking-wider rounded-sm hover:bg-ink/90"
          >
            Acceder
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="bg-paper border-b border-ink/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-pad-x py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/admin" className="font-display text-xl">
              Admin <em className="font-italic">Natura</em>
            </a>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <a href="/admin/products" className="text-graphite hover:text-ink">
                Productos
              </a>
              <a href="/admin/bundles" className="text-graphite hover:text-ink">
                Rituales
              </a>
              <a
                href="/eu/es"
                target="_blank"
                rel="noreferrer"
                className="text-graphite hover:text-ink"
              >
                Ver web ↗
              </a>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-wider text-graphite hover:text-ink"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

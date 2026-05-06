import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'Georgia, serif', background: '#FAFAF5', color: '#0F2018', minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontStyle: 'italic', color: '#3A6B47' }}>404</h1>
          <p style={{ marginTop: '1rem', color: '#5E6B5C' }}>Esta página no existe.</p>
          <Link href="/" style={{ marginTop: '2rem', display: 'inline-block', padding: '0.75rem 1.5rem', background: '#3A6B47', color: '#FAFAF5', textDecoration: 'none' }}>
            Volver a inicio
          </Link>
        </div>
      </body>
    </html>
  );
}

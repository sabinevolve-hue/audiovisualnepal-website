import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#6E6E73', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span aria-hidden="true" style={{ color: '#AEAEB2' }}>›</span>}
            {crumb.href ? (
              <Link href={crumb.href} style={{ color: '#0071E3', textDecoration: 'none' }}>{crumb.label}</Link>
            ) : (
              <span style={{ color: '#1D1D1F', fontWeight: 500 }} aria-current="page">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}

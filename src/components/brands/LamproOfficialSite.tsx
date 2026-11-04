// Prominent link from AudioVisual Nepal's Lampro pages to the official Lampro
// distributor site for Nepal (lampronepal.com, run by sister company Evolve Tech Pvt. Ltd.).
// Server component: plain followed <a href>, no client JS.

export const LAMPRO_NEPAL_URL = 'https://lampronepal.com/'

export default function LamproOfficialSite({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      aria-label="Official Lampro distributor site for Nepal"
      className={compact ? 'container-site px-6 pt-6' : ''}
    >
      <a
        href={LAMPRO_NEPAL_URL}
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4 transition hover:opacity-90"
        style={{ background: '#0F58FB0D', border: '1.5px solid #0F58FB40', textDecoration: 'none' }}
      >
        <span>
          <span className="block text-[11px] font-bold uppercase" style={{ letterSpacing: '0.1em', color: '#0F58FB' }}>
            Official Lampro distributor site for Nepal
          </span>
          <span className="block text-[14px]" style={{ color: '#0B1E3D', fontWeight: 600 }}>
            Lampro LED display series, specs and warranty in Nepal — lampronepal.com
          </span>
        </span>
        <span className="inline-flex items-center rounded-full px-4 py-2 text-[13px] font-bold text-white" style={{ background: '#0F58FB' }}>
          Visit lampronepal.com →
        </span>
      </a>
    </aside>
  )
}

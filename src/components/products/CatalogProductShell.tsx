import Link from "next/link";
import Image from "next/image";
import ImageGallery from "@/components/solutions/ImageGallery";
import { SITE } from "@/lib/constants";

export type ShellRelated = { name: string; img?: string; href: string | null };
export type ShellProps = {
  brand: string;
  brandSlug: string;
  brandColor: string;
  model: string;
  category: string;
  series: string;
  type: string;
  images: string[];
  description: string;
  hasMedia: boolean;
  whereFits: { label: string; href: string }[];
  related: ShellRelated[];
  brandHref: string;
  catalogHref: string;
};

export default function CatalogProductShell(p: ShellProps) {
  const name = `${p.brand} ${p.model}`;
  const c = p.brandColor;
  const idealFor = p.whereFits.length ? p.whereFits.map((w) => w.label) : ["Corporate", "Education", "Government", "Hospitality"];

  return (
    <main style={{ paddingTop: 80, background: "#FFFFFF" }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ padding: "40px 24px 48px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <nav style={{ display: "flex", gap: 6, fontSize: 12, color: "#94A3B8", marginBottom: 24, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#94A3B8", textDecoration: "none" }}>Home</Link><span>›</span>
            <Link href={p.brandHref} style={{ color: "#94A3B8", textDecoration: "none" }}>{p.brand}</Link><span>›</span>
            <Link href={p.catalogHref} style={{ color: "#94A3B8", textDecoration: "none" }}>Catalog</Link><span>›</span>
            <span style={{ color: c }}>{p.model}</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="product-hero-grid">
            {/* Left — image */}
            <div>
              {p.images.length ? (
                <ImageGallery images={p.images} alt={name} />
              ) : (
                <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", background: `linear-gradient(135deg, ${c}12 0%, #F8FAFC 100%)`, border: `1.5px solid ${c}25`, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", top: 16, right: 16, background: "#0B1E3D", border: `1.5px solid ${c}60`, borderRadius: 10, padding: "5px 14px", fontSize: 12, fontWeight: 900, letterSpacing: "0.06em", color: "#FFFFFF", fontFamily: "Manrope, sans-serif" }}>{p.brand}</div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 96, height: 96, borderRadius: 20, background: "#E2E8F0", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "#94A3B8" }}>{p.brand.charAt(0)}</div>
                    <p style={{ marginTop: 14, fontSize: 13, color: "#94A3B8" }}>Photos available on request — genuine product</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right — info */}
            <div style={{ paddingBottom: 8 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
                <Link href={p.brandHref} style={{ background: c, color: "#fff", padding: "5px 14px", borderRadius: 980, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none" }}>{p.brand}</Link>
                <span style={{ background: "#F1F5F9", color: "#475569", padding: "5px 14px", borderRadius: 980, fontSize: 12, fontWeight: 500 }}>{p.type}</span>
              </div>

              <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(26px,3.2vw,40px)", fontWeight: 900, color: "#0B1E3D", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10 }}>{name}</h1>
              <p style={{ fontSize: 17, color: c, fontWeight: 600, marginBottom: 14, lineHeight: 1.4 }}>{p.series} · {p.category}</p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 28 }}>{p.description}</p>

              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Ideal For</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {idealFor.map((a) => (<span key={a} style={{ background: "#F8FAFC", color: "#475569", padding: "6px 14px", borderRadius: 980, fontSize: 12, fontWeight: 600, border: "1px solid rgba(11,30,61,0.1)" }}>{a}</span>))}
                </div>
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, marginBottom: 32 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#059669" }}>Manufacturer Warranty</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a href={`https://wa.me/9779762109538?text=${encodeURIComponent(`Hi, I'm interested in the ${name}. Please send pricing and availability.`)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", padding: "14px 20px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", minWidth: 160 }}>WhatsApp Enquiry</a>
                  <Link href={`/contact?product=${encodeURIComponent(name)}&brand=${p.brand}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: c, color: "#fff", padding: "14px 20px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", minWidth: 160 }}>Request Quotation</Link>
                </div>
                <a href={`tel:${SITE.phoneRaw}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent", color: "#0B1E3D", padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(11,30,61,0.2)" }}>Call {SITE.phone}</a>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(11,30,61,0.08)" }}>
                {[
                  { label: "Genuine Product", sub: "Authorised dealer" },
                  { label: "Manufacturer Warranty", sub: "Genuine, backed" },
                  { label: "Expert Support", sub: "Local AV engineers" },
                  { label: "All Nepal Delivery", sub: "All 77 districts" },
                ].map((t) => (
                  <div key={t.label} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px", background: "#F8FAFC", borderRadius: 10 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    <div><div style={{ fontSize: 12, fontWeight: 700, color: "#0B1E3D" }}>{t.label}</div><div style={{ fontSize: 11, color: "#64748B" }}>{t.sub}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAB NAV ─────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 80, zIndex: 40, background: "#FFFFFF", borderBottom: "2px solid rgba(11,30,61,0.08)", borderTop: "1px solid rgba(11,30,61,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0, overflowX: "auto" }}>
          {[{ label: "Specifications", href: "#specs" }, { label: "Documents", href: "#downloads" }, { label: "Support", href: "#support" }].map((t) => (
            <a key={t.href} href={t.href} style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#475569", textDecoration: "none", whiteSpace: "nowrap", borderBottom: "2px solid transparent", marginBottom: -2 }}>{t.label}</a>
          ))}
        </div>
      </nav>

      {/* ── SPECIFICATIONS (on request) ─────────────────────── */}
      <section id="specs" style={{ padding: "72px 24px", background: "#F8FAFC", scrollMarginTop: 140 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: c, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Technical Data</p>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(26px,3vw,36px)", fontWeight: 800, color: "#0B1E3D", letterSpacing: "-0.02em" }}>Specifications</h2>
          </div>
          <div style={{ border: "1px solid rgba(11,30,61,0.1)", borderRadius: 16, background: "#FFFFFF", padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0B1E3D", marginBottom: 6, fontFamily: "Manrope, sans-serif" }}>Full specifications &amp; datasheet on request</h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>Our engineers will send the complete specification sheet, dimensions, wiring and installation guide for the {name} within 24 hours — with Nepal-specific configuration guidance.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/contact?product=${encodeURIComponent(name)}&inquiry=datasheet`} style={{ background: c, color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Request Datasheet</Link>
                <a href={`https://wa.me/9779762109538?text=${encodeURIComponent(`Please send the datasheet for ${name}.`)}`} target="_blank" rel="noopener noreferrer" style={{ background: "#F1F5F9", color: "#0B1E3D", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Get via WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ───────────────────────────────────────── */}
      <section id="downloads" style={{ padding: "72px 24px", background: "#FFFFFF", scrollMarginTop: 140 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: c, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Product Resources</p>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(26px,3vw,36px)", fontWeight: 800, color: "#0B1E3D", letterSpacing: "-0.02em" }}>Documents &amp; Support</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { label: "Request Brochure", sub: "Delivered to your email within 24h", inquiry: "brochure", icon: "📩" },
              { label: "Request Datasheet", sub: "Full technical specifications", inquiry: "datasheet", icon: "📄" },
              { label: "Talk to an Engineer", sub: "System design & compatibility", inquiry: "engineer", icon: "🎧" },
            ].map((d) => (
              <Link key={d.inquiry} href={`/contact?product=${encodeURIComponent(name)}&inquiry=${d.inquiry}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px", background: "#F8FAFC", borderRadius: 14, border: `1px dashed ${c}40`, textDecoration: "none" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{d.icon}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: "#0B1E3D", marginBottom: 3 }}>{d.label}</div><div style={{ fontSize: 12, color: "#64748B" }}>{d.sub}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED + WHERE USED + SUPPORT ──────────────────── */}
      <section id="support" style={{ padding: "60px 24px 80px", background: "#F8FAFC", scrollMarginTop: 140 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {p.whereFits.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Where this fits</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {p.whereFits.map((r) => (<Link key={r.href} href={r.href} style={{ border: "1px solid rgba(11,30,61,0.12)", borderRadius: 999, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: c, textDecoration: "none" }}>{r.label} solution →</Link>))}
              </div>
            </div>
          )}

          {p.related.length > 0 && (
            <div style={{ marginBottom: 44 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Related models in {p.series}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
                {p.related.map((m) => {
                  const card = (
                    <div style={{ height: "100%", background: "#FFFFFF", borderRadius: 14, border: "1px solid rgba(11,30,61,0.1)", padding: 16, textAlign: "center" }}>
                      {m.img ? (
                        <div style={{ position: "relative", height: 96, width: "100%" }}><Image src={m.img} alt={m.name} fill style={{ objectFit: "contain" }} sizes="180px" /></div>
                      ) : (
                        <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#CBD5E1" }}>{p.brand.charAt(0)}</div>
                      )}
                      <p style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: "#0B1E3D" }}>{p.brand} {m.name}</p>
                    </div>
                  );
                  return m.href ? <Link key={m.name} href={m.href} style={{ textDecoration: "none" }}>{card}</Link> : <div key={m.name}>{card}</div>;
                })}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="product-cta-grid">
            <div style={{ padding: 36, background: `linear-gradient(135deg, ${c} 0%, ${c}CC 100%)`, borderRadius: 20, color: "#fff" }}>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Request a Quotation</h3>
              <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.6, marginBottom: 20 }}>Tell us your requirements and we&apos;ll send a detailed quotation with installation cost within 24 hours.</p>
              <Link href={`/contact?product=${encodeURIComponent(name)}&brand=${p.brand}`} style={{ display: "inline-block", background: "#fff", color: "#0B1E3D", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Quote →</Link>
            </div>
            <div style={{ padding: 36, background: "#FFFFFF", border: "1px solid rgba(11,30,61,0.1)", borderRadius: 20 }}>
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 22, fontWeight: 800, color: "#0B1E3D", marginBottom: 8 }}>Technical Support</h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>Our certified AV engineers can advise on system design, compatibility and the right configuration for your space.</p>
              <a href={`tel:${SITE.phoneRaw}`} style={{ fontSize: 15, fontWeight: 700, color: c, textDecoration: "none" }}>{SITE.phone}</a>
            </div>
          </div>

          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, color: "#475569" }}>Keep exploring:</span>
            <Link href={p.catalogHref} style={{ color: c, textDecoration: "none" }}>Full {p.brand} catalog</Link><span style={{ color: "#CBD5E1" }}>•</span>
            <Link href="/boq-lookup" style={{ color: c, textDecoration: "none" }}>Check a whole BOQ</Link><span style={{ color: "#CBD5E1" }}>•</span>
            <Link href="/solution-finder" style={{ color: c, textDecoration: "none" }}>Solution finder</Link>
          </div>
          {p.hasMedia && <p style={{ marginTop: 24, fontSize: 12, color: "#94A3B8" }}>Product image and summary courtesy of {p.brand}.</p>}
        </div>
      </section>
    </main>
  );
}

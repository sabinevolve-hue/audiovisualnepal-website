import Link from "next/link";
import Image from "next/image";
import { ALL_PRODUCTS } from "@/data/products";

type MediaEntry = { slug: string; img: string; desc: string; source: string };
type GroupX = { type: string; models: string[]; featured?: boolean; featuredModels?: string[] };
type SeriesX = { name: string; groups: GroupX[]; featured?: boolean };
type CategoryX = { category: string; series: SeriesX[] };

export const catSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function BrandCatalog({
  brand,
  brandSlug,
  accent,
  categories,
  media,
  totalModels,
  intro,
  highlights,
}: {
  brand: string;
  brandSlug: string;
  accent: string;
  categories: CategoryX[];
  media: Record<string, MediaEntry>;
  totalModels: number;
  intro?: string;
  highlights?: string;
}) {
  const detailPages = new Map(
    ALL_PRODUCTS.filter((p) => p.brandSlug === brandSlug).map((p) => [
      p.name.replace(new RegExp(`^${brand}\\s+`, "i"), "").toLowerCase(),
      `/products/${p.category}/${p.slug}`,
    ])
  );

  const tint = (a: number) => {
    const h = accent.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return (
    <main style={{ paddingTop: 64, background: "#FFFFFF" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg,#F8FAFC 0%,#FFFFFF 100%)", borderBottom: "1px solid rgba(11,30,61,0.07)", padding: "56px 0 40px" }}>
        <div className="container-site">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>
            <Link href={`/brands/${brandSlug}`} style={{ color: accent, textDecoration: "none" }}>{brand}</Link>
            <span style={{ color: "#94A3B8" }}> / Full catalog</span>
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0B1E3D", margin: 0 }}>
            {brand} product catalog
          </h1>
          <p style={{ marginTop: 14, maxWidth: 720, fontSize: 16, lineHeight: 1.7, color: "#475569" }}>
            {intro || `${totalModels}+ models across ${categories.length} categories — every item available in Nepal with full warranty.`}{" "}
            Highlighted models link to full product pages; for anything else, quote it by model number.{" "}
            Working from a tender? <Link href="/boq-lookup" style={{ color: accent, fontWeight: 600 }}>Paste your whole BOQ here</Link>.
          </p>

          {/* Category quick-nav */}
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map((c) => (
              <a key={c.category} href={`#${catSlug(c.category)}`}
                 style={{ fontSize: 12.5, fontWeight: 600, padding: "6px 13px", borderRadius: 999, background: "#FFFFFF", border: "1px solid rgba(11,30,61,0.12)", color: "#475569", textDecoration: "none" }}>
                {c.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category segments */}
      <section className="container-site" style={{ padding: "8px 0 8px" }}>
        {categories.map((c, ci) => {
          const count = c.series.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.models.length, 0), 0);
          return (
            <div key={c.category} id={catSlug(c.category)} style={{ scrollMarginTop: 96, padding: "40px 0", borderTop: ci === 0 ? "none" : "1px solid rgba(11,30,61,0.07)" }}>
              {/* Segment header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <span style={{ width: 4, height: 30, borderRadius: 4, background: accent }} />
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "#0B1E3D", margin: 0, letterSpacing: "-0.02em" }}>{c.category}</h2>
                <span style={{ fontSize: 12, fontWeight: 700, color: accent, background: tint(0.08), border: `1px solid ${tint(0.2)}`, borderRadius: 999, padding: "3px 10px" }}>{count} models</span>
              </div>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                {c.series.map((s) => {
                  const seriesCount = s.groups.reduce((n, g) => n + g.models.length, 0);
                  const openByDefault = c.series.length <= 2 || s.featured;
                  return (
                    <details key={s.name} open={openByDefault}
                      style={{ borderRadius: 16, border: s.featured ? `1.5px solid ${tint(0.5)}` : "1px solid rgba(11,30,61,0.10)", background: s.featured ? tint(0.04) : "#FFFFFF", overflow: "hidden" }}>
                      <summary style={{ cursor: "pointer", listStyle: "none", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0B1E3D", fontSize: 15 }}>
                        <span style={{ flex: 1 }}>{s.name}</span>
                        {s.featured && <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#FFFFFF", background: accent, borderRadius: 999, padding: "2px 8px" }}>Featured</span>}
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>{seriesCount}</span>
                      </summary>

                      <div style={{ padding: "0 18px 16px" }}>
                        {s.groups.map((g) => {
                          const withImg = g.models.filter((m) => media[m]);
                          const noImg = g.models.filter((m) => !media[m]);
                          return (
                            <div key={g.type} style={{ marginTop: 14 }}>
                              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94A3B8", margin: "0 0 10px" }}>{g.type}</p>

                              {withImg.length > 0 && (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px,1fr))", gap: 10 }}>
                                  {withImg.map((m) => {
                                    const full = detailPages.get(m.toLowerCase());
                                    const href = full || `/brands/${brandSlug}/p/${media[m].slug}`;
                                    const hot = g.featuredModels?.includes(m) || g.featured;
                                    return (
                                      <Link key={m} href={href}
                                        style={{ display: "block", borderRadius: 12, border: hot ? `1.5px solid ${tint(0.45)}` : "1px solid rgba(11,30,61,0.10)", background: "#FFFFFF", padding: 8, textDecoration: "none" }}>
                                        <div style={{ position: "relative", height: 76, width: "100%", borderRadius: 8, background: "#F8FAFC", overflow: "hidden" }}>
                                          <Image src={media[m].img} alt={m} fill className="object-contain" sizes="120px" style={{ padding: 6 }} />
                                        </div>
                                        <p style={{ margin: "8px 2px 2px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#0B1E3D", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m}</p>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}

                              {noImg.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: withImg.length ? 10 : 0 }}>
                                  {noImg.map((m) => {
                                    const full = detailPages.get(m.toLowerCase());
                                    const hot = g.featuredModels?.includes(m) || g.featured;
                                    const href = full || `/brands/${brandSlug}/p/${catSlug(m)}`;
                                    return (
                                      <Link key={m} href={href}
                                        style={{ fontSize: 12.5, fontWeight: 600, padding: "5px 11px", borderRadius: 8, textDecoration: "none",
                                          color: hot ? accent : "#475569",
                                          background: hot ? tint(0.08) : "#F8FAFC",
                                          border: hot ? `1px solid ${tint(0.28)}` : "1px solid rgba(11,30,61,0.09)" }}>
                                        {m}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="container-site" style={{ padding: "24px 0 64px" }}>
        <div style={{ borderRadius: 24, background: "linear-gradient(135deg,#0B1E3D 0%,#12294d 100%)", padding: "44px 32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, color: "#FFFFFF", margin: 0 }}>Need a model from this list?</h2>
          <p style={{ margin: "10px auto 0", maxWidth: 460, fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
            Send us the model number — we quote any {brand} product with genuine warranty and local support.
          </p>
          <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link href="/contact" style={{ borderRadius: 999, background: accent, color: "#FFFFFF", padding: "11px 26px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Request a quote</Link>
            <a href="https://wa.me/+9779762109538" style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF", padding: "11px 26px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>WhatsApp us</a>
          </div>
        </div>
      </section>
    </main>
  );
}

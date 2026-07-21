import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header, WhatsAppButton } from "@/components/site-chrome";
import { PropertyCard } from "@/components/property-card";
import { properties, formatBRL, type Property } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Compass,
  School,
  Train,
  ShoppingBasket,
  SlidersHorizontal,
  X,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Search = {
  mode?: "rent" | "buy";
  q?: string;
  type?: string;
  bedrooms?: string;
  maxPrice?: string;
};

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: (s.mode as "rent" | "buy") || undefined,
    q: (s.q as string) || undefined,
    type: (s.type as string) || undefined,
    bedrooms: (s.bedrooms as string) || undefined,
    maxPrice: (s.maxPrice as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Buscar imóveis no mapa — meuimóvel.com" },
      { name: "description", content: "Busca inteligente com mapa interativo, filtros avançados e amenidades próximas." },
      { property: "og:title", content: "Busca no mapa — meuimóvel.com" },
      { property: "og:description", content: "Encontre o imóvel ideal com filtros de mapa, escolas, metrô e mais." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const params = Route.useSearch();
  const [mode, setMode] = useState<"rent" | "buy" | "all">(params.mode || "all");
  const [selected, setSelected] = useState<string | null>(null);
  const [drawMode, setDrawMode] = useState(false);
  const [radius, setRadius] = useState(false);
  const [amenities, setAmenities] = useState({ schools: false, subway: false, markets: false });
  const [showFilters, setShowFilters] = useState(false);
  const [q, setQ] = useState(params.q || "");
  const [type, setType] = useState(params.type || "");
  const [bedrooms, setBedrooms] = useState(params.bedrooms || "");
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || "");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (mode !== "all" && p.mode !== mode) return false;
      if (type && p.type !== type) return false;
      if (bedrooms && p.bedrooms < parseInt(bedrooms)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(s) &&
          !p.neighborhood.toLowerCase().includes(s) &&
          !p.city.toLowerCase().includes(s)
        )
          return false;
      }
      if (amenities.subway && !p.nearSubway) return false;
      return true;
    });
  }, [mode, type, bedrooms, maxPrice, q, amenities.subway]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-fog bg-white/95 backdrop-blur">
        <div className="container-page flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          <div className="flex shrink-0 gap-1 rounded-lg bg-secondary p-1">
            {[
              { k: "all", l: "Todos" },
              { k: "rent", l: "Alugar" },
              { k: "buy", l: "Comprar" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setMode(t.k as "rent" | "buy" | "all")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition",
                  mode === t.k ? "bg-white text-brand shadow-soft" : "text-slate-token",
                )}
              >
                {t.l}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar bairro..."
            className="w-48 shrink-0 rounded-lg border border-fog px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shrink-0 rounded-lg border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Tipo</option>
            <option value="apartment">Apto</option>
            <option value="house">Casa</option>
            <option value="studio">Studio</option>
            <option value="penthouse">Cobertura</option>
          </select>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="shrink-0 rounded-lg border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Quartos</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="shrink-0 rounded-lg border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Preço</option>
            <option value="3000">até 3k</option>
            <option value="6000">até 6k</option>
            <option value="500000">até 500k</option>
            <option value="2000000">até 2M</option>
          </select>
          <div className="ml-2 hidden shrink-0 items-center gap-1 md:flex">
            <Button
              size="sm"
              variant={drawMode ? "default" : "outline"}
              onClick={() => setDrawMode((v) => !v)}
              className={cn("gap-1.5", drawMode && "bg-mint text-white hover:bg-mint/90")}
            >
              <Pencil className="h-3.5 w-3.5" /> Desenhar no mapa
            </Button>
            <Button
              size="sm"
              variant={radius ? "default" : "outline"}
              onClick={() => setRadius((v) => !v)}
              className={cn("gap-1.5", radius && "bg-mint text-white hover:bg-mint/90")}
            >
              <Compass className="h-3.5 w-3.5" /> Raio
            </Button>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="ml-auto shrink-0 gap-1.5"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Amenidades
          </Button>
        </div>
      </div>

      {/* Split view */}
      <div className="flex flex-1 flex-col lg:h-[calc(100vh-8rem)] lg:flex-row">
        {/* Map */}
        <div className="relative h-[50vh] w-full overflow-hidden bg-secondary lg:h-full lg:w-1/2">
          <MapCanvas
            properties={filtered}
            selected={selected}
            onSelect={setSelected}
            drawMode={drawMode}
            radius={radius}
            amenities={amenities}
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="sticky top-0 border-b border-fog bg-white/95 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-ink">
                  {filtered.length} imóveis encontrados
                </div>
                <div className="text-xs text-slate-token">
                  {mode === "rent" ? "Para alugar" : mode === "buy" ? "Para comprar" : "Todos os modos"}
                </div>
              </div>
              <select className="rounded-lg border border-fog px-3 py-2 text-sm outline-none">
                <option>Mais relevantes</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
                <option>Mais novos</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-2 md:p-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => setSelected(p.id)}
                onMouseLeave={() => setSelected(null)}
              >
                <PropertyCard property={p} />
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <div className="text-lg font-semibold text-ink">Nenhum imóvel encontrado</div>
                <div className="mt-2 text-sm text-slate-token">Tente ajustar os filtros.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Amenities modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4" onClick={() => setShowFilters(false)}>
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Amenidades próximas</h3>
              <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { k: "schools", i: School, l: "Escolas" },
                { k: "subway", i: Train, l: "Metrô / Estação" },
                { k: "markets", i: ShoppingBasket, l: "Supermercados" },
              ].map((a) => (
                <label
                  key={a.k}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-fog p-3 hover:bg-secondary"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-mint/10 text-mint">
                    <a.i className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-sm font-medium">{a.l}</span>
                  <input
                    type="checkbox"
                    checked={amenities[a.k as keyof typeof amenities]}
                    onChange={(e) =>
                      setAmenities({ ...amenities, [a.k]: e.target.checked })
                    }
                    className="h-5 w-5 accent-mint"
                  />
                </label>
              ))}
            </div>
            <Button
              className="mt-6 w-full bg-brand text-white hover:bg-brand/90"
              onClick={() => setShowFilters(false)}
            >
              Aplicar
            </Button>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}

function MapCanvas({
  properties: props,
  selected,
  onSelect,
  drawMode,
  radius,
  amenities,
}: {
  properties: Property[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  drawMode: boolean;
  radius: boolean;
  amenities: { schools: boolean; subway: boolean; markets: boolean };
}) {
  // Normalize coords to viewport
  const lats = props.map((p) => p.lat);
  const lngs = props.map((p) => p.lng);
  const minLat = Math.min(...lats, -23.6);
  const maxLat = Math.max(...lats, -22.9);
  const minLng = Math.min(...lngs, -46.9);
  const maxLng = Math.max(...lngs, -43.1);

  const pos = (p: Property) => ({
    left: `${((p.lng - minLng) / (maxLng - minLng || 1)) * 90 + 5}%`,
    top: `${(1 - (p.lat - minLat) / (maxLat - minLat || 1)) * 85 + 8}%`,
  });

  return (
    <div className="relative h-full w-full">
      {/* Faux map background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #e8f0f4 0%, #dae7ee 100%)",
          backgroundImage: `
            linear-gradient(0deg, rgba(2,39,75,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(2,39,75,0.06) 1px, transparent 1px),
            radial-gradient(circle at 30% 40%, rgba(0,180,150,0.15) 0%, transparent 35%),
            radial-gradient(circle at 70% 60%, rgba(245,158,11,0.1) 0%, transparent 35%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%, 100% 100%",
        }}
      />
      {/* Roads */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M 0 40% Q 30% 30%, 60% 45% T 100% 55%" stroke="#c7d3dc" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 20% 0 Q 25% 40%, 40% 60% T 55% 100%" stroke="#c7d3dc" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 0 75% L 100% 70%" stroke="#c7d3dc" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>

      {/* Radius indicator */}
      {radius && (
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-mint bg-mint/10" />
      )}
      {drawMode && (
        <div className="absolute left-1/2 top-1/2 h-56 w-72 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 border-dashed border-brand bg-brand/5" />
      )}

      {/* Amenity pins */}
      {amenities.subway && (
        <>
          <div className="absolute left-[28%] top-[38%] grid h-7 w-7 place-items-center rounded-full bg-brand text-white shadow-soft">
            <Train className="h-3.5 w-3.5" />
          </div>
          <div className="absolute left-[62%] top-[52%] grid h-7 w-7 place-items-center rounded-full bg-brand text-white shadow-soft">
            <Train className="h-3.5 w-3.5" />
          </div>
        </>
      )}
      {amenities.schools && (
        <div className="absolute left-[45%] top-[30%] grid h-7 w-7 place-items-center rounded-full bg-amber text-white shadow-soft">
          <School className="h-3.5 w-3.5" />
        </div>
      )}
      {amenities.markets && (
        <div className="absolute left-[70%] top-[70%] grid h-7 w-7 place-items-center rounded-full bg-slate-token text-white shadow-soft">
          <ShoppingBasket className="h-3.5 w-3.5" />
        </div>
      )}

      {/* Property price pins */}
      {props.map((p) => {
        const isSel = selected === p.id;
        return (
          <button
            key={p.id}
            style={pos(p)}
            onClick={() => onSelect(isSel ? null : p.id)}
            onMouseEnter={() => onSelect(p.id)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-full transition-all",
              isSel ? "z-20 scale-110" : "z-10 hover:scale-105",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-elevated",
                isSel ? "bg-brand text-white" : "bg-white text-brand",
              )}
            >
              <MapPin className="h-3 w-3" />
              {formatShort(p.price)}
            </div>
          </button>
        );
      })}

      {/* Selected preview */}
      {selected && (
        <div className="absolute bottom-4 left-1/2 z-30 w-72 -translate-x-1/2">
          {(() => {
            const p = props.find((x) => x.id === selected);
            if (!p) return null;
            return (
              <div className="overflow-hidden rounded-xl bg-white shadow-elevated">
                <img src={p.images[0]} alt={p.title} className="h-24 w-full object-cover" />
                <div className="p-3">
                  <div className="text-sm font-bold text-brand">{formatBRL(p.price)}</div>
                  <div className="line-clamp-1 text-xs font-medium text-ink">{p.title}</div>
                  <div className="text-[11px] text-slate-token">{p.neighborhood}, {p.city}</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function formatShort(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `R$ ${Math.round(n / 1000)}k`;
  return `R$ ${n}`;
}

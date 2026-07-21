import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, lazy, Suspense } from "react";
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
  BedDouble,
  Bath,
  Car,
  Maximize2,
  Wifi,
  Dumbbell,
  TreePine,
  ShieldCheck,
  Eye,
  List,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MapView = lazy(() =>
  import("@/components/map-view").then((m) => ({ default: m.MapView })),
);

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
      { title: "Buscar imóveis — meuimóvel.com" },
      { name: "description", content: "Busca inteligente com mapa interativo e filtros avançados." },
    ],
  }),
  component: SearchPage,
});

const ADVANCED_FILTERS = [
  { key: "petFriendly", icon: TreePine, label: "Pet Friendly" },
  { key: "virtualTour", icon: Eye, label: "Tour Virtual" },
  { key: "nearSubway", icon: Train, label: "Perto do metrô" },
  { key: "balcony", icon: Maximize2, label: "Varanda / Sacada" },
  { key: "schools", icon: School, label: "Escola próxima" },
  { key: "market", icon: ShoppingBasket, label: "Mercado próximo" },
  { key: "pool", icon: Wifi, label: "Piscina" },
  { key: "gym", icon: Dumbbell, label: "Academia" },
  { key: "security", icon: ShieldCheck, label: "Portaria 24h" },
];

function SearchPage() {
  const params = Route.useSearch();
  const [mode, setMode] = useState<"rent" | "buy" | "all">(params.mode || "all");
  const [selected, setSelected] = useState<string | null>(null);
  const [drawMode, setDrawMode] = useState(false);
  const [radius, setRadius] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [q, setQ] = useState(params.q || "");
  const [type, setType] = useState(params.type || "");
  const [bedrooms, setBedrooms] = useState(params.bedrooms || "");
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || "");
  const [minArea, setMinArea] = useState("");
  const [maxCondo, setMaxCondo] = useState("");
  const [parking, setParking] = useState("");
  const [activeFeatures, setActiveFeatures] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"split" | "list" | "map">("split");

  const toggleFeature = (key: string) => {
    setActiveFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (mode !== "all" && p.mode !== mode) return false;
      if (type && p.type !== type) return false;
      if (bedrooms && p.bedrooms < parseInt(bedrooms)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;
      if (minArea && p.area < parseInt(minArea)) return false;
      if (maxCondo && (p.condoFee || 0) > parseInt(maxCondo)) return false;
      if (parking && p.parking < parseInt(parking)) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(s) &&
          !p.neighborhood.toLowerCase().includes(s) &&
          !p.city.toLowerCase().includes(s)
        )
          return false;
      }
      if (activeFeatures.has("nearSubway") && !p.nearSubway) return false;
      if (activeFeatures.has("petFriendly") && !p.petFriendly) return false;
      if (activeFeatures.has("virtualTour") && !p.virtualTour) return false;
      if (activeFeatures.has("balcony") && !p.balcony) return false;
      return true;
    });
  }, [mode, type, bedrooms, maxPrice, q, activeFeatures, minArea, maxCondo, parking]);

  const activeFilterCount = activeFeatures.size +
    (minArea ? 1 : 0) + (maxCondo ? 1 : 0) + (parking ? 1 : 0);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-fog bg-white/95 backdrop-blur">
        <div className="container-page flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {/* Mode toggle */}
          <div className="flex shrink-0 gap-1 rounded-xl bg-secondary p-1">
            {[
              { k: "all", l: "Todos" },
              { k: "rent", l: "Alugar" },
              { k: "buy", l: "Comprar" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setMode(t.k as "rent" | "buy" | "all")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  mode === t.k ? "bg-white text-brand shadow-soft" : "text-slate-token",
                )}
              >
                {t.l}
              </button>
            ))}
          </div>

          {/* Search input */}
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar bairro..."
            className="w-40 shrink-0 rounded-xl border border-fog px-3 py-2 text-sm outline-none focus:border-brand"
          />

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shrink-0 rounded-xl border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Tipo</option>
            <option value="apartment">Apto</option>
            <option value="house">Casa</option>
            <option value="studio">Studio</option>
            <option value="penthouse">Cobertura</option>
          </select>

          {/* Bedrooms */}
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="shrink-0 rounded-xl border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Quartos</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>

          {/* Price */}
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="shrink-0 rounded-xl border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Preço</option>
            <option value="3000">até R$ 3k</option>
            <option value="6000">até R$ 6k</option>
            <option value="500000">até R$ 500k</option>
            <option value="2000000">até R$ 2M</option>
          </select>

          {/* Map tools */}
          <div className="ml-1 hidden shrink-0 items-center gap-1 md:flex">
            <Button
              size="sm"
              variant={drawMode ? "default" : "outline"}
              onClick={() => setDrawMode((v) => !v)}
              className={cn("gap-1.5 rounded-xl text-xs", drawMode && "bg-mint text-white hover:bg-mint/90")}
            >
              <Pencil className="h-3.5 w-3.5" /> Desenhar
            </Button>
            <Button
              size="sm"
              variant={radius ? "default" : "outline"}
              onClick={() => setRadius((v) => !v)}
              className={cn("gap-1.5 rounded-xl text-xs", radius && "bg-mint text-white hover:bg-mint/90")}
            >
              <Compass className="h-3.5 w-3.5" /> Raio
            </Button>
          </div>

          {/* Advanced filters button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowFilters(true)}
            className={cn(
              "ml-auto shrink-0 gap-1.5 rounded-xl text-xs",
              activeFilterCount > 0 && "border-brand bg-brand/5 text-brand",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtros avançados
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* View mode toggle */}
          <div className="hidden shrink-0 gap-1 rounded-xl bg-secondary p-1 md:flex">
            {[
              { k: "split", i: List },
              { k: "list", i: List },
              { k: "map", i: Map },
            ].map((v, i) => (
              <button
                key={v.k}
                title={v.k}
                onClick={() => setViewMode(v.k as "split" | "list" | "map")}
                className={cn(
                  "rounded-lg p-1.5 transition",
                  viewMode === v.k ? "bg-white shadow-soft text-brand" : "text-slate-token",
                )}
              >
                <v.i className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Active filter chips */}
        {activeFeatures.size > 0 && (
          <div className="container-page flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[...activeFeatures].map((key) => {
              const f = ADVANCED_FILTERS.find((x) => x.key === key);
              if (!f) return null;
              return (
                <button
                  key={key}
                  onClick={() => toggleFeature(key)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
                >
                  {f.label} <X className="h-3 w-3" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content — split / list / map */}
      <div
        className={cn(
          "flex flex-1",
          viewMode === "split" && "flex-col lg:h-[calc(100vh-8rem)] lg:flex-row",
          viewMode === "list" && "flex-col",
          viewMode === "map" && "flex-col h-[calc(100vh-8rem)]",
        )}
      >
        {/* Map */}
        {viewMode !== "list" && (
          <div
            className={cn(
              "relative overflow-hidden",
              viewMode === "split" && "h-[50vh] w-full lg:h-full lg:w-[45%]",
              viewMode === "map" && "h-full w-full flex-1",
            )}
          >
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center bg-secondary">
                  <div className="text-sm text-slate-token">Carregando mapa…</div>
                </div>
              }
            >
              <MapView properties={filtered} selected={selected} onSelect={setSelected} />
            </Suspense>

            {/* Selected popup over map */}
            {selected && viewMode === "map" && (
              <div className="absolute bottom-4 left-1/2 z-[500] w-72 -translate-x-1/2">
                {(() => {
                  const p = filtered.find((x) => x.id === selected);
                  if (!p) return null;
                  return (
                    <Link
                      to="/property/$id"
                      params={{ id: p.id }}
                      className="block overflow-hidden rounded-2xl bg-white shadow-elevated"
                    >
                      <img src={p.images[0]} alt={p.title} className="h-28 w-full object-cover" />
                      <div className="p-3">
                        <div className="text-sm font-bold text-brand">{formatBRL(p.price)}</div>
                        <div className="mt-0.5 line-clamp-1 text-xs font-medium text-ink">{p.title}</div>
                        <div className="text-[11px] text-slate-token">{p.neighborhood}, {p.city}</div>
                      </div>
                    </Link>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {viewMode !== "map" && (
          <div className="flex-1 overflow-y-auto bg-white">
            {/* Results header */}
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
                <select className="rounded-xl border border-fog px-3 py-2 text-sm outline-none">
                  <option>Mais relevantes</option>
                  <option>Menor preço</option>
                  <option>Maior preço</option>
                  <option>Mais novos</option>
                </select>
              </div>
            </div>

            <div
              className={cn(
                "gap-4 p-4 md:p-6",
                viewMode === "split"
                  ? "grid sm:grid-cols-2"
                  : "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              )}
            >
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
                <div className="col-span-full py-20 text-center">
                  <div className="text-4xl">🏠</div>
                  <div className="mt-4 text-lg font-bold text-ink">Nenhum imóvel encontrado</div>
                  <div className="mt-2 text-sm text-slate-token">Tente ajustar os filtros ou ampliar a área de busca.</div>
                  <Button
                    className="mt-6 bg-brand text-white hover:bg-brand/90"
                    onClick={() => {
                      setMode("all");
                      setType("");
                      setBedrooms("");
                      setMaxPrice("");
                      setQ("");
                      setActiveFeatures(new Set());
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      {showFilters && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-fog px-6 py-4">
              <h3 className="text-lg font-bold text-ink">Filtros avançados</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-1.5 text-slate-token hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
              {/* Numeric filters */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-ink">Características</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-token">Área mín. (m²)</label>
                    <div className="mt-1 flex items-center gap-1 rounded-xl border border-fog px-3 py-2">
                      <Maximize2 className="h-3.5 w-3.5 text-mint" />
                      <input
                        type="number"
                        value={minArea}
                        onChange={(e) => setMinArea(e.target.value)}
                        placeholder="0"
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-token">Cond. máx.</label>
                    <div className="mt-1 flex items-center gap-1 rounded-xl border border-fog px-3 py-2">
                      <BedDouble className="h-3.5 w-3.5 text-mint" />
                      <input
                        type="number"
                        value={maxCondo}
                        onChange={(e) => setMaxCondo(e.target.value)}
                        placeholder="R$"
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-token">Vagas mín.</label>
                    <div className="mt-1 flex items-center gap-1 rounded-xl border border-fog px-3 py-2">
                      <Car className="h-3.5 w-3.5 text-mint" />
                      <select
                        value={parking}
                        onChange={(e) => setParking(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none"
                      >
                        <option value="">Qualquer</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature checkboxes */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-ink">Comodidades</h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ADVANCED_FILTERS.map((f) => (
                    <label
                      key={f.key}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 transition",
                        activeFeatures.has(f.key)
                          ? "border-brand bg-brand/5 text-brand"
                          : "border-fog hover:border-brand/40 hover:bg-secondary",
                      )}
                    >
                      <div
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                          activeFeatures.has(f.key) ? "bg-brand/10" : "bg-secondary",
                        )}
                      >
                        <f.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-medium">{f.label}</span>
                      <input
                        type="checkbox"
                        checked={activeFeatures.has(f.key)}
                        onChange={() => toggleFeature(f.key)}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-fog px-6 py-4">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => {
                  setActiveFeatures(new Set());
                  setMinArea("");
                  setMaxCondo("");
                  setParking("");
                }}
              >
                Limpar
              </Button>
              <Button
                className="flex-1 rounded-xl bg-brand text-white hover:bg-brand/90"
                onClick={() => setShowFilters(false)}
              >
                Ver {filtered.length} imóveis
              </Button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}

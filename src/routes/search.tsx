import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, lazy, Suspense } from "react";
import { Header, WhatsAppButton } from "@/components/site-chrome";
import { PropertyCard } from "@/components/property-card";
import { properties, formatBRL, type Property } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, MapPin, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MapView = lazy(() =>
  import("@/components/map-view").then((m) => ({ default: m.MapView })),
);

/* ─── Types ─────────────────────────────────────────────────── */
type SearchParams = {
  mode?: "rent" | "buy";
  q?: string;
  type?: string;
  bedrooms?: string;
  maxPrice?: string;
};

type TriState = "both" | "yes" | "no";

type Filters = {
  mode: "rent" | "buy";
  types: string[];
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  suites: string;
  minArea: string;
  maxArea: string;
  furnished: TriState;
  petsAllowed: TriState;
  nearSubway: TriState;
  availability: "both" | "immediate" | "soon";
  // Checkboxes groups
  condo: string[];
  amenities: string[];
  furniture: string[];
  wellness: string[];
  appliances: string[];
  rooms: string[];
  accessibility: string[];
};

const DEFAULT_FILTERS: Filters = {
  mode: "rent",
  types: [],
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  bathrooms: "",
  parking: "",
  suites: "",
  minArea: "",
  maxArea: "",
  furnished: "both",
  petsAllowed: "both",
  nearSubway: "both",
  availability: "both",
  condo: [],
  amenities: [],
  furniture: [],
  wellness: [],
  appliances: [],
  rooms: [],
  accessibility: [],
};

/* ─── Option lists ───────────────────────────────────────────── */
const PROPERTY_TYPES = [
  { key: "apartment", label: "Apartamento" },
  { key: "house", label: "Casa" },
  { key: "house-condo", label: "Casa de Condomínio" },
  { key: "studio", label: "Kitnet/Studio" },
];

const CONDO_AMENITIES = [
  "Academia", "Área verde", "Brinquedoteca", "Churrasqueira",
  "Elevador", "Lavanderia", "Piscina", "Playground", "Portaria 24h",
  "Quadra esportiva", "Salão de festas", "Salão de jogos", "Sauna",
];

const PROPERTY_AMENITIES = [
  "Apartamento cobertura", "Ar condicionado", "Banheira", "Box",
  "Churrasqueira", "Chuveiro a gás", "Closet", "Garden/Área privativa",
  "Novos ou reformados", "Piscina privativa", "Somente uma casa no terreno",
  "Tanque", "Televisão", "Utensílios de cozinha", "Ventilador de teto",
];

const FURNITURE_OPTIONS = [
  "Armários na cozinha", "Armários no quarto", "Armários nos banheiros",
  "Cama de casal", "Cama de solteiro", "Mesas e cadeiras de jantar", "Sofá",
];

const WELLNESS_OPTIONS = [
  "Janelas grandes", "Rua silenciosa", "Sol da manhã", "Sol da tarde", "Vista livre",
];

const APPLIANCES = [
  "Fogão", "Fogão cooktop", "Geladeira", "Máquina de lavar", "Microondas",
];

const ROOMS = [
  "Área de serviço", "Cozinha americana", "Home-office",
  "Jardim", "Quintal", "Varanda",
];

const ACCESSIBILITY = [
  "Banheiro adaptado", "Corrimão", "Piso tátil",
  "Quartos e corredores com portas amplas", "Rampas de acesso",
  "Vaga de garagem acessível",
];

/* ─── Helpers ────────────────────────────────────────────────── */
function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.types.length) n++;
  if (f.minPrice) n++;
  if (f.maxPrice) n++;
  if (f.bedrooms) n++;
  if (f.bathrooms) n++;
  if (f.parking) n++;
  if (f.suites) n++;
  if (f.minArea) n++;
  if (f.maxArea) n++;
  if (f.furnished !== "both") n++;
  if (f.petsAllowed !== "both") n++;
  if (f.nearSubway !== "both") n++;
  if (f.availability !== "both") n++;
  n += f.condo.length + f.amenities.length + f.furniture.length +
    f.wellness.length + f.appliances.length + f.rooms.length +
    f.accessibility.length;
  return n;
}

/* ─── Sub-components for filter panel ───────────────────────── */
function TriOption({
  label, value, current, onChange,
}: {
  label: string;
  value: TriState;
  current: TriState;
  onChange: (v: TriState) => void;
}) {
  return (
    <button
      onClick={() => onChange(value)}
      className={cn(
        "flex-1 rounded-lg py-2 text-sm font-medium transition border",
        current === value
          ? "border-brand bg-brand text-white"
          : "border-fog bg-white text-ink hover:border-brand/40",
      )}
    >
      {label}
    </button>
  );
}

function NumOption({
  values, current, onChange, prefix = "",
}: {
  values: string[];
  current: string;
  onChange: (v: string) => void;
  prefix?: string;
}) {
  return (
    <div className="flex gap-2">
      {values.map((v) => (
        <button
          key={v}
          onClick={() => onChange(current === v ? "" : v)}
          className={cn(
            "flex-1 rounded-xl border py-2 text-sm font-semibold transition",
            current === v
              ? "border-brand bg-brand/5 text-brand"
              : "border-fog bg-white text-ink hover:border-brand/40",
          )}
        >
          {prefix}{v}
        </button>
      ))}
    </div>
  );
}

function CheckGroup({
  label, options, selected, onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (item: string) => {
    onChange(selected.includes(item) ? selected.filter((x) => x !== item) : [...selected, item]);
  };
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-ink">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => toggle(o)}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-xs font-medium transition",
              selected.includes(o)
                ? "border-brand bg-brand/5 text-brand"
                : "border-fog text-ink hover:border-brand/40",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Filter Panel ───────────────────────────────────────────── */
function FilterPanel({
  filters, onChange, onClose, resultCount,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClose: () => void;
  resultCount: number;
}) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const rentPrices = ["500", "1.000", "1.500", "2.000", "3.000", "4.000", "5.000", "6.000", "8.000", "10.000", "15.000", "20.000", "25.000"];
  const buyPrices = ["100.000", "200.000", "300.000", "400.000", "500.000", "750.000", "1.000.000", "1.500.000", "2.000.000", "3.000.000", "5.000.000"];
  const prices = filters.mode === "rent" ? rentPrices : buyPrices;

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Overlay */}
      <div className="flex-1 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="flex h-full w-full max-w-[520px] flex-col bg-white shadow-elevated">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-fog px-6 py-4">
          <h2 className="text-lg font-bold text-ink">Filtros</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-token hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">

          {/* Mode */}
          <div>
            <div className="flex rounded-xl bg-secondary p-1">
              {[{ k: "rent", l: "Alugar" }, { k: "buy", l: "Comprar" }].map((t) => (
                <button
                  key={t.k}
                  onClick={() => set("mode", t.k as "rent" | "buy")}
                  className={cn(
                    "flex-1 rounded-lg py-2.5 text-sm font-semibold transition",
                    filters.mode === t.k ? "bg-white text-brand shadow-soft" : "text-slate-token",
                  )}
                >
                  {t.l}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">
              Valor {filters.mode === "rent" ? "do aluguel" : "total"}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-slate-token">Mínimo</label>
                <div className="flex items-center gap-2 rounded-xl border border-fog px-3 py-2.5 focus-within:border-brand">
                  <span className="text-xs text-slate-token">R$</span>
                  <select
                    value={filters.minPrice}
                    onChange={(e) => set("minPrice", e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                  >
                    <option value="">Sem mínimo</option>
                    {prices.map((p) => (
                      <option key={p} value={p.replace(/\./g, "")}>R$ {p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-token">Máximo</label>
                <div className="flex items-center gap-2 rounded-xl border border-fog px-3 py-2.5 focus-within:border-brand">
                  <span className="text-xs text-slate-token">R$</span>
                  <select
                    value={filters.maxPrice}
                    onChange={(e) => set("maxPrice", e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                  >
                    <option value="">Sem máximo</option>
                    {prices.map((p) => (
                      <option key={p} value={p.replace(/\./g, "")}>R$ {p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tipos de imóvel */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Tipos de imóvel</h4>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() =>
                    set(
                      "types",
                      filters.types.includes(t.key)
                        ? filters.types.filter((x) => x !== t.key)
                        : [...filters.types, t.key],
                    )
                  }
                  className={cn(
                    "rounded-xl border px-4 py-2 text-sm font-medium transition",
                    filters.types.includes(t.key)
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-fog text-ink hover:border-brand/40",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quartos */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Quartos</h4>
            <NumOption
              values={["1+", "2+", "3+", "4+"]}
              current={filters.bedrooms}
              onChange={(v) => set("bedrooms", v)}
            />
          </div>

          {/* Vagas de garagem */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Vagas de garagem</h4>
            <div className="flex gap-2">
              <button
                onClick={() => set("parking", "")}
                className={cn(
                  "flex-1 rounded-xl border py-2 text-sm font-medium transition",
                  !filters.parking ? "border-brand bg-brand/5 text-brand" : "border-fog text-ink hover:border-brand/40",
                )}
              >
                Tanto faz
              </button>
              {["1+", "2+", "3+"].map((v) => (
                <button
                  key={v}
                  onClick={() => set("parking", filters.parking === v ? "" : v)}
                  className={cn(
                    "flex-1 rounded-xl border py-2 text-sm font-semibold transition",
                    filters.parking === v
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-fog text-ink hover:border-brand/40",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Banheiros */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Banheiros</h4>
            <NumOption
              values={["1+", "2+", "3+", "4+"]}
              current={filters.bathrooms}
              onChange={(v) => set("bathrooms", v)}
            />
          </div>

          {/* Área */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Área</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-slate-token">Mínima</label>
                <div className="flex items-center gap-2 rounded-xl border border-fog px-3 py-2.5 focus-within:border-brand">
                  <input
                    type="number"
                    value={filters.minArea}
                    onChange={(e) => set("minArea", e.target.value)}
                    placeholder="20"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                  <span className="text-xs text-slate-token">m²</span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-token">Máxima</label>
                <div className="flex items-center gap-2 rounded-xl border border-fog px-3 py-2.5 focus-within:border-brand">
                  <input
                    type="number"
                    value={filters.maxArea}
                    onChange={(e) => set("maxArea", e.target.value)}
                    placeholder="1.000"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                  <span className="text-xs text-slate-token">m²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Suítes */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Suítes</h4>
            <div className="flex gap-2">
              <button
                onClick={() => set("suites", "")}
                className={cn(
                  "flex-1 rounded-xl border py-2 text-sm font-medium transition",
                  !filters.suites ? "border-brand bg-brand/5 text-brand" : "border-fog text-ink hover:border-brand/40",
                )}
              >
                Tanto faz
              </button>
              {["1+", "2+", "3+", "4+"].map((v) => (
                <button
                  key={v}
                  onClick={() => set("suites", filters.suites === v ? "" : v)}
                  className={cn(
                    "flex-1 rounded-xl border py-2 text-sm font-semibold transition",
                    filters.suites === v
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-fog text-ink hover:border-brand/40",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-fog" />

          {/* Mobiliado */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Mobiliado</h4>
            <div className="flex gap-2">
              <TriOption label="Tanto faz" value="both" current={filters.furnished} onChange={(v) => set("furnished", v)} />
              <TriOption label="Sim" value="yes" current={filters.furnished} onChange={(v) => set("furnished", v)} />
              <TriOption label="Não" value="no" current={filters.furnished} onChange={(v) => set("furnished", v)} />
            </div>
          </div>

          {/* Aceita pets */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Aceita pets</h4>
            <div className="flex gap-2">
              <TriOption label="Tanto faz" value="both" current={filters.petsAllowed} onChange={(v) => set("petsAllowed", v)} />
              <TriOption label="Sim" value="yes" current={filters.petsAllowed} onChange={(v) => set("petsAllowed", v)} />
              <TriOption label="Não" value="no" current={filters.petsAllowed} onChange={(v) => set("petsAllowed", v)} />
            </div>
          </div>

          {/* Próximo ao metrô */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Próximo ao metrô</h4>
            <div className="flex gap-2">
              <TriOption label="Tanto faz" value="both" current={filters.nearSubway} onChange={(v) => set("nearSubway", v)} />
              <TriOption label="Sim" value="yes" current={filters.nearSubway} onChange={(v) => set("nearSubway", v)} />
              <TriOption label="Não" value="no" current={filters.nearSubway} onChange={(v) => set("nearSubway", v)} />
            </div>
          </div>

          {/* Disponibilidade */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Disponibilidade</h4>
            <div className="flex gap-2">
              {[
                { k: "both", l: "Tanto faz" },
                { k: "immediate", l: "Imediata" },
                { k: "soon", l: "Em breve" },
              ].map((o) => (
                <button
                  key={o.k}
                  onClick={() => set("availability", o.k as Filters["availability"])}
                  className={cn(
                    "flex-1 rounded-xl border py-2 text-sm font-medium transition",
                    filters.availability === o.k
                      ? "border-brand bg-brand text-white"
                      : "border-fog text-ink hover:border-brand/40",
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-fog" />

          {/* Condomínio */}
          <CheckGroup
            label="Condomínio"
            options={CONDO_AMENITIES}
            selected={filters.condo}
            onChange={(v) => set("condo", v)}
          />

          {/* Comodidades */}
          <CheckGroup
            label="Comodidades"
            options={PROPERTY_AMENITIES}
            selected={filters.amenities}
            onChange={(v) => set("amenities", v)}
          />

          {/* Mobílias */}
          <CheckGroup
            label="Mobílias"
            options={FURNITURE_OPTIONS}
            selected={filters.furniture}
            onChange={(v) => set("furniture", v)}
          />

          {/* Bem-estar */}
          <CheckGroup
            label="Bem-estar"
            options={WELLNESS_OPTIONS}
            selected={filters.wellness}
            onChange={(v) => set("wellness", v)}
          />

          {/* Eletrodomésticos */}
          <CheckGroup
            label="Eletrodomésticos"
            options={APPLIANCES}
            selected={filters.appliances}
            onChange={(v) => set("appliances", v)}
          />

          {/* Cômodos */}
          <CheckGroup
            label="Cômodos"
            options={ROOMS}
            selected={filters.rooms}
            onChange={(v) => set("rooms", v)}
          />

          {/* Acessibilidade */}
          <CheckGroup
            label="Acessibilidade"
            options={ACCESSIBILITY}
            selected={filters.accessibility}
            onChange={(v) => set("accessibility", v)}
          />
        </div>

        {/* Footer actions */}
        <div className="shrink-0 flex gap-3 border-t border-fog px-6 py-4">
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={() => onChange(DEFAULT_FILTERS)}
          >
            Limpar tudo
          </Button>
          <Button
            className="flex-1 rounded-xl bg-brand text-white hover:bg-brand/90"
            onClick={onClose}
          >
            Ver {resultCount} imóveis
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Route ──────────────────────────────────────────────────── */
export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    mode: (s.mode as "rent" | "buy") || undefined,
    q: (s.q as string) || undefined,
    type: (s.type as string) || undefined,
    bedrooms: (s.bedrooms as string) || undefined,
    maxPrice: (s.maxPrice as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Buscar imóveis — meuimóvel.com" },
      { name: "description", content: "Busca inteligente com mapa real e filtros avançados." },
    ],
  }),
  component: SearchPage,
});

/* ─── Main Page ──────────────────────────────────────────────── */
function SearchPage() {
  const params = Route.useSearch();
  const [q, setQ] = useState(params.q || "");
  const [selected, setSelected] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    mode: params.mode || "rent",
    maxPrice: params.maxPrice || "",
    bedrooms: params.bedrooms || "",
  });

  const filtered = useMemo(() => {
    return properties.filter((p: Property) => {
      if (p.mode !== filters.mode) return false;
      if (filters.types.length) {
        const mapped = filters.types.map((t) =>
          t === "house-condo" ? "house" : t === "studio" ? "studio" : t,
        );
        if (!mapped.includes(p.type)) return false;
      }
      const minP = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const maxP = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      if (p.price < minP || p.price > maxP) return false;
      if (filters.bedrooms) {
        const n = parseInt(filters.bedrooms);
        if (p.bedrooms < n) return false;
      }
      if (filters.bathrooms) {
        const n = parseInt(filters.bathrooms);
        if (p.bathrooms < n) return false;
      }
      if (filters.parking) {
        const n = parseInt(filters.parking);
        if (p.parking < n) return false;
      }
      if (filters.minArea && p.area < parseInt(filters.minArea)) return false;
      if (filters.maxArea && p.area > parseInt(filters.maxArea)) return false;
      if (filters.petsAllowed === "yes" && !p.petFriendly) return false;
      if (filters.petsAllowed === "no" && p.petFriendly) return false;
      if (filters.nearSubway === "yes" && !p.nearSubway) return false;
      if (filters.nearSubway === "no" && p.nearSubway) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(s) &&
          !p.neighborhood.toLowerCase().includes(s) &&
          !p.city.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [filters, q]);

  const activeCount = countActiveFilters(filters);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-fog bg-white/95 backdrop-blur">
        <div className="container-page flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {/* Mode toggle */}
          <div className="flex shrink-0 gap-1 rounded-xl bg-secondary p-1">
            {[
              { k: "rent", l: "Alugar" },
              { k: "buy", l: "Comprar" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setFilters((f) => ({ ...f, mode: t.k as "rent" | "buy" }))}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  filters.mode === t.k
                    ? "bg-white text-brand shadow-soft"
                    : "text-slate-token",
                )}
              >
                {t.l}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-fog px-3 py-2 w-44 shrink-0 focus-within:border-brand">
            <Search className="h-3.5 w-3.5 shrink-0 text-slate-token" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Bairro, cidade..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          {/* Quick bedrooms */}
          <select
            value={filters.bedrooms}
            onChange={(e) => setFilters((f) => ({ ...f, bedrooms: e.target.value }))}
            className="shrink-0 rounded-xl border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Quartos</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>

          {/* Quick price */}
          <select
            value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
            className="shrink-0 rounded-xl border border-fog px-3 py-2 text-sm outline-none"
          >
            <option value="">Preço</option>
            {filters.mode === "rent" ? (
              <>
                <option value="2500">até R$ 2.500</option>
                <option value="4000">até R$ 4.000</option>
                <option value="6000">até R$ 6.000</option>
                <option value="10000">até R$ 10.000</option>
              </>
            ) : (
              <>
                <option value="500000">até R$ 500k</option>
                <option value="1000000">até R$ 1M</option>
                <option value="2000000">até R$ 2M</option>
                <option value="5000000">até R$ 5M</option>
              </>
            )}
          </select>

          {/* Mapa toggle */}
          <button
            onClick={() => setShowMap((v) => !v)}
            className={cn(
              "hidden shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition md:flex",
              showMap ? "border-brand bg-brand/5 text-brand" : "border-fog text-slate-token",
            )}
          >
            <MapPin className="h-3.5 w-3.5" />
            {showMap ? "Ocultar mapa" : "Ver no mapa"}
          </button>

          {/* Filtros avançados */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowFilters(true)}
            className={cn(
              "ml-auto shrink-0 gap-1.5 rounded-xl text-xs font-semibold",
              activeCount > 0 && "border-brand bg-brand/5 text-brand",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtros
            {activeCount > 0 && (
              <span className="ml-1 rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </Button>
        </div>

        {/* Active chips */}
        {activeCount > 0 && (
          <div className="container-page flex items-center gap-2 overflow-x-auto pb-2.5 no-scrollbar">
            {filters.types.map((t) => {
              const label = PROPERTY_TYPES.find((x) => x.key === t)?.label ?? t;
              return (
                <button
                  key={t}
                  onClick={() => setFilters((f) => ({ ...f, types: f.types.filter((x) => x !== t) }))}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
                >
                  {label} <X className="h-3 w-3" />
                </button>
              );
            })}
            {filters.bedrooms && (
              <button
                onClick={() => setFilters((f) => ({ ...f, bedrooms: "" }))}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
              >
                {filters.bedrooms} quartos <X className="h-3 w-3" />
              </button>
            )}
            {filters.maxPrice && (
              <button
                onClick={() => setFilters((f) => ({ ...f, maxPrice: "" }))}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
              >
                até {formatBRL(parseInt(filters.maxPrice))} <X className="h-3 w-3" />
              </button>
            )}
            {filters.petsAllowed !== "both" && (
              <button
                onClick={() => setFilters((f) => ({ ...f, petsAllowed: "both" }))}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
              >
                {filters.petsAllowed === "yes" ? "🐾 Aceita pets" : "Sem pets"} <X className="h-3 w-3" />
              </button>
            )}
            {filters.nearSubway !== "both" && (
              <button
                onClick={() => setFilters((f) => ({ ...f, nearSubway: "both" }))}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
              >
                {filters.nearSubway === "yes" ? "🚇 Perto do metrô" : "Sem metrô"} <X className="h-3 w-3" />
              </button>
            )}
            {[...filters.condo, ...filters.amenities, ...filters.wellness, ...filters.rooms].slice(0, 3).map((item) => (
              <span key={item} className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-slate-token">
                {item}
              </span>
            ))}
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="shrink-0 rounded-full px-3 py-1 text-xs font-medium text-brand underline"
            >
              Limpar tudo
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-1", showMap && "lg:h-[calc(100vh-9rem)] lg:flex-row flex-col")}>
        {/* Map */}
        {showMap && (
          <div className="relative h-[45vh] w-full overflow-hidden lg:h-full lg:w-[45%] shrink-0">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center bg-secondary text-sm text-slate-token">
                  Carregando mapa…
                </div>
              }
            >
              <MapView
                properties={filtered}
                selected={selected}
                onSelect={setSelected}
              />
            </Suspense>

            {/* Selected popup */}
            {selected && (() => {
              const p = filtered.find((x) => x.id === selected);
              if (!p) return null;
              return (
                <Link
                  to="/property/$id"
                  params={{ id: p.id }}
                  className="absolute bottom-4 left-1/2 z-[500] w-72 -translate-x-1/2 block overflow-hidden rounded-2xl bg-white shadow-elevated"
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

        {/* Results */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="sticky top-0 z-10 border-b border-fog bg-white/95 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-ink">{filtered.length} imóveis</span>
                <span className="ml-2 text-xs text-slate-token">
                  para {filters.mode === "rent" ? "alugar" : "comprar"}
                </span>
              </div>
              <select className="rounded-xl border border-fog px-3 py-1.5 text-sm outline-none">
                <option>Mais relevantes</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
              </select>
            </div>
          </div>

          <div className={cn("grid gap-4 p-4 md:p-5", showMap ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>
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
                <div className="mt-2 text-sm text-slate-token">
                  Tente ajustar os filtros.
                </div>
                <Button
                  className="mt-6 bg-brand text-white hover:bg-brand/90"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
          resultCount={filtered.length}
        />
      )}

      <WhatsAppButton />
    </div>
  );
}

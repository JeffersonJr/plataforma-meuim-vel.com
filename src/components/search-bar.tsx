import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Home, ChevronDown, BedDouble } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Main hero search bar — Quinto Andar layout
   ─────────────────────────────────────────── */
export function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [showPrice, setShowPrice] = useState(false);
  const [showBedrooms, setShowBedrooms] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = [neighborhood, city].filter(Boolean).join(", ");
    navigate({
      to: "/search",
      search: { mode, q, bedrooms, maxPrice } as never,
    });
  };

  const rentPrices = [
    { label: "R$ 1.000", value: "1000" },
    { label: "R$ 1.500", value: "1500" },
    { label: "R$ 2.000", value: "2000" },
    { label: "R$ 3.000", value: "3000" },
    { label: "R$ 4.000", value: "4000" },
    { label: "R$ 5.000", value: "5000" },
    { label: "R$ 6.000", value: "6000" },
    { label: "R$ 8.000", value: "8000" },
    { label: "R$ 10.000", value: "10000" },
  ];

  const buyPrices = [
    { label: "R$ 300 mil", value: "300000" },
    { label: "R$ 500 mil", value: "500000" },
    { label: "R$ 700 mil", value: "700000" },
    { label: "R$ 1 milhão", value: "1000000" },
    { label: "R$ 1,5 milhão", value: "1500000" },
    { label: "R$ 2 milhões", value: "2000000" },
    { label: "R$ 3 milhões", value: "3000000" },
    { label: "R$ 5 milhões", value: "5000000" },
  ];

  const prices = mode === "rent" ? rentPrices : buyPrices;

  const selectedPriceLabel = prices.find((p) => p.value === maxPrice)?.label;
  const bedroomLabel = bedrooms ? `${bedrooms} ou mais` : "Nº de quartos";

  return (
    <div className={cn("w-full rounded-3xl bg-white shadow-elevated", compact && "rounded-2xl shadow-soft")}>
      {/* Mode tabs */}
      <div className="flex border-b border-fog">
        {[
          { k: "rent", l: "Alugar" },
          { k: "buy", l: "Comprar" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setMode(t.k as "rent" | "buy")}
            className={cn(
              "flex-1 py-4 text-sm font-semibold transition rounded-t-3xl relative",
              mode === t.k
                ? "text-brand after:absolute after:bottom-0 after:left-8 after:right-8 after:h-0.5 after:bg-brand after:rounded-full"
                : "text-slate-token hover:text-ink",
            )}
          >
            {t.l}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="p-2 space-y-1">
        {/* Cidade */}
        <label className="flex items-center gap-3 rounded-2xl border border-fog px-4 py-3.5 hover:border-brand/40 focus-within:border-brand transition cursor-text">
          <MapPin className="h-5 w-5 shrink-0 text-slate-token" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-ink">Cidade</div>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Busque por cidade"
              className="mt-0.5 w-full bg-transparent text-sm text-slate-token outline-none placeholder:text-slate-token/70"
            />
          </div>
        </label>

        {/* Bairro */}
        <label className="flex items-center gap-3 rounded-2xl border border-fog px-4 py-3.5 hover:border-brand/40 focus-within:border-brand transition cursor-text">
          <Home className="h-5 w-5 shrink-0 text-slate-token" />
          <div className="flex-1">
            <div className="text-xs font-semibold text-ink">Bairro</div>
            <input
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Busque por bairro"
              className="mt-0.5 w-full bg-transparent text-sm text-slate-token outline-none placeholder:text-slate-token/70"
            />
          </div>
        </label>

        {/* Price + Bedrooms row */}
        <div className="grid grid-cols-2 gap-1">
          {/* Price */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowPrice((v) => !v); setShowBedrooms(false); }}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition",
                showPrice ? "border-brand" : "border-fog hover:border-brand/40",
              )}
            >
              <svg className="h-5 w-5 shrink-0 text-slate-token" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-ink">
                  Valor {mode === "rent" ? "total" : "total"} até
                </div>
                <div className="mt-0.5 truncate text-sm text-slate-token">
                  {selectedPriceLabel || "Escolha o valor"}
                </div>
              </div>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-token transition-transform", showPrice && "rotate-180")} />
            </button>

            {showPrice && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-2xl border border-fog bg-white shadow-elevated overflow-hidden">
                <div className="max-h-52 overflow-y-auto py-2">
                  <button
                    type="button"
                    onClick={() => { setMaxPrice(""); setShowPrice(false); }}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm transition hover:bg-secondary",
                      !maxPrice && "font-semibold text-brand bg-brand/5",
                    )}
                  >
                    Sem limite
                  </button>
                  {prices.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => { setMaxPrice(p.value); setShowPrice(false); }}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-sm transition hover:bg-secondary",
                        maxPrice === p.value && "font-semibold text-brand bg-brand/5",
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bedrooms */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowBedrooms((v) => !v); setShowPrice(false); }}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition",
                showBedrooms ? "border-brand" : "border-fog hover:border-brand/40",
              )}
            >
              <BedDouble className="h-5 w-5 shrink-0 text-slate-token" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-ink">Quartos</div>
                <div className="mt-0.5 truncate text-sm text-slate-token">{bedroomLabel}</div>
              </div>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-token transition-transform", showBedrooms && "rotate-180")} />
            </button>

            {showBedrooms && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-2xl border border-fog bg-white shadow-elevated overflow-hidden">
                <div className="py-2">
                  {[
                    { label: "Qualquer", value: "" },
                    { label: "1 ou mais", value: "1" },
                    { label: "2 ou mais", value: "2" },
                    { label: "3 ou mais", value: "3" },
                    { label: "4 ou mais", value: "4" },
                  ].map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => { setBedrooms(o.value); setShowBedrooms(false); }}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-sm transition hover:bg-secondary",
                        bedrooms === o.value && "font-semibold text-brand bg-brand/5",
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-brand py-4 text-sm font-bold text-white transition hover:bg-brand/90"
        >
          Buscar imóveis
        </button>
      </form>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Quick badges below hero
   ─────────────────────────────────────────── */
export function QuickBadges() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-white/60">Populares:</span>
      {[
        { l: "Studios em SP", to: "/search", search: { type: "studio" } },
        { l: "3 quartos no Rio", to: "/search", search: { bedrooms: "3" } },
        { l: "Pet friendly", to: "/search", search: {} },
        { l: "Perto do metrô", to: "/search", search: {} },
        { l: "Lançamentos", to: "/lancamentos", search: {} },
      ].map((b) => (
        <Link
          key={b.l}
          to={b.to as never}
          search={b.search as never}
          className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-white/25"
        >
          {b.l}
        </Link>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Compact top-bar search
   ─────────────────────────────────────────── */
export function SearchBarCompact() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/search", search: { q } as never });
      }}
      className="flex items-center gap-2 rounded-xl border border-fog bg-white px-4 py-2.5 shadow-soft"
    >
      <MapPin className="h-4 w-4 shrink-0 text-slate-token" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar bairro ou cidade..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-token/60"
      />
    </form>
  );
}

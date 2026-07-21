import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Home, Building2, BedDouble, DollarSign, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/search",
      search: { mode, q, type, bedrooms, maxPrice } as never,
    });
  };

  return (
    <div className={cn("w-full rounded-2xl bg-white shadow-elevated", compact ? "shadow-soft" : "")}>
      {/* Mode tabs */}
      <div className="flex gap-1 rounded-t-2xl bg-secondary p-1.5 px-2">
        {[
          { k: "rent", l: "Alugar" },
          { k: "buy", l: "Comprar" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setMode(t.k as "rent" | "buy")}
            className={cn(
              "rounded-xl px-5 py-2 text-sm font-semibold transition",
              mode === t.k
                ? "bg-white text-brand shadow-soft"
                : "text-slate-token hover:text-ink",
            )}
          >
            {t.l}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <form onSubmit={submit} className="grid gap-0 divide-x divide-fog md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        {/* Location */}
        <div className="flex flex-col px-4 py-3">
          <label className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-token">
            Localização
          </label>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 shrink-0 text-mint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Bairro, cidade ou endereço"
              className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-slate-token/60"
            />
          </div>
        </div>

        {/* Tipo */}
        <div className="flex flex-col px-4 py-3">
          <label className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-token">
            Tipo
          </label>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 shrink-0 text-mint" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-ink outline-none"
            >
              <option value="">Qualquer tipo</option>
              <option value="apartment">Apartamento</option>
              <option value="house">Casa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Cobertura</option>
            </select>
          </div>
        </div>

        {/* Quartos */}
        <div className="flex flex-col px-4 py-3">
          <label className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-token">
            Quartos
          </label>
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 shrink-0 text-mint" />
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-ink outline-none"
            >
              <option value="">Qualquer</option>
              <option value="1">1+ quarto</option>
              <option value="2">2+ quartos</option>
              <option value="3">3+ quartos</option>
              <option value="4">4+ quartos</option>
            </select>
          </div>
        </div>

        {/* Preço */}
        <div className="flex flex-col px-4 py-3">
          <label className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-token">
            Preço máx.
          </label>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 shrink-0 text-mint" />
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-ink outline-none"
            >
              <option value="">Sem limite</option>
              {mode === "rent" ? (
                <>
                  <option value="2500">até R$ 2.500</option>
                  <option value="4000">até R$ 4.000</option>
                  <option value="6000">até R$ 6.000</option>
                  <option value="10000">até R$ 10.000</option>
                </>
              ) : (
                <>
                  <option value="500000">até R$ 500 mil</option>
                  <option value="1000000">até R$ 1 milhão</option>
                  <option value="2000000">até R$ 2 milhões</option>
                  <option value="5000000">até R$ 5 milhões</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center p-2">
          <Button
            type="submit"
            className="h-full w-full gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90 md:rounded-xl"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Buscar</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export function QuickBadges() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-white/60">Buscas populares:</span>
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
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-white/25"
        >
          {b.l}
        </Link>
      ))}
    </div>
  );
}

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
      <Search className="h-4 w-4 shrink-0 text-slate-token" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar bairro ou cidade..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-token/60"
      />
      <Button type="submit" size="sm" className="rounded-lg bg-brand text-white hover:bg-brand/90">
        <SlidersHorizontal className="h-3.5 w-3.5" />
      </Button>
    </form>
  );
}

import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Home, Building2, BedDouble, DollarSign } from "lucide-react";
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
    <div className={cn("w-full rounded-2xl bg-white p-2 shadow-elevated", compact && "shadow-soft")}>
      <div className="flex gap-1 rounded-xl bg-secondary p-1">
        {[
          { k: "rent", l: "Alugar" },
          { k: "buy", l: "Comprar" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setMode(t.k as "rent" | "buy")}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition",
              mode === t.k ? "bg-white text-brand shadow-soft" : "text-slate-token hover:text-ink",
            )}
          >
            {t.l}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-2 grid gap-2 p-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-center md:gap-2">
        <label className="flex items-center gap-2 rounded-lg border border-fog px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-slate-token" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Bairro, cidade ou endereço"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-token"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-fog px-3 py-2.5">
          <Home className="h-4 w-4 shrink-0 text-slate-token" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            <option value="">Tipo</option>
            <option value="apartment">Apartamento</option>
            <option value="house">Casa</option>
            <option value="studio">Studio</option>
            <option value="penthouse">Cobertura</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-fog px-3 py-2.5">
          <BedDouble className="h-4 w-4 shrink-0 text-slate-token" />
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            <option value="">Quartos</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-fog px-3 py-2.5">
          <DollarSign className="h-4 w-4 shrink-0 text-slate-token" />
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            <option value="">Preço máx.</option>
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
        </label>
        <Button
          type="submit"
          className="h-11 gap-2 bg-brand px-6 text-white hover:bg-brand/90 md:w-auto"
        >
          <Search className="h-4 w-4" /> Buscar
        </Button>
      </form>
    </div>
  );
}

export function QuickBadges() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-white/70">Buscas populares:</span>
      {[
        { l: "Studios em SP", to: "/search" },
        { l: "3 quartos no Rio", to: "/search" },
        { l: "Pet friendly", to: "/search" },
        { l: "Perto do metrô", to: "/search" },
      ].map((b) => (
        <Link
          key={b.l}
          to={b.to}
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur transition hover:bg-white/20"
        >
          {b.l}
        </Link>
      ))}
    </div>
  );
}

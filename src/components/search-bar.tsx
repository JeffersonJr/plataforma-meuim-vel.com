import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Home, ChevronDown, BedDouble, Search, Clock, BadgeDollarSign, Building2, TrendingUp, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Main hero search bar — Quinto Andar massive layout
   ─────────────────────────────────────────── */
export function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<"buscar" | "anunciar">("buscar");
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

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

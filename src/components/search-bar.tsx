import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Home, ChevronDown, BedDouble, Search, Clock, BadgeDollarSign, Building2, TrendingUp, ShieldCheck, History } from "lucide-react";
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

  return (
    <div className="w-full lg:w-[420px] xl:w-[480px] bg-white rounded-3xl shadow-elevated overflow-hidden mt-10 lg:mt-0">
      <div className="p-6 md:p-8">
        {/* Top Toggles (Buscar/Anunciar) as pill buttons */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setMainTab("buscar")}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs font-bold transition-all",
              mainTab === "buscar" ? "bg-white border border-brand text-brand shadow-sm" : "bg-slate-100 text-slate-token hover:bg-slate-200"
            )}
          >
            Buscar Imóveis
          </button>
          <button
            onClick={() => setMainTab("anunciar")}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs font-bold transition-all",
              mainTab === "anunciar" ? "bg-white border border-brand text-brand shadow-sm" : "bg-slate-100 text-slate-token hover:bg-slate-200"
            )}
          >
            Anunciar Imóveis
          </button>
        </div>

        {mainTab === "buscar" ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-6 leading-tight">
              Alugue um lar<br />para chamar de seu
            </h1>

            {/* Inner Mode Tabs (Alugar / Comprar) */}
            <div className="flex gap-6 mb-6 border-b border-fog">
              <button
                onClick={() => setMode("rent")}
                className={cn(
                  "pb-3 text-sm font-bold transition-colors relative",
                  mode === "rent" ? "text-brand" : "text-slate-token hover:text-ink"
                )}
              >
                Alugar
                {mode === "rent" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
              </button>
              <button
                onClick={() => setMode("buy")}
                className={cn(
                  "pb-3 text-sm font-bold transition-colors relative",
                  mode === "buy" ? "text-brand" : "text-slate-token hover:text-ink"
                )}
              >
                Comprar
                {mode === "buy" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
              </button>
            </div>

            {/* Last Search Alert */}
            <div className="flex items-center gap-4 bg-indigo-50/50 p-4 rounded-xl mb-6 cursor-pointer hover:bg-indigo-50 transition-colors">
              <History className="h-6 w-6 text-ink shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-ink">Última busca</p>
                <p className="text-[11px] font-bold text-ink mt-0.5">São Paulo, SP, Brasil</p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* Stacked Inputs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all">
                  <MapPin className="h-5 w-5 text-slate-token shrink-0" />
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-token">Cidade</label>
                    <input
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Busque por cidade"
                      className="w-full bg-transparent outline-none text-ink text-sm font-medium placeholder:font-normal placeholder:text-slate-token/70"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all">
                  <Home className="h-5 w-5 text-slate-token shrink-0" />
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-token">Bairro</label>
                    <input
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Busque por bairro"
                      className="w-full bg-transparent outline-none text-ink text-sm font-medium placeholder:font-normal placeholder:text-slate-token/70"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all relative">
                    <BadgeDollarSign className="h-5 w-5 text-slate-token shrink-0" />
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-slate-token">Valor total até</label>
                      <select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-transparent outline-none text-ink text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option value="">Escolha o valor</option>
                        {prices.map((p) => (
                          <option key={p.value} value={p.value}>
                            Até {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-token absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all relative">
                    <BedDouble className="h-5 w-5 text-slate-token shrink-0" />
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-slate-token">Quartos</label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full bg-transparent outline-none text-ink text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option value="">Nº de quartos</option>
                        <option value="1">1+ quartos</option>
                        <option value="2">2+ quartos</option>
                        <option value="3">3+ quartos</option>
                        <option value="4">4+ quartos</option>
                      </select>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-token absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
                
              <button
                type="submit"
                className="w-full mt-4 bg-brand text-white font-bold py-4 px-8 rounded-full hover:bg-brand/90 transition-colors flex items-center justify-center gap-2"
              >
                Buscar imóveis
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-6 leading-tight">
              Alugue ou venda<br />seu imóvel
            </h1>

            {/* Inner Tabs (Anunciar / Calcular) */}
            <div className="flex gap-6 mb-6 border-b border-fog">
              <button
                className="pb-3 text-sm font-bold transition-colors relative text-brand"
              >
                Anunciar
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
              </button>
              <button
                className="pb-3 text-sm font-bold transition-colors relative text-slate-token hover:text-ink"
              >
                Calcular
              </button>
            </div>

            <form className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all text-left">
                  <label className="block text-[13px] text-ink font-medium">Endereço do imóvel</label>
                  <input
                    placeholder="Ex: Rua Girassol, São Paulo"
                    className="w-full bg-transparent outline-none text-slate-token text-base font-normal placeholder:text-slate-token/70 mt-1.5"
                  />
                </div>
                
                <div className="px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all text-left">
                  <label className="block text-[13px] text-ink font-medium">Nome</label>
                  <input
                    placeholder="Seu nome"
                    className="w-full bg-transparent outline-none text-slate-token text-base font-normal placeholder:text-slate-token/70 mt-1.5"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all text-left">
                    <label className="block text-[13px] text-ink font-medium">País</label>
                    <input
                      value="+55"
                      readOnly
                      className="w-full bg-transparent outline-none text-ink text-base font-normal mt-1.5"
                    />
                  </div>

                  <div className="flex-[2] px-4 py-3 bg-white border border-fog rounded-xl focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20 transition-all text-left">
                    <label className="block text-[13px] text-ink font-medium">Seu número</label>
                    <input
                      placeholder="(11) 9 9900-0000"
                      className="w-full bg-transparent outline-none text-slate-token text-base font-normal placeholder:text-slate-token/70 mt-1.5"
                    />
                  </div>
                </div>
              </div>
                
              <Link
                to="/cadastro-imovel"
                className="w-full mt-4 bg-brand text-white font-bold py-4 px-8 rounded-full hover:bg-brand/90 transition-colors flex items-center justify-center gap-2"
              >
                Começar cadastro
              </Link>
            </form>
          </>
        )}
      </div>
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

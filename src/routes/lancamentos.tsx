import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { properties } from "@/lib/mock-data";
import { PropertyCard } from "@/components/property-card";
import { Sparkles, MapPin, Building2, Filter, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lancamentos")({
  head: () => ({
    meta: [
      { title: "Lançamentos imobiliários — meuimóvel.com" },
      { name: "description", content: "Os melhores lançamentos imobiliários do Brasil. Plantas, estúdios, apartamentos e coberturas direto da construtora." },
    ],
  }),
  component: LancamentosPage,
});

const CITIES = ["Todos", "São Paulo", "Rio de Janeiro", "Curitiba", "Brasília", "Salvador"];
const STATUS = ["Todos", "Lançamento", "Em obras", "Pronto para morar"];
const BUILDERS = ["Todas", "Cyrela", "MRV", "Eztec", "Gafisa", "Trisul"];

// Simulate launches from existing property data
const launches = [
  {
    id: "l1",
    name: "Jardim Horizonte",
    builder: "Cyrela",
    city: "São Paulo",
    neighborhood: "Perdizes",
    units: "2 e 3 dormitórios",
    priceFrom: 680000,
    area: "65–110 m²",
    status: "Lançamento",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    delivery: "Dez/2027",
    badge: "Novo",
  },
  {
    id: "l2",
    name: "Parque Atlântico",
    builder: "Eztec",
    city: "Rio de Janeiro",
    neighborhood: "Barra da Tijuca",
    units: "3 e 4 dormitórios",
    priceFrom: 1250000,
    area: "110–240 m²",
    status: "Em obras",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    delivery: "Jun/2026",
    badge: "Obra avançada",
  },
  {
    id: "l3",
    name: "Prime Jardins",
    builder: "Trisul",
    city: "São Paulo",
    neighborhood: "Jardins",
    units: "Studios e 1 dormitório",
    priceFrom: 420000,
    area: "30–55 m²",
    status: "Pronto para morar",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    delivery: "Pronto",
    badge: "Pronto",
  },
  {
    id: "l4",
    name: "Vila das Artes",
    builder: "Gafisa",
    city: "São Paulo",
    neighborhood: "Pinheiros",
    units: "2 dormitórios",
    priceFrom: 780000,
    area: "70–95 m²",
    status: "Lançamento",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
    delivery: "Mar/2028",
    badge: "Novo",
  },
  {
    id: "l5",
    name: "Bosque Nobre",
    builder: "MRV",
    city: "Curitiba",
    neighborhood: "Batel",
    units: "2 e 3 dormitórios",
    priceFrom: 560000,
    area: "68–120 m²",
    status: "Em obras",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    delivery: "Ago/2026",
    badge: "Obra avançada",
  },
  {
    id: "l6",
    name: "Infinity Tower",
    builder: "Cyrela",
    city: "Rio de Janeiro",
    neighborhood: "Ipanema",
    units: "4 dormitórios — Coberturas",
    priceFrom: 3500000,
    area: "200–380 m²",
    status: "Lançamento",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    delivery: "Dez/2028",
    badge: "Ultra Premium",
  },
];

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function LancamentosPage() {
  const [city, setCity] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [builder, setBuilder] = useState("Todas");

  const filtered = launches.filter((l) => {
    if (city !== "Todos" && l.city !== city) return false;
    if (status !== "Todos" && l.status !== status) return false;
    if (builder !== "Todas" && l.builder !== builder) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-brand py-20 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 70% 40%, rgba(0,196,161,0.6), transparent 60%)",
          }}
        />
        <div className="container-page relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber" /> Lançamentos exclusivos
          </div>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Lançamentos<br />
            <span className="text-mint">diretamente da construtora</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Os melhores empreendimentos em lançamento, obras e prontos para morar.
            Condições especiais e preço de lançamento.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 border-b border-fog bg-white/95 backdrop-blur">
        <div className="container-page flex flex-wrap items-center gap-3 py-3">
          <Filter className="h-4 w-4 shrink-0 text-slate-token" />
          <div className="flex gap-1 flex-wrap">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  city === c ? "bg-brand text-white" : "bg-secondary text-slate-token hover:text-ink",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-fog" />
          <div className="flex gap-1 flex-wrap">
            {STATUS.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  status === s ? "bg-mint text-white" : "bg-secondary text-slate-token hover:text-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select
              value={builder}
              onChange={(e) => setBuilder(e.target.value)}
              className="rounded-xl border border-fog px-3 py-2 text-sm outline-none"
            >
              {BUILDERS.map((b) => (
                <option key={b} value={b}>{b === "Todas" ? "Todas as construtoras" : b}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="container-page py-12">
        <p className="mb-6 text-sm text-slate-token">
          {filtered.length} lançamento{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((launch) => (
            <div
              key={launch.id}
              className="group overflow-hidden rounded-2xl border border-fog bg-white shadow-soft transition hover:shadow-elevated"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={launch.image}
                  alt={launch.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand backdrop-blur">
                    {launch.badge}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-bold",
                      launch.status === "Pronto para morar"
                        ? "bg-mint text-white"
                        : launch.status === "Em obras"
                          ? "bg-amber text-white"
                          : "bg-brand text-white",
                    )}
                  >
                    {launch.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-ink">{launch.name}</h3>
                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-token">
                      <MapPin className="h-3 w-3" />
                      {launch.neighborhood}, {launch.city}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-lg bg-secondary px-2 py-1 text-xs font-medium text-brand">
                    {launch.builder}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-fog pt-4 text-center text-xs">
                  <div>
                    <div className="font-semibold text-ink">{launch.units}</div>
                    <div className="text-slate-token">Tipologia</div>
                  </div>
                  <div>
                    <div className="font-semibold text-ink">{launch.area}</div>
                    <div className="text-slate-token">Área</div>
                  </div>
                  <div>
                    <div className="font-semibold text-ink">{launch.delivery}</div>
                    <div className="text-slate-token">Entrega</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-token">A partir de</div>
                    <div className="text-lg font-bold text-brand">{formatBRL(launch.priceFrom)}</div>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand/90">
                    Saber mais <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Building2 className="mx-auto h-16 w-16 text-slate-token/20" />
            <p className="mt-4 text-slate-token">Nenhum lançamento encontrado com esses filtros.</p>
            <button
              onClick={() => { setCity("Todos"); setStatus("Todos"); setBuilder("Todas"); }}
              className="mt-4 text-sm font-medium text-brand hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

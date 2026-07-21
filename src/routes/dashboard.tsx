import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header, WhatsAppButton, Footer } from "@/components/site-chrome";
import { properties, formatBRL } from "@/lib/mock-data";
import { useFavorites } from "@/lib/favorites";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Heart,
  Bell,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
  Eye,
  Home,
  Star,
  MapPin,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Meu painel — meuimóvel.com" },
      { name: "description", content: "Acompanhe favoritos, alertas, visitas e leads no seu painel meuimóvel.com." },
      { property: "og:title", content: "Painel meuimóvel.com" },
      { property: "og:description", content: "Favoritos, alertas e agenda em um só lugar." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [role, setRole] = useState<"user" | "broker">("user");

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-mint">
              Painel
            </div>
            <h1 className="mt-1 text-3xl font-bold text-ink">
              Olá, {role === "user" ? "Ana" : "Corretor Diego"} 👋
            </h1>
            <p className="mt-1 text-sm text-slate-token">
              {role === "user"
                ? "Continue sua busca de onde parou."
                : "Aqui está o resumo dos seus imóveis e leads."}
            </p>
          </div>
          <div className="flex gap-1 rounded-xl bg-white p-1 shadow-soft">
            {[
              { k: "user", l: "Usuário" },
              { k: "broker", l: "Corretor" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setRole(t.k as "user" | "broker")}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition",
                  role === t.k ? "bg-brand text-white shadow-soft" : "text-slate-token",
                )}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {role === "user" ? <UserDashboard /> : <BrokerDashboard />}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function UserDashboard() {
  const { ids } = useFavorites();
  const favs = properties.filter((p) => ids.includes(p.id));
  const alerts = [
    { q: "Aptos 2 quartos em Pinheiros até R$ 4.500", n: 12 },
    { q: "Casas com quintal em Alphaville", n: 3 },
    { q: "Studios perto do metrô", n: 27 },
  ];
  const visits = [
    { d: "24 out", t: "14:00", p: properties[0], status: "confirmed" as const },
    { d: "27 out", t: "10:30", p: properties[4], status: "pending" as const },
    { d: "02 nov", t: "16:00", p: properties[2], status: "confirmed" as const },
  ];

  return (
    <>
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { i: Heart, l: "Favoritos", v: favs.length, c: "amber" },
          { i: Bell, l: "Alertas", v: alerts.length, c: "brand" },
          { i: Calendar, l: "Visitas", v: visits.length, c: "mint" },
          { i: MessageSquare, l: "Conversas", v: 5, c: "brand" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-fog bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className={cn(
                "grid h-10 w-10 place-items-center rounded-xl",
                k.c === "amber" && "bg-amber/10 text-amber",
                k.c === "mint" && "bg-mint/10 text-mint",
                k.c === "brand" && "bg-brand/10 text-brand",
              )}>
                <k.i className="h-5 w-5" />
              </div>
              <span className="text-3xl font-bold text-ink">{k.v}</span>
            </div>
            <div className="mt-3 text-sm text-slate-token">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Favorites */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink">Meus favoritos</h2>
            <Link to="/search" className="text-sm font-medium text-brand hover:underline">
              Buscar mais
            </Link>
          </div>
          {favs.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-fog bg-white p-10 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary text-slate-token">
                <Heart className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-semibold text-ink">Nenhum favorito ainda</div>
              <div className="mt-1 text-xs text-slate-token">
                Toque no coração de qualquer imóvel para salvar aqui.
              </div>
              <Link to="/search">
                <Button className="mt-4 bg-brand text-white hover:bg-brand/90">Explorar imóveis</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {favs.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-xl font-bold text-ink">Alertas de busca</h2>
            <div className="mt-4 space-y-2">
              {alerts.map((a) => (
                <div
                  key={a.q}
                  className="flex items-center justify-between rounded-xl border border-fog bg-white p-4 shadow-soft"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/5 text-brand">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-ink">{a.q}</div>
                      <div className="text-xs text-slate-token">{a.n} novos imóveis</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visits timeline */}
        <div>
          <h2 className="text-xl font-bold text-ink">Próximas visitas</h2>
          <div className="mt-4 rounded-2xl border border-fog bg-white p-2 shadow-soft">
            {visits.map((v, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3 p-3",
                  i !== visits.length - 1 && "border-b border-fog",
                )}
              >
                <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-cream text-brand">
                  <div className="text-[10px] font-medium uppercase">{v.d.split(" ")[1]}</div>
                  <div className="text-lg font-bold leading-none">{v.d.split(" ")[0]}</div>
                  <div className="mt-1 flex items-center gap-1 text-[10px]">
                    <Clock className="h-2.5 w-2.5" /> {v.t}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">{v.p.title}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-token">
                    <MapPin className="h-3 w-3" /> {v.p.neighborhood}
                  </div>
                  <span
                    className={cn(
                      "mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
                      v.status === "confirmed"
                        ? "bg-mint/10 text-mint"
                        : "bg-amber/10 text-amber",
                    )}
                  >
                    {v.status === "confirmed" ? "Confirmada" : "Aguardando"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function BrokerDashboard() {
  const listings = properties.slice(0, 4);
  const leads = [
    { name: "Ana Ribeiro", msg: "Tem visita esta quinta?", when: "há 2 min", hot: true, p: listings[0].title },
    { name: "João Oliveira", msg: "Aceita pet?", when: "há 12 min", hot: true, p: listings[1].title },
    { name: "Marcela Duarte", msg: "Vou levar minha filha para conhecer.", when: "há 1 h", hot: false, p: listings[0].title },
    { name: "Rodrigo Alves", msg: "Preço negociável?", when: "há 3 h", hot: false, p: listings[2].title },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { i: Home, l: "Imóveis ativos", v: "12", c: "brand" },
          { i: Users, l: "Leads este mês", v: "48", c: "mint" },
          { i: Eye, l: "Visualizações", v: "1.2k", c: "amber" },
          { i: TrendingUp, l: "Conversão", v: "8.4%", c: "brand" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-fog bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className={cn(
                "grid h-10 w-10 place-items-center rounded-xl",
                k.c === "amber" && "bg-amber/10 text-amber",
                k.c === "mint" && "bg-mint/10 text-mint",
                k.c === "brand" && "bg-brand/10 text-brand",
              )}>
                <k.i className="h-5 w-5" />
              </div>
              <span className="text-3xl font-bold text-ink">{k.v}</span>
            </div>
            <div className="mt-3 text-sm text-slate-token">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Listings performance */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink">Performance dos anúncios</h2>
            <Button size="sm" className="bg-brand text-white hover:bg-brand/90">+ Novo imóvel</Button>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-fog bg-white shadow-soft">
            {listings.map((p, i) => {
              const views = 320 + i * 120;
              const leadsN = 12 + i * 4;
              const pct = 70 - i * 8;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "grid gap-4 p-4 md:grid-cols-[64px_1fr_auto] md:items-center",
                    i !== listings.length - 1 && "border-b border-fog",
                  )}
                >
                  <img src={p.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink">{p.title}</div>
                    <div className="text-xs text-slate-token">
                      {p.neighborhood} · {formatBRL(p.price)}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-token">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {views}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {leadsN}</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber" /> {(4 + Math.random() * 0.9).toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="min-w-[120px]">
                    <div className="flex items-center justify-between text-xs text-slate-token">
                      <span>Interesse</span><span className="font-semibold text-ink">{pct}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-mint" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leads / chat */}
        <div>
          <h2 className="text-xl font-bold text-ink">Leads & Conversas</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-fog bg-white shadow-soft">
            {leads.map((l, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3 p-4 transition hover:bg-secondary/50",
                  i !== leads.length - 1 && "border-b border-fog",
                )}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <span className="text-xs font-bold">
                    {l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-ink">{l.name}</span>
                    <span className="shrink-0 text-[11px] text-slate-token">{l.when}</span>
                  </div>
                  <div className="truncate text-xs text-slate-token">{l.p}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="truncate text-sm text-ink">{l.msg}</p>
                    {l.hot && (
                      <span className="shrink-0 rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold text-amber">
                        Quente
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

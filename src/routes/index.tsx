import { createFileRoute, Link } from "@tanstack/react-router";
import { properties, collections, formatBRL } from "@/lib/mock-data";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { SearchBar, QuickBadges } from "@/components/search-bar";
import { PropertyCard } from "@/components/property-card";
import { ArrowRight, ShieldCheck, Sparkles, Clock, MapPinned } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "meuimóvel.com — Encontre seu próximo lar" },
      { name: "description", content: "Alugue ou compre imóveis com tour virtual, mapa interativo e agendamento em segundos." },
      { property: "og:title", content: "meuimóvel.com — Seu próximo lar em segundos" },
      { property: "og:description", content: "Portal imobiliário moderno com tour virtual, mapa e agendamento inteligente." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = properties.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero — full bleed with card on the right like Quinto Andar */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background photo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay — lighter on right so card pops */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand/80 via-brand/40 to-transparent" />

        <div className="container-page relative z-10 flex flex-col items-start justify-between gap-12 py-20 lg:flex-row lg:items-center">
          {/* Left — headline */}
          <div className="max-w-xl text-white lg:flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur mb-6">
              <Sparkles className="h-3.5 w-3.5 text-amber" /> Novidade — Tour virtual em todos os anúncios verificados
            </div>
            <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Alugue um lar<br />
              <span className="text-mint">para chamar<br />de seu</span>
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-md">
              Mais de 125 mil imóveis verificados em todo o Brasil. Busque no mapa, faça tour virtual e agende visitas em segundos.
            </p>

            {/* Stats */}
            <div className="mt-10 flex gap-8 border-t border-white/20 pt-6">
              {[
                { k: "125k+", l: "Imóveis" },
                { k: "4.9★", l: "Avaliação" },
                { k: "24h", l: "Resposta" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold">{s.k}</div>
                  <div className="text-xs text-white/70">{s.l}</div>
                </div>
              ))}
            </div>

            <QuickBadges />
          </div>

          {/* Right — search card */}
          <div className="w-full lg:w-[420px] lg:shrink-0">
            {/* Card header like Quinto Andar */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-float">
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-2xl font-bold text-ink leading-snug">
                  Encontre seu<br />próximo lar
                </h2>
              </div>
              <div className="px-4 pb-4">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Value props */}
      <section className="border-b border-fog bg-cream">
        <div className="container-page grid gap-6 py-10 md:grid-cols-4">
          {[
            { i: ShieldCheck, t: "Anúncios verificados", d: "Cada imóvel checado por nosso time." },
            { i: MapPinned, t: "Busca no mapa", d: "Encontre por bairro, escola ou metrô." },
            { i: Clock, t: "Agende em 1 minuto", d: "Escolha data e horário direto no app." },
            { i: Sparkles, t: "Tour virtual 3D", d: "Visite antes mesmo de sair de casa." },
          ].map((v) => (
            <div key={v.t} className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/5 text-brand">
                <v.i className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{v.t}</div>
                <div className="text-xs text-slate-token">{v.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-mint">Em destaque</div>
            <h2 className="mt-1 text-3xl font-bold text-ink">Imóveis selecionados para você</h2>
          </div>
          <Link
            to="/search"
            className="hidden items-center gap-1 text-sm font-medium text-brand hover:underline md:inline-flex"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="bg-secondary/40 py-14">
        <div className="container-page">
          <div className="text-xs font-semibold uppercase tracking-wider text-mint">Coleções curadas</div>
          <h2 className="mt-1 text-3xl font-bold text-ink">Encontre por estilo de vida</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((c) => {
              const count = properties.filter(c.filter).length;
              return (
                <Link
                  key={c.id}
                  to="/search"
                  className="card-hover group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="text-xs text-white/70">{count} imóveis</div>
                    <div className="mt-1 text-lg font-bold">{c.title}</div>
                    <div className="text-xs text-white/80">{c.subtitle}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-3xl bg-brand p-8 text-white md:p-14">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 20%, rgba(0,180,150,0.4), transparent 40%)",
            }}
          />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-3xl font-bold md:text-4xl">Anuncie seu imóvel</h3>
              <p className="mt-3 max-w-md text-white/80">
                Publique grátis, receba propostas verificadas e feche em menos tempo com nossa plataforma de corretores.
              </p>
              <Link
                to="/dashboard"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-3 text-sm font-semibold text-white transition hover:bg-mint/90"
              >
                Começar agora <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { k: "-42%", l: "Tempo até fechar" },
                { k: "3x", l: "Mais leads qualificados" },
                { k: formatBRL(0), l: "Custo de publicação" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                  <div className="text-xl font-bold md:text-2xl">{s.k}</div>
                  <div className="mt-1 text-[11px] text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { properties, collections, formatBRL } from "@/lib/mock-data";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { SeoLinks } from "@/components/seo-links";
import { SearchBar, QuickBadges } from "@/components/search-bar";
import { PropertyCard } from "@/components/property-card";
import { ArrowRight, ShieldCheck, Sparkles, Clock, MapPinned, Search, Percent, HandCoins, KeySquare } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      {/* Hero — Quinto Andar Style */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-ink">
        {/* Background photo - Family */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2000&q=80"
            alt="Família na mesa do café da manhã"
            className="h-full w-full object-cover"
          />
          {/* Gradient to make the left side darker for the search bar to pop out, and text readable */}
          <div className="absolute inset-0 bg-black/40 lg:bg-transparent" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="container-page relative z-10 flex flex-col items-start justify-center py-20 min-h-screen lg:min-h-[90vh]">
          <SearchBar />
        </div>
      </section>

      {/* Quinto Andar Banners Section */}
      <section className="container-page py-16 grid gap-6">
        
        {/* Banner 1: Consórcio */}
        <div className="rounded-3xl bg-[#09153D] overflow-hidden flex flex-col md:flex-row shadow-soft group cursor-pointer hover:shadow-elevated transition-shadow">
          <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider mb-4">Novidade</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
              Consórcio MeuImóvel com parcelas reduzidas em 40% até a contemplação
            </h2>
            <div className="w-max bg-white text-ink font-bold px-6 py-3 rounded-full text-sm group-hover:bg-fog transition-colors">
              Simular agora
            </div>
          </div>
          <div className="md:w-[45%] h-64 md:h-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" alt="Chaves do imóvel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* Banner 2: Alugar bem */}
        <div className="rounded-3xl bg-[#E8D9E8] overflow-hidden flex flex-col md:flex-row shadow-soft group cursor-pointer hover:shadow-elevated transition-shadow">
          <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-ink leading-tight mb-4">
              Alugar bem, sem complicação e fiador
            </h2>
            <p className="text-ink/80 text-lg mb-8 max-w-sm">
              Alugue seu lar sem burocracia, com garantia locatícia do MeuImóvel e aprovação em minutos.
            </p>
            <div className="w-max bg-white border border-fog text-ink font-bold px-6 py-3 rounded-full text-sm group-hover:bg-fog transition-colors">
              Buscar imóveis para alugar
            </div>
          </div>
          <div className="md:w-[50%] h-64 md:h-auto overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="Casal na sala" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-6 right-6 bg-white p-4 rounded-2xl shadow-elevated flex items-center gap-3">
              <KeySquare className="text-brand h-6 w-6" />
              <div className="text-sm font-bold text-ink">Chaves na mão<br/>em até 3 dias</div>
            </div>
          </div>
        </div>

        {/* Banner 3: Casas à venda */}
        <div className="rounded-3xl bg-[#E6E1D6] overflow-hidden flex flex-col md:flex-row shadow-soft group cursor-pointer hover:shadow-elevated transition-shadow">
          <div className="md:w-[45%] h-64 md:h-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="Casa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-ink leading-tight mb-4">
              Comprar seu imóvel e ter um cantinho só seu
            </h2>
            <p className="text-ink/80 text-lg mb-8 max-w-sm">
              Milhares de casas e apartamentos com fotos profissionais e documentação verificada.
            </p>
            <div className="w-max bg-white border border-fog text-ink font-bold px-6 py-3 rounded-full text-sm group-hover:bg-fog transition-colors">
              Ver imóveis à venda
            </div>
          </div>
        </div>

        {/* Row for Banner 4 and 5 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Banner 4: Cashback */}
          <div className="rounded-3xl bg-[#D6E4FF] overflow-hidden flex flex-col shadow-soft group cursor-pointer hover:shadow-elevated transition-shadow relative">
            <div className="p-10 flex flex-col z-10 relative">
              <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
                Conquistar um novo lar pagando menos
              </h2>
              <p className="text-ink/80 text-base mb-8 max-w-[80%]">
                Receba 10% de cashback no primeiro aluguel em imóveis selecionados.
              </p>
              <div className="w-max bg-white border border-fog text-ink font-bold px-6 py-3 rounded-full text-sm group-hover:bg-fog transition-colors">
                Buscar com cashback
              </div>
            </div>
            <div className="h-48 mt-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" alt="Sala de estar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Banner 5: Financiamento */}
          <div className="rounded-3xl bg-[#F6F4EE] overflow-hidden flex flex-col shadow-soft group cursor-pointer hover:shadow-elevated transition-shadow relative">
            <div className="p-10 flex flex-col z-10 relative">
              <span className="text-ink/60 font-bold uppercase tracking-wider text-xs mb-2">Nossos serviços</span>
              <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
                Financie seu imóvel com nossa assessoria
              </h2>
              <p className="text-ink/80 text-base mb-8 max-w-[80%]">
                Aprovamos seu crédito com as melhores taxas do mercado em até 24h.
              </p>
              <div className="w-max bg-white border border-fog text-ink font-bold px-6 py-3 rounded-full text-sm group-hover:bg-fog transition-colors">
                Fazer simulação grátis
              </div>
            </div>
            <div className="h-48 mt-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1560520031-3a4df4005288?auto=format&fit=crop&w=800&q=80" alt="Assinatura" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-fog bg-cream">
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

      <SeoLinks />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

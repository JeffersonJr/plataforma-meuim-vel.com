import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { properties, formatBRL } from "@/lib/mock-data";
import { Header, WhatsAppButton, Footer } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";
import {
  Bath,
  BedDouble,
  Car,
  Ruler,
  MapPin,
  Heart,
  Share2,
  Play,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Calendar,
  Clock,
  MessageCircle,
  Footprints,
  Shield,
  TrainFront,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — meuimóvel.com` },
          { name: "description", content: loaderData.property.description.slice(0, 155) },
          { property: "og:title", content: loaderData.property.title },
          { property: "og:description", content: loaderData.property.description.slice(0, 155) },
          { property: "og:image", content: loaderData.property.images[0] },
          { name: "twitter:image", content: loaderData.property.images[0] },
        ]
      : [{ title: "Imóvel — meuimóvel.com" }],
  }),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  const [imgIdx, setImgIdx] = useState(0);
  const { isFav, toggle } = useFavorites();

  const total = p.price + (p.condoFee || 0) + (p.iptu || 0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container-page py-6">
        <nav className="mb-4 flex items-center gap-2 text-xs text-slate-token">
          <Link to="/" className="hover:text-brand">Início</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-brand">Buscar</Link>
          <span>/</span>
          <span className="text-ink">{p.neighborhood}</span>
        </nav>

        {/* Gallery */}
        <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
          <div className="relative md:col-span-2 md:row-span-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary md:aspect-auto md:h-full">
              <img src={p.images[imgIdx]} alt={p.title} className="h-full w-full object-cover" />
              <button
                onClick={() => setImgIdx((i) => (i - 1 + p.images.length) % p.images.length)}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-soft"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setImgIdx((i) => (i + 1) % p.images.length)}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-soft"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              {p.virtualTour && (
                <button className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink shadow-elevated backdrop-blur">
                  <Play className="h-4 w-4 text-mint" /> Tour Virtual 3D
                </button>
              )}
            </div>
          </div>
          {p.images.slice(0, 4).map((src: string, i: number) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className={cn(
                "hidden aspect-[4/3] overflow-hidden rounded-2xl md:block",
                imgIdx === i && "ring-2 ring-brand ring-offset-2",
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover transition hover:scale-105" />
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t: string) => (
                    <Badge key={t} variant="outline" className="border-mint/30 bg-mint/10 text-mint">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h1 className="mt-3 text-2xl font-bold text-ink md:text-3xl">{p.title}</h1>
                <div className="mt-2 flex items-center gap-1 text-sm text-slate-token">
                  <MapPin className="h-4 w-4" /> {p.address} — {p.neighborhood}, {p.city}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => toggle(p.id)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-fog transition hover:bg-secondary"
                >
                  <Heart className={cn("h-4 w-4", isFav(p.id) && "fill-amber text-amber")} />
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-full border border-fog transition hover:bg-secondary">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-fog bg-cream p-4 sm:grid-cols-4">
              {[
                { i: BedDouble, k: `${p.bedrooms}`, l: "Quartos" },
                { i: Bath, k: `${p.bathrooms}`, l: "Banheiros" },
                { i: Car, k: `${p.parking}`, l: "Vagas" },
                { i: Ruler, k: `${p.area}m²`, l: "Área" },
              ].map((s) => (
                <div key={s.l} className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-soft">
                    <s.i className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-ink">{s.k}</div>
                    <div className="text-xs text-slate-token">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-ink">Sobre o imóvel</h2>
              <p className="mt-3 leading-relaxed text-slate-token">{p.description}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  "Portaria 24h",
                  "Piscina",
                  "Academia",
                  "Área gourmet",
                  "Playground",
                  "Salão de festas",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink">
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-mint/10 text-mint">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Virtual tour */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-ink">Tour Virtual 3D</h2>
              <div className="mt-4 relative aspect-video overflow-hidden rounded-2xl bg-brand">
                <img src={p.images[0]} alt="" className="h-full w-full object-cover opacity-40" />
                <div className="absolute inset-0 grid place-items-center">
                  <button className="flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-elevated transition hover:scale-105">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-mint text-white">
                      <Play className="h-4 w-4" />
                    </div>
                    Iniciar tour 3D
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-amber" /> Tour interativo em alta definição
                </div>
              </div>
            </section>

            {/* Neighborhood */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-ink">Vizinhança</h2>
              <p className="mt-1 text-sm text-slate-token">
                Avaliação da região baseada em mobilidade, segurança e comércio local.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { i: Footprints, l: "Caminhabilidade", v: p.scores.walkability, c: "mint" },
                  { i: Shield, l: "Segurança", v: p.scores.safety, c: "brand" },
                  { i: TrainFront, l: "Transporte", v: p.scores.transit, c: "amber" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-fog bg-white p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "grid h-8 w-8 place-items-center rounded-lg",
                          s.c === "mint" && "bg-mint/10 text-mint",
                          s.c === "brand" && "bg-brand/10 text-brand",
                          s.c === "amber" && "bg-amber/10 text-amber",
                        )}>
                          <s.i className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-ink">{s.l}</span>
                      </div>
                      <span className="text-lg font-bold text-ink">{s.v}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          s.c === "mint" && "bg-mint",
                          s.c === "brand" && "bg-brand",
                          s.c === "amber" && "bg-amber",
                        )}
                        style={{ width: `${s.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Costs */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-ink">Custos mensais</h2>
              <div className="mt-4 rounded-2xl border border-fog bg-white shadow-soft">
                {[
                  { l: p.mode === "rent" ? "Aluguel" : "Prestação estimada", v: p.price },
                  { l: "Condomínio", v: p.condoFee || 0 },
                  { l: "IPTU (mensal)", v: p.iptu || 0 },
                ].map((r) => (
                  <div key={r.l} className="flex items-center justify-between border-b border-fog px-5 py-3 last:border-b-0">
                    <span className="text-sm text-slate-token">{r.l}</span>
                    <span className="text-sm font-semibold text-ink">{formatBRL(r.v)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-brand px-5 py-4 text-white rounded-b-2xl">
                  <span className="text-sm font-medium">Total mensal</span>
                  <span className="text-xl font-bold">{formatBRL(total)}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <VisitCard priceLabel={p.mode === "rent" ? "/mês" : ""} price={p.price} broker={p.broker} />
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function VisitCard({
  price,
  priceLabel,
  broker,
}: {
  price: number;
  priceLabel: string;
  broker: { name: string; avatar: string; rating: number };
}) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const days = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      key: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      num: d.getDate(),
      month: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    };
  });
  const times = ["09:00", "11:00", "14:00", "16:00", "18:00"];

  return (
    <div className="overflow-hidden rounded-2xl border border-fog bg-white shadow-elevated">
      <div className="p-5">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-brand">{formatBRL(price)}</span>
          {priceLabel && <span className="text-sm text-slate-token">{priceLabel}</span>}
        </div>

        {step === 1 && (
          <>
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-cream p-3">
              <img src={broker.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-ink">{broker.name}</div>
                <div className="flex items-center gap-1 text-xs text-slate-token">
                  <Star className="h-3 w-3 fill-amber text-amber" /> {broker.rating} · Corretor
                </div>
              </div>
            </div>
            <Button
              className="mt-4 h-11 w-full gap-2 bg-brand text-white hover:bg-brand/90"
              onClick={() => setStep(2)}
            >
              <Calendar className="h-4 w-4" /> Agendar visita
            </Button>
            <Button variant="outline" className="mt-2 h-11 w-full gap-2">
              <MessageCircle className="h-4 w-4" /> Conversar com corretor
            </Button>
            <p className="mt-4 text-center text-[11px] text-slate-token">
              Resposta média em <strong className="text-ink">18 min</strong>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm font-semibold text-ink">1. Escolha uma data</div>
              <button onClick={() => setStep(1)} className="text-xs text-slate-token hover:underline">Voltar</button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {days.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setDate(d.key)}
                  className={cn(
                    "rounded-xl border p-2 text-center transition",
                    date === d.key
                      ? "border-brand bg-brand text-white"
                      : "border-fog bg-white text-ink hover:border-brand",
                  )}
                >
                  <div className="text-[10px] uppercase opacity-80">{d.day}</div>
                  <div className="text-lg font-bold">{d.num}</div>
                  <div className="text-[10px] opacity-80">{d.month}</div>
                </button>
              ))}
            </div>
            <Button
              disabled={!date}
              onClick={() => setStep(3)}
              className="mt-4 h-11 w-full bg-brand text-white hover:bg-brand/90 disabled:opacity-40"
            >
              Continuar
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm font-semibold text-ink">2. Escolha um horário</div>
              <button onClick={() => setStep(2)} className="text-xs text-slate-token hover:underline">Voltar</button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={cn(
                    "flex items-center justify-center gap-1 rounded-xl border py-2.5 text-sm font-medium transition",
                    time === t
                      ? "border-brand bg-brand text-white"
                      : "border-fog bg-white text-ink hover:border-brand",
                  )}
                >
                  <Clock className="h-3.5 w-3.5" /> {t}
                </button>
              ))}
            </div>
            <Button
              disabled={!time}
              onClick={() => setStep(4)}
              className="mt-4 h-11 w-full bg-brand text-white hover:bg-brand/90 disabled:opacity-40"
            >
              Confirmar visita
            </Button>
          </>
        )}

        {step === 4 && (
          <div className="mt-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint/10 text-mint">
              <Check className="h-7 w-7" />
            </div>
            <div className="mt-4 text-lg font-bold text-ink">Visita agendada!</div>
            <div className="mt-1 text-sm text-slate-token">
              {date} às {time}
            </div>
            <p className="mt-3 text-xs text-slate-token">
              Você receberá a confirmação por WhatsApp e email.
            </p>
            <Button
              variant="outline"
              className="mt-4 h-10 w-full"
              onClick={() => {
                setStep(1);
                setDate(null);
                setTime(null);
              }}
            >
              Fechar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

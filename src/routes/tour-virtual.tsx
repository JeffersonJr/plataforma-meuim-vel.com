import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { properties } from "@/lib/mock-data";
import { formatBRL } from "@/lib/mock-data";
import { Eye, Play, BedDouble, Maximize2, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/tour-virtual")({
  head: () => ({
    meta: [
      { title: "Tour Virtual — meuimóvel.com" },
      { name: "description", content: "Visite imóveis com tour virtual em 360° sem sair de casa." },
    ],
  }),
  component: TourVirtualPage,
});

const tourProperties = properties.filter((p) => p.virtualTour);

function TourVirtualPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const selectedProp = tourProperties.find((p) => p.id === selected);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <div className="container-page relative py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
              <Eye className="h-3.5 w-3.5 text-mint" /> Tour Virtual 360°
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Visite sem sair<br />
              <span className="text-mint">de casa</span>
            </h1>
            <p className="mt-4 text-white/80">
              Navegue por cada cômodo com nosso tour virtual imersivo.
              Todos os imóveis verificados com fotos profissionais em 360°.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              {[
                "Tour em 360°",
                "Medidas reais",
                "Planta baixa interativa",
                "Sem deslocamento",
              ].map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-mint" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tour viewer + list */}
      <section className="container-page py-12">
        {selected && selectedProp ? (
          <div className="mb-8">
            <button
              onClick={() => { setSelected(null); setPlaying(false); }}
              className="mb-4 text-sm text-brand hover:underline"
            >
              ← Voltar à lista
            </button>
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* Tour player */}
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
                <img
                  src={selectedProp.images[0]}
                  alt={selectedProp.title}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-500",
                    playing ? "scale-105 brightness-90" : "",
                  )}
                />
                {!playing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <button
                      onClick={() => setPlaying(true)}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-brand shadow-float transition hover:scale-110 hover:bg-white"
                    >
                      <Play className="h-8 w-8 translate-x-0.5" />
                    </button>
                    <p className="text-sm font-medium text-white/80">Iniciar Tour Virtual 360°</p>
                  </div>
                )}
                {playing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="rounded-2xl bg-black/60 px-8 py-6 text-center text-white backdrop-blur-sm">
                      <Eye className="mx-auto h-12 w-12 text-mint" />
                      <div className="mt-3 text-lg font-bold">Tour em andamento</div>
                      <div className="mt-1 text-sm text-white/70">
                        Arraste para explorar os cômodos em 360°
                      </div>
                      <div className="mt-4 text-xs text-white/50">
                        (Integração com matterport/kuula disponível em produção)
                      </div>
                    </div>
                  </div>
                )}

                {/* Room selector */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {["Sala", "Cozinha", "Quarto", "Banheiro"].map((room) => (
                    <button
                      key={room}
                      className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur transition hover:bg-white"
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info sidebar */}
              <div className="rounded-2xl border border-fog p-6">
                <div className="text-xl font-bold text-brand">{formatBRL(selectedProp.price)}</div>
                <div className="mt-1 text-xs text-slate-token">
                  {selectedProp.mode === "rent" ? "/mês" : "valor total"}
                </div>
                <h2 className="mt-3 font-bold text-ink">{selectedProp.title}</h2>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-token">
                  <MapPin className="h-4 w-4" />
                  {selectedProp.neighborhood}, {selectedProp.city}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-fog pt-5 text-center text-xs">
                  <div>
                    <BedDouble className="mx-auto h-4 w-4 text-mint" />
                    <div className="mt-1 font-semibold">{selectedProp.bedrooms}</div>
                    <div className="text-slate-token">quartos</div>
                  </div>
                  <div>
                    <Maximize2 className="mx-auto h-4 w-4 text-mint" />
                    <div className="mt-1 font-semibold">{selectedProp.area}m²</div>
                    <div className="text-slate-token">área</div>
                  </div>
                  <div>
                    <Eye className="mx-auto h-4 w-4 text-mint" />
                    <div className="mt-1 font-semibold">360°</div>
                    <div className="text-slate-token">tour</div>
                  </div>
                </div>
                <Link
                  to="/property/$id"
                  params={{ id: selectedProp.id }}
                  className="mt-5 block w-full rounded-xl bg-brand px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand/90"
                >
                  Ver imóvel completo
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-mint">
                {tourProperties.length} imóveis disponíveis
              </div>
              <h2 className="mt-2 text-2xl font-bold text-ink">Imóveis com tour virtual</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tourProperties.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className="group text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-all group-hover:bg-ink/30">
                      <div className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white/90 text-brand opacity-0 shadow-float transition-all group-hover:scale-100 group-hover:opacity-100">
                        <Play className="h-6 w-6 translate-x-0.5" />
                      </div>
                    </div>
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-mint px-2.5 py-1 text-[10px] font-bold text-white">
                      <Eye className="h-3 w-3" /> Tour 360°
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-brand">{formatBRL(p.price)}</div>
                    <div className="mt-0.5 line-clamp-1 text-sm font-medium text-ink">{p.title}</div>
                    <div className="mt-0.5 text-xs text-slate-token">{p.neighborhood}, {p.city}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

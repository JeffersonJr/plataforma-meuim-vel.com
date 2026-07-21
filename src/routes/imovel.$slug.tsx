import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { properties, formatBRL } from "@/lib/mock-data";
import { Header, WhatsAppButton, Footer } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";
import { SeoLinks } from "@/components/seo-links";
import {
  Bath,
  BedDouble,
  Car,
  Ruler,
  MapPin,
  Heart,
  Share2,
  ChevronRight,
  Check,
  Star,
  Shield,
  Building,
  Info,
  CalendarDays,
  FileText,
  MessageSquare,
  Images,
  Map,
  PlayCircle
} from "lucide-react";

export const Route = createFileRoute("/imovel/$slug")({
  loader: ({ params }) => {
    // Find property where slug matches, or fallback to parsing the id from the end of the slug
    let property = properties.find((p) => p.slug === params.slug);
    if (!property) {
       const idMatch = params.slug.match(/-p(\d+)$/);
       if (idMatch) {
         property = properties.find((p) => p.id === `p${idMatch[1]}`);
       }
    }
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
        ]
      : [{ title: "Imóvel — meuimóvel.com" }],
  }),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  const { isFav, toggle } = useFavorites();
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("condominio");

  const condo = p.condoFee || 0;
  const iptu = p.iptu || 0;
  const fireInsurance = p.mode === "rent" ? 45 : 0;
  const total = p.price + condo + iptu + fireInsurance;

  const similar = properties.filter((x) => x.id !== p.id && x.mode === p.mode).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Top Banner - Title & Sticky-like info */}
      <div className="border-b border-fog bg-white py-4 md:py-6">
        <div className="container-page flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-bold text-ink leading-tight">
              {p.type === "apartment" ? "Apartamento" : p.type === "studio" ? "Studio" : "Casa"} para {p.mode === "rent" ? "alugar" : "comprar"} com {p.area}m², {p.bedrooms} quartos e {p.parking} vagas
            </h1>
            <div className="mt-2 text-sm text-slate-token flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {p.address} - {p.neighborhood}, {p.city} - SP
            </div>
          </div>
          <div className="flex gap-3 md:shrink-0">
            <Button variant="outline" className="rounded-full border-fog gap-2" onClick={() => toggle(p.id)}>
              <Heart className={cn("h-4 w-4", isFav(p.id) && "fill-amber text-amber")} />
              {isFav(p.id) ? "Salvo" : "Salvar"}
            </Button>
            <Button variant="outline" className="rounded-full border-fog gap-2">
              <Share2 className="h-4 w-4" /> Compartilhar
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page py-6 grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-start">
        {/* Left Column - Main Content */}
        <div className="min-w-0">
          
          {/* Gallery Row Quinto Andar Style */}
          <div className="relative grid grid-cols-2 gap-2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-10">
            <div className="relative h-full w-full bg-secondary cursor-pointer hover:opacity-95 transition">
              <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-ink">
                  <PlayCircle className="h-4 w-4" /> Tour Virtual
                </span>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-2 h-full">
              <div className="h-full w-full bg-secondary cursor-pointer hover:opacity-95 transition">
                <img src={p.images[1] || p.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative h-full w-full bg-secondary cursor-pointer hover:opacity-95 transition">
                <img src={p.images[2] || p.images[0]} alt="" className="w-full h-full object-cover" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-ink shadow-soft flex items-center gap-2 hover:bg-white">
                  <Images className="h-4 w-4" /> Ver 24 fotos
                </button>
              </div>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="flex flex-wrap gap-6 py-6 border-y border-fog mb-10">
            <div className="flex items-center gap-3">
              <Ruler className="h-6 w-6 text-slate-token" />
              <div><div className="font-bold text-ink">{p.area} m²</div><div className="text-xs text-slate-token">área</div></div>
            </div>
            <div className="flex items-center gap-3">
              <BedDouble className="h-6 w-6 text-slate-token" />
              <div><div className="font-bold text-ink">{p.bedrooms}</div><div className="text-xs text-slate-token">quartos</div></div>
            </div>
            <div className="flex items-center gap-3">
              <Bath className="h-6 w-6 text-slate-token" />
              <div><div className="font-bold text-ink">{p.bathrooms}</div><div className="text-xs text-slate-token">banheiros</div></div>
            </div>
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-slate-token" />
              <div><div className="font-bold text-ink">{p.parking}</div><div className="text-xs text-slate-token">vagas</div></div>
            </div>
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-slate-token" />
              <div><div className="font-bold text-ink">9º</div><div className="text-xs text-slate-token">andar</div></div>
            </div>
          </div>

          {/* Description Text */}
          <section className="mb-10 text-ink leading-relaxed">
            <h2 className="text-xl font-bold mb-4">Sobre esse imóvel</h2>
            <p className={cn("text-slate-token", !expandedDesc && "line-clamp-3")}>
              {p.description} {p.description}
            </p>
            <button 
              onClick={() => setExpandedDesc(!expandedDesc)}
              className="mt-2 text-brand font-bold text-sm hover:underline"
            >
              {expandedDesc ? "- Menos detalhes" : "+ Ver todos os detalhes"}
            </button>
          </section>

          {/* Amenities Lists */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-ink mb-6">O que esse imóvel tem?</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-token uppercase tracking-wider mb-4">O imóvel</h3>
                <ul className="space-y-3">
                  {["Área de serviço", "Armários na cozinha", "Armários no quarto", "Varanda", "Chuveiro a gás"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink font-medium">
                      <Check className="h-4 w-4 text-brand" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-token uppercase tracking-wider mb-4">O condomínio</h3>
                <ul className="space-y-3">
                  {["Piscina", "Academia", "Elevador", "Portaria 24h", "Salão de festas"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink font-medium">
                      <Check className="h-4 w-4 text-brand" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Price Analysis Card */}
          <section className="mb-12">
            <div className="rounded-3xl border border-fog p-6 sm:p-8 bg-gradient-to-br from-cream to-white">
              <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-lg font-bold text-ink mb-1">Entenda se é um bom negócio com a análise de preço</h2>
                  <p className="text-sm text-slate-token max-w-sm">
                    Preço {p.mode === "rent" ? "do aluguel" : "de venda"} comparado a imóveis similares no mesmo bairro.
                  </p>
                  <Button className="mt-4 rounded-full bg-brand text-white font-bold px-6">
                    Ver relatório completo
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-soft border border-fog w-full sm:w-48 text-center shrink-0">
                  <div className="text-xs font-bold text-slate-token mb-2 uppercase">Preço deste imóvel</div>
                  <div className="flex items-center justify-center gap-1 mb-1 text-mint">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="h-2 bg-gradient-to-r from-mint via-amber to-red-500 rounded-full w-full mt-2 relative">
                    <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-ink rounded-full shadow-sm" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-token font-bold mt-2">
                    <span>Abaixo</span>
                    <span>Acima</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ / Accordions */}
          <section className="mb-12 border-t border-fog pt-8">
            <h2 className="text-xl font-bold text-ink mb-6">Informações adicionais</h2>
            <div className="space-y-4">
              {[
                { id: "admin", title: "Administrado por meuimóvel.com", desc: "Garantimos o pagamento do aluguel em dia e cuidamos de toda burocracia." },
                { id: "condominio", title: "Condomínio", desc: "O valor do condomínio pode sofrer alterações mensais dependendo das despesas ordinárias." },
                { id: "taxas", title: "Taxas", desc: "IPTU e Seguro Incêndio são valores estimados baseados no ano anterior." },
                { id: "condicoes", title: "Condições para alugar", desc: "Não exigimos fiador. A análise de crédito é feita em minutos via PIX ou Cartão." }
              ].map(item => (
                <div key={item.id} className="border border-fog rounded-2xl overflow-hidden transition-colors hover:border-brand/30">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 bg-white text-left"
                  >
                    <span className="font-bold text-ink">{item.title}</span>
                    <ChevronRight className={cn("h-5 w-5 text-slate-token transition-transform", openAccordion === item.id && "rotate-90")} />
                  </button>
                  {openAccordion === item.id && (
                    <div className="px-5 pb-5 text-sm text-slate-token leading-relaxed bg-white">
                      {item.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column - Sticky Sidebar Price Card */}
        <div className="relative">
          <div className="sticky top-28 bg-white rounded-3xl shadow-float border border-fog p-6">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-token uppercase tracking-wider mb-4">
                Valores {p.mode === "rent" ? "mensais" : "de compra"}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-ink">{p.mode === "rent" ? "Aluguel" : "Valor do imóvel"}</span>
                  <span className="font-bold text-ink">{formatBRL(p.price)}</span>
                </div>
                {p.condoFee! > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-ink">Condomínio</span>
                    <span className="text-ink">{formatBRL(p.condoFee!)}</span>
                  </div>
                )}
                {p.iptu! > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-ink">IPTU <span className="text-slate-token text-xs">(mês)</span></span>
                    <span className="text-ink">{formatBRL(p.iptu!)}</span>
                  </div>
                )}
                {fireInsurance > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-ink flex items-center gap-1">
                      Seguro incêndio <Info className="h-3 w-3 text-slate-token" />
                    </span>
                    <span className="text-ink">{formatBRL(fireInsurance)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-fog flex justify-between items-center mt-2">
                  <span className="font-bold text-ink text-base">Total</span>
                  <span className="font-bold text-brand text-xl">{formatBRL(total)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full rounded-full bg-brand py-6 font-bold text-white text-base hover:bg-brand/90">
                Agendar visita
              </Button>
              <Button variant="outline" className="w-full rounded-full border-brand text-brand py-6 font-bold text-base hover:bg-brand/5">
                Fazer proposta
              </Button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-fog flex items-start gap-3 text-xs text-slate-token">
              <Shield className="h-4 w-4 shrink-0 mt-0.5 text-mint" />
              <p>Pagamento seguro via plataforma. Não pague nenhum valor diretamente ao proprietário.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Imóveis Similares */}
      <section className="bg-cream py-16 border-t border-fog">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink mb-8">Outros imóveis recomendados para você</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map(sim => (
              <Link key={sim.id} to="/imovel/$slug" params={{ slug: sim.slug }} className="group bg-white rounded-2xl border border-fog overflow-hidden hover:shadow-soft transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={sim.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-ink">
                    {formatBRL(sim.price)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-ink text-sm line-clamp-1">{sim.title}</h3>
                  <p className="text-xs text-slate-token mt-1">{sim.neighborhood}, {sim.city}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-token">
                    <span className="flex items-center gap-1"><Ruler className="h-3 w-3"/> {sim.area}m²</span>
                    <span className="flex items-center gap-1"><BedDouble className="h-3 w-3"/> {sim.bedrooms}</span>
                    <span className="flex items-center gap-1"><Car className="h-3 w-3"/> {sim.parking}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="rounded-full border-brand text-brand font-bold px-8">
              Ver mais imóveis similares
            </Button>
          </div>
        </div>
      </section>

      <SeoLinks />
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Map, MapPin } from "lucide-react";

export const Route = createFileRoute("/valor-metro-quadrado")({
  component: MetroQuadrado,
});

function MetroQuadrado() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <Map className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Valor do Metro Quadrado</h1>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-fog shadow-soft mb-8">
            <h2 className="text-xl font-bold text-ink mb-6">Média de preços (Aluguel SP)</h2>
            <div className="space-y-4">
              {[
                { n: "Itaim Bibi", v: "R$ 95,00/m²" },
                { n: "Pinheiros", v: "R$ 82,00/m²" },
                { n: "Moema", v: "R$ 75,00/m²" },
                { n: "Vila Mariana", v: "R$ 68,00/m²" },
                { n: "Santana", v: "R$ 45,00/m²" },
              ].map((b) => (
                <div key={b.n} className="flex items-center justify-between border-b border-fog pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-token" />
                    <h3 className="font-bold text-ink">{b.n}</h3>
                  </div>
                  <div className="text-lg font-bold text-brand">{b.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-token">Os valores apresentados são médias baseadas em anúncios ativos na plataforma e podem variar de acordo com o estado de conservação do imóvel, número de vagas e facilidades do condomínio.</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

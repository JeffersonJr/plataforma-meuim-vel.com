import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Percent } from "lucide-react";

export const Route = createFileRoute("/indices-reajuste")({
  component: IndicesReajuste,
});

function IndicesReajuste() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <Percent className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Índices de Reajuste</h1>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-fog shadow-soft mb-8">
            <h2 className="text-xl font-bold text-ink mb-6">Valores Acumulados (Últimos 12 meses)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-fog pb-4">
                <div>
                  <h3 className="font-bold text-ink">IPCA (IBGE)</h3>
                  <p className="text-sm text-slate-token">Índice Nacional de Preços ao Consumidor Amplo</p>
                </div>
                <div className="text-xl font-bold text-brand">4,50%</div>
              </div>
              <div className="flex items-center justify-between border-b border-fog pb-4">
                <div>
                  <h3 className="font-bold text-ink">IGP-M (FGV)</h3>
                  <p className="text-sm text-slate-token">Índice Geral de Preços - Mercado</p>
                </div>
                <div className="text-xl font-bold text-amber">-3,18%</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-ink">INCC (FGV)</h3>
                  <p className="text-sm text-slate-token">Índice Nacional de Custo da Construção</p>
                </div>
                <div className="text-xl font-bold text-mint">5,20%</div>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h3>Qual índice escolher no contrato?</h3>
            <p>Historicamente o IGP-M era o padrão absoluto nos contratos de aluguel. No entanto, por ser muito impactado pelo dólar e preços de atacado, em anos recentes ele sofreu distorções grandes.</p>
            <p>Hoje, muitos locadores e inquilinos optam pelo IPCA, que é o índice oficial da inflação no Brasil e reflete melhor o custo de vida geral da população.</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

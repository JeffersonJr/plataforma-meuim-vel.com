import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/calculadora-aluguel")({
  component: CalculadoraAluguel,
});

function CalculadoraAluguel() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
              <Calculator className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-3xl font-bold text-ink md:text-4xl">Calculadora de Aluguel</h1>
            <p className="mt-4 text-slate-token">
              Descubra quanto cobrar pelo seu imóvel com base em milhares de dados de mercado.
            </p>
          </div>

          <div className="rounded-3xl border border-fog bg-white p-8 shadow-soft">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink">CEP ou Endereço</label>
                  <input type="text" className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none" placeholder="Ex: 01310-100" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink">Tipo de Imóvel</label>
                  <select className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none bg-white">
                    <option>Apartamento</option>
                    <option>Casa</option>
                    <option>Studio/Kitnet</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink">Área (m²)</label>
                  <input type="number" className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none" placeholder="Ex: 65" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink">Quartos</label>
                  <input type="number" className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none" placeholder="Ex: 2" />
                </div>
              </div>
              <Button className="w-full rounded-xl bg-brand py-6 text-lg font-bold text-white hover:bg-brand/90 mt-4">
                Calcular valor sugerido
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

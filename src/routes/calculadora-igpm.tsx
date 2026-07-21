import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Calculator } from "lucide-react";

export const Route = createFileRoute("/calculadora-igpm")({
  component: CalculadoraIGPM,
});

function CalculadoraIGPM() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <Calculator className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Calculadora de Reajuste (IGP-M/IPCA)</h1>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-fog shadow-soft mb-8">
            <h2 className="text-xl font-bold text-ink mb-6">Simule o novo valor do seu aluguel</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Valor atual do aluguel (R$)</label>
                  <input type="number" placeholder="Ex: 2500" className="w-full border border-fog rounded-xl px-4 py-3 outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Mês de reajuste</label>
                  <select className="w-full border border-fog rounded-xl px-4 py-3 outline-none focus:border-brand bg-white">
                    <option>Janeiro</option>
                    <option>Fevereiro</option>
                    <option>Março</option>
                    <option>Abril</option>
                    <option>Maio</option>
                    <option>Junho</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-ink mb-2">Índice utilizado no contrato</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="indice" defaultChecked className="accent-brand" /> IGP-M (FGV)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="indice" className="accent-brand" /> IPCA (IBGE)
                  </label>
                </div>
              </div>
              <button className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand/90 transition">Calcular Reajuste</button>
            </form>
          </div>

          <div className="prose prose-slate max-w-none">
            <h3>O que é o IGP-M?</h3>
            <p>O Índice Geral de Preços - Mercado (IGP-M) é a principal referência utilizada para reajustes de contratos de aluguel no Brasil. Calculado pela Fundação Getulio Vargas (FGV), ele mede a variação de preços desde matérias-primas até bens e serviços de consumo final.</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

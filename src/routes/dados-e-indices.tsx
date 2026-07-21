import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { BarChart3, TrendingUp, PieChart } from "lucide-react";

export const Route = createFileRoute("/dados-e-indices")({
  component: DadosIndices,
});

function DadosIndices() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <BarChart3 className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Dados e Índices do Mercado</h1>
          </div>
          <p className="text-lg text-slate-token mb-12 max-w-2xl">
            Acompanhe a evolução dos preços de aluguel e venda nas principais capitais do país e tome decisões baseadas em dados.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-fog shadow-soft">
              <TrendingUp className="h-8 w-8 text-mint mb-4" />
              <p className="text-sm font-bold text-slate-token uppercase">Índice MeuImóvel (Aluguel)</p>
              <h2 className="text-3xl font-bold text-ink mt-2">+1.2%</h2>
              <p className="text-sm text-slate-token mt-1">Acumulado no mês (SP)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-fog shadow-soft">
              <TrendingUp className="h-8 w-8 text-brand mb-4" />
              <p className="text-sm font-bold text-slate-token uppercase">Índice MeuImóvel (Venda)</p>
              <h2 className="text-3xl font-bold text-ink mt-2">+0.5%</h2>
              <p className="text-sm text-slate-token mt-1">Acumulado no mês (SP)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-fog shadow-soft">
              <PieChart className="h-8 w-8 text-amber mb-4" />
              <p className="text-sm font-bold text-slate-token uppercase">Rentabilidade Média</p>
              <h2 className="text-3xl font-bold text-ink mt-2">5.8% a.a.</h2>
              <p className="text-sm text-slate-token mt-1">Imóveis residenciais</p>
            </div>
          </div>
          
          <div className="bg-secondary/20 p-8 rounded-3xl border border-fog text-center">
            <h3 className="text-xl font-bold text-ink mb-4">Relatório Completo</h3>
            <p className="text-slate-token mb-6 max-w-xl mx-auto">Faça o download do nosso relatório mensal com a análise completa do mercado imobiliário em mais de 20 cidades.</p>
            <button className="bg-brand text-white font-bold px-8 py-3 rounded-xl hover:bg-brand/90 transition">Baixar Relatório (PDF)</button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

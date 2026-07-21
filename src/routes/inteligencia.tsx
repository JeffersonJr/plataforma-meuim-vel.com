import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { BrainCircuit, TrendingUp, Search, Calculator, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/inteligencia")({
  component: Inteligencia,
});

function Inteligencia() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ink py-24 text-white">
          <div className="container-page text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand">
              <BrainCircuit className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Inteligência <span className="text-brand">MeuImóvel</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Dados, calculadoras e estatísticas do mercado imobiliário para você tomar a melhor decisão na hora de alugar ou comprar.
            </p>
          </div>
        </section>

        {/* Ferramentas */}
        <section className="py-24">
          <div className="container-page">
            <h2 className="mb-12 text-center text-3xl font-bold text-ink">Nossas ferramentas gratuitas</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-3xl border border-fog bg-white p-8 transition-shadow hover:shadow-elevated">
                <Calculator className="h-10 w-10 text-brand mb-6" />
                <h3 className="text-xl font-bold text-ink mb-3">Calculadora de Aluguel</h3>
                <p className="text-slate-token mb-6">
                  Descubra o valor ideal para alugar seu imóvel com base na região e características.
                </p>
                <Link to="/calculadora-aluguel" className="text-brand font-semibold hover:underline">
                  Acessar calculadora &rarr;
                </Link>
              </div>

              <div className="group rounded-3xl border border-fog bg-white p-8 transition-shadow hover:shadow-elevated">
                <TrendingUp className="h-10 w-10 text-brand mb-6" />
                <h3 className="text-xl font-bold text-ink mb-3">Calculadora de Venda</h3>
                <p className="text-slate-token mb-6">
                  Precifique seu imóvel corretamente e venda mais rápido comparando com o mercado.
                </p>
                <Link to="/calculadora-venda" className="text-brand font-semibold hover:underline">
                  Acessar calculadora &rarr;
                </Link>
              </div>

              <div className="group rounded-3xl border border-fog bg-white p-8 transition-shadow hover:shadow-elevated">
                <Search className="h-10 w-10 text-brand mb-6" />
                <h3 className="text-xl font-bold text-ink mb-3">Explorar Condomínios</h3>
                <p className="text-slate-token mb-6">
                  Pesquise infraestrutura, regras e valores médios dos maiores condomínios do país.
                </p>
                <Link to="/condominios" className="text-brand font-semibold hover:underline">
                  Explorar agora &rarr;
                </Link>
              </div>

              <div className="group rounded-3xl border border-fog bg-white p-8 transition-shadow hover:shadow-elevated">
                <FileText className="h-10 w-10 text-brand mb-6" />
                <h3 className="text-xl font-bold text-ink mb-3">Índices de Reajuste</h3>
                <p className="text-slate-token mb-6">
                  Acompanhe IGP-M, IPCA e outras taxas que afetam os contratos de locação.
                </p>
                <Link to="/central-de-ajuda" className="text-brand font-semibold hover:underline">
                  Ver índices &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

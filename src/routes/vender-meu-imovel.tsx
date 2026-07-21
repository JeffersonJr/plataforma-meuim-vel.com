import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { DollarSign, Eye, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/vender-meu-imovel")({
  component: VenderMeuImovel,
});

function VenderMeuImovel() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-ink py-20 text-white">
          <div className="container-page flex flex-col items-center text-center lg:flex-row lg:text-left lg:gap-12">
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
                Venda seu imóvel com <span className="text-brand">especialistas</span>
              </h1>
              <p className="max-w-xl text-lg text-white/80 mb-10">
                A melhor exposição do mercado imobiliário, suporte jurídico completo e a melhor taxa de corretagem para fechar o melhor negócio.
              </p>
              <Link to="/cadastro">
                <Button className="rounded-xl bg-brand px-8 py-6 text-lg font-bold text-white hover:bg-brand/90">
                  Anunciar imóvel para venda
                </Button>
              </Link>
            </div>
            <div className="flex-1 mt-12 lg:mt-0">
              <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                  <DollarSign className="h-16 w-16 mb-4" />
                  <span>Venda rápida e segura</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container-page">
            <h2 className="text-center text-3xl font-bold text-ink mb-16">Vantagens exclusivas</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Máxima Exposição</h3>
                <p className="text-slate-token">Anunciando com a gente, seu imóvel ganha destaque imediato para milhares de compradores interessados.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
                  <LineChart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Avaliação Precisa</h3>
                <p className="text-slate-token">Nossa tecnologia analisa preços reais de vendas na sua rua para garantir que você não perca dinheiro.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
                  <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Assessoria Completa</h3>
                <p className="text-slate-token">Da negociação ao cartório, nossos especialistas resolvem toda a burocracia para você.</p>
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

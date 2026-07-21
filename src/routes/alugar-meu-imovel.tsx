import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Home, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/alugar-meu-imovel")({
  component: AlugarMeuImovel,
});

function AlugarMeuImovel() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-ink py-20 text-white">
          <div className="container-page flex flex-col items-center text-center lg:flex-row lg:text-left lg:gap-12">
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
                Alugue seu imóvel <span className="text-brand">mais rápido</span>
              </h1>
              <p className="max-w-xl text-lg text-white/80 mb-10">
                Fotos profissionais grátis, avaliação inteligente e garantia de recebimento em dia, mesmo se o inquilino atrasar.
              </p>
              <Link to="/cadastro">
                <Button className="rounded-xl bg-brand px-8 py-6 text-lg font-bold text-white hover:bg-brand/90">
                  Cadastrar meu imóvel agora
                </Button>
              </Link>
            </div>
            <div className="flex-1 mt-12 lg:mt-0">
              <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                  <Home className="h-16 w-16 mb-4" />
                  <span>Vídeo demonstrativo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container-page">
            <h2 className="text-center text-3xl font-bold text-ink mb-16">Por que alugar com o meuimóvel.com?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Velocidade recorde</h3>
                <p className="text-slate-token">Imóveis alugados em média 5x mais rápido graças ao nosso alcance nacional e motor de recomendação.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Recebimento Garantido</h3>
                <p className="text-slate-token">Receba seu aluguel todo dia 12, independentemente de inadimplência do locatário. Nós cobrimos.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Gestão 100% Digital</h3>
                <p className="text-slate-token">Assine o contrato no celular, sem cartório e sem dor de cabeça. Tudo na palma da sua mão.</p>
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

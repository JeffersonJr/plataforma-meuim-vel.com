import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Gift, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/indicar-imoveis")({
  component: IndicarImoveis,
});

function IndicarImoveis() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-ink py-20 text-white text-center">
          <div className="container-page max-w-3xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand mb-8">
              <Gift className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
              Indique imóveis e ganhe até <span className="text-brand">R$ 1.500</span>
            </h1>
            <p className="text-lg text-white/80 mb-10">
              Conhece alguém que quer alugar ou vender um imóvel? Indique para a plataforma. Se o imóvel for publicado, você ganha R$ 100. Se for alugado ou vendido, você ganha até R$ 1.500 direto na sua conta.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container-page max-w-4xl">
            <div className="rounded-3xl border border-fog bg-white p-8 md:p-12 shadow-soft">
              <h2 className="text-2xl font-bold text-ink mb-6 text-center">Como funciona?</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-4 font-bold text-xl">1</div>
                  <h3 className="font-bold text-ink mb-2">Gere seu link</h3>
                  <p className="text-sm text-slate-token">Copie seu link de indicação único abaixo e compartilhe no WhatsApp ou redes sociais.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-4 font-bold text-xl">2</div>
                  <h3 className="font-bold text-ink mb-2">Imóvel publicado</h3>
                  <p className="text-sm text-slate-token">O proprietário cadastra pelo seu link. Assim que o anúncio for aprovado, você ganha R$ 100.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-4 font-bold text-xl">3</div>
                  <h3 className="font-bold text-ink mb-2">Dinheiro no bolso</h3>
                  <p className="text-sm text-slate-token">Quando o imóvel for alugado ou vendido, você recebe a premiação final.</p>
                </div>
              </div>

              <div className="bg-secondary rounded-2xl p-6 text-center border border-fog">
                <h3 className="text-lg font-bold text-ink mb-4">Seu link de indicação</h3>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="bg-white border border-fog rounded-xl px-4 py-3 flex-1 w-full max-w-sm text-left truncate text-slate-token font-mono text-sm">
                    https://meuimovel.com/i/jefferson-123
                  </div>
                  <Button className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6 w-full md:w-auto">
                    <Copy className="h-4 w-4 mr-2" /> Copiar link
                  </Button>
                </div>
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

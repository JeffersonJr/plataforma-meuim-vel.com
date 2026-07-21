import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/anunciar")({
  component: AnunciarPage,
});

function AnunciarPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 container-page py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-ink max-w-2xl mx-auto leading-tight">
          Anuncie seu imóvel rápido, de graça e sem dor de cabeça
        </h1>
        <p className="mt-6 text-lg text-slate-token max-w-xl mx-auto">
          Tire fotos, defina o preço e nós fazemos o resto. Milhares de inquilinos e compradores já estão procurando.
        </p>
        <div className="mt-10">
          <Button className="rounded-full bg-brand px-8 py-6 text-lg font-bold text-white hover:bg-brand/90">
            Começar meu anúncio
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

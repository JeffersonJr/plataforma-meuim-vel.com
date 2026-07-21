import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/corretor-parceiro")({
  component: CorretorPage,
});

function CorretorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 container-page py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand max-w-2xl mx-auto leading-tight">
          Seja um corretor parceiro
        </h1>
        <p className="mt-6 text-lg text-slate-token max-w-xl mx-auto">
          Acesse nossa carteira exclusiva de imóveis, ganhe agilidade com nossa tecnologia e maximize seus ganhos fechando mais contratos.
        </p>
        <div className="mt-10">
          <Button className="rounded-full bg-brand px-8 py-6 text-lg font-bold text-white hover:bg-brand/90">
            Quero ser parceiro
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { FileSignature, Receipt, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contratos")({
  component: Contratos,
});

function Contratos() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
            <FileSignature className="h-8 w-8 text-brand" />
            Contratos e Boletos
          </h1>
          <p className="mt-2 text-slate-token">
            Gerencie seus contratos ativos, segunda via de boletos e histórico de pagamentos.
          </p>
        </div>

        <div className="flex gap-8 border-b border-fog mb-8">
          <button className="border-b-2 border-brand py-3 font-bold text-brand">
            Ativos (0)
          </button>
          <button className="border-b-2 border-transparent py-3 font-medium text-slate-token hover:text-ink">
            Encerrados
          </button>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-fog bg-white py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand mb-4">
            <Receipt className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Você não possui contratos ativos</h2>
          <p className="max-w-sm text-slate-token mb-8">
            Quando você alugar ou comprar um imóvel conosco, os detalhes do contrato e pagamentos ficarão disponíveis aqui.
          </p>
          <div className="flex gap-4">
            <Link to="/search">
              <Button className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6">
                <Search className="h-4 w-4 mr-2" /> Buscar imóveis
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

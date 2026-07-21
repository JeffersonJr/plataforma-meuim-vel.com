import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Wallet, ArrowDownToLine, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/repasses")({
  component: Repasses,
});

function Repasses() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
            <Wallet className="h-8 w-8 text-brand" />
            Extrato e Repasses
          </h1>
          <p className="mt-2 text-slate-token">
            Acompanhe os pagamentos recebidos dos seus imóveis alugados pela plataforma.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-fog bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-token">Próximo Repasse</h3>
              <ArrowDownToLine className="h-5 w-5 text-brand" />
            </div>
            <p className="text-3xl font-bold text-ink">R$ 0,00</p>
            <p className="text-sm text-slate-token mt-2">Nenhum valor agendado para o dia 12</p>
          </div>
          <div className="rounded-2xl border border-fog bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-token">Recebido no ano</h3>
              <Receipt className="h-5 w-5 text-ink" />
            </div>
            <p className="text-3xl font-bold text-ink">R$ 0,00</p>
            <p className="text-sm text-slate-token mt-2">Total líquido já transferido</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-fog bg-white py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand mb-4">
            <Receipt className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Nenhum histórico encontrado</h2>
          <p className="max-w-sm text-slate-token mb-8">
            Você ainda não possui imóveis com contratos ativos recebendo repasses de aluguel.
          </p>
          <div className="flex gap-4">
            <Link to="/anunciar">
              <Button className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6">
                Anunciar meu imóvel
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

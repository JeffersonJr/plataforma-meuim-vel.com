import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Building2, Search, ArrowRight, Wallet, Home, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/area-meuimovel")({
  component: AreaMeuImovel,
});

function AreaMeuImovel() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
            <Building2 className="h-8 w-8 text-brand" />
            Área MeuImóvel
          </h1>
          <p className="mt-2 text-slate-token">
            Sua central de gestão imobiliária. Administre seus imóveis, inquilinos e repasses.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {/* Dashboard Cards */}
          <div className="rounded-2xl border border-fog bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-brand/10 p-3 rounded-full text-brand">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink">Meus Imóveis</h3>
                <p className="text-sm text-slate-token">0 cadastrados</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-fog bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-brand/10 p-3 rounded-full text-brand">
                <Key className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink">Alugados</h3>
                <p className="text-sm text-slate-token">0 contratos ativos</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-fog bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-brand/10 p-3 rounded-full text-brand">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink">Repasses</h3>
                <p className="text-sm text-slate-token">R$ 0,00 previstos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-fog bg-white py-20 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand mb-4">
            <Building2 className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Comece a anunciar na plataforma</h2>
          <p className="max-w-sm text-slate-token mb-8">
            Anuncie seu imóvel para alugar ou vender na maior plataforma imobiliária do Brasil de forma rápida e segura.
          </p>
          <div className="flex gap-4">
            <Link to="/anunciar">
              <Button className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6">
                Anunciar meu imóvel <ArrowRight className="ml-2 h-4 w-4" />
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

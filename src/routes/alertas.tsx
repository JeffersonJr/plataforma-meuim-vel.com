import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Sparkles, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/alertas")({
  component: Alertas,
});

function Alertas() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-brand" />
              Alertas Criados
            </h1>
            <p className="mt-2 text-slate-token">
              Fique sabendo em primeira mão quando o imóvel dos seus sonhos entrar na plataforma.
            </p>
          </div>
          <Button className="hidden md:flex bg-brand text-white hover:bg-brand/90 gap-2 rounded-xl">
            <Plus className="h-4 w-4" /> Novo alerta
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-fog bg-white py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand mb-4">
            <Sparkles className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Você ainda não possui alertas</h2>
          <p className="max-w-sm text-slate-token mb-8">
            Crie um alerta com as suas preferências e nós te avisaremos assim que um novo imóvel aparecer!
          </p>
          <div className="flex gap-4">
            <Button className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6">
              Criar primeiro alerta
            </Button>
            <Link to="/search">
              <Button variant="outline" className="rounded-xl px-6 border-fog text-ink hover:bg-secondary">
                <Search className="h-4 w-4 mr-2" /> Explorar imóveis
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

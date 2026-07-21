import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { MapPin, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/visitas")({
  component: Visitas,
});

function Visitas() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
            <MapPin className="h-8 w-8 text-brand" />
            Visitas Agendadas
          </h1>
          <p className="mt-2 text-slate-token">
            Acompanhe o status das suas visitas e o histórico de imóveis visitados.
          </p>
        </div>

        <div className="flex gap-8 border-b border-fog mb-8">
          <button className="border-b-2 border-brand py-3 font-bold text-brand">
            Próximas visitas (0)
          </button>
          <button className="border-b-2 border-transparent py-3 font-medium text-slate-token hover:text-ink">
            Histórico
          </button>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-fog bg-white py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand mb-4">
            <Calendar className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Nenhuma visita agendada</h2>
          <p className="max-w-sm text-slate-token mb-8">
            Você não possui visitas futuras marcadas. Que tal explorar alguns imóveis e agendar a sua primeira visita?
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

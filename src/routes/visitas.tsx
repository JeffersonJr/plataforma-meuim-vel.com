import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { MapPin, Calendar, Search, Clock, Home, XCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/visitas")({
  component: Visitas,
});

function Visitas() {
  const [tab, setTab] = useState<"proximas" | "historico">("proximas");

  const proximas = [
    {
      id: "v1",
      title: "Apartamento de 2 quartos no Centro",
      address: "Rua Augusta, 1000 - Consolação, São Paulo",
      date: "Amanhã, às 14:00",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
      status: "Confirmada",
    }
  ];

  const historico = [
    {
      id: "v2",
      title: "Studio Vila Madalena",
      address: "Rua Fradique Coutinho, 500 - São Paulo",
      date: "15 de Junho, 10:00",
      image: "https://images.unsplash.com/photo-1502672260266-1c1e52408437?auto=format&fit=crop&w=400&q=80",
      status: "Visitado",
    },
    {
      id: "v3",
      title: "Casa com Quintal",
      address: "Rua Heitor Penteado - Sumarezinho",
      date: "10 de Junho, 15:30",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      status: "Cancelada",
    }
  ];

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
          <button 
            onClick={() => setTab("proximas")}
            className={`py-3 font-bold border-b-2 transition-colors ${tab === "proximas" ? "border-brand text-brand" : "border-transparent text-slate-token hover:text-ink"}`}
          >
            Próximas visitas ({proximas.length})
          </button>
          <button 
            onClick={() => setTab("historico")}
            className={`py-3 font-bold border-b-2 transition-colors ${tab === "historico" ? "border-brand text-brand" : "border-transparent text-slate-token hover:text-ink"}`}
          >
            Histórico ({historico.length})
          </button>
        </div>

        {tab === "proximas" ? (
          proximas.length > 0 ? (
            <div className="grid gap-6">
              {proximas.map(v => (
                <div key={v.id} className="flex flex-col sm:flex-row gap-6 bg-white border border-fog rounded-2xl p-6 shadow-soft">
                  <img src={v.image} alt={v.title} className="w-full sm:w-48 h-32 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> {v.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-ink text-lg">{v.title}</h3>
                      <p className="text-sm text-slate-token flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {v.address}</p>
                      <p className="text-sm text-ink font-semibold flex items-center gap-1 mt-2"><Clock className="h-4 w-4 text-brand" /> {v.date}</p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button variant="outline" className="border-fog text-ink hover:bg-secondary rounded-xl">Reagendar</Button>
                      <Button variant="outline" className="border-red-100 text-red-600 hover:bg-red-50 rounded-xl">Cancelar Visita</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )
        ) : (
          <div className="grid gap-6">
            {historico.map(v => (
              <div key={v.id} className="flex flex-col sm:flex-row gap-6 bg-white border border-fog rounded-2xl p-6 opacity-75">
                <img src={v.image} alt={v.title} className="w-full sm:w-32 h-24 object-cover rounded-xl shrink-0 grayscale" />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${v.status === 'Visitado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {v.status === 'Visitado' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />} {v.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-ink text-base">{v.title}</h3>
                  <p className="text-xs text-slate-token mt-1">{v.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

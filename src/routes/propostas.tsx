import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Handshake, FileText, Search, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/propostas")({
  component: Propostas,
});

function Propostas() {
  const propostas = [
    {
      id: "p1",
      title: "Apartamento Vila Mariana",
      address: "Rua Domingos de Morais, 1200 - São Paulo",
      value: "R$ 3.200",
      status: "Em análise",
      date: "Enviada há 2 dias",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "p2",
      title: "Casa de Condomínio",
      address: "Rodovia Raposo Tavares, km 15 - Cotia",
      value: "R$ 4.500",
      status: "Recusada",
      date: "Enviada há 1 semana",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
              <Handshake className="h-8 w-8 text-brand" />
              Propostas Enviadas
            </h1>
            <p className="mt-2 text-slate-token">
              Acompanhe o status das negociações dos imóveis que você tem interesse.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {propostas.map(p => (
            <div key={p.id} className="bg-white border border-fog rounded-2xl p-6 shadow-soft flex flex-col md:flex-row gap-6 items-start">
              <img src={p.image} alt={p.title} className="w-full md:w-48 h-32 object-cover rounded-xl shrink-0" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Em análise' ? 'bg-amber/10 text-amber' : 'bg-red-50 text-red-600'}`}>
                    {p.status}
                  </span>
                  <span className="text-sm text-slate-token flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {p.date}
                  </span>
                </div>
                <h3 className="font-bold text-ink text-xl">{p.title}</h3>
                <p className="text-sm text-slate-token flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> {p.address}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="text-xs text-slate-token font-bold uppercase">Sua proposta</p>
                    <p className="font-bold text-brand text-lg">{p.value}</p>
                  </div>
                  <Button variant="link" className="text-ink font-bold hover:text-brand px-0 sm:px-4 mt-2 sm:mt-0">
                    Ver detalhes <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

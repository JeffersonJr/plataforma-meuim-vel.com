import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { FileSignature, Receipt, Search, Download, ExternalLink, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contratos")({
  component: Contratos,
});

function Contratos() {
  const [tab, setTab] = useState<"ativos" | "encerrados">("ativos");

  const ativos = [
    {
      id: "c1",
      title: "Aluguel - Apartamento Vila Mariana",
      address: "Rua Domingos de Morais, 1200 - São Paulo",
      value: "R$ 3.200",
      dueDate: "Vence todo dia 10",
      status: "Em dia",
      nextBoleto: "R$ 3.200",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    }
  ];

  const encerrados = [
    {
      id: "c2",
      title: "Aluguel - Studio Pinheiros",
      address: "Rua Teodoro Sampaio, 800 - São Paulo",
      value: "R$ 2.800",
      endDate: "Encerrado em 15/02/2025",
      status: "Finalizado",
      image: "https://images.unsplash.com/photo-1502672260266-1c1e52408437?auto=format&fit=crop&w=400&q=80",
    }
  ];

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
          <button 
            onClick={() => setTab("ativos")}
            className={`py-3 font-bold border-b-2 transition-colors ${tab === "ativos" ? "border-brand text-brand" : "border-transparent text-slate-token hover:text-ink"}`}
          >
            Ativos ({ativos.length})
          </button>
          <button 
            onClick={() => setTab("encerrados")}
            className={`py-3 font-bold border-b-2 transition-colors ${tab === "encerrados" ? "border-brand text-brand" : "border-transparent text-slate-token hover:text-ink"}`}
          >
            Encerrados ({encerrados.length})
          </button>
        </div>

        {tab === "ativos" ? (
          ativos.length > 0 ? (
            <div className="grid gap-6">
              {ativos.map(c => (
                <div key={c.id} className="bg-white border border-fog rounded-2xl p-6 shadow-soft flex flex-col md:flex-row gap-6 items-start">
                  <img src={c.image} alt={c.title} className="w-full md:w-48 h-32 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {c.status}
                      </span>
                      <span className="text-sm text-slate-token flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" /> {c.dueDate}
                      </span>
                    </div>
                    <h3 className="font-bold text-ink text-xl">{c.title}</h3>
                    <p className="text-sm text-slate-token mt-1">
                      {c.address}
                    </p>
                    
                    <div className="mt-4 border border-fog rounded-xl overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-fog">
                      <div className="flex-1 p-4 bg-secondary flex justify-between items-center">
                        <div>
                          <p className="text-xs text-slate-token font-bold uppercase mb-1">Próximo Boleto</p>
                          <p className="font-bold text-ink text-lg">{c.nextBoleto}</p>
                        </div>
                        <Button className="bg-brand text-white hover:bg-brand/90 gap-2">
                          <Download className="h-4 w-4" /> Baixar PDF
                        </Button>
                      </div>
                      <div className="flex-1 p-4 bg-white flex justify-between items-center">
                        <div>
                          <p className="text-xs text-slate-token font-bold uppercase mb-1">Contrato</p>
                          <p className="font-bold text-ink text-sm">Visualizar docs</p>
                        </div>
                        <Button variant="outline" className="border-fog text-ink hover:bg-secondary gap-2">
                          <ExternalLink className="h-4 w-4" /> Abrir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )
        ) : (
          <div className="grid gap-6">
            {encerrados.map(c => (
              <div key={c.id} className="bg-white border border-fog rounded-2xl p-6 shadow-soft flex flex-col md:flex-row gap-6 items-start opacity-75">
                <img src={c.image} alt={c.title} className="w-full md:w-32 h-24 object-cover rounded-xl shrink-0 grayscale" />
                <div className="flex-1 w-full flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary text-slate-token">
                      {c.status}
                    </span>
                    <span className="text-sm text-slate-token flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" /> {c.endDate}
                    </span>
                  </div>
                  <h3 className="font-bold text-ink text-lg">{c.title}</h3>
                  <p className="text-xs text-slate-token mt-1">
                    {c.address}
                  </p>
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

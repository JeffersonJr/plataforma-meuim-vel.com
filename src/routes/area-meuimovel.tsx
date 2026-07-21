import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Building2, Search, ArrowRight, Wallet, Home, Key, MapPin, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/area-meuimovel")({
  component: AreaMeuImovel,
});

function AreaMeuImovel() {
  const { user } = useAuth();

  const meusImoveis = [
    {
      id: "mi1",
      title: "Apartamento 3 Quartos - Pinheiros",
      address: "Rua Teodoro Sampaio, 1000 - São Paulo",
      status: "Alugado",
      rentValue: "R$ 4.500",
      views: 124,
      proposals: 0,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "mi2",
      title: "Casa de Condomínio - Alphaville",
      address: "Alameda Rio Negro, 500 - Barueri",
      status: "Anunciado",
      rentValue: "R$ 12.000",
      views: 842,
      proposals: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
              <Building2 className="h-8 w-8 text-brand" />
              Área MeuImóvel
            </h1>
            <p className="mt-2 text-slate-token">
              Sua central de gestão imobiliária. Administre seus imóveis, inquilinos e repasses.
            </p>
          </div>
          <Link to="/anunciar">
            <Button className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6">
              Anunciar imóvel <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
                <p className="text-sm text-slate-token">{meusImoveis.length} cadastrados</p>
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
                <p className="text-sm text-slate-token">{meusImoveis.filter(i => i.status === 'Alugado').length} contratos ativos</p>
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
                <p className="text-sm text-slate-token">R$ 4.500,00 previstos</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-ink mb-6">Meus imóveis anunciados</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {meusImoveis.map(imovel => (
            <div key={imovel.id} className="bg-white border border-fog rounded-2xl p-6 shadow-soft flex flex-col md:flex-row gap-6 items-start">
              <img src={imovel.image} alt={imovel.title} className="w-full md:w-40 h-28 object-cover rounded-xl shrink-0" />
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${imovel.status === 'Alugado' ? 'bg-green-100 text-green-700' : 'bg-brand/10 text-brand'}`}>
                    {imovel.status === 'Alugado' ? <CheckCircle2 className="h-3 w-3" /> : <Eye className="h-3 w-3" />} {imovel.status}
                  </span>
                  <span className="text-sm text-ink font-bold">
                    {imovel.rentValue}/mês
                  </span>
                </div>
                <h3 className="font-bold text-ink text-lg">{imovel.title}</h3>
                <p className="text-sm text-slate-token mt-1 mb-4 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {imovel.address}
                </p>
                <div className="flex gap-4 border-t border-fog pt-4">
                  <div className="flex-1 text-center">
                    <p className="text-xs text-slate-token font-bold uppercase">Visualizações</p>
                    <p className="font-bold text-ink text-lg">{imovel.views}</p>
                  </div>
                  <div className="w-px bg-fog" />
                  <div className="flex-1 text-center">
                    <p className="text-xs text-slate-token font-bold uppercase">Propostas</p>
                    <p className="font-bold text-brand text-lg">{imovel.proposals}</p>
                  </div>
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

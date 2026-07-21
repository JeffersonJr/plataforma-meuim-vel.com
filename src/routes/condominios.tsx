import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Building, Search, MapPin, Building2, Trees, Dumbbell, Swimmer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/condominios")({
  component: Condominios,
});

function Condominios() {
  const condominios = [
    {
      id: "c1",
      name: "Condomínio Central Park",
      address: "Rua Augusta, 1500 - Cerqueira César, São Paulo",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      units: 12,
      builtYear: 2018,
      amenities: ["Piscina", "Academia", "Área Verde"],
      priceRange: "R$ 4.500 a R$ 8.000 / mês"
    },
    {
      id: "c2",
      name: "Edifício Copan",
      address: "Av. Ipiranga, 200 - República, São Paulo",
      image: "https://images.unsplash.com/photo-1620288829986-77891bb22f84?auto=format&fit=crop&w=800&q=80",
      units: 5,
      builtYear: 1966,
      amenities: ["Comércio no térreo", "Portaria 24h"],
      priceRange: "R$ 3.000 a R$ 6.500 / mês"
    },
    {
      id: "c3",
      name: "Residencial Alphaville I",
      address: "Alameda Rio Negro, 100 - Alphaville, Barueri",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      units: 24,
      builtYear: 2010,
      amenities: ["Clube Exclusivo", "Segurança Armada", "Lago"],
      priceRange: "R$ 15.000 a R$ 45.000 / mês"
    },
    {
      id: "c4",
      name: "Vila Nova Corporate & Home",
      address: "Rua Ministro Jesuíno Cardoso, 50 - Vila Nova Conceição",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      units: 8,
      builtYear: 2022,
      amenities: ["Piscina de Raia", "Academia", "Sauna"],
      priceRange: "R$ 8.000 a R$ 14.000 / mês"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-ink py-20 text-white">
          <div className="container-page text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Explorar <span className="text-brand">Condomínios</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80 mb-10">
              Conheça a infraestrutura, o valor do metro quadrado e a satisfação dos moradores antes de se mudar.
            </p>
            <div className="mx-auto flex max-w-2xl items-center rounded-2xl bg-white p-2">
              <div className="flex items-center pl-4 pr-2 text-slate-token">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Busque por nome do condomínio ou endereço..."
                className="flex-1 bg-transparent px-4 py-3 text-ink outline-none"
              />
              <Button className="rounded-xl bg-brand px-8 font-bold text-white hover:bg-brand/90">
                Buscar
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 container-page">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-ink">Condomínios mais buscados</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {condominios.map((condo) => (
              <div key={condo.id} className="group rounded-3xl bg-white border border-fog shadow-soft overflow-hidden flex flex-col hover:shadow-elevated transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img src={condo.image} alt={condo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-ink flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-brand" />
                    {condo.units} imóveis disponíveis
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-ink mb-2">{condo.name}</h3>
                  <p className="text-slate-token text-sm flex items-center gap-1.5 mb-6">
                    <MapPin className="h-4 w-4 shrink-0" /> {condo.address}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-bold text-slate-token uppercase tracking-wider mb-1">Média de Aluguel</p>
                      <p className="text-sm font-semibold text-ink">{condo.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-token uppercase tracking-wider mb-1">Construção</p>
                      <p className="text-sm font-semibold text-ink">{condo.builtYear}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {condo.amenities.map(amenity => (
                      <span key={amenity} className="bg-secondary text-ink px-3 py-1 rounded-full text-xs font-medium">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link to="/search" search={{ q: condo.name } as never} className="block w-full text-center py-3 rounded-xl bg-ink text-white font-bold hover:bg-ink/90 transition-colors">
                    Ver unidades disponíveis
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

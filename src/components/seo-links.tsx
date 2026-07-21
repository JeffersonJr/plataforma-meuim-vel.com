import { Link } from "@tanstack/react-router";

const cidades = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Brasília",
  "Campinas",
];

const bairrosSP = [
  "Jardins",
  "Itaim Bibi",
  "Pinheiros",
  "Vila Madalena",
  "Moema",
  "Vila Mariana",
];

export function SeoLinks() {
  return (
    <section className="bg-cream py-16 border-t border-fog">
      <div className="container-page">
        <h2 className="text-xl font-bold text-ink mb-8">Navegue pelas principais regiões</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold text-slate-token mb-4">Apartamentos para alugar</h3>
            <ul className="space-y-2">
              {cidades.map((cidade) => (
                <li key={`aluguel-apt-${cidade}`}>
                  <Link to="/search" search={{ mode: "rent" } as never} className="text-ink hover:text-brand hover:underline">
                    Apartamentos para alugar em {cidade}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-token mb-4">Casas à venda</h3>
            <ul className="space-y-2">
              {cidades.map((cidade) => (
                <li key={`compra-casa-${cidade}`}>
                  <Link to="/search" search={{ mode: "buy" } as never} className="text-ink hover:text-brand hover:underline">
                    Casas à venda em {cidade}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-token mb-4">Em São Paulo</h3>
            <ul className="space-y-2">
              {bairrosSP.map((bairro) => (
                <li key={`sp-${bairro}`}>
                  <Link to="/search" search={{ mode: "rent" } as never} className="text-ink hover:text-brand hover:underline">
                    Imóveis no bairro {bairro}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-token mb-4">Mais buscados</h3>
            <ul className="space-y-2">
              <li><Link to="/search" search={{ mode: "rent" } as never} className="text-ink hover:text-brand hover:underline">Studios para alugar perto do metrô</Link></li>
              <li><Link to="/search" search={{ mode: "buy" } as never} className="text-ink hover:text-brand hover:underline">Apartamentos com varanda gourmet</Link></li>
              <li><Link to="/search" search={{ mode: "rent" } as never} className="text-ink hover:text-brand hover:underline">Casas de condomínio fechado</Link></li>
              <li><Link to="/search" search={{ mode: "rent" } as never} className="text-ink hover:text-brand hover:underline">Imóveis Pet Friendly</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

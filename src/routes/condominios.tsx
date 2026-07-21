import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Building, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/condominios")({
  component: Condominios,
});

function Condominios() {
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

        <section className="py-20">
          <div className="container-page text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-brand mb-6">
              <Building className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-ink mb-4">Em breve: O maior guia de condomínios do Brasil</h2>
            <p className="mx-auto max-w-xl text-slate-token mb-8">
              Estamos catalogando dados de milhares de condomínios. Logo você poderá ver fotos exclusivas das áreas comuns, ler regras completas e descobrir a média histórica do valor de condomínio.
            </p>
            <Link to="/search">
              <Button variant="outline" className="rounded-xl border-fog text-ink hover:bg-secondary">
                Enquanto isso, explore imóveis disponiveis
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

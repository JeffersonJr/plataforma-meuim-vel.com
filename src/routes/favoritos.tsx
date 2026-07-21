import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search, LogIn } from "lucide-react";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus favoritos — meuimóvel.com" },
      { name: "description", content: "Seus imóveis favoritos salvos no meuimóvel.com" },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-page py-24 text-center">
          <LogIn className="mx-auto h-16 w-16 text-slate-token/40" />
          <h1 className="mt-6 text-2xl font-bold text-ink">Acesse seus favoritos</h1>
          <p className="mt-3 text-slate-token">Faça login para ver os imóveis que você salvou.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/login">
              <Button className="rounded-xl bg-brand text-white hover:bg-brand/90">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button variant="outline" className="rounded-xl">Criar conta grátis</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const favoritedProperties = properties.filter((p) => user.favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container-page py-12">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 fill-brand text-brand" />
          <h1 className="text-2xl font-bold text-ink">Meus favoritos</h1>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium text-slate-token">
            {favoritedProperties.length}
          </span>
        </div>

        {favoritedProperties.length === 0 ? (
          <div className="mt-16 text-center">
            <Heart className="mx-auto h-16 w-16 text-slate-token/20" />
            <h2 className="mt-4 text-xl font-bold text-ink">Nenhum favorito ainda</h2>
            <p className="mt-2 text-sm text-slate-token">
              Explore imóveis e clique no ♥ para salvar seus preferidos aqui.
            </p>
            <Link to="/search" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand/90">
              <Search className="h-4 w-4" /> Explorar imóveis
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoritedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

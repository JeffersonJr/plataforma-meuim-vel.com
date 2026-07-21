import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/termos")({
  component: TermosPage,
});

function TermosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 container-page py-24 max-w-3xl">
        <h1 className="text-4xl font-bold text-ink">Termos de Uso</h1>
        <p className="mt-6 text-sm text-slate-token">Última atualização: Julho de 2026</p>
        <div className="mt-8 space-y-6 text-slate-token leading-relaxed">
          <p>
            Bem-vindo ao meuimóvel.com. Ao acessar ou usar nossa plataforma, você concorda em se vincular a estes Termos de Uso.
          </p>
          <h2 className="text-xl font-bold text-ink mt-8">1. Aceitação dos Termos</h2>
          <p>
            Ao utilizar nossos serviços, você confirma que leu, compreendeu e concorda com todas as disposições estabelecidas neste documento.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

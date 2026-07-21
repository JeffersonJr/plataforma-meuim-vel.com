import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/privacidade")({
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 container-page py-24 max-w-3xl">
        <h1 className="text-4xl font-bold text-ink">Política de Privacidade</h1>
        <p className="mt-6 text-sm text-slate-token">Última atualização: Julho de 2026</p>
        <div className="mt-8 space-y-6 text-slate-token leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar nossa plataforma.
          </p>
          <h2 className="text-xl font-bold text-ink mt-8">Coleta de Dados</h2>
          <p>
            Coletamos as informações fornecidas por você durante o cadastro e uso dos nossos serviços para garantir uma melhor experiência e segurança nas transações.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

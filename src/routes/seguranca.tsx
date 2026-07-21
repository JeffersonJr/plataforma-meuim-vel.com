import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/seguranca")({
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 container-page py-24 max-w-3xl">
        <h1 className="text-4xl font-bold text-ink">Segurança</h1>
        <p className="mt-6 text-lg text-slate-token leading-relaxed">
          A segurança dos seus dados e das suas transações é nossa prioridade máxima. 
          Utilizamos tecnologia de ponta para garantir que proprietários, inquilinos e compradores 
          façam negócios com total tranquilidade.
        </p>
        <h2 className="text-2xl font-bold text-ink mt-12 mb-4">Anúncios verificados</h2>
        <p className="text-slate-token leading-relaxed">
          Todos os anúncios na plataforma passam por um rigoroso processo de verificação documental e checagem de veracidade antes de irem ao ar.
        </p>
      </main>
      <Footer />
    </div>
  );
}

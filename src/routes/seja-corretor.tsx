import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Briefcase, Handshake, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/seja-corretor")({
  component: SejaCorretor,
});

function SejaCorretor() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-4xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand/10 text-brand mb-6">
            <Briefcase className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold text-ink md:text-5xl lg:text-6xl mb-6">
            Seja um Corretor Parceiro
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-token mb-12">
            Multiplique seus ganhos com a maior vitrine imobiliária do Brasil. Feche negócios mais rápido com nossa tecnologia e leads qualificados.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
            <div className="bg-white p-8 rounded-3xl border border-fog shadow-soft">
              <div className="bg-mint/20 text-mint w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Leads Pré-Qualificados</h3>
              <p className="text-slate-token">Não perca tempo com curiosos. Entregamos contatos de clientes com real intenção de compra ou locação.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-fog shadow-soft">
              <div className="bg-brand/20 text-brand w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Agenda Inteligente</h3>
              <p className="text-slate-token">O cliente agenda a visita pelo site, sua agenda se organiza automaticamente e você só foca na venda.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-fog shadow-soft">
              <div className="bg-amber/20 text-amber w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Jurídico e Marketing</h3>
              <p className="text-slate-token">Deixe os contratos e fotos profissionais conosco. Nossa equipe especializada resolve a burocracia.</p>
            </div>
          </div>

          <div className="bg-ink text-white p-10 rounded-3xl max-w-2xl mx-auto shadow-elevated">
            <h2 className="text-2xl font-bold mb-6">Pré-requisitos</h2>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand" /> CRECI ativo (obrigatório)
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand" /> Disposição para atendimento digital
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand" /> Veículo próprio ou facilidade de locomoção
              </li>
            </ul>
            <button className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand/90 transition text-lg">
              Fazer Cadastro de Corretor
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

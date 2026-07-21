import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { properties } from "@/lib/mock-data";
import { CheckCircle2, FileText, FileSignature, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/proposta/$slug")({
  component: PropostaFlow,
  loader: ({ params }) => {
    const property = properties.find((p) => p.slug === params.slug);
    return { property };
  },
});

function PropostaFlow() {
  const { property } = Route.useLoaderData();
  const [step, setStep] = useState(1);

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <h1 className="text-2xl font-bold">Imóvel não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <Link to={`/imovel/${property.slug}`} className="inline-flex items-center text-sm font-medium text-slate-token hover:text-brand mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o imóvel
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-fog -z-10 rounded-full overflow-hidden">
              <div className="h-full bg-brand transition-all duration-300" style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }} />
            </div>
            
            <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-brand' : 'text-slate-token'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-brand text-white' : 'bg-fog text-slate-token'}`}>1</div>
              <span className="text-xs font-bold hidden sm:block bg-background px-2">Sua oferta</span>
            </div>
            <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-brand' : 'text-slate-token'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-brand text-white' : 'bg-fog text-slate-token'}`}>2</div>
              <span className="text-xs font-bold hidden sm:block bg-background px-2">Dados pessoais</span>
            </div>
            <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-brand' : 'text-slate-token'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-brand text-white' : 'bg-fog text-slate-token'}`}>3</div>
              <span className="text-xs font-bold hidden sm:block bg-background px-2">Garantia locatícia</span>
            </div>
          </div>

          <div className="rounded-3xl border border-fog bg-white p-8 md:p-10 shadow-elevated">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start justify-between mb-8 pb-8 border-b border-fog">
                  <div>
                    <h2 className="text-2xl font-bold text-ink mb-2">Qual a sua oferta?</h2>
                    <p className="text-slate-token">{property.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-token">Valor pedido</p>
                    <p className="text-xl font-bold text-brand">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(property.price)}
                      {property.mode === "rent" ? "/mês" : ""}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ink">Valor da sua proposta</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-token">R$</span>
                      <input 
                        type="number" 
                        defaultValue={property.price} 
                        className="w-full rounded-xl border border-fog p-4 pl-12 font-bold text-lg focus:border-brand focus:outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ink">Mensagem ao proprietário (opcional)</label>
                    <textarea 
                      className="w-full rounded-xl border border-fog p-4 focus:border-brand focus:outline-none h-32 resize-none" 
                      placeholder="Ex: Gostaria de alugar, mas preciso que o aquecedor seja trocado..."
                    />
                  </div>
                  
                  <Button onClick={() => setStep(2)} className="w-full rounded-xl bg-brand py-6 text-lg font-bold text-white hover:bg-brand/90 mt-4">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold text-ink mb-8">Confirme seus dados</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-token uppercase">Nome completo</label>
                      <input type="text" defaultValue="Jefferson" className="w-full rounded-lg border border-fog p-3 focus:border-brand focus:outline-none bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-token uppercase">CPF</label>
                      <input type="text" placeholder="000.000.000-00" className="w-full rounded-lg border border-fog p-3 focus:border-brand focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-token uppercase">E-mail</label>
                      <input type="email" defaultValue="jefferson@exemplo.com" className="w-full rounded-lg border border-fog p-3 focus:border-brand focus:outline-none bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-token uppercase">Celular (WhatsApp)</label>
                      <input type="tel" placeholder="(11) 99999-9999" className="w-full rounded-lg border border-fog p-3 focus:border-brand focus:outline-none" />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl px-8 py-6 text-ink border-fog hover:bg-secondary">Voltar</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 rounded-xl bg-brand py-6 text-lg font-bold text-white hover:bg-brand/90">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-8">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-bold text-ink mb-4">Proposta enviada!</h2>
                <p className="text-slate-token mb-8 max-w-md mx-auto">
                  Sua proposta foi encaminhada ao proprietário. Em média, eles respondem em até 24 horas. Você pode acompanhar o status na sua área de propostas.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/propostas">
                    <Button className="rounded-xl bg-brand px-8 py-6 font-bold text-white hover:bg-brand/90">
                      Acompanhar propostas
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="rounded-xl px-8 py-6 text-ink border-fog hover:bg-secondary">
                      Voltar ao início
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

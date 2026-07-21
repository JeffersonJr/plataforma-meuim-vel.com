import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Handshake, Download } from "lucide-react";

export const Route = createFileRoute("/contrato-de-aluguel")({
  component: ContratoAluguel,
});

function ContratoAluguel() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <Handshake className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Contrato de Aluguel</h1>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-fog shadow-soft mb-8 text-center">
            <h2 className="text-xl font-bold text-ink mb-2">Modelo Padrão de Contrato</h2>
            <p className="text-slate-token mb-8 max-w-lg mx-auto">Baixe gratuitamente nosso modelo de contrato de locação residencial atualizado com a Lei do Inquilinato.</p>
            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 bg-brand text-white font-bold px-6 py-3 rounded-xl hover:bg-brand/90 transition">
                <Download className="h-5 w-5" /> Baixar PDF
              </button>
              <button className="flex items-center gap-2 border border-fog text-ink font-bold px-6 py-3 rounded-xl hover:bg-secondary transition">
                <Download className="h-5 w-5" /> Baixar Word (.docx)
              </button>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h3>Cláusulas essenciais de um bom contrato</h3>
            <ul>
              <li><strong>Qualificação das partes:</strong> Dados completos do locador e locatário.</li>
              <li><strong>Descrição do imóvel:</strong> Endereço completo e laudo de vistoria anexado.</li>
              <li><strong>Valores e prazos:</strong> Valor do aluguel, índice de reajuste (geralmente IGP-M ou IPCA), prazo de vigência (comum: 30 meses).</li>
              <li><strong>Garantia locatícia:</strong> Fiador, seguro fiança ou caução.</li>
              <li><strong>Multas rescisórias:</strong> Penas previstas para quebra de contrato antes do prazo estabelecido.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

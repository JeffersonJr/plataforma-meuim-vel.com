import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/lei-do-inquilinato")({
  component: LeiInquilinato,
});

function LeiInquilinato() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <Scale className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Lei do Inquilinato</h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg text-slate-token mb-8">
              A Lei nº 8.245, de 18 de outubro de 1991, também conhecida como Lei do Inquilinato, regulamenta a locação de imóveis urbanos no Brasil. Conheça os principais pontos.
            </p>

            <h3>Direitos do Locatário (Inquilino)</h3>
            <ul>
              <li>Receber o imóvel em estado de servir ao uso a que se destina.</li>
              <li>Isenção de taxas extraordinárias de condomínio (fundo de reserva, reformas estruturais).</li>
              <li>Ter preferência na compra do imóvel caso o locador decida vendê-lo.</li>
            </ul>

            <h3>Deveres do Locatário</h3>
            <ul>
              <li>Pagar pontualmente o aluguel e os encargos da locação.</li>
              <li>Servir-se do imóvel para o uso convencionado, não podendo mudar a destinação sem acordo.</li>
              <li>Devolver o imóvel, finda a locação, no estado em que o recebeu (salvo deteriorações do uso normal).</li>
            </ul>

            <h3>Quebra de Contrato e Multa</h3>
            <p>Se o inquilino decidir devolver o imóvel antes do prazo, deverá pagar a multa pactuada, proporcionalmente ao período de cumprimento do contrato. O locador não pode reaver o imóvel alugado durante o prazo estipulado, exceto em casos específicos previstos em lei.</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

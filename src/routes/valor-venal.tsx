import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Landmark } from "lucide-react";

export const Route = createFileRoute("/valor-venal")({
  component: ValorVenal,
});

function ValorVenal() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <Landmark className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Valor Venal do Imóvel</h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg text-slate-token mb-8">
              O Valor Venal é uma estimativa de preço de compra e venda que o Poder Público (geralmente a Prefeitura) atribui a determinados bens para servir de base no cálculo de impostos (como o IPTU e ITBI).
            </p>

            <h3>Valor Venal x Valor de Mercado</h3>
            <p>O <strong>Valor Venal</strong> é calculado com base na Planta Genérica de Valores do Município, levando em conta área, idade da construção, localização e características. Já o <strong>Valor de Mercado</strong> é o preço real pelo qual o imóvel pode ser negociado na lei da oferta e da procura.</p>
            <p>Na prática, o valor venal costuma ser consideravelmente menor que o valor de mercado (muitas vezes chegando a ser apenas metade do valor real de venda).</p>

            <h3>Como consultar?</h3>
            <p>A maneira mais rápida de descobrir o valor venal do seu imóvel é verificar a Notificação de Lançamento do IPTU (o famoso carnê do IPTU). Ele traz discriminado o valor venal do terreno, da construção e o valor venal total.</p>
            <p>Também é possível emitir a Certidão de Valor Venal online no site da prefeitura da sua cidade utilizando o número do contribuinte (SQL).</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

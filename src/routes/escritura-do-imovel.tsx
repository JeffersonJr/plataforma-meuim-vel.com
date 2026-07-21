import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/escritura-do-imovel")({
  component: Escritura,
});

function Escritura() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <FileText className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Escritura do Imóvel</h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg text-slate-token mb-8">
              A escritura pública é o documento jurídico elaborado por um tabelionato de notas que prova o contrato entre as partes. É o passo essencial antes do registro do imóvel.
            </p>

            <h3>Qual a diferença entre Escritura e Registro?</h3>
            <p><strong>Escritura:</strong> Formaliza o acordo de compra e venda. Não transfere a propriedade legalmente, mas comprova a intenção e os termos do negócio.</p>
            <p><strong>Registro:</strong> Feito no Cartório de Registro de Imóveis após a escritura. É o registro que de fato transfere a propriedade para o seu nome. "Quem não registra, não é dono."</p>

            <h3>Quanto custa?</h3>
            <p>Os valores da escritura pública variam de acordo com o estado e são tabelados por lei, calculados com base no valor venal ou no valor da transação (o que for maior).</p>
            
            <div className="bg-secondary/30 p-6 rounded-2xl border border-fog my-8">
              <h4 className="font-bold text-ink mb-2 m-0">Precisa de ajuda com documentação?</h4>
              <p className="text-sm mb-4">Ao comprar um imóvel pelo MeuImóvel, nossa equipe jurídica cuida de todo o processo de escritura e registro para você.</p>
              <button className="bg-brand text-white font-bold px-6 py-2 rounded-xl hover:bg-brand/90 transition">Falar com consultor</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

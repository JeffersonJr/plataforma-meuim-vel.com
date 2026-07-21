import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { BookOpen, HelpCircle, FileQuestion, BookMarked } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/guias")({
  component: Guias,
});

function Guias() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <BookOpen className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Guias e Tutoriais</h1>
          </div>
          <p className="text-lg text-slate-token mb-12 max-w-2xl">
            Aprenda tudo sobre o mercado imobiliário, desde como preparar sua casa para fotos até dicas de investimento.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Como alugar sem fiador", category: "Locatários", icon: HelpCircle },
              { title: "Guia definitivo do financiamento", category: "Compradores", icon: BookMarked },
              { title: "Valorizando seu imóvel para venda", category: "Proprietários", icon: FileQuestion },
            ].map((guia) => (
              <div key={guia.title} className="bg-white p-8 rounded-3xl border border-fog shadow-soft hover:shadow-elevated transition cursor-pointer">
                <guia.icon className="h-10 w-10 text-brand mb-6" />
                <span className="text-xs font-bold text-mint uppercase tracking-wider mb-2 block">{guia.category}</span>
                <h3 className="text-xl font-bold text-ink mb-4">{guia.title}</h3>
                <Link to="/" className="text-brand font-bold text-sm hover:underline">Ler artigo completo →</Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Wrench, FileText, Calculator, Landmark, Handshake, BarChart, Percent, Scale, Home, Briefcase, Map } from "lucide-react";

export const Route = createFileRoute("/utilidades")({
  component: Utilidades,
});

function Utilidades() {
  const tools = [
    { title: "Calculadora de Aluguel (IGP-M)", desc: "Simule o reajuste do seu contrato", icon: Calculator, link: "/calculadora-igpm" },
    { title: "Índices de Reajuste", desc: "Acompanhe IPCA, IGP-M e INCC", icon: Percent, link: "/indices-reajuste" },
    { title: "Valor do Metro Quadrado", desc: "Consulte a média por região", icon: Map, link: "/valor-metro-quadrado" },
    { title: "Valor Venal", desc: "Saiba como calcular e consultar", icon: Landmark, link: "/valor-venal" },
    { title: "Modelo de Contrato", desc: "Baixe um modelo de contrato de aluguel", icon: Handshake, link: "/contrato-de-aluguel" },
    { title: "Escritura do Imóvel", desc: "O que é e como tirar a escritura", icon: FileText, link: "/escritura-do-imovel" },
    { title: "Lei do Inquilinato", desc: "Seus direitos e deveres na locação", icon: Scale, link: "/lei-do-inquilinato" },
    { title: "Seja Corretor Parceiro", desc: "Aumente sua renda conosco", icon: Briefcase, link: "/seja-corretor" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20">
        <div className="container-page">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-brand/10 p-3 rounded-2xl">
              <Wrench className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold text-ink">Utilidades</h1>
          </div>
          <p className="text-lg text-slate-token mb-12 max-w-2xl">
            Ferramentas gratuitas e informações essenciais para ajudar você na locação, compra ou venda de imóveis.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link key={tool.title} to={tool.link} className="bg-white p-6 rounded-2xl border border-fog shadow-soft hover:shadow-elevated hover:border-brand/30 transition group">
                <tool.icon className="h-8 w-8 text-brand mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-ink mb-2">{tool.title}</h3>
                <p className="text-sm text-slate-token">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

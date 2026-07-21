import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/central-de-ajuda")({
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 container-page py-24">
        <h1 className="text-4xl font-bold text-ink">Central de Ajuda</h1>
        <p className="mt-4 text-lg text-slate-token">Como podemos ajudar você hoje?</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { title: "Dúvidas sobre aluguel", desc: "Tudo sobre contratos, garantias e vistorias." },
            { title: "Dúvidas sobre compra", desc: "Financiamento, taxas e processo de compra." },
            { title: "Para proprietários", desc: "Como anunciar, repasse de aluguel e mais." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-fog p-6 hover:shadow-soft transition cursor-pointer">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-token">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import {
  Building2,
  Users,
  Star,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Award,
  Heart,
} from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre nós — meuimóvel.com" },
      { name: "description", content: "Conheça a missão e o time por trás do meuimóvel.com" },
    ],
  }),
  component: SobrePage,
});

const team = [
  {
    name: "Ana Claudia",
    role: "CEO & Co-fundadora",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    bio: "Ex-Quinto Andar. Apaixonada por proptech e experiência do usuário.",
  },
  {
    name: "Ricardo Moura",
    role: "CTO & Co-fundador",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    bio: "Engenheiro com 15 anos em plataformas de marketplace e dados.",
  },
  {
    name: "Fernanda Luz",
    role: "Head de Design",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    bio: "Especialista em UX/UI com foco em acessibilidade e conversão.",
  },
  {
    name: "Paulo Salave'a",
    role: "Head de Parcerias",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    bio: "Ex-corretor com rede de +3.000 parceiros em todo o Brasil.",
  },
];

const numbers = [
  { n: "125k+", l: "Imóveis listados" },
  { n: "4.9★", l: "Avaliação média" },
  { n: "98k", l: "Usuários ativos" },
  { n: "12", l: "Cidades atendidas" },
];

function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand py-24 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, rgba(0,196,161,0.5), transparent 60%)",
          }}
        />
        <div className="container-page relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
              <Heart className="h-3.5 w-3.5 text-mint" /> Nossa história
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Simplificamos a maior decisão da sua vida
            </h1>
            <p className="mt-5 text-lg text-white/80">
              Nascemos em 2022 com uma missão: tornar a busca por imóveis no Brasil tão simples,
              transparente e emocionante quanto deveria ser.
            </p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-b border-fog bg-cream">
        <div className="container-page grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.l} className="text-center">
              <div className="text-3xl font-bold text-brand md:text-4xl">{n.n}</div>
              <div className="mt-1 text-sm text-slate-token">{n.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-mint">Nossa missão</div>
          <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
            Democratizar o acesso a bons imóveis
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-token">
            Acreditamos que encontrar o lugar certo para viver não deveria ser estressante.
            Com tecnologia de ponta, curadoria humana e total transparência, conectamos
            inquilinos e compradores ao imóvel perfeito — sem burocracia.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              Icon: ShieldCheck,
              title: "Transparência total",
              desc: "Preços, taxas e condições expostos sem letras miúdas. O que você vê é o que você paga.",
            },
            {
              Icon: TrendingUp,
              title: "Tecnologia para pessoas",
              desc: "Mapa interativo, tour virtual e IA de recomendação para encontrar seu lar mais rápido.",
            },
            {
              Icon: Award,
              title: "Verificação rigorosa",
              desc: "Cada anúncio passa por checagem documental e visita de nossa equipe.",
            },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-fog p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/5 text-brand">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-token">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-secondary/40 py-20">
        <div className="container-page">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-mint">Time</div>
            <h2 className="mt-3 text-3xl font-bold text-ink">Quem está por trás</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl bg-white p-6 text-center shadow-soft">
                <img
                  src={member.img}
                  alt={member.name}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                />
                <div className="mt-4 font-bold text-ink">{member.name}</div>
                <div className="text-xs font-medium text-mint">{member.role}</div>
                <p className="mt-3 text-xs leading-relaxed text-slate-token">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-3xl bg-brand p-10 text-center text-white md:p-16">
          <h2 className="text-3xl font-bold">Pronto para encontrar seu lar?</h2>
          <p className="mt-3 text-white/80">
            Explore mais de 125 mil imóveis verificados em todo o Brasil.
          </p>
          <Link
            to="/search"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-mint px-8 py-4 font-semibold text-white transition hover:bg-mint/90"
          >
            Começar busca
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Heart, LayoutDashboard, Menu, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-fog bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="meuimóvel.com" className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/search"
            search={{ mode: "rent" } as never}
            className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-secondary"
          >
            Alugar
          </Link>
          <Link
            to="/search"
            search={{ mode: "buy" } as never}
            className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-secondary"
          >
            Comprar
          </Link>
          <Link
            to="/search"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-secondary"
          >
            Mapa
          </Link>
          <Link
            to="/dashboard"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-secondary"
          >
            Corretor
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="hidden md:block">
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="h-4 w-4" /> Favoritos
            </Button>
          </Link>
          <Link to="/dashboard" className="hidden md:block">
            <Button size="sm" className="gap-2 bg-brand text-white hover:bg-brand/90">
              <LayoutDashboard className="h-4 w-4" /> Entrar
            </Button>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 md:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-fog bg-white md:hidden">
          <div className="container-page flex flex-col py-2">
            <Link to="/search" className="py-2 text-sm" onClick={() => setOpen(false)}>Alugar / Comprar</Link>
            <Link to="/search" className="py-2 text-sm" onClick={() => setOpen(false)}>Buscar no mapa</Link>
            <Link to="/dashboard" className="py-2 text-sm" onClick={() => setOpen(false)}>Meu painel</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-white shadow-elevated transition-transform hover:scale-105"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-fog bg-cream">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div>
          <img src={logoUrl} alt="meuimóvel.com" className="h-10 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-slate-token">
            A forma mais inteligente de encontrar seu próximo lar no Brasil.
          </p>
        </div>
        {[
          { t: "Descobrir", l: ["Alugar", "Comprar", "Lançamentos", "Tour virtual"] },
          { t: "Empresa", l: ["Sobre", "Carreiras", "Imprensa", "Contato"] },
          { t: "Ajuda", l: ["Central de ajuda", "Segurança", "Termos", "Privacidade"] },
        ].map((c) => (
          <div key={c.t}>
            <h4 className="text-sm font-semibold text-ink">{c.t}</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-token">
              {c.l.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-brand">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-fog">
        <div className="container-page py-4 text-xs text-slate-token">
          © {new Date().getFullYear()} meuimóvel.com — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

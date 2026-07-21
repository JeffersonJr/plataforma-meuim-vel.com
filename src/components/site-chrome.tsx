import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  Heart,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Building2,
  MapPin,
  Sparkles,
  LogOut,
  User,
} from "lucide-react";
import logoUrl from "@/assets/logo.svg";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const discoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (discoverRef.current && !discoverRef.current.contains(e.target as Node)) {
        setDiscoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    {
      label: "Descobrir",
      dropdown: [
        { icon: Building2, label: "Alugar", to: "/search", search: { mode: "rent" } },
        { icon: Building2, label: "Comprar", to: "/search", search: { mode: "buy" } },
        { icon: Sparkles, label: "Lançamentos", to: "/lancamentos", search: {} },
        { icon: MapPin, label: "Tour Virtual", to: "/tour-virtual", search: {} },
      ],
    },
    { label: "Mapa", to: "/search" },
    { label: "Sobre", to: "/sobre" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-fog bg-white/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logoUrl} alt="meuimóvel.com" className="h-9 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Discover dropdown */}
          <div ref={discoverRef} className="relative">
            <button
              onClick={() => setDiscoverOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition",
                discoverOpen ? "bg-secondary text-brand" : "text-slate-token hover:bg-secondary hover:text-ink",
              )}
            >
              Descobrir <ChevronDown className={cn("h-4 w-4 transition-transform", discoverOpen && "rotate-180")} />
            </button>
            {discoverOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-fog bg-white p-2 shadow-elevated">
                {navLinks[0].dropdown?.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to as never}
                    search={item.search as never}
                    onClick={() => setDiscoverOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-secondary"
                  >
                    <item.icon className="h-4 w-4 text-brand" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/search"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-token transition hover:bg-secondary hover:text-ink"
          >
            Mapa
          </Link>
          <Link
            to="/sobre"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-token transition hover:bg-secondary hover:text-ink"
          >
            Sobre
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/favoritos" className="hidden md:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-token transition hover:bg-secondary hover:text-ink">
                <Heart className="h-4 w-4" /> Favoritos
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-xl border border-fog bg-secondary px-3 py-2 text-sm font-medium text-ink transition hover:border-brand">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded-full object-cover" />
                  ) : (
                    <User className="h-4 w-4 text-brand" />
                  )}
                  <span className="hidden md:inline max-w-24 truncate">{user.name.split(" ")[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 hidden w-48 rounded-2xl border border-fog bg-white p-2 shadow-elevated group-hover:block">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-secondary"
                  >
                    <LayoutDashboard className="h-4 w-4 text-brand" /> Meu painel
                  </Link>
                  <Link
                    to="/favoritos"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-secondary"
                  >
                    <Heart className="h-4 w-4 text-brand" /> Favoritos
                  </Link>
                  <div className="my-1 border-t border-fog" />
                  <button
                    onClick={() => { logout(); navigate({ to: "/" }); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" /> Sair
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-ink transition hover:bg-secondary"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="hidden md:inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                <LayoutDashboard className="h-4 w-4" /> Anunciar
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-ink md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-fog bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            <Link to="/search" search={{ mode: "rent" } as never} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary">Alugar</Link>
            <Link to="/search" search={{ mode: "buy" } as never} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary">Comprar</Link>
            <Link to="/lancamentos" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary">Lançamentos</Link>
            <Link to="/tour-virtual" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary">Tour Virtual</Link>
            <Link to="/sobre" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary">Sobre</Link>
            <div className="border-t border-fog my-1" />
            {user ? (
              <>
                <Link to="/favoritos" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary">Favoritos</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50">Sair</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary">Entrar</Link>
                <Link to="/cadastro" onClick={() => setMobileOpen(false)} className="rounded-xl bg-brand px-3 py-2.5 text-sm font-semibold text-white text-center">Anunciar grátis</Link>
              </>
            )}
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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float transition-transform hover:scale-105"
      aria-label="Fale conosco no WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.16 21.17a.5.5 0 0 0 .622.622l3.99-1.274A10 10 0 1 0 12 2zm0 18.182a8.182 8.182 0 1 1 0-16.364 8.182 8.182 0 0 1 0 16.364z" />
      </svg>
    </a>
  );
}

const footerLinks = [
  {
    title: "Descobrir",
    links: [
      { label: "Alugar", to: "/search" },
      { label: "Comprar", to: "/search" },
      { label: "Lançamentos", to: "/lancamentos" },
      { label: "Tour Virtual", to: "/tour-virtual" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", to: "/sobre" },
      { label: "Anunciar imóvel", to: "/anunciar" },
      { label: "Corretor parceiro", to: "/corretor-parceiro" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", to: "/central-de-ajuda" },
      { label: "Segurança", to: "/seguranca" },
      { label: "Termos de uso", to: "/termos" },
      { label: "Privacidade", to: "/privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-fog bg-ink text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <img src={logoUrl} alt="meuimóvel.com" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            A forma mais inteligente de encontrar seu próximo lar no Brasil.
          </p>
          <div className="mt-6 flex gap-4">
            {[
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Facebook, href: "https://facebook.com" },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/60 transition hover:bg-mint hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-mint" />
              <span>+55 11 99999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-mint" />
              <span>contato@meuimovel.com</span>
            </div>
          </div>
        </div>

        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to as never}
                    className="text-sm text-white/60 transition hover:text-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} meuimóvel.com — Todos os direitos reservados.</p>
          <p>CRECI-SP 12345-J · CNPJ 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  );
}

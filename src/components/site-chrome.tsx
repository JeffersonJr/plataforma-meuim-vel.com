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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Porto Alegre", "Campinas", "Curitiba", "Explorar outras cidades", "Condomínios"];

  const MenuDropdown = ({ title, items, boldTitle = "Cidade" }: { title: string, items: {label: string, to: string, search?: any}[], boldTitle?: string }) => (
    <div className="relative group">
      <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-token transition hover:bg-secondary hover:text-ink">
        {title} <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute top-full left-0 mt-0 hidden pt-2 group-hover:block z-50">
        <div className="w-56 rounded-2xl border border-fog bg-white py-2 shadow-elevated">
          {boldTitle && (
            <div className="px-4 py-2">
              <div className="font-bold text-ink text-base border-b border-fog pb-2">{boldTitle}</div>
            </div>
          )}
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.to as never}
              search={item.search as never}
              className="block px-4 py-2.5 text-sm text-ink transition hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-fog bg-white/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logoUrl} alt="meuimóvel.com" className="h-9 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <MenuDropdown 
            title="Alugar" 
            boldTitle="Cidade"
            items={cities.map(c => ({ label: c, to: "/search", search: { mode: "rent" } }))} 
          />
          <MenuDropdown 
            title="Comprar" 
            boldTitle="Cidade"
            items={cities.map(c => ({ label: c, to: "/search", search: { mode: "buy" } }))} 
          />
          <MenuDropdown 
            title="Anunciar" 
            boldTitle="Anuncie no meuimóvel"
            items={[
              { label: "Alugar meu imóvel", to: "/alugar-meu-imovel" },
              { label: "Vender meu imóvel", to: "/vender-meu-imovel" },
              { label: "Calculadora de aluguel", to: "/calculadora-aluguel" },
              { label: "Calculadora de venda", to: "/calculadora-venda" },
              { label: "Área do proprietário", to: "/area-proprietario" },
              { label: "Repasses", to: "/repasses" },
              { label: "Para imobiliárias parceiras", to: "/corretor-parceiro" },
              { label: "Indicar imóveis", to: "/indicar-imoveis" },
            ]} 
          />
          <MenuDropdown 
            title="Inteligência MeuImóvel" 
            boldTitle="Inteligência MeuImóvel"
            items={[
              { label: "Calculadora de aluguel", to: "/calculadora-aluguel" },
              { label: "Calculadora de venda", to: "/calculadora-venda" },
              { label: "Área MeuImóvel", to: "/area-meuimovel" },
              { label: "Explorar condomínios", to: "/condominios" },
            ]} 
          />
          <MenuDropdown 
            title="Utilidades" 
            boldTitle="Utilidades"
            items={[
              { label: "Guias", to: "/" },
              { label: "Dados e índices", to: "/" },
              { label: "Calculadora IGPM", to: "/" },
              { label: "Contrato de aluguel", to: "/termos" },
              { label: "Escritura do imóvel", to: "/" },
              { label: "Índices de reajuste de aluguel", to: "/" },
              { label: "Valor do metro quadrado", to: "/" },
              { label: "Lei do Inquilinato", to: "/" },
              { label: "Valor venal", to: "/" },
              { label: "Seja corretor(a)", to: "/corretor-parceiro" },
            ]} 
          />
        </nav>

        {/* Right side Profile */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-2 rounded-xl border border-fog bg-secondary px-3 py-2 text-sm font-medium text-ink transition hover:border-brand">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <User className="h-4 w-4 text-brand" />
                )}
                <span className="hidden md:inline max-w-24 truncate">{user.name.split(" ")[0]}</span>
              </button>
              <div className="absolute right-0 top-full -mt-2 hidden pt-4 w-64 group-hover:block z-50">
                <div className="rounded-2xl border border-fog bg-white py-2 shadow-elevated relative">
                  <div className="px-4 py-3 text-sm text-slate-token border-b border-fog mb-2">
                    Entre para ver seus favoritos, visitas, propostas e aluguéis
                  </div>
                  <Link to="/favoritos" className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-secondary">
                    <Heart className="h-5 w-5 text-ink" /> Favoritos e listas
                  </Link>
                  <Link to="/alertas" className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-secondary">
                    <Sparkles className="h-5 w-5 text-ink" /> Alertas criados
                  </Link>
                  <Link to="/visitas" className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-secondary">
                    <MapPin className="h-5 w-5 text-ink" /> Visitas agendadas
                  </Link>
                  <Link to="/propostas" className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-secondary">
                    <User className="h-5 w-5 text-ink" /> Propostas enviadas
                  </Link>
                  <Link to="/contratos" className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-secondary">
                    <LogOut className="h-5 w-5 text-ink rotate-180" /> Contrato e boletos
                  </Link>
                  <Link to="/area-meuimovel" className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-secondary">
                    <Building2 className="h-5 w-5 text-ink" /> Área MeuImóvel
                  </Link>
                  <div className="my-2 border-t border-fog" />
                  <Link to="/dashboard" className="block px-4 py-3 text-sm text-ink hover:bg-secondary">
                    Minha conta
                  </Link>
                  <button onClick={() => { logout(); navigate({ to: "/" }); }} className="block w-full text-left px-4 py-3 text-sm text-ink hover:bg-secondary">
                    Sair da conta
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-ink transition hover:bg-secondary">
                Entrar
              </button>
              <div className="absolute right-0 top-full -mt-2 hidden pt-4 w-72 group-hover:block z-50">
                <div className="rounded-2xl border border-fog bg-white py-4 px-4 shadow-elevated relative">
                  <div className="text-sm text-slate-token mb-4">
                    Entre para ver seus favoritos, visitas, propostas e aluguéis
                  </div>
                  <Link to="/login" className="flex justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand/90 mb-4">
                    Entrar
                  </Link>
                  <Link to="/favoritos" className="flex items-center gap-3 px-2 py-3 text-sm text-ink hover:bg-secondary rounded-lg">
                    <Heart className="h-5 w-5 text-ink" /> Favoritos e listas
                  </Link>
                  <Link to="/alertas" className="flex items-center gap-3 px-2 py-3 text-sm text-ink hover:bg-secondary rounded-lg">
                    <Sparkles className="h-5 w-5 text-ink" /> Alertas criados
                  </Link>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-ink lg:hidden"
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
    title: "Sobre nós",
    links: [
      { label: "Conheça o MeuImóvel", to: "/sobre" },
      { label: "Regiões atendidas", to: "/search" },
      { label: "Condomínios", to: "/condominios" },
      { label: "Central de Ajuda", to: "/central-de-ajuda" },
      { label: "Segurança", to: "/seguranca" },
      { label: "Mapa do Site", to: "/search" },
      { label: "Compliance", to: "/termos" },
    ],
  },
  {
    title: "Produtos",
    links: [
      { label: "Indique um imóvel", to: "/indicar-imoveis" },
      { label: "Alugar meu imóvel", to: "/alugar-meu-imovel" },
      { label: "Vender meu imóvel", to: "/vender-meu-imovel" },
      { label: "Calculadora de aluguel", to: "/calculadora-aluguel" },
      { label: "Calculadora de venda", to: "/calculadora-venda" },
      { label: "Guias", to: "/central-de-ajuda" },
    ],
  },
  {
    title: "Trabalhe com a gente",
    links: [
      { label: "Para imobiliárias parceiras", to: "/corretor-parceiro" },
      { label: "Corretagem", to: "/corretor-parceiro" },
      { label: "Fotografia", to: "/corretor-parceiro" },
      { label: "Parcerias de Reparos", to: "/corretor-parceiro" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-fog bg-background pt-16 pb-8">
      <div className="container-page">
        {/* Top section with columns and blue box */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-base font-bold text-ink mb-6">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to as never}
                        className="text-sm text-slate-token hover:text-brand transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Blue Box */}
          <div className="bg-brand text-white p-8 rounded-2xl lg:w-80 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-8 w-8" />
              <span className="text-xl font-bold font-display tracking-tight">meuimóvel</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed mb-8">
              Para proporcionar uma experiência inesquecível para quem precisa de um lar ou anuncia com a gente, o meuimóvel.com aposta em design, segurança e tecnologia de ponta.
            </p>
            <Link to="/sobre" className="inline-flex items-center text-sm font-medium hover:underline">
              Mais informações &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom section with legal, social, badges */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-fog pt-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
            <Link to="/privacidade" className="hover:underline">Aviso de privacidade &rarr;</Link>
            <Link to="/termos" className="hover:underline">Termos e condições de uso &rarr;</Link>
            <Link to="/privacidade" className="hover:underline">Política de Cookies &rarr;</Link>
            <Link to="/central-de-ajuda" className="hover:underline">Manual do usuário &rarr;</Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-ink hover:text-brand transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-ink hover:text-brand transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-ink hover:text-brand transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Very bottom text and app badges */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-8 text-xs text-slate-token">
          <div>
            <p className="font-bold text-ink mb-1">MeuImovel Ltda. CRECI-SP J12.345 | CRECI-RJ J1234</p>
            <p>Versão: {new Date().toLocaleDateString('pt-BR')} {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="flex gap-3">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

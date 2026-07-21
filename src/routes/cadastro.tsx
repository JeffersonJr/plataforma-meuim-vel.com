import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — meuimóvel.com" },
      { name: "description", content: "Crie sua conta gratuita no meuimóvel.com" },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(name, email, password);
    setLoading(false);
    setDone(true);
    setTimeout(() => navigate({ to: "/" }), 2000);
  };

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-mint" />
          <h2 className="mt-4 text-2xl font-bold text-ink">Conta criada com sucesso!</h2>
          <p className="mt-2 text-slate-token">Redirecionando para a página inicial…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-brand">
            <Building2 className="h-6 w-6" />
            <span className="text-lg font-bold">meuimóvel.com</span>
          </Link>

          <h1 className="mt-8 text-2xl font-bold text-ink">Criar conta gratuita</h1>
          <p className="mt-1 text-sm text-slate-token">
            Já tem conta?{" "}
            <Link to="/login" className="font-medium text-brand hover:underline">
              Entrar
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Nome completo</label>
              <div className="flex items-center gap-3 rounded-xl border border-fog px-4 py-3 focus-within:border-brand">
                <User className="h-4 w-4 shrink-0 text-slate-token" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-token/60"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">E-mail</label>
              <div className="flex items-center gap-3 rounded-xl border border-fog px-4 py-3 focus-within:border-brand">
                <Mail className="h-4 w-4 shrink-0 text-slate-token" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-token/60"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Senha</label>
              <div className="flex items-center gap-3 rounded-xl border border-fog px-4 py-3 focus-within:border-brand">
                <Lock className="h-4 w-4 shrink-0 text-slate-token" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-token/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-token hover:text-ink"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Password strength */}
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    password.length === 0
                      ? "bg-fog"
                      : password.length < 6
                        ? i === 0 ? "bg-red-400" : "bg-fog"
                        : password.length < 10
                          ? i < 2 ? "bg-amber" : "bg-fog"
                          : "bg-mint"
                  }`}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:bg-brand/90"
            >
              {loading ? "Criando conta…" : (
                <>
                  Criar conta <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-token">
            Ao criar conta, você concorda com nossos{" "}
            <a href="#" className="underline">Termos de uso</a> e{" "}
            <a href="#" className="underline">Política de privacidade</a>.
          </p>
        </div>
      </div>

      {/* Right — benefits */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-center bg-brand p-16">
        <div className="text-white">
          <h2 className="text-3xl font-bold">Por que criar uma conta?</h2>
          <ul className="mt-8 space-y-5">
            {[
              { icon: "❤️", title: "Salve seus favoritos", desc: "Guarde imóveis e receba alertas de preço." },
              { icon: "🗺️", title: "Histórico de buscas", desc: "Retome de onde parou com buscas salvas." },
              { icon: "🔔", title: "Alertas personalizados", desc: "Novos imóveis no seu perfil de busca." },
              { icon: "📅", title: "Agende visitas", desc: "Marque visitas diretamente pelo app." },
            ].map((b) => (
              <li key={b.title} className="flex items-start gap-4">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-white/70">{b.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

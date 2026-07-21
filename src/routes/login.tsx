import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — meuimóvel.com" },
      { name: "description", content: "Acesse sua conta no meuimóvel.com" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate({ to: "/" });
    } else {
      setError("E-mail ou senha inválidos. Tente: joao@exemplo.com / 123456");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-brand">
            <Building2 className="h-6 w-6" />
            <span className="text-lg font-bold">meuimóvel.com</span>
          </Link>

          <h1 className="mt-8 text-2xl font-bold text-ink">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-slate-token">
            Não tem conta?{" "}
            <Link to="/cadastro" className="font-medium text-brand hover:underline">
              Cadastre-se grátis
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                  placeholder="••••••••"
                  required
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

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-token">
                <input type="checkbox" className="h-4 w-4 accent-brand" />
                Lembrar de mim
              </label>
              <button type="button" className="text-sm font-medium text-brand hover:underline">
                Esqueceu a senha?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:bg-brand/90"
            >
              {loading ? "Entrando…" : (
                <>
                  Entrar <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center gap-4 text-xs text-slate-token">
              <div className="flex-1 border-t border-fog" />
              ou continue com
              <div className="flex-1 border-t border-fog" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Google", color: "text-red-500" },
                { label: "Facebook", color: "text-blue-600" },
              ].map((p) => (
                <button
                  key={p.label}
                  className="flex items-center justify-center gap-2 rounded-xl border border-fog py-3 text-sm font-medium text-ink transition hover:bg-secondary"
                >
                  <span className={`text-base font-bold ${p.color}`}>{p.label[0]}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-token">
            Ao entrar, você concorda com nossos{" "}
            <a href="#" className="underline">Termos de uso</a> e{" "}
            <a href="#" className="underline">Política de privacidade</a>.
          </p>
        </div>
      </div>

      {/* Right — promo */}
      <div className="hidden lg:block lg:w-[45%]">
        <div
          className="h-full w-full bg-brand"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex h-full flex-col justify-end bg-gradient-to-t from-brand via-brand/60 to-transparent p-12">
            <div className="text-white">
              <h2 className="text-3xl font-bold">Seu próximo lar está aqui.</h2>
              <p className="mt-3 max-w-sm text-white/80">
                Mais de 125 mil imóveis verificados. Tour virtual, mapa interativo e agendamento em segundos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

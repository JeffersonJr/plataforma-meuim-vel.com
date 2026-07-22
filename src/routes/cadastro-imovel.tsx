import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Building2, MapPin, Building, Info, CheckCircle2, Minus, Plus, Circle, CheckCircle, Camera, ChevronLeft, ArrowRight, Clock, Calendar, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cadastro-imovel")({
  component: CadastroImovel,
});

function CadastroImovel() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"cep" | "endereco">("cep");
  const [cep, setCep] = useState("");
  const [step, setStep] = useState<number>(1); // 1 = CEP, 2 = Dados 1, 3 = Dados 2, 4 = Valor, 5 = Fotos, 6 = Success

  // State for counters
  const [vagas, setVagas] = useState(0);
  const [banheiros, setBanheiros] = useState(1);
  const [suites, setSuites] = useState(0);

  // Exclusividade
  const [exclusivo, setExclusivo] = useState(true);

  const handleCepContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) setStep(2);
  };

  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        setStep(7);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3B5BBD] to-[#1e3475] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-2xl w-full flex flex-col items-center justify-center px-8 z-10 text-center">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-white/20 rounded-full scale-[2] animate-ping" />
            <div className="absolute inset-0 bg-white/10 rounded-full scale-[3] animate-pulse" />
            <div className="bg-white/20 p-8 rounded-full backdrop-blur-sm">
              <Camera className="h-24 w-24 text-white drop-shadow-2xl relative z-10" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
            Imóvel em criação...
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Estamos processando os dados e agendando sua sessão de fotos profissional.
          </p>
          <div className="w-64 bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-white animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        {/* Banner */}
        <div className="bg-[#EEDAAC] w-full pt-20 pb-16 px-6 md:px-12 flex justify-center">
          <div className="max-w-3xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6 max-w-lg leading-tight">
              Prontinho! Estamos preparando seu anúncio
            </h1>
            <p className="text-ink font-bold text-base">
              Agora é só aguardar a sessão de fotos.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex justify-center px-6 py-16">
          <div className="max-w-3xl w-full space-y-12">
            
            <div className="flex gap-5 items-start">
              <Clock className="h-7 w-7 text-ink shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-ink">Data e horário das fotos</h3>
                <p className="text-slate-token text-base mt-1">Quarta-feira, 22/07, às 17:30.</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <Calendar className="h-7 w-7 text-ink shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-ink">Publicação do anúncio</h3>
                <p className="text-slate-token text-base mt-1">Até 23/07, seu anúncio vai estar pronto para agendamentos de visitas.</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <Paintbrush className="h-7 w-7 text-ink shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-ink">Hora do seu imóvel brilhar</h3>
                <p className="text-slate-token text-base mt-1">Limpe, organize e guarde objetos de uso pessoal para fotos e visitas.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 flex gap-4 mt-16 items-center border border-slate-100">
              <Info className="h-6 w-6 text-[#3B5BBD] shrink-0" />
              <div>
                <h4 className="text-base font-bold text-ink">Ainda está com dúvidas sobre como funciona o meuimóvel.com?</h4>
                <a href="#" className="text-sm text-slate-500 hover:text-ink underline mt-1 block transition-colors">Ver Regras de Contrato</a>
              </div>
            </div>

            <div className="pt-10 flex justify-end">
              <Link to="/" className="px-10 py-4 bg-slate-100 hover:bg-slate-200 text-ink font-bold rounded-full transition-colors text-base shadow-sm">
                Ver meus imóveis
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  // Calculate progress %
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans relative overflow-hidden">
      
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#3B5BBD]/10 to-transparent pointer-events-none" />
      <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-[#3B5BBD]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <nav className="w-full px-6 py-6 flex items-center justify-between relative z-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center group-hover:bg-slate-50 transition-colors">
            <ChevronLeft className="h-5 w-5 text-ink" />
          </div>
          <span className="text-sm font-bold text-ink hidden md:block">Voltar ao início</span>
        </Link>

        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#3B5BBD]" />
          <span className="text-lg font-bold tracking-wide text-ink">meuimóvel.com</span>
        </div>

        <div className="w-10 h-10" /> {/* Spacer */}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 pb-24 relative z-10 flex flex-col items-center">
        
        {/* Step Indicator Header */}
        <div className="w-full mb-6 mt-4 md:mt-10 text-center">
          <h2 className="text-sm font-bold text-[#3B5BBD] uppercase tracking-widest mb-2">
            Passo {step} de {totalSteps}
          </h2>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden max-w-sm mx-auto">
            <div 
              className="h-full bg-[#3B5BBD] rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* The Central Floating Wizard Card */}
        <div className="w-full bg-white/80 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-10 relative overflow-hidden">
          
          {/* Header Title inside card */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-2 tracking-tight">
              {step <= 3 ? "Dados do imóvel" : step === 4 ? "Definição de preço" : "Agendamento"}
            </h1>
            <p className="text-sm text-slate-token">
              {step === 1 ? "Para começar, digite o CEP." : 
               step === 2 ? "Confirme o endereço e nos conte seu objetivo." :
               step === 3 ? "Detalhes fazem a diferença. Conte-nos mais." :
               step === 4 ? "Vamos encontrar o preço ideal para alugar rápido." :
               "Escolha quando quer receber nosso fotógrafo."}
            </p>
          </div>

          {/* STEP 1: CEP */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex bg-slate-100/80 p-1.5 rounded-2xl w-full md:w-max">
                <button
                  onClick={() => setTab("cep")}
                  className={cn(
                    "flex-1 md:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all",
                    tab === "cep" ? "bg-white shadow-sm text-ink" : "text-slate-token hover:text-ink"
                  )}
                >
                  Por CEP
                </button>
                <button
                  onClick={() => setTab("endereco")}
                  className={cn(
                    "flex-1 md:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all",
                    tab === "endereco" ? "bg-white shadow-sm text-ink" : "text-slate-token hover:text-ink"
                  )}
                >
                  Por Endereço
                </button>
              </div>

              {tab === "cep" && (
                <form onSubmit={handleCepContinue}>
                  <div className="space-y-2 mb-8 max-w-md">
                    <label className="block text-sm font-bold text-ink">CEP do imóvel</label>
                    <div className="relative group mt-2">
                      <input
                        autoFocus
                        value={cep}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 8);
                          setCep(val);
                          if (val.length === 8) {
                            setTimeout(() => setStep(2), 400);
                          }
                        }}
                        placeholder="00000-000"
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#3B5BBD] focus:bg-white outline-none text-ink text-lg font-medium transition-all"
                      />
                      <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6 group-focus-within:text-[#3B5BBD] transition-colors" />
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* STEP 2: Dados Iniciais p1 */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Premium Address Card */}
              <div className="flex items-center justify-between p-5 border-2 border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-[#3B5BBD]" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-ink">Avenida Dom Pedro II – Praia Grande</span>
                    <span className="block text-xs text-slate-token mt-0.5">Cidade Ocian • 11704-400</span>
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="text-xs font-bold text-[#3B5BBD] hover:underline px-2">
                  Alterar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-ink">Número</label>
                  <input autoFocus placeholder="Ex: 309" className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#3B5BBD] focus:bg-white outline-none text-ink font-medium transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-ink">Complemento <span className="font-normal text-slate-token">(Opcional)</span></label>
                  <input placeholder="Ex: Apto 12, Bloco B" className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#3B5BBD] focus:bg-white outline-none text-ink font-medium transition-all" />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group w-max p-4 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                <div className="w-5 h-5 rounded border-2 border-slate-300 group-hover:border-[#3B5BBD] flex items-center justify-center transition-colors">
                </div>
                <span className="text-sm font-bold text-ink">Endereço sem número</span>
              </label>

              <div className="w-full h-px bg-slate-100 my-8" />

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-ink">O que você deseja fazer?</label>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-8 py-3 rounded-xl text-sm font-bold border-2 border-[#3B5BBD] text-[#3B5BBD] bg-[#3B5BBD]/5 shadow-sm">
                      Alugar
                    </button>
                    <button disabled className="px-8 py-3 rounded-xl text-sm font-bold border-2 border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed">
                      Vender
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-token pt-1 flex items-center gap-1">
                    <Info className="h-3 w-3" /> Nesta região, atuamos apenas com aluguel no momento.
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-sm font-bold text-ink">Aceito animais de estimação</label>
                    <p className="text-[11px] text-[#0A602B] font-bold mt-1">Aumenta muito sua chance de alugar!</p>
                  </div>
                  <div className="w-14 h-8 rounded-full bg-[#3B5BBD] relative cursor-pointer shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-white absolute top-1 right-1 shadow-sm" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-ink">Sou o proprietário do imóvel?</label>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-8 py-3 rounded-xl text-sm font-bold border-2 border-[#3B5BBD] text-[#3B5BBD] bg-[#3B5BBD]/5 shadow-sm">Sim</button>
                    <button className="px-8 py-3 rounded-xl text-sm font-bold border-2 border-slate-200 bg-white text-slate-token hover:border-slate-300 transition-colors">Não, administro</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Características */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-[#3B5BBD]/5 border border-[#3B5BBD]/20 rounded-2xl p-5 flex gap-4 items-start">
                <CheckCircle2 className="h-6 w-6 text-[#3B5BBD] shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-[#3B5BBD]">Revisão Inteligente</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Preenchemos alguns dados pra você. Revise ou edite agora. Nosso fotógrafo fará a confirmação oficial no dia da sessão.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-ink">Tipo de imóvel</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Apartamento", "Kitnet", "Casa", "Condomínio"].map(t => (
                    <button key={t} className={cn("py-3 rounded-xl text-sm font-bold border-2 transition-colors", t === "Apartamento" ? "border-[#3B5BBD] text-[#3B5BBD] bg-[#3B5BBD]/5" : "border-slate-100 bg-slate-50 text-slate-token hover:bg-slate-100")}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-ink">Andar</label>
                  <input placeholder="3" className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#3B5BBD] outline-none text-ink font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-ink">Área <span className="font-normal text-slate-token">(m²)</span></label>
                  <div className="relative">
                    <input placeholder="41" className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#3B5BBD] outline-none text-ink font-medium" />
                  </div>
                </div>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                {[
                  { label: "Vagas", state: vagas, set: setVagas },
                  { label: "Banheiros", state: banheiros, set: setBanheiros },
                  { label: "Suítes", state: suites, set: setSuites }
                ].map((c) => (
                  <div key={c.label} className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <label className="block text-sm font-bold text-ink mb-3">{c.label}</label>
                    <div className="flex items-center gap-4">
                      <button onClick={() => c.set(Math.max(0, c.state - 1))} className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-[#3B5BBD] hover:text-[#3B5BBD] transition-all">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-xl font-bold text-ink">{c.state}</span>
                      <button onClick={() => c.set(c.state + 1)} className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-[#3B5BBD] hover:text-[#3B5BBD] transition-all">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-slate-100 my-8" />
              <h3 className="text-xl font-bold text-ink mb-6">Custos do imóvel</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-ink">Condomínio (Mensal)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-bold">R$</span>
                    <input placeholder="635" className="w-full px-5 py-3.5 pl-12 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#3B5BBD] outline-none text-ink font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-ink">IPTU (Anual)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-bold">R$</span>
                    <input placeholder="1.656" className="w-full px-5 py-3.5 pl-12 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#3B5BBD] outline-none text-ink font-medium" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Valor e taxas */}
          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="text-center">
                <label className="block text-sm font-bold text-slate-token uppercase tracking-wider mb-3">Preço sugerido de Aluguel</label>
                <div className="relative w-max mx-auto">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-slate-400 font-bold">R$</span>
                  <input value="1.090" readOnly className="w-full px-6 py-5 pl-16 text-center bg-white border-2 border-[#3B5BBD] shadow-lg shadow-[#3B5BBD]/10 rounded-2xl outline-none text-ink text-4xl font-bold min-w-[200px]" />
                </div>
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#E7F6EB] text-[#0A602B] rounded-full text-xs font-bold shadow-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Preço altamente competitivo!
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Imóveis similares na região</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                  {[
                    { p: "1.791", a: "1.020", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" },
                    { p: "1.859", a: "1.040", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80" },
                  ].map((card, i) => (
                    <div key={i} className="min-w-[200px] bg-slate-50 rounded-2xl p-3 border border-slate-100 shrink-0 snap-start">
                      <img src={card.img} alt="Imóvel" className="w-full h-24 object-cover rounded-xl mb-3" />
                      <div className="text-[10px] text-slate-token uppercase font-bold mb-1">Apartamento</div>
                      <div className="text-base font-bold text-ink mb-1">R$ {card.p}</div>
                      <div className="text-[11px] text-slate-token truncate">40 m² · 1 quarto</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">Plano de Anúncio</h3>
                {/* Exclusivo */}
                <div 
                  onClick={() => setExclusivo(true)}
                  className={cn("p-6 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-start relative overflow-hidden", exclusivo ? "border-[#3B5BBD] bg-white shadow-xl shadow-[#3B5BBD]/10 scale-[1.02]" : "border-slate-100 bg-slate-50 hover:border-slate-200")}
                >
                  {exclusivo && <div className="absolute top-0 right-0 w-20 h-20 bg-[#3B5BBD]/5 rounded-bl-[100px]" />}
                  <div className="shrink-0 mt-0.5 relative z-10">
                    {exclusivo ? <CheckCircle className="h-6 w-6 text-[#3B5BBD]" /> : <Circle className="h-6 w-6 text-slate-300" />}
                  </div>
                  <div className="relative z-10 w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-bold text-ink">Com exclusividade</span>
                      <span className="text-[10px] bg-[#3B5BBD] text-white px-2 py-1 rounded-full uppercase font-bold tracking-wider hidden sm:inline-block">Recomendado</span>
                    </div>
                    <p className="text-xs text-slate-token mb-4">Vou anunciar somente na nossa plataforma</p>
                    
                    <div className="p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                      <div className="text-sm font-bold text-[#3B5BBD]">1º aluguel + 9,3% a.m.</div>
                    </div>
                  </div>
                </div>

                {/* Sem Exclusividade */}
                <div 
                  onClick={() => setExclusivo(false)}
                  className={cn("p-6 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-start", !exclusivo ? "border-[#3B5BBD] bg-white shadow-xl shadow-[#3B5BBD]/10 scale-[1.02]" : "border-slate-100 bg-slate-50 hover:border-slate-200")}
                >
                  <div className="shrink-0 mt-0.5">
                    {!exclusivo ? <CheckCircle className="h-6 w-6 text-[#3B5BBD]" /> : <Circle className="h-6 w-6 text-slate-300" />}
                  </div>
                  <div>
                    <span className="block text-base font-bold text-ink mb-1">Sem exclusividade</span>
                    <p className="text-xs text-slate-token mb-3">Vou anunciar também em outras imobiliárias</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: Agendamento de Fotos */}
          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-ink">Status do Imóvel</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Inquilino", "Moro aqui", "Vazio"].map(t => (
                    <button key={t} className={cn("py-3 rounded-xl text-sm font-bold border-2 transition-colors", t === "Vazio" ? "border-[#3B5BBD] text-[#3B5BBD] bg-[#3B5BBD]/5" : "border-slate-100 bg-slate-50 text-slate-token")}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-8" />

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#3B5BBD]/10 rounded-2xl flex items-center justify-center">
                    <Camera className="h-6 w-6 text-[#3B5BBD]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink">Agendar Sessão de Fotos</h3>
                    <p className="text-xs text-slate-token">Um profissional irá até o local gratuitamente.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-ink uppercase tracking-wider">Data disponível</label>
                    <div className="relative">
                      <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none text-ink text-sm font-bold appearance-none cursor-pointer focus:border-[#3B5BBD]">
                        <option>Hoje, 26 de Julho</option>
                        <option>Amanhã, 27 de Julho</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-ink uppercase tracking-wider">Horário</label>
                    <div className="relative">
                      <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none text-ink text-sm font-bold appearance-none cursor-pointer focus:border-[#3B5BBD]">
                        <option>10:00 - 10:30</option>
                        <option>14:00 - 14:30</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Action Buttons inside Card */}
          {step >= 2 && (
            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <button 
                onClick={() => setStep(step - 1)}
                className="px-6 py-4 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Voltar
              </button>
              <button 
                onClick={() => setStep(step + 1)}
                className="flex-1 max-w-[240px] bg-[#3B5BBD] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#2c4593] transition-all shadow-lg shadow-[#3B5BBD]/20 flex items-center justify-center gap-2 group"
              >
                {step === 5 ? "Finalizar Cadastro" : "Continuar"}
                {step !== 5 && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

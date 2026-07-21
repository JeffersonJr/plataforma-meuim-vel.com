import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Sparkles, Plus, Search, MapPin, Pencil, Trash2, X, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alertas")({
  component: Alertas,
});

type Alert = {
  id: string;
  name: string;
  city: string;
  neighborhoods: string;
  maxPrice: string;
  type: string;
  minArea: string;
  maxArea: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  features: string[];
};

function Alertas() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      name: "Apartamento em SP",
      city: "São Paulo",
      neighborhoods: "Pinheiros, Vila Madalena",
      maxPrice: "R$ 4.500",
      type: "Apartamento",
      minArea: "50",
      maxArea: "80",
      bedrooms: "2+",
      bathrooms: "1+",
      parking: "1+",
      features: ["Aceita pet", "Próximo ao metrô"],
    },
    {
      id: "2",
      name: "Casa para comprar no interior",
      city: "Campinas",
      neighborhoods: "Cambuí, Taquaral",
      maxPrice: "R$ 850.000",
      type: "Casa",
      minArea: "120",
      maxArea: "",
      bedrooms: "3+",
      bathrooms: "2+",
      parking: "2+",
      features: ["Quintal", "Piscina"],
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [alertToDelete, setAlertToDelete] = useState<string | null>(null);
  
  const defaultForm = {
    name: "",
    city: "",
    neighborhoods: "",
    maxPrice: "",
    type: "Qualquer",
    minArea: "",
    maxArea: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    features: [] as string[],
  };
  
  const [formData, setFormData] = useState(defaultForm);

  const availableFeatures = ["Aceita pet", "Próximo ao metrô", "Mobiliado", "Piscina", "Quintal", "Varanda Gourmet", "Academia", "Portaria 24h"];

  const handleOpenModal = (alert?: Alert) => {
    if (alert) {
      setEditingAlert(alert);
      setFormData(alert);
    } else {
      setEditingAlert(null);
      setFormData(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAlert) {
      setAlerts(alerts.map(a => a.id === editingAlert.id ? { ...formData, id: a.id } : a));
    } else {
      setAlerts([...alerts, { ...formData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id: string) => {
    setAlertToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (alertToDelete) {
      setAlerts(alerts.filter(a => a.id !== alertToDelete));
      setIsDeleteModalOpen(false);
      setAlertToDelete(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container-page py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ink flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-brand" />
              Alertas Criados
            </h1>
            <p className="mt-2 text-slate-token">
              Fique sabendo em primeira mão quando o imóvel dos seus sonhos entrar na plataforma.
            </p>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-brand text-white hover:bg-brand/90 rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Criar novo alerta
          </Button>
        </div>

        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-fog bg-white py-20 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">Você ainda não tem alertas</h2>
            <p className="max-w-sm text-slate-token mb-8">
              Crie alertas para receber notificações quando imóveis com as características que você busca ficarem disponíveis.
            </p>
            <Button onClick={() => handleOpenModal()} className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6">
              Criar meu primeiro alerta
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-fog bg-white p-6 shadow-soft">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-ink">{alert.name}</h3>
                    <p className="text-sm text-brand font-semibold mt-1">Até {alert.maxPrice}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(alert)} className="p-2 text-slate-token hover:bg-secondary rounded-full transition">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => confirmDelete(alert.id)} className="p-2 text-slate-token hover:bg-red-50 hover:text-red-500 rounded-full transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-slate-token" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{alert.city}</p>
                      <p className="text-sm text-slate-token">{alert.neighborhoods}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Filter className="h-5 w-5 shrink-0 text-slate-token" />
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs bg-secondary text-ink px-2 py-0.5 rounded-full">{alert.type}</span>
                      {alert.bedrooms && <span className="text-xs bg-secondary text-ink px-2 py-0.5 rounded-full">{alert.bedrooms} quartos</span>}
                      {alert.minArea && <span className="text-xs bg-secondary text-ink px-2 py-0.5 rounded-full">A partir de {alert.minArea}m²</span>}
                      {alert.features.map(f => (
                        <span key={f} className="text-xs bg-secondary text-ink px-2 py-0.5 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-elevated w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-fog shrink-0">
              <h2 className="text-xl font-bold text-ink">{editingAlert ? "Editar Alerta" : "Criar Novo Alerta"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-token hover:bg-secondary rounded-full transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form id="alert-form" onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
              <div>
                <label className="block text-sm font-bold text-ink mb-1.5">Nome do Alerta</label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  type="text" 
                  placeholder="Ex: Apartamento perto do trabalho" 
                  className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Cidade</label>
                  <input 
                    required
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    type="text" 
                    placeholder="Ex: São Paulo" 
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Bairros</label>
                  <input 
                    value={formData.neighborhoods}
                    onChange={e => setFormData({...formData, neighborhoods: e.target.value})}
                    type="text" 
                    placeholder="Ex: Pinheiros, Vila Madalena" 
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Preço máximo</label>
                  <input 
                    value={formData.maxPrice}
                    onChange={e => setFormData({...formData, maxPrice: e.target.value})}
                    type="text" 
                    placeholder="Ex: R$ 5.000" 
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Tipo de Imóvel</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand bg-white"
                  >
                    <option value="Qualquer">Qualquer</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Studio">Studio</option>
                    <option value="Cobertura">Cobertura</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Área Mínima (m²)</label>
                  <input 
                    value={formData.minArea}
                    onChange={e => setFormData({...formData, minArea: e.target.value})}
                    type="number" 
                    placeholder="Ex: 50" 
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Área Máxima (m²)</label>
                  <input 
                    value={formData.maxArea}
                    onChange={e => setFormData({...formData, maxArea: e.target.value})}
                    type="number" 
                    placeholder="Ex: 120" 
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Quartos</label>
                  <select 
                    value={formData.bedrooms}
                    onChange={e => setFormData({...formData, bedrooms: e.target.value})}
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand bg-white"
                  >
                    <option value="">Qualquer</option>
                    <option value="1+">1+</option>
                    <option value="2+">2+</option>
                    <option value="3+">3+</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Banheiros</label>
                  <select 
                    value={formData.bathrooms}
                    onChange={e => setFormData({...formData, bathrooms: e.target.value})}
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand bg-white"
                  >
                    <option value="">Qualquer</option>
                    <option value="1+">1+</option>
                    <option value="2+">2+</option>
                    <option value="3+">3+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-1.5">Vagas</label>
                  <select 
                    value={formData.parking}
                    onChange={e => setFormData({...formData, parking: e.target.value})}
                    className="w-full rounded-xl border border-fog px-4 py-3 text-sm outline-none focus:border-brand bg-white"
                  >
                    <option value="">Qualquer</option>
                    <option value="1+">1+</option>
                    <option value="2+">2+</option>
                    <option value="3+">3+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-3">Características</label>
                <div className="flex flex-wrap gap-2">
                  {availableFeatures.map(feature => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleFeatureToggle(feature)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                        formData.features.includes(feature)
                          ? "bg-brand/10 border-brand/30 text-brand"
                          : "bg-white border-fog text-slate-token hover:border-brand/40"
                      )}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-fog bg-secondary/20 flex justify-end gap-3 shrink-0">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="rounded-xl border-fog">
                Cancelar
              </Button>
              <Button type="submit" form="alert-form" className="bg-brand text-white hover:bg-brand/90 rounded-xl">
                Salvar Alerta
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-elevated w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">Excluir Alerta?</h2>
            <p className="text-slate-token mb-6">
              Você não receberá mais notificações para este alerta. Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => setIsDeleteModalOpen(false)} variant="outline" className="rounded-xl border-fog w-full">
                Cancelar
              </Button>
              <Button onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600 rounded-xl w-full">
                Sim, excluir
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

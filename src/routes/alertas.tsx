import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppButton } from "@/components/site-chrome";
import { Sparkles, Plus, Search, MapPin, Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/alertas")({
  component: Alertas,
});

type Alert = {
  id: string;
  name: string;
  city: string;
  neighborhoods: string;
  maxPrice: string;
};

function Alertas() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      name: "Apartamento em SP",
      city: "São Paulo",
      neighborhoods: "Pinheiros, Vila Madalena",
      maxPrice: "R$ 4.500",
    },
    {
      id: "2",
      name: "Casa para comprar no interior",
      city: "Campinas",
      neighborhoods: "Cambuí, Taquaral",
      maxPrice: "R$ 850.000",
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [alertToDelete, setAlertToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    neighborhoods: "",
    maxPrice: "",
  });

  const handleOpenModal = (alert?: Alert) => {
    if (alert) {
      setEditingAlert(alert);
      setFormData({
        name: alert.name,
        city: alert.city,
        neighborhoods: alert.neighborhoods,
        maxPrice: alert.maxPrice,
      });
    } else {
      setEditingAlert(null);
      setFormData({ name: "", city: "", neighborhoods: "", maxPrice: "" });
    }
    setIsModalOpen(true);
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
          <Button onClick={() => handleOpenModal()} className="hidden md:flex bg-brand text-white hover:bg-brand/90 gap-2 rounded-xl">
            <Plus className="h-4 w-4" /> Novo alerta
          </Button>
        </div>

        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-fog bg-white py-24 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">Você ainda não possui alertas</h2>
            <p className="max-w-sm text-slate-token mb-8">
              Crie um alerta com as suas preferências e nós te avisaremos assim que um novo imóvel aparecer!
            </p>
            <div className="flex gap-4">
              <Button onClick={() => handleOpenModal()} className="bg-brand text-white hover:bg-brand/90 rounded-xl px-6">
                Criar primeiro alerta
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {alerts.map(alert => (
              <div key={alert.id} className="rounded-2xl border border-fog bg-white p-6 shadow-soft relative group">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(alert)} className="p-2 bg-secondary text-ink rounded-lg hover:bg-fog transition">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => confirmDelete(alert.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-bold text-lg text-ink mb-2 pr-20">{alert.name}</h3>
                <div className="space-y-2 mt-4 text-sm text-slate-token">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" /> 
                    <span className="line-clamp-1">{alert.neighborhoods} - {alert.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-ink">Até {alert.maxPrice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-elevated relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-token hover:bg-secondary rounded-full">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-ink mb-6">{editingAlert ? "Editar Alerta" : "Criar Alerta"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-ink mb-1 block">Nome do alerta</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none" placeholder="Ex: Apartamentos no centro" />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink mb-1 block">Cidade</label>
                <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none" placeholder="Ex: São Paulo" />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink mb-1 block">Bairros</label>
                <input required value={formData.neighborhoods} onChange={e => setFormData({...formData, neighborhoods: e.target.value})} type="text" className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none" placeholder="Ex: Bela Vista, Consolação" />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink mb-1 block">Preço Máximo</label>
                <input required value={formData.maxPrice} onChange={e => setFormData({...formData, maxPrice: e.target.value})} type="text" className="w-full rounded-xl border border-fog p-3 focus:border-brand focus:outline-none" placeholder="Ex: R$ 3.000" />
              </div>
              <Button type="submit" className="w-full rounded-xl bg-brand py-6 font-bold text-white hover:bg-brand/90 mt-4">
                Salvar Alerta
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-elevated text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">Excluir Alerta?</h2>
            <p className="text-slate-token mb-6">
              Você não receberá mais notificações sobre novos imóveis para essa busca.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-xl border-fog hover:bg-secondary">
                Cancelar
              </Button>
              <Button onClick={handleDelete} className="flex-1 rounded-xl bg-red-600 text-white hover:bg-red-700">
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

import { UserRound, Search, Info } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TEST_DATA = [
  { category: "DNI Iniciador (también Afiliado y Beneficiario)", items: [
    { label: "Juan Perez", value: "20-11111111-9", note: "Carga los 3 contenedores" },
    { label: "Maria Gomez", value: "27-22222222-4", note: "Solo Iniciador y Beneficiario" },
  ]},
  { category: "DNI solo Afiliado", items: [
    { label: "Carlos Lopez", value: "20-33333333-9" },
    { label: "Ana Martinez", value: "27-44444444-4" },
  ]},
  { category: "DNI solo Beneficiario", items: [
    { label: "Pedro Soria", value: "20-55555555-9" },
    { label: "Laura Ruiz", value: "27-66666666-4" },
  ]},
  { category: "Factura", items: [
    { label: "Válida ✅", value: "12345678" },
    { label: "Inválida / Ya cargada ❌", value: "00000000" },
  ]},
  { category: "CBU", items: [
    { label: "Válido ✅ (22 dígitos)", value: "0000000000000000000001" },
    { label: "Inválido ❌", value: "1111111111111111111111" },
  ]},
];

export default function IniciarReintegro() {
  const [isSearching, setIsSearching] = useState(false);
  const [dni, setDni] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      navigate('/datos-precargado', { state: { initialDni: dni } });
    }, 800);
  };

  return (
    <>
      <div className="mb-8">
        <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 mb-2 gap-2">
          <span>Portal de Trámites</span>
          <span>/</span>
          <span className="text-primary font-medium">Reintegros</span>
        </nav>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Iniciar Reintegro</h2>
          {/* Test data tooltip */}
          <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <button className="p-1.5 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Datos de prueba">
              <Info size={20} />
            </button>
            {showTooltip && (
              <div className="absolute left-8 top-0 z-50 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 text-left">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Info size={13} /> Datos de prueba disponibles
                </p>
                <div className="space-y-3">
                  {TEST_DATA.map((group, gi) => (
                    <div key={gi}>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{group.category}</p>
                      <div className="space-y-1">
                        {group.items.map((item, ii) => (
                          <div key={ii} className="flex items-start justify-between gap-2">
                            <span className="text-xs text-slate-600 dark:text-slate-400 shrink-0">{item.label}</span>
                            <div className="text-right">
                              <code className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{item.value}</code>
                              {item.note && <p className="text-[10px] text-slate-400 mt-0.5">{item.note}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                      {gi < TEST_DATA.length - 1 && <div className="border-t border-slate-100 dark:border-slate-800 mt-2" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Complete los datos requeridos para iniciar la solicitud de reintegro médico.</p>
      </div>
      
      <div className="space-y-8">
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#00AEC3]/30 flex justify-between items-center" style={{ background: "#00AEC3" }}>
            <div className="flex items-center gap-2">
              <UserRound className="text-white w-6 h-6" />
              <h3 className="font-bold text-white">1. Datos del Iniciador</h3>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sexo</label>
                <select className="w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white" required>
                  <option value="">Seleccionar...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="X">No binario</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">DNI / CUIT</label>
                <input 
                  required
                  className="w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white" 
                  placeholder="Ej: 20-33444555-9" 
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="w-full md:w-auto px-8 py-2.5 bg-white text-[#00AEC3] rounded-lg font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <Search size={20} className={isSearching ? "animate-spin" : ""} />
                  {isSearching ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button className="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" onClick={() => navigate('/inicio')}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

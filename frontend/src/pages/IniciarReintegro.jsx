import { UserRound, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IniciarReintegro() {
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      navigate('/datos-precargado');
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
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Iniciar Reintegro</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Complete los datos requeridos para iniciar la solicitud de reintegro médico.</p>
      </div>
      
      <div className="space-y-8">
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserRound className="text-primary w-6 h-6" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Datos del Iniciador</h3>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sexo</label>
                <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" required>
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
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" 
                  placeholder="Ej: 20-33444555-9" 
                  type="text"
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="w-full md:w-auto px-8 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
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

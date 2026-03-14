import { Clock } from 'lucide-react';

export default function Inicio() {
  return (
    <>
      <div className="mb-8">
        <span className="text-primary font-black text-4xl tracking-tight uppercase">Reintegros IOMA</span>
        <h1 className="text-2xl font-light text-slate-500 mt-2" data-purpose="content-title">Sistema de Reintegros</h1>
      </div>
      <hr className="border-slate-200 dark:border-slate-800 mb-10 border-t-[1px]"/>
      <div className="bg-white/50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 text-center" data-purpose="content-placeholder">
        <Clock className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4 block" />
        <p className="text-slate-400 dark:text-slate-500 italic text-lg">Seleccione una opción del menú para comenzar...</p>
      </div>
    </>
  );
}

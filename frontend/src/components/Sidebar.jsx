import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, List, Search, ClipboardCheck } from 'lucide-react';

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    const base = "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors";
    if (isActive) {
      return `${base} bg-primary/10 text-primary font-bold`;
    }
    return `${base} text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800`;
  };

  return (
    <aside className={`w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col ${isOpen ? 'block' : 'hidden'} lg:flex shrink-0`}>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/inicio" className={getLinkClasses('/inicio')}>
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <Link to="/iniciar-reintegro" className={getLinkClasses('/iniciar-reintegro')}>
          <PlusCircle size={20} />
          <span>Iniciar Reintegro</span>
        </Link>
        <Link to="/listado-reintegros" className={getLinkClasses('/listado-reintegros')}>
          <List size={20} />
          <span>Listado Reintegros</span>
        </Link>
        <Link to="/reintegros-pendientes" className={getLinkClasses('/reintegros-pendientes')}>
          <ClipboardCheck size={20} />
          <span>Reintegros Pendientes</span>
        </Link>
        <button className={getLinkClasses('/buscar')}>
          <Search size={20} />
          <span>Buscar</span>
        </button>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-xs text-slate-500">
          <p>Soporte Técnico: 0800-IOMA</p>
          <p className="mt-1">v2.4.0-release</p>
        </div>
      </div>
    </aside>
  );
}

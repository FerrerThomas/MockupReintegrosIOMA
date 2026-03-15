import { Search, Eye, Filter, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_REINTEGROS = [
  { id: "REI-2023-001", afiliado: "Juan Perez", dni: "20-11111111-9", fecha: "15/03/2026", monto: "$ 15.000", prestacion: "Odontología", estado: "Aprobado" },
  { id: "REI-2023-002", afiliado: "Maria Gomez", dni: "27-22222222-4", fecha: "14/03/2026", monto: "$ 22.500", prestacion: "Kinesiología", estado: "Pendiente" },
  { id: "REI-2023-003", afiliado: "Carlos Lopez", dni: "20-33333333-9", fecha: "10/03/2026", monto: "$ 8.200", prestacion: "Psicología", estado: "Rechazado" },
  { id: "REI-2023-004", afiliado: "Ana Martinez", dni: "27-44444444-4", fecha: "05/03/2026", monto: "$ 45.000", prestacion: "Odontología", estado: "En Revisión" },
];

export default function ListadoReintegros() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReintegros = MOCK_REINTEGROS.filter(r => 
    r.afiliado.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.dni.includes(searchTerm) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (estado) => {
    switch (estado) {
      case "Aprobado":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"><CheckCircle size={14} /> Aprobado</span>;
      case "Pendiente":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"><Clock size={14} /> Pendiente</span>;
      case "Rechazado":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"><XCircle size={14} /> Rechazado</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"><FileText size={14} /> {estado}</span>;
    }
  };

  return (
    <>
      <div className="mb-8">
        <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 mb-2 gap-2">
          <span>Portal de Trámites</span>
          <span>/</span>
          <span className="text-primary font-medium">Reintegros</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Listado de Reintegros</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Gestione y consulte el estado de los reintegros médicos.</p>
          </div>
          <button className="px-5 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
            <Filter size={18} />
            Filtros Avanzados
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm text-slate-900 dark:text-white shadow-sm"
              placeholder="Buscar por nombre, DNI o N° de trámite..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">N° Trámite</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Afiliado</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">DNI</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Prestación</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Monto</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
              {filteredReintegros.length > 0 ? (
                filteredReintegros.map((reintegro, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{reintegro.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 font-semibold">{reintegro.afiliado}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{reintegro.dni}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{reintegro.prestacion}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{reintegro.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">{reintegro.monto}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(reintegro.estado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Link to={`/detalle-reintegro/${reintegro.id}`} className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors" title="Ver Detalle">
                        <Eye size={20} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-10 w-10 text-slate-300 mb-3" />
                      <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No se encontraron reintegros</p>
                      <p className="text-sm">Intente ajustando los términos de búsqueda.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">Mostrando <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredReintegros.length}</span> resultados</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Siguiente</button>
          </div>
        </div>
      </div>
    </>
  );
}

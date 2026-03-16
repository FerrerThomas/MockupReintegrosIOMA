import { Search, Eye, Filter, Clock, Layers } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_PENDIENTES = [
  { id: "REI-2023-005", afiliado: "Rosa Ferreira", dni: "27-88888888-4", fecha: "14/03/2026", monto: "$ 100.000", prestacion: "Odontología" },
  { id: "REI-2023-006", afiliado: "Eduardo Bianchi", dni: "20-77777777-9", fecha: "13/03/2026", monto: "$ 55.000", prestacion: "Kinesiología" },
  { id: "REI-2023-007", afiliado: "Laura Paz", dni: "27-66666666-3", fecha: "12/03/2026", monto: "$ 32.000", prestacion: "Psicología" },
];

export default function ReintegrosPendientes() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_PENDIENTES.filter(r =>
    r.afiliado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.dni.includes(searchTerm) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <nav className="flex text-sm text-slate-500 mb-2 gap-2">
          <span>Portal de Trámites</span>
          <span>/</span>
          <span className="text-primary font-medium">Reintegros Pendientes</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Reintegros Pendientes</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                <Clock size={14} /> {MOCK_PENDIENTES.length} pendientes
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Vista de auditor. Ingresá a cada trámite para revisarlo y emitir tu dictamen.</p>
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
                <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Auditar</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
              {filtered.length > 0 ? filtered.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{r.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300">{r.afiliado}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{r.dni}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{r.prestacion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{r.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">{r.monto}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      <Clock size={13} /> Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        to={`/auditoria-detalle/${r.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                        title="Vista 1: Auditoría Global"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/auditoria-detalle2/${r.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors"
                        title="Vista 2: Auditoría por Práctica"
                      >
                        <Layers size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-10 w-10 text-slate-300 mb-3" />
                      <p className="text-lg font-medium">No se encontraron reintegros pendientes</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">Mostrando <span className="font-semibold text-slate-700 dark:text-slate-300">{filtered.length}</span> resultados</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-500 disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-500 disabled:opacity-50" disabled>Siguiente</button>
          </div>
        </div>
      </div>
    </>
  );
}

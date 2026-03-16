import {
  ArrowLeft, User, IdCard, Hospital, ReceiptText, Banknote,
  CheckCircle, XCircle, FileText, History, CircleUserRound,
  ClipboardCheck, DollarSign, Save, Eye, AlertCircle, FileCheck
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const MOCK_DETALLE2 = {
  "REI-2023-005": {
    id: "REI-2023-005", estado: "Pendiente", fecha: "14/03/2026",
    afiliado: { nombre: "Rosa Ferreira", nroAfiliado: "99/88888888/00", dni: "27.888.888", plan: "IOMA Clásico" },
    prestacion: {
      profesional: "Dr. García, Juan Carlos",
      especialidad: "Odontología",
      fechaPrestacion: "10/03/2026",
      lugar: "La Plata, Prov. Bs. As.",
      practicas: [
        { codigo: "42.01.01", nombre: "Consulta Odontológica", montoSolicitado: 15400 },
        { codigo: "42.01.02", nombre: "Extracción Dentaria", montoSolicitado: 12000 },
        { codigo: "42.01.03", nombre: "Radiografía Periapical", montoSolicitado: 8500 },
      ]
    },
    factura: { nro: "B-0001-00004512", importe: "$ 35.900,00", cae: "7341258849201", fechaEmision: "11/03/2026" },
    documentos: [
      { nombre: "factura_odontologia.pdf", tipo: "pdf" },
      { nombre: "historia_clinica_resumen.pdf", tipo: "pdf" },
    ],
    historialAuditoria: [
      { icono: "sistema", usuario: "Sistema", fecha: "14/03/2026 10:00", descripcion: "Carga digital exitosa desde Portal Afiliados." },
      { icono: "asignado", usuario: "Jefe de Área", fecha: "14/03/2026 11:30", descripcion: "Derivado a Región La Plata para validación." },
      { icono: "obs", usuario: "Auditor Martínez", fecha: "15/03/2026 09:00", descripcion: '"Se requiere verificar tope de práctica odontológica."' },
    ]
  },
  "REI-2023-006": {
    id: "REI-2023-006", estado: "Pendiente", fecha: "13/03/2026",
    afiliado: { nombre: "Eduardo Bianchi", nroAfiliado: "99/77777777/00", dni: "20.777.777", plan: "IOMA Clásico" },
    prestacion: {
      profesional: "Lic. Rodríguez, Paula",
      especialidad: "Kinesiología",
      fechaPrestacion: "09/03/2026",
      lugar: "Mar del Plata, Bs. As.",
      practicas: [
        { codigo: "50.01.01", nombre: "Sesión de rehabilitación", montoSolicitado: 18000 },
        { codigo: "50.01.02", nombre: "Electroterapia", montoSolicitado: 9500 },
        { codigo: "50.01.03", nombre: "Magnetoterapia", montoSolicitado: 7000 },
        { codigo: "50.01.04", nombre: "Masaje terapéutico", montoSolicitado: 6500 },
      ]
    },
    factura: { nro: "C-0002-00008888", importe: "$ 41.000,00", cae: "9123450000021", fechaEmision: "10/03/2026" },
    documentos: [{ nombre: "factura_kinesiologia.pdf", tipo: "pdf" }],
    historialAuditoria: [
      { icono: "sistema", usuario: "Sistema", fecha: "13/03/2026 09:30", descripcion: "Carga inicial del trámite." }
    ]
  },
  "REI-2023-007": {
    id: "REI-2023-007", estado: "Pendiente", fecha: "12/03/2026",
    afiliado: { nombre: "Laura Paz", nroAfiliado: "99/66666666/00", dni: "27.666.666", plan: "IOMA Familiar" },
    prestacion: {
      profesional: "Lic. Vega, Sofía",
      especialidad: "Psicología",
      fechaPrestacion: "08/03/2026",
      lugar: "Buenos Aires, CABA",
      practicas: [
        { codigo: "60.01.01", nombre: "Sesión individual", montoSolicitado: 15000 },
        { codigo: "60.01.02", nombre: "Terapia cognitiva", montoSolicitado: 17000 },
      ]
    },
    factura: { nro: "C-0001-00007777", importe: "$ 32.000,00", cae: "5552341200012", fechaEmision: "09/03/2026" },
    documentos: [{ nombre: "factura_psicologia.pdf", tipo: "pdf" }],
    historialAuditoria: [
      { icono: "sistema", usuario: "Sistema", fecha: "12/03/2026 11:00", descripcion: "Carga inicial del trámite." },
      { icono: "obs", usuario: "Auditor García", fecha: "13/03/2026 12:00", descripcion: '"Falta firma del profesional en la factura."' }
    ]
  }
};

const HistorialIcon = ({ tipo }) => {
  const base = "flex items-center justify-center w-8 h-8 rounded-full shrink-0 ring-4 ring-white dark:ring-slate-900";
  if (tipo === "asignado") return <span className={`${base} bg-yellow-100 text-yellow-700`}><ClipboardCheck size={14} /></span>;
  if (tipo === "obs") return <span className={`${base} bg-slate-100 text-slate-500`}><CircleUserRound size={14} /></span>;
  return <span className={`${base} bg-primary/10 text-primary`}><FileText size={14} /></span>;
};

const ReadOnlyField = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{value || "—"}</p>
  </div>
);

const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
  <section className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden ${className}`}>
    <div className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 px-5 py-3 flex items-center gap-2.5">
      <div className="p-1.5 bg-primary/10 text-primary rounded-lg shrink-0"><Icon size={16} /></div>
      <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </section>
);

export default function AuditoriaDetalle2() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = MOCK_DETALLE2[id] || MOCK_DETALLE2["REI-2023-005"];

  // Per-practice state: { [codigo]: { estado: 'aceptar'|'rechazar'|null, monto: string, comentario: string } }
  const [practicasAuditadas, setPracticasAuditadas] = useState(() => {
    const init = {};
    data.prestacion.practicas.forEach(p => {
      init[p.codigo] = { estado: null, monto: String(p.montoSolicitado), comentario: "" };
    });
    return init;
  });
  const [dictamen, setDictamen] = useState("");
  const [guardado, setGuardado] = useState(false);

  const updatePractica = (codigo, field, value) => {
    setPracticasAuditadas(prev => ({ ...prev, [codigo]: { ...prev[codigo], [field]: value } }));
  };

  const totalAuditado = data.prestacion.practicas.reduce((acc, p) => {
    const aud = practicasAuditadas[p.codigo];
    if (aud?.estado === 'aceptar') {
      return acc + (parseFloat(aud.monto) || 0);
    }
    return acc;
  }, 0);

  const formatMoney = (n) => `$ ${n.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

  const handleGuardar = () => {
    const allAnswered = data.prestacion.practicas.every(p => practicasAuditadas[p.codigo]?.estado !== null);
    if (!allAnswered) {
      alert("Debe aceptar o rechazar cada práctica antes de guardar.");
      return;
    }
    setGuardado(true);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <nav className="flex text-sm text-slate-500 mb-2 gap-2">
          <button onClick={() => navigate('/reintegros-pendientes')} className="hover:text-primary hover:underline">Reintegros</button>
          <span>/</span>
          <span className="text-primary font-medium">Detalle #{data.id}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/reintegros-pendientes')} className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Detalle de Reintegro #{data.id}</h2>
                {guardado
                  ? <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800"><CheckCircle size={14} /> Auditoría guardada</span>
                  : <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">PENDIENTE AUDITORÍA</span>}
              </div>
            </div>
          </div>
          <button className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 text-sm">
            <FileText size={16} /> Imprimir Formulario
          </button>
        </div>
      </div>

      {/* TOP SECTION: Audit Panel + History sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-6">

        {/* LEFT: Per-practice audit panel */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/30 overflow-hidden">
          <div className="bg-primary/5 border-b border-primary/20 px-5 py-3 flex items-center gap-2.5">
            <div className="p-1.5 bg-primary/10 text-primary rounded-lg shrink-0"><ClipboardCheck size={16} /></div>
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Panel de Auditoría</h3>
          </div>
          <div className="p-5">
            {guardado ? (
              <div className="flex items-center gap-4 p-4 rounded-xl border bg-green-50 border-green-200 text-green-800 mb-4">
                <CheckCircle size={24} />
                <div>
                  <p className="font-bold">Auditoría guardada correctamente</p>
                  <p className="text-sm">Total auditado: <strong>{formatMoney(totalAuditado)}</strong></p>
                  {dictamen && <p className="text-sm mt-1">Dictamen: {dictamen}</p>}
                </div>
                <button onClick={() => setGuardado(false)} className="ml-auto text-sm underline opacity-70 hover:opacity-100">Modificar</button>
              </div>
            ) : (
              <>
                {/* Practice table */}
                <div className="overflow-x-auto mb-5">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                        <th className="text-left pb-3 pr-4">Práctica</th>
                        <th className="text-right pb-3 pr-6">Monto Solicitado</th>
                        <th className="text-left pb-3 pr-4 min-w-[140px]">Monto Auditado ($)</th>
                        <th className="text-center pb-3 pr-4">Acciones</th>
                        <th className="text-left pb-3">Observaciones por Práctica</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {data.prestacion.practicas.map((p) => {
                        const aud = practicasAuditadas[p.codigo];
                        return (
                          <tr key={p.codigo} className={`transition-colors ${aud.estado === 'aceptar' ? 'bg-green-50/40 dark:bg-green-900/10' : aud.estado === 'rechazar' ? 'bg-red-50/40 dark:bg-red-900/10' : ''}`}>
                            <td className="py-3.5 pr-4">
                              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.codigo}</p>
                              <p className="text-xs text-slate-500">{p.nombre}</p>
                            </td>
                            <td className="py-3.5 pr-6 text-right">
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{formatMoney(p.montoSolicitado)}</span>
                            </td>
                            <td className="py-3.5 pr-4">
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 text-xs font-bold pointer-events-none">$</span>
                                <input
                                  type="number"
                                  disabled={aud.estado !== 'aceptar'}
                                  className={`w-full pl-6 pr-2 py-1.5 text-sm rounded-lg border transition-all font-mono font-bold
                                    ${aud.estado === 'aceptar'
                                      ? 'border-green-300 bg-white dark:bg-slate-900 text-green-700 focus:ring-2 focus:ring-green-200 focus:border-green-400'
                                      : 'border-slate-200 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                    }`}
                                  value={aud.monto}
                                  onChange={(e) => updatePractica(p.codigo, 'monto', e.target.value)}
                                />
                              </div>
                            </td>
                            <td className="py-3.5 pr-4">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => updatePractica(p.codigo, 'estado', aud.estado === 'aceptar' ? null : 'aceptar')}
                                  className={`p-1.5 rounded-full transition-all ${aud.estado === 'aceptar' ? 'bg-green-500 text-white shadow-sm' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                                  title="Aceptar práctica"
                                >
                                  <CheckCircle size={16} />
                                </button>
                                <button
                                  onClick={() => updatePractica(p.codigo, 'estado', aud.estado === 'rechazar' ? null : 'rechazar')}
                                  className={`p-1.5 rounded-full transition-all ${aud.estado === 'rechazar' ? 'bg-red-500 text-white shadow-sm' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                                  title="Rechazar práctica"
                                >
                                  <XCircle size={16} />
                                </button>
                              </div>
                            </td>
                            <td className="py-3.5">
                              <input
                                type="text"
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-300 min-w-[160px]"
                                placeholder="Nota práctica..."
                                value={aud.comentario}
                                onChange={(e) => updatePractica(p.codigo, 'comentario', e.target.value)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 mb-5">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Total Auditado</span>
                  <span className="text-2xl font-extrabold text-primary">{formatMoney(totalAuditado)}</span>
                </div>

                {/* General dictamen */}
                <div className="mb-5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Observaciones / Dictamen Técnico</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-700 dark:text-slate-300 resize-none placeholder:text-slate-300"
                    placeholder="Ingrese los detalles de la auditoría o motivos de rechazo..."
                    value={dictamen}
                    onChange={(e) => setDictamen(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleGuardar}
                    className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-sm flex items-center gap-2"
                  >
                    <Save size={18} /> Guardar Auditoría
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* RIGHT: Audit history */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-fit">
          <div className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 px-5 py-3 flex items-center gap-2.5">
            <div className="p-1.5 bg-primary/10 text-primary rounded-lg shrink-0"><History size={16} /></div>
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Historial de Auditoría</h3>
          </div>
          <div className="p-5">
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-6">
              {data.historialAuditoria.map((h, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-9 top-0">
                    <HistorialIcon tipo={h.icono} />
                  </span>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{h.usuario}</p>
                  <time className="text-[10px] text-slate-400 block mb-1">{h.fecha}</time>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{h.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SectionCard title="Datos del Afiliado" icon={User}>
          <div className="grid grid-cols-2 gap-4">
            <ReadOnlyField label="Nombre Completo" value={data.afiliado.nombre} />
            <ReadOnlyField label="Nro Afiliado" value={data.afiliado.nroAfiliado} />
            <ReadOnlyField label="DNI" value={data.afiliado.dni} />
            <ReadOnlyField label="Plan" value={data.afiliado.plan} />
          </div>
        </SectionCard>

        <SectionCard title="Datos de la Prestación" icon={Hospital}>
          <div className="grid grid-cols-2 gap-4">
            <ReadOnlyField label="Profesional" value={data.prestacion.profesional} />
            <ReadOnlyField label="Especialidad" value={data.prestacion.especialidad} />
            <ReadOnlyField label="Fecha Prestación" value={data.prestacion.fechaPrestacion} />
            <ReadOnlyField label="Lugar" value={data.prestacion.lugar} />
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Datos de la Factura" icon={ReceiptText}>
          <div className="grid grid-cols-2 gap-4">
            <ReadOnlyField label="Nro Factura" value={data.factura.nro} />
            <ReadOnlyField label="Importe Total" value={data.factura.importe} />
            <ReadOnlyField label="CAE / CAI" value={data.factura.cae} />
            <ReadOnlyField label="Fecha Emisión" value={data.factura.fechaEmision} />
          </div>
        </SectionCard>

        <SectionCard title="Documentación Adjunta" icon={FileText}>
          <div className="space-y-2">
            {data.documentos.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-100 text-red-600 rounded shrink-0">
                    <FileText size={14} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{doc.nombre}</span>
                </div>
                <Eye size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

import {
  ArrowLeft, User, Hospital, ReceiptText,
  CheckCircle, XCircle, FileText, History,
  ClipboardCheck, DollarSign, Save, Eye,
  CircleUserRound
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

/* ─── Shared mock data ─── */
const MOCK_DETALLE3 = {
  "REI-2023-005": {
    id: "REI-2023-005", estado: "Pendiente", fecha: "14/03/2026",
    afiliado: { nombre: "García, María Elena", nroAfiliado: "2-45882341/00", dni: "24.588.234", mail: "MariaElenano@gmail.com" },
    prestacion: {
      profesional: "Dr. Pérez, Juan Carlos", especialidad: "Odontología",
      fechaPrestacion: "05/10/2023", lugar: "La Plata, Prov. Bs. As.",
      practicas: [
        { codigo: "42.01.01", nombre: "Consulta Odontológica", montoSolicitado: 15400 },
        { codigo: "42.01.02", nombre: "Extracción Dentaria",   montoSolicitado: 12000 },
        { codigo: "42.01.03", nombre: "Radiografía Periapical", montoSolicitado: 8500 },
      ]
    },
    factura: { nro: "B-0001-00004512", importe: "$ 15.400,00", cae: "7341258849201", fechaEmision: "06/10/2023" },
    documentos: [
      { nombre: "factura_odontologia.pdf" },
      { nombre: "historia_clinica_resumen.pdf" },
    ],
    historialAuditoria: [
      { icono: "sistema",  usuario: "Iniciado por Sistema",  fecha: "12 Oct 2023 · 08:45", descripcion: "Carga digital exitosa desde Portal Afiliados." },
      { icono: "asignado", usuario: "Asignado a Auditoría",  fecha: "12 Oct 2023 · 10:20", descripcion: "Derivado a Región La Plata para validación." },
      { icono: "obs",      usuario: "Observación Previa",    fecha: "13 Oct 2023 · 14:15", descripcion: '"Se requiere verificar tope de práctica odontológica." — Auditor Martínez' },
    ]
  },
  "REI-2023-006": {
    id: "REI-2023-006", estado: "Pendiente", fecha: "13/03/2026",
    afiliado: { nombre: "Bianchi, Eduardo", nroAfiliado: "2-77777700/00", dni: "20.777.777", mail: "edu.bianchi@gmail.com" },
    prestacion: {
      profesional: "Lic. Rodríguez, Paula", especialidad: "Kinesiología",
      fechaPrestacion: "09/03/2026", lugar: "Mar del Plata, Bs. As.",
      practicas: [
        { codigo: "50.01.01", nombre: "Sesión de rehabilitación", montoSolicitado: 18000 },
        { codigo: "50.01.02", nombre: "Electroterapia",           montoSolicitado: 9500  },
        { codigo: "50.01.03", nombre: "Magnetoterapia",           montoSolicitado: 7000  },
        { codigo: "50.01.04", nombre: "Masaje terapéutico",       montoSolicitado: 6500  },
      ]
    },
    factura: { nro: "C-0002-00008888", importe: "$ 41.000,00", cae: "9123450000021", fechaEmision: "10/03/2026" },
    documentos: [{ nombre: "factura_kinesiologia.pdf" }],
    historialAuditoria: [
      { icono: "sistema", usuario: "Iniciado por Sistema", fecha: "13 Mar 2026 · 09:30", descripcion: "Carga inicial del trámite." }
    ]
  },
  "REI-2023-007": {
    id: "REI-2023-007", estado: "Pendiente", fecha: "12/03/2026",
    afiliado: { nombre: "Paz, Laura", nroAfiliado: "2-66666600/00", dni: "27.666.666", mail: "laura.paz@gmail.com" },
    prestacion: {
      profesional: "Lic. Vega, Sofía", especialidad: "Psicología",
      fechaPrestacion: "08/03/2026", lugar: "Buenos Aires, CABA",
      practicas: [
        { codigo: "60.01.01", nombre: "Sesión individual",  montoSolicitado: 15000 },
        { codigo: "60.01.02", nombre: "Terapia cognitiva",  montoSolicitado: 17000 },
      ]
    },
    factura: { nro: "C-0001-00007777", importe: "$ 32.000,00", cae: "5552341200012", fechaEmision: "09/03/2026" },
    documentos: [{ nombre: "factura_psicologia.pdf" }],
    historialAuditoria: [
      { icono: "sistema", usuario: "Iniciado por Sistema", fecha: "12 Mar 2026 · 11:00", descripcion: "Carga inicial del trámite." },
      { icono: "obs",     usuario: "Observación Previa",   fecha: "13 Mar 2026 · 12:00", descripcion: '"Falta firma del profesional en la factura." — Auditor García' }
    ]
  }
};

/* ─── Helpers ─── */
const formatMoney = (n) =>
  `$ ${Number(n).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

const HistorialDot = ({ tipo }) => {
  const base = "flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ring-4 ring-white dark:ring-slate-900 text-white text-xs font-bold";
  if (tipo === "asignado") return <span className={`${base} bg-amber-400`}><ClipboardCheck size={13} /></span>;
  if (tipo === "obs")      return <span className={`${base} bg-slate-400`}><CircleUserRound size={13} /></span>;
  return <span className={`${base} bg-teal-500`}><FileText size={13} /></span>;
};

/* ─── Sub-components ─── */
const InfoCard = ({ title, icon: Icon, children }) => (
  <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
    <div className="flex items-center gap-2.5 px-5 py-3" style={{ background: "#00AEC3" }}>
      <Icon size={15} className="text-white/80 shrink-0" />
      <p className="text-[11px] font-bold text-white uppercase tracking-widest">{title}</p>
    </div>
    <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">{children}</div>
  </section>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{value || "—"}</p>
  </div>
);

/* ─── Main component ─── */
export default function AuditoriaDetalle3() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = MOCK_DETALLE3[id] || MOCK_DETALLE3["REI-2023-005"];

  const initPracticas = () => {
    const m = {};
    data.prestacion.practicas.forEach(p => {
      m[p.codigo] = { estado: null, monto: String(p.montoSolicitado) };
    });
    return m;
  };

  const [practicasAuditadas, setPracticasAuditadas] = useState(initPracticas);
  const [dictamen, setDictamen] = useState("");
  const [guardado, setGuardado] = useState(false);

  const updatePractica = (codigo, field, value) =>
    setPracticasAuditadas(prev => ({ ...prev, [codigo]: { ...prev[codigo], [field]: value } }));

  const toggleEstado = (codigo, nuevoEstado) => {
    const actual = practicasAuditadas[codigo].estado;
    updatePractica(codigo, 'estado', actual === nuevoEstado ? null : nuevoEstado);
  };

  const totalAuditado = data.prestacion.practicas.reduce((acc, p) => {
    const aud = practicasAuditadas[p.codigo];
    return aud?.estado === 'aceptar' ? acc + (parseFloat(aud.monto) || 0) : acc;
  }, 0);

  const handleGuardar = () => {
    const allAnswered = data.prestacion.practicas.every(
      p => practicasAuditadas[p.codigo]?.estado !== null
    );
    if (!allAnswered) { alert("Debe aceptar o rechazar cada práctica antes de guardar."); return; }
    setGuardado(true);
  };

  return (
    <>
      {/* ── Header ── */}
      <div className="mb-6">
        <nav className="flex text-sm text-slate-500 mb-2 gap-2">
          <button onClick={() => navigate('/reintegros-pendientes')} className="hover:text-teal-600 hover:underline">Reintegros</button>
          <span>/</span>
          <span className="text-teal-600 font-medium">Detalle #{data.id}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/reintegros-pendientes')}
              className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-colors shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Detalle de Reintegro #{data.id}
              </h2>
              {guardado
                ? <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200"><CheckCircle size={13}/> Guardado</span>
                : <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">PENDIENTE AUDITORÍA</span>
              }
            </div>
          </div>
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <FileText size={15} /> Imprimir Formulario
          </button>
        </div>
      </div>

      {/* ── TOP: Panel + History ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 mb-5">

        {/* LEFT: Audit panel */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Panel header — teal gradient */}
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#00AEC3]/30"
            style={{ background: "#00AEC3" }}>
            <ClipboardCheck size={16} className="text-white/80 shrink-0" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Panel de Auditoría</h3>
          </div>

          <div className="p-5">
            {guardado ? (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 mb-4">
                <CheckCircle size={22} />
                <div>
                  <p className="font-bold">Auditoría guardada correctamente</p>
                  <p className="text-sm">Total auditado: <strong>{formatMoney(totalAuditado)}</strong></p>
                  {dictamen && <p className="text-sm mt-0.5 text-green-700 italic">{dictamen}</p>}
                </div>
                <button onClick={() => setGuardado(false)} className="ml-auto text-xs underline opacity-60 hover:opacity-100">Modificar</button>
              </div>
            ) : (
              <>
                {/* Practice table — no per-practice note column */}
                <div className="overflow-x-auto mb-5">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                        <th className="text-left pb-3 pr-4">Práctica</th>
                        <th className="text-right pb-3 pr-6">Monto Solicitado</th>
                        <th className="text-left pb-3 pr-6 min-w-[130px]">Monto Auditado ($)</th>
                        <th className="text-center pb-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {data.prestacion.practicas.map((p) => {
                        const aud = practicasAuditadas[p.codigo];
                        const isAceptar = aud.estado === 'aceptar';
                        const isRechazar = aud.estado === 'rechazar';
                        return (
                          <tr key={p.codigo}
                            className={`transition-colors ${isAceptar ? 'bg-teal-50/40 dark:bg-teal-900/10' : isRechazar ? 'bg-red-50/40 dark:bg-red-900/10' : ''}`}>
                            <td className="py-4 pr-4">
                              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{p.codigo}</p>
                              <p className="text-xs text-slate-500">{p.nombre}</p>
                            </td>
                            <td className="py-4 pr-6 text-right">
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{formatMoney(p.montoSolicitado)}</span>
                            </td>
                            <td className="py-4 pr-6">
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 text-xs font-bold pointer-events-none">$</span>
                                <input
                                  type="number"
                                  disabled={!isAceptar}
                                  className={`w-full pl-6 pr-2 py-1.5 text-sm rounded-lg border transition-all font-mono font-bold
                                    ${isAceptar
                                      ? 'border-teal-300 bg-white dark:bg-slate-900 text-teal-700 focus:ring-2 focus:ring-teal-200 focus:border-teal-400'
                                      : 'border-slate-200 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                    }`}
                                  value={aud.monto}
                                  onChange={(e) => updatePractica(p.codigo, 'monto', e.target.value)}
                                />
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleEstado(p.codigo, 'aceptar')}
                                  className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all
                                    ${isAceptar
                                      ? 'bg-teal-500 text-white border-teal-500 shadow-sm'
                                      : 'bg-white text-teal-600 border-teal-300 hover:bg-teal-50'
                                    }`}
                                >
                                  ACEPTAR
                                </button>
                                <button
                                  onClick={() => toggleEstado(p.codigo, 'rechazar')}
                                  className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all
                                    ${isRechazar
                                      ? 'bg-red-500 text-white border-red-500 shadow-sm'
                                      : 'bg-white text-red-500 border-red-300 hover:bg-red-50'
                                    }`}
                                >
                                  RECHAZAR
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 mb-5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Auditado</span>
                  <span className="text-2xl font-extrabold text-teal-600">{formatMoney(totalAuditado)}</span>
                </div>

                {/* Single dictamen — no per-practice notes */}
                <div className="mb-5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Observaciones / Dictamen Técnico</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all shadow-sm text-slate-700 dark:text-slate-300 resize-none placeholder:text-slate-300"
                    placeholder="Ingrese los detalles de la auditoría o motivos de rechazo..."
                    value={dictamen}
                    onChange={(e) => setDictamen(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleGuardar}
                    className="px-8 py-3 text-white rounded-xl font-bold active:scale-95 transition-all shadow-sm flex items-center gap-2"
                    style={{ background: "#00AEC3" }}
                  >
                    <Save size={17} /> Guardar Auditoría
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* RIGHT: Audit history */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col h-fit">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#00AEC3]/30"
            style={{ background: "#00AEC3" }}>
            <History size={16} className="text-white/80 shrink-0" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Historial de Auditoría</h3>
          </div>
          <div className="p-5">
            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3.5 pl-5 space-y-6">
              {data.historialAuditoria.map((h, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-8 top-0"><HistorialDot tipo={h.icono} /></span>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-tight">{h.usuario}</p>
                  <time className="text-[10px] text-slate-400 block mb-1">{h.fecha}</time>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{h.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── INFO CARDS ── */}
      <div className="flex flex-col gap-5">
        <InfoCard title="Datos del Afiliado" icon={User}>
          <Field label="Nombre Completo"  value={data.afiliado.nombre} />
          <Field label="Nro Afiliado"     value={data.afiliado.nroAfiliado} />
          <Field label="DNI"              value={data.afiliado.dni} />
          <Field label="Mail"             value={data.afiliado.mail} />
        </InfoCard>
        <InfoCard title="Datos de la Prestación" icon={Hospital}>
          <Field label="Profesional"       value={data.prestacion.profesional} />
          <Field label="Especialidad"      value={data.prestacion.especialidad} />
          <Field label="Fecha Prestación"  value={data.prestacion.fechaPrestacion} />
          <Field label="Lugar"             value={data.prestacion.lugar} />
        </InfoCard>
        <InfoCard title="Datos de la Factura" icon={ReceiptText}>
          <Field label="Nro Factura"    value={data.factura.nro} />
          <Field label="Importe Total"  value={data.factura.importe} />
          <Field label="CAE / CAI"      value={data.factura.cae} />
          <Field label="Fecha Emisión"  value={data.factura.fechaEmision} />
        </InfoCard>
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-5 py-3" style={{ background: "#00AEC3" }}>
            <FileText size={15} className="text-white/80 shrink-0" />
            <p className="text-[11px] font-bold text-white uppercase tracking-widest">Documentación Adjunta</p>
          </div>
          <div className="p-4 space-y-2">
            {data.documentos.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 hover:border-teal-200 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-100 text-red-500 rounded"><FileText size={13} /></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{doc.nombre}</span>
                </div>
                <Eye size={15} className="text-slate-400 group-hover:text-teal-500 transition-colors" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

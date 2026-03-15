import { ArrowLeft, User, IdCard, Hospital, ReceiptText, Banknote, CheckCircle, FileText, History, FileCheck, CircleUserRound, AlertCircle, ClipboardCheck, DollarSign, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const MOCK_DETALLE = {
  "REI-2023-005": {
    id: "REI-2023-005", estado: "Pendiente", fecha: "14/03/2026",
    iniciador: { nombre: "Rosa Ferreira", dni: "27-88888888-4", domicilio: "Lima 200", mail: "rosa@mail.com", celular: "11-8888-8888", telefono: "3333-3333" },
    afiliado: { nombre: "Rosa Ferreira", dni: "27-88888888-4", domicilio: "Lima 200", mail: "rosa@mail.com", celular: "11-8888-8888", telefono: "3333-3333", nroAfiliado: "99/88888888/00", condicion: "Activo" },
    beneficiario: { nombre: "Rosa Ferreira", dni: "27-88888888-4", domicilio: "Lima 200", mail: "rosa@mail.com", celular: "11-8888-8888", telefono: "3333-3333", nroAfiliado: "99/88888888/00", parentesco: "Titular" },
    prestacion: { nombre: "Odontología", practicas: ["Consulta general", "Limpieza de sarro", "Blanqueamiento"], cuit: "30-12345678-9" },
    factura: { tipo: "Factura C", nro: "00009999", monto: "$ 100.000" },
    cbu: "0000000000000000000001",
    historialAuditoria: [
      { nivel: 1, usuario: "auditor_n1", fecha: "15/03/2026 08:30", decision: "aceptar", montoSugerido: "80000", observacion: "Documentación completa. Ajusto monto por tope nivel 1." }
    ],
    historialTramite: [
      { fecha: "14/03/2026 10:00", accion: "Reintegro Creado", usuario: "admin_sistema", descripcion: "Carga inicial del trámite." }
    ]
  },
  "REI-2023-006": {
    id: "REI-2023-006", estado: "Pendiente", fecha: "13/03/2026",
    iniciador: { nombre: "Eduardo Bianchi", dni: "20-77777777-9", domicilio: "Corrientes 1500", mail: "edu@mail.com", celular: "11-7777-7777", telefono: "8888-8888" },
    afiliado: { nombre: "Eduardo Bianchi", dni: "20-77777777-9", domicilio: "Corrientes 1500", mail: "edu@mail.com", celular: "11-7777-7777", telefono: "8888-8888", nroAfiliado: "99/77777777/00", condicion: "Activo" },
    beneficiario: { nombre: "Eduardo Bianchi", dni: "20-77777777-9", domicilio: "Corrientes 1500", mail: "edu@mail.com", celular: "11-7777-7777", telefono: "8888-8888", nroAfiliado: "99/77777777/00", parentesco: "Titular" },
    prestacion: { nombre: "Kinesiología", practicas: ["Sesión de rehabilitación"], cuit: "30-87654321-0" },
    factura: { tipo: "Factura B", nro: "00008888", monto: "$ 55.000" },
    cbu: "1111111111111111111111",
    historialAuditoria: [],
    historialTramite: [
      { fecha: "13/03/2026 09:30", accion: "Reintegro Creado", usuario: "admin_sistema", descripcion: "Carga inicial." }
    ]
  },
  "REI-2023-007": {
    id: "REI-2023-007", estado: "Pendiente", fecha: "12/03/2026",
    iniciador: { nombre: "Laura Paz", dni: "27-66666666-3", domicilio: "San Martín 99", mail: "laura@mail.com", celular: "11-6666-6666", telefono: "2222-2222" },
    afiliado: { nombre: "Laura Paz", dni: "27-66666666-3", domicilio: "San Martín 99", mail: "laura@mail.com", celular: "11-6666-6666", telefono: "2222-2222", nroAfiliado: "99/66666666/00", condicion: "Activo" },
    beneficiario: { nombre: "Laura Paz", dni: "27-66666666-3", domicilio: "San Martín 99", mail: "laura@mail.com", celular: "11-6666-6666", telefono: "2222-2222", nroAfiliado: "99/66666666/00", parentesco: "Titular" },
    prestacion: { nombre: "Psicología", practicas: ["Sesión individual"], cuit: "30-99999999-1" },
    factura: { tipo: "Factura C", nro: "00007777", monto: "$ 32.000" },
    cbu: "0000000000000000000002",
    historialAuditoria: [
      { nivel: 1, usuario: "auditor_n1", fecha: "13/03/2026 12:00", decision: "rechazar", montoSugerido: "", observacion: "Falta firma del profesional en la factura." }
    ],
    historialTramite: [
      { fecha: "12/03/2026 11:00", accion: "Reintegro Creado", usuario: "admin_sistema", descripcion: "Carga inicial." }
    ]
  }
};

const ReadOnlyField = ({ label, value }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 px-3 py-2.5 rounded border border-slate-100 dark:border-slate-800">{value || "-"}</span>
  </div>
);

const SectionCard = ({ title, icon: Icon, accentColor, children }) => (
  <section className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border overflow-hidden mb-6 ${accentColor ? 'border-primary/30' : 'border-slate-200 dark:border-slate-800'}`}>
    <div className={`border-b p-4 flex items-center gap-3 ${accentColor ? 'bg-primary/5 border-primary/20' : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'}`}>
      <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </section>
);

export default function AuditoriaDetalle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = MOCK_DETALLE[id] || MOCK_DETALLE["REI-2023-005"];

  const [decision, setDecision] = useState(null); // 'aceptar' | 'rechazar'
  const [montoAuditado, setMontoAuditado] = useState('');
  const [observacion, setObservacion] = useState('');
  const [confirmada, setConfirmada] = useState(false);

  const handleConfirmar = () => {
    if (!decision) {
      alert("Debe seleccionar Aceptar o Rechazar antes de confirmar.");
      return;
    }
    setConfirmada(true);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <nav className="flex text-sm text-slate-500 mb-2 gap-2">
          <button onClick={() => navigate('/reintegros-pendientes')} className="hover:text-primary hover:underline">Reintegros Pendientes</button>
          <span>/</span>
          <span className="text-slate-400">Auditoría</span>
          <span>/</span>
          <span className="text-primary font-medium">{data.id}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/reintegros-pendientes')}
              className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Auditoría — Trámite {data.id}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  {data.estado}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Iniciado el {data.fecha} · Revisión pendiente</p>
            </div>
          </div>
        </div>
      </div>

      {/* ───── AUDIT PANEL + HISTORY ───── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* LEFT: audit form */}
        <SectionCard title="Panel de Auditoría" icon={ClipboardCheck} accentColor>
        {confirmada ? (
          <div className={`flex items-center gap-4 p-4 rounded-xl border ${decision === 'aceptar' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            {decision === 'aceptar' ? <CheckCircle size={28} /> : <XCircle size={28} />}
            <div>
              <p className="font-bold text-lg">Auditoría confirmada: {decision === 'aceptar' ? 'Aceptar' : 'Rechazar'}</p>
              {decision === 'aceptar' && montoAuditado && <p className="text-sm">Monto aprobado: <strong>$ {montoAuditado}</strong></p>}
              {observacion && <p className="text-sm mt-1">Observación: {observacion}</p>}
            </div>
            <button onClick={() => setConfirmada(false)} className="ml-auto text-sm underline opacity-70 hover:opacity-100">Modificar</button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Monto actual */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <DollarSign size={22} className="text-primary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monto original solicitado</p>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{data.factura.monto}</p>
              </div>
            </div>

            {/* Decisión */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Decisión sugerida *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDecision('aceptar')}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${
                    decision === 'aceptar'
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <CheckCircle size={18} /> Aceptar
                </button>
                <button
                  onClick={() => setDecision('rechazar')}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${
                    decision === 'rechazar'
                      ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:bg-red-50/50'
                  }`}
                >
                  <XCircle size={18} /> Rechazar
                </button>
              </div>
            </div>

            {/* Monto auditado (solo si acepta) */}
            {decision === 'aceptar' && (
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Monto auditado <span className="font-normal text-slate-400">(dejar vacío para respetar el original)</span>
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white"
                    placeholder="Ej: 80000"
                    value={montoAuditado}
                    onChange={(e) => setMontoAuditado(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Observación */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                Observación <span className="font-normal text-slate-400">(opcional)</span>
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white resize-none"
                placeholder="Ej: Se reduce el monto por no contar con documentación completa..."
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleConfirmar}
                className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-sm"
              >
                Confirmar Auditoría
              </button>
            </div>
          </div>
        )}
        </SectionCard>

        {/* RIGHT: audit history from previous auditors */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-fit">
          <div className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0"><History size={20} /></div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Dictámenes anteriores</h3>
          </div>
          <div className="p-5">
            {data.historialAuditoria && data.historialAuditoria.length > 0 ? (
              <div className="space-y-4">
                {data.historialAuditoria.map((h, i) => (
                  <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                          <CircleUserRound size={12} /> Nivel {h.nivel}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{h.usuario}</span>
                      </div>
                      <time className="text-xs text-slate-400 shrink-0">{h.fecha}</time>
                    </div>
                    <div className="px-4 py-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dictamen:</span>
                        {h.decision === 'aceptar'
                          ? <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800"><CheckCircle size={12} /> Aceptar</span>
                          : <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800"><XCircle size={12} /> Rechazar</span>}
                      </div>
                      {h.montoSugerido && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monto sugerido:</span>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">$ {h.montoSugerido}</span>
                        </div>
                      )}
                      {h.observacion && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          {h.observacion}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <History size={36} className="text-slate-200 dark:text-slate-700 mb-3" />
                <p className="text-sm font-medium text-slate-500">Sin dictámenes previos</p>
                <p className="text-xs text-slate-400 mt-1">Este reintegro aún no fue revisado por otro auditor.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ───── REINTEGRO DETAIL (same as DetalleReintegro) ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SectionCard title="Datos del Iniciador" icon={User}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadOnlyField label="Nombre y Apellido" value={data.iniciador.nombre} />
              <ReadOnlyField label="DNI" value={data.iniciador.dni} />
              <div className="sm:col-span-2"><ReadOnlyField label="Domicilio" value={data.iniciador.domicilio} /></div>
              <ReadOnlyField label="Mail" value={data.iniciador.mail} />
              <ReadOnlyField label="Celular" value={data.iniciador.celular} />
              <ReadOnlyField label="Teléfono Fijo" value={data.iniciador.telefono} />
            </div>
          </SectionCard>

          <SectionCard title="Datos del Afiliado" icon={IdCard}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadOnlyField label="Nombre y Apellido" value={data.afiliado.nombre} />
              <ReadOnlyField label="DNI/CUIT" value={data.afiliado.dni} />
              <div className="sm:col-span-2"><ReadOnlyField label="Domicilio" value={data.afiliado.domicilio} /></div>
              <ReadOnlyField label="N° Afiliado" value={data.afiliado.nroAfiliado} />
              <ReadOnlyField label="Condición" value={data.afiliado.condicion} />
            </div>
          </SectionCard>

          <SectionCard title="Datos del Beneficiario" icon={IdCard}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadOnlyField label="Nombre y Apellido" value={data.beneficiario.nombre} />
              <ReadOnlyField label="DNI/CUIT" value={data.beneficiario.dni} />
              <div className="sm:col-span-2"><ReadOnlyField label="Domicilio" value={data.beneficiario.domicilio} /></div>
              <ReadOnlyField label="N° Afiliado" value={data.beneficiario.nroAfiliado} />
              <ReadOnlyField label="Parentesco" value={data.beneficiario.parentesco} />
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Prestación y Prácticas" icon={Hospital}>
            <div className="grid grid-cols-1 gap-4">
              <ReadOnlyField label="Prestación Principal" value={data.prestacion.nombre} />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prácticas ({data.prestacion.practicas.length})</span>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                  {data.prestacion.practicas.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle size={16} className="text-primary" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Facturación" icon={ReceiptText}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadOnlyField label="CUIT Prestador" value={data.prestacion.cuit} />
              <ReadOnlyField label="Tipo Comprobante" value={data.factura.tipo} />
              <ReadOnlyField label="Nro Comprobante" value={data.factura.nro} />
              <div className="sm:col-span-2 bg-primary/5 p-4 rounded-lg border border-primary/20 flex justify-between items-center">
                <span className="font-semibold text-primary">Monto Total</span>
                <span className="text-xl font-bold text-primary">{data.factura.monto}</span>
              </div>
              <div className="sm:col-span-2">
                <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                  <FileText size={18} /> Ver Comprobante Adjunto
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Recepción de Dinero (CBU)" icon={Banknote}>
            <div className="grid grid-cols-1 gap-4">
              <ReadOnlyField label="CBU Verificado" value={data.cbu} />
              <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <FileText size={18} /> Ver Constancia de CBU
              </button>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Historial */}
      <div className="mt-6">
        <SectionCard title="Historial de Auditoría" icon={History}>
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-8 pl-8 pb-4">
            {data.historialTramite && data.historialTramite.map((hito, idx) => (
              <div key={idx} className="relative">
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-12 ring-4 ring-white dark:ring-slate-900 bg-primary/10 text-primary">
                  {hito.accion.includes('Creado') ? <FileText size={16} /> :
                   hito.accion.includes('Auditoría') ? <FileCheck size={16} /> :
                   hito.accion.includes('Aprobación') ? <CheckCircle size={16} /> :
                   <AlertCircle size={16} />}
                </span>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{hito.accion}</h4>
                  <time className="text-sm font-medium text-slate-500 shrink-0">{hito.fecha}</time>
                </div>
                <span className="flex items-center gap-1 w-fit text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">
                  <CircleUserRound size={12} /> {hito.usuario}
                </span>
                {hito.descripcion && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800/60">
                    {hito.descripcion}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

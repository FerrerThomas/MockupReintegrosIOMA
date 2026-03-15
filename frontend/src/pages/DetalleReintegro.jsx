import { ArrowLeft, User, IdCard, Hospital, ReceiptText, Banknote, CheckCircle, FileText, History, FileCheck, CircleUserRound, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_DETALLE = {
  "REI-2023-001": {
    id: "REI-2023-001", estado: "Aprobado", fecha: "15/03/2026",
    iniciador: { nombre: "Juan Perez", dni: "20-11111111-9", domicilio: "Calle Falsa 123", mail: "juan@mail.com", celular: "11-1111-1111", telefono: "4444-4444" },
    afiliado: { nombre: "Juan Perez", dni: "20-11111111-9", domicilio: "Calle Falsa 123", mail: "juan@mail.com", celular: "11-1111-1111", telefono: "4444-4444", nroAfiliado: "99/11111111/00", condicion: "Activo" },
    beneficiario: { nombre: "Juan Perez", dni: "20-11111111-9", domicilio: "Calle Falsa 123", mail: "juan@mail.com", celular: "11-1111-1111", telefono: "4444-4444", nroAfiliado: "99/11111111/00", parentesco: "Titular" },
    prestacion: { nombre: "Odontología", practicas: ["Consulta general", "Limpieza de sarro"], cuit: "30-12345678-9" },
    factura: { tipo: "Factura C", nro: "00001234", monto: "$ 15.000" },
    cbu: "0000000000000000000001",
    historial: [
      { fecha: "15/03/2026 10:30", accion: "Reintegro Creado", usuario: "admin_sistema", descripcion: "Carga inicial del trámite." },
      { fecha: "16/03/2026 09:15", accion: "Auditoría Médica", usuario: "dr_lopez", descripcion: "Se aprueba la prestación odontológica solicitada." },
      { fecha: "17/03/2026 14:00", accion: "Aprobación Final", usuario: "dir_area", descripcion: "Trámite aprobado y listo para pago." }
    ]
  },
  "REI-2023-002": {
    id: "REI-2023-002", estado: "Pendiente", fecha: "14/03/2026",
    iniciador: { nombre: "Maria Gomez", dni: "27-22222222-4", domicilio: "Avenida Siempreviva 742", mail: "maria@mail.com", celular: "11-2222-2222", telefono: "5555-5555" },
    afiliado: { nombre: "Maria Gomez", dni: "27-22222222-4", domicilio: "Avenida Siempreviva 742", mail: "maria@mail.com", celular: "11-2222-2222", telefono: "5555-5555", nroAfiliado: "99/22222222/00", condicion: "Activo" },
    beneficiario: { nombre: "Maria Gomez", dni: "27-22222222-4", domicilio: "Avenida Siempreviva 742", mail: "maria@mail.com", celular: "11-2222-2222", telefono: "5555-5555", nroAfiliado: "99/22222222/00", parentesco: "Titular" },
    prestacion: { nombre: "Kinesiología", practicas: ["Sesión de rehabilitación"], cuit: "30-87654321-0" },
    factura: { tipo: "Factura B", nro: "00005678", monto: "$ 22.500" },
    cbu: "1111111111111111111111",
    historial: [
      { fecha: "14/03/2026 11:20", accion: "Reintegro Creado", usuario: "admin_sistema", descripcion: "Carga inicial del trámite por sistema." },
      { fecha: "15/03/2026 08:45", accion: "Revisión Documental", usuario: "sec_recepcion", descripcion: "Factura validada correctamente." }
    ]
  }
};

const ReadOnlyField = ({ label, value }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/50 px-3 py-2.5 rounded border border-slate-100 dark:border-slate-800">{value || "-"}</span>
  </div>
);

const SectionCard = ({ title, icon: Icon, children }) => (
  <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-6">
    <div className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </section>
);

export default function DetalleReintegro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = MOCK_DETALLE[id] || MOCK_DETALLE["REI-2023-001"]; // Fallback for unmatched IDs during testing

  return (
    <>
      <div className="mb-8">
        <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 mb-2 gap-2">
          <button onClick={() => navigate('/listado-reintegros')} className="hover:text-primary hover:underline">Reintegros</button>
          <span>/</span>
          <span className="text-slate-400">Detalle</span>
          <span>/</span>
          <span className="text-primary font-medium">{data.id}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/listado-reintegros')}
              className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
              title="Volver"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Trámite {data.id}</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${data.estado === 'Aprobado' ? 'bg-green-100 text-green-800' : data.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'}`}>
                  {data.estado === 'Aprobado' && <CheckCircle size={16} />}
                  {data.estado}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Iniciado el {data.fecha}</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-sm">
            Imprimir Comprobante
          </button>
        </div>
      </div>

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
                      <CheckCircle size={16} className="text-primary" />
                      {p}
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
              <div className="sm:col-span-2 mt-2">
                <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                  <FileText size={18} /> Ver Comprobante Adjunto
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Recepción de Dinero (CBU)" icon={Banknote}>
            <div className="grid grid-cols-1 gap-4">
              <ReadOnlyField label="CBU Verificado" value={data.cbu} />
              <div className="mt-2">
                <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                  <FileText size={18} /> Ver Constancia de CBU
                </button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="mt-8">
        <SectionCard title="Historial de Auditoría" icon={History}>
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-4 space-y-8 pl-6 md:pl-8 pb-4">
            {data.historial && data.historial.map((hito, idx) => (
              <div key={idx} className="relative">
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-10 md:-left-12 ring-4 ring-white dark:ring-slate-900 bg-primary/10 text-primary">
                  {hito.accion.includes('Creado') ? <FileText size={16} /> : 
                   hito.accion.includes('Auditoría') ? <FileCheck size={16} /> : 
                   hito.accion.includes('Aprobación') ? <CheckCircle size={16} /> : 
                   <AlertCircle size={16} />}
                </span>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{hito.accion}</h4>
                  <time className="text-sm font-medium text-slate-500 shrink-0">{hito.fecha}</time>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <CircleUserRound size={12} />
                    {hito.usuario}
                  </span>
                </div>
                {hito.descripcion && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800/60 mt-2">
                    {hito.descripcion}
                  </p>
                )}
              </div>
            ))}
            
            {(!data.historial || data.historial.length === 0) && (
              <p className="text-sm text-slate-500 italic">No hay registros en el historial para este trámite.</p>
            )}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

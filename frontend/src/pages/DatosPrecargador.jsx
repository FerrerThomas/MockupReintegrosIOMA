import {
  User, IdCard, ClipboardList, Hospital,
  ReceiptText, Banknote, Search, CheckCircle, Info
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MOCK_INICIADORES = [
  { dni: "20-11111111-9", nombre: "Juan Perez", domicilio: "Calle Falsa 123", mail: "juan@mail.com", celular: "11-1111-1111", telefono: "4444-4444", afiliado: "99/11111111/00", estado: "Activo" },
  { dni: "27-22222222-4", nombre: "Maria Gomez", domicilio: "Av. Siempreviva 742", mail: "maria@mail.com", celular: "11-2222-2222", telefono: "5555-5555", afiliado: "99/22222222/01", estado: "Activo" }
];

const MOCK_AFILIADOS = [
  { dni: "20-11111111-9", nombre: "Juan Perez", domicilio: "Calle Falsa 123", mail: "juan@mail.com", celular: "11-1111-1111", telefono: "4444-4444", afiliado: "99/11111111/00", estado: "Activo" },
  { dni: "20-33333333-9", nombre: "Carlos Lopez", domicilio: "San Martin 456", mail: "carlos@mail.com", celular: "11-3333-3333", telefono: "6666-6666", afiliado: "99/33333333/00", estado: "Activo" },
  { dni: "27-44444444-4", nombre: "Ana Martinez", domicilio: "Belgrano 789", mail: "ana@mail.com", celular: "11-4444-4444", telefono: "7777-7777", afiliado: "99/44444444/01", estado: "Inactivo" }
];

const MOCK_BENEFICIARIOS = [
  { dni: "20-55555555-9", nombre: "Pedro Sanchez", domicilio: "Mitre 101", mail: "pedro@mail.com", celular: "11-5555-5555", telefono: "8888-8888", afiliado: "99/55555555/00", estado: "Activo" },
  { dni: "27-66666666-4", nombre: "Laura Fernandez", domicilio: "Sarmiento 202", mail: "laura@mail.com", celular: "11-6666-6666", telefono: "9999-9999", afiliado: "99/66666666/01", estado: "Activo" }
];

const MOCK_PRESTACIONES = [
  { id: "odontologia", label: "Odontológica", practicas: ["Consulta general", "Limpieza de sarro", "Fluorización", "Blanqueamiento"] },
  { id: "kinesiologia", label: "Kinesiología", practicas: ["Rehabilitación", "Masaje terapéutico", "Electroterapia", "Magnetoterapia"] },
  { id: "psicologia", label: "Psicología", practicas: ["Terapia individual", "Terapia de pareja", "Terapia cognitiva", "Psicoanálisis"] }
];

const MOCK_CBU_VALIDO = "0000000000000000000001";
const MOCK_CBU_INVALIDO = "1111111111111111111111";
const MOCK_FACTURA_VALIDA = "12345678";
const MOCK_FACTURA_INVALIDA = "00000000";

export default function DatosPrecargador() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDni = location.state?.initialDni || null;

  const [isSearchingIniciador, setIsSearchingIniciador] = useState(false);
  const [isSearchingAfiliado, setIsSearchingAfiliado] = useState(false);
  const [isSearchingBeneficiario, setIsSearchingBeneficiario] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [iniciador, setIniciador] = useState(null);
  const [afiliado, setAfiliado] = useState(null);
  const [beneficiario, setBeneficiario] = useState(null);

  const [prestacion, setPrestacion] = useState("");
  const practicasOptions = MOCK_PRESTACIONES.find(p => p.id === prestacion)?.practicas || [];

  const [cbu, setCbu] = useState("");
  const [cbuStatus, setCbuStatus] = useState(null); // null, 'success', 'error'

  const [factura, setFactura] = useState("");
  const [facturaStatus, setFacturaStatus] = useState(null);

  // Auto-fill logic when entering the view with a DNI from IniciarReintegro
  useEffect(() => {
    if (initialDni) {
      handleSearchIniciador(initialDni);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDni]);

  const handleSearchIniciador = (dni) => {
    const found = MOCK_INICIADORES.find(i => i.dni === dni);
    if (found) {
      setIniciador(found);

      const foundAfiliado = MOCK_AFILIADOS.find(a => a.dni === dni);
      if (foundAfiliado) {
        setAfiliado(foundAfiliado);
      }

      setBeneficiario(found);
    } else {
      alert("Iniciador no encontrado. Use 20-11111111-9 o 27-22222222-4");
    }
    setIsSearchingIniciador(false);
  };

  const handleSearchAfiliado = (dni) => {
    const found = MOCK_AFILIADOS.find(a => a.dni === dni);
    if (found) setAfiliado(found);
    else alert("Afiliado no encontrado. Use 20-33333333-9 o 27-44444444-4");
    setIsSearchingAfiliado(false);
  };

  const handleSearchBeneficiario = (dni) => {
    const found = MOCK_BENEFICIARIOS.find(b => b.dni === dni);
    if (found) setBeneficiario(found);
    else alert("Beneficiario no encontrado. Use 20-55555555-9 o 27-66666666-4");
    setIsSearchingBeneficiario(false);
  };

  const handleValidarCBU = () => {
    if (cbu === MOCK_CBU_VALIDO) setCbuStatus('success');
    else setCbuStatus('error');
  };

  const handleValidarFactura = () => {
    if (factura === MOCK_FACTURA_VALIDA) setFacturaStatus('success');
    else setFacturaStatus('error');
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
                  {[
                    { category: "DNI Iniciador (también Afiliado y Beneficiario)", items: [
                      { label: "Juan Perez", value: "20-11111111-9", note: "Carga los 3 contenedores" },
                      { label: "Maria Gomez", value: "27-22222222-4", note: "Iniciador y Beneficiario" },
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
                      { label: "Inválida ❌", value: "00000000" },
                    ]},
                    { category: "CBU", items: [
                      { label: "Válido ✅ (22 dígitos)", value: "0000000000000000000001" },
                      { label: "Inválido ❌", value: "1111111111111111111111" },
                    ]},
                  ].map((group, gi, arr) => (
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
                      {gi < arr.length - 1 && <div className="border-t border-slate-100 dark:border-slate-800 mt-2" />}
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
        {/* Section 1: Datos del Iniciador */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#00AEC3]/30 flex justify-between items-center" style={{ background: "#00AEC3" }}>
            <div className="flex items-center gap-2">
              <User className="text-white w-6 h-6" />
              <h3 className="font-bold text-white">1. Datos del Iniciador</h3>
            </div>
            <button onClick={() => setIsSearchingIniciador(!isSearchingIniciador)} className="px-4 py-1.5 bg-white text-[#00AEC3] rounded-lg font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-sm text-sm ml-auto">
              <Search size={16} />
              Buscar Iniciador
            </button>
          </div>
          {isSearchingIniciador && (
            <InlineSearchForm onCancel={() => setIsSearchingIniciador(false)} onSearch={handleSearchIniciador} />
          )}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <InputField label="DNI / CUIT" placeholder="Ej: 20-33444555-9" value={iniciador?.dni || ''} readOnly />
              <InputField label="Nombre y Apellido" placeholder="Nombre y Apellido" value={iniciador?.nombre || ''} readOnly />
              <InputField label="Domicilio" placeholder="Calle y altura" value={iniciador?.domicilio || ''} readOnly />
              <InputField label="Mail" placeholder="correo@ejemplo.com" type="email" value={iniciador?.mail || ''} readOnly />
              <InputField label="Celular" placeholder="Código de área + número" value={iniciador?.celular || ''} readOnly />
              <InputField label="Teléfono" placeholder="Número fijo" value={iniciador?.telefono || ''} readOnly />
              <InputField label="Número de Afiliado" placeholder="99/00000000/00" value={iniciador?.afiliado || ''} readOnly />
              <InputField label="Estado Afiliado" placeholder="Estado actual" value={iniciador?.estado || ''} readOnly />
            </div>
          </div>
        </section>

        {/* Section 2: Datos del Afiliado */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#00AEC3]/30 flex justify-between items-center" style={{ background: "#00AEC3" }}>
            <div className="flex items-center gap-2">
              <IdCard className="text-white w-6 h-6" />
              <h3 className="font-bold text-white">2. Datos del Afiliado</h3>
            </div>
            <button onClick={() => setIsSearchingAfiliado(!isSearchingAfiliado)} className="px-4 py-1.5 bg-white text-[#00AEC3] rounded-lg font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-sm text-sm ml-auto">
              <Search size={16} />
              Buscar Afiliado
            </button>
          </div>
          {isSearchingAfiliado && (
            <InlineSearchForm onCancel={() => setIsSearchingAfiliado(false)} onSearch={handleSearchAfiliado} />
          )}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <InputField label="DNI / CUIT" placeholder="Ej: 20-33444555-9" value={afiliado?.dni || ''} readOnly />
              <InputField label="Nombre y Apellido" placeholder="Nombre y Apellido" value={afiliado?.nombre || ''} readOnly />
              <InputField label="Domicilio" placeholder="Calle y altura" value={afiliado?.domicilio || ''} readOnly />
              <InputField label="Mail" placeholder="correo@ejemplo.com" type="email" value={afiliado?.mail || ''} readOnly />
              <InputField label="Celular" placeholder="Código de área + número" value={afiliado?.celular || ''} readOnly />
              <InputField label="Teléfono" placeholder="Número fijo" value={afiliado?.telefono || ''} readOnly />
              <InputField label="Número de Afiliado" placeholder="99/00000000/00" value={afiliado?.afiliado || ''} readOnly />
              <InputField label="Estado Afiliado" placeholder="Estado actual" value={afiliado?.estado || ''} readOnly />
            </div>
          </div>
        </section>

        {/* Section 3: Datos del Beneficiario */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#00AEC3]/30 flex justify-between items-center" style={{ background: "#00AEC3" }}>
            <div className="flex items-center gap-2">
              <ClipboardList className="text-white w-6 h-6" />
              <h3 className="font-bold text-white">3. Datos del Beneficiario</h3>
            </div>
            <button onClick={() => setIsSearchingBeneficiario(!isSearchingBeneficiario)} className="px-4 py-1.5 bg-white text-[#00AEC3] rounded-lg font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-sm text-sm ml-auto">
              <Search size={16} />
              Buscar Beneficiario
            </button>
          </div>
          {isSearchingBeneficiario && (
            <InlineSearchForm onCancel={() => setIsSearchingBeneficiario(false)} onSearch={handleSearchBeneficiario} />
          )}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <InputField label="DNI / CUIT" placeholder="Ej: 20-33444555-9" value={beneficiario?.dni || ''} readOnly />
              <InputField label="Nombre y Apellido" placeholder="Nombre y Apellido" value={beneficiario?.nombre || ''} readOnly />
              <InputField label="Domicilio" placeholder="Calle y altura" value={beneficiario?.domicilio || ''} readOnly />
              <InputField label="Mail" placeholder="correo@ejemplo.com" type="email" value={beneficiario?.mail || ''} readOnly />
              <InputField label="Celular" placeholder="Código de área + número" value={beneficiario?.celular || ''} readOnly />
              <InputField label="Teléfono" placeholder="Número fijo" value={beneficiario?.telefono || ''} readOnly />
              <InputField label="Número de Afiliado" placeholder="99/00000000/00" value={beneficiario?.afiliado || ''} readOnly />
              <InputField label="Estado Afiliado" placeholder="Estado actual" value={beneficiario?.estado || ''} readOnly />
            </div>
          </div>
        </section>

        {/* Section 4: Datos de la prestación */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#00AEC3]/30 flex items-center gap-2" style={{ background: "#00AEC3" }}>
            <Hospital className="text-white w-6 h-6" />
            <h3 className="font-bold text-white">4. Datos de la prestación</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Prestación"
                defaultOption="Seleccionar prestación"
                options={MOCK_PRESTACIONES.map(p => ({ value: p.id, label: p.label }))}
                value={prestacion}
                onChange={(e) => setPrestacion(e.target.value)}
              />
              <SelectField
                label="Práctica"
                defaultOption="Seleccionar práctica"
                options={practicasOptions.map(p => ({ value: p, label: p }))}
                disabled={!prestacion}
              />
            </div>
          </div>
        </section>

        {/* Section 5: Datos de la factura */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#00AEC3]/30 flex items-center gap-2" style={{ background: "#00AEC3" }}>
            <ReceiptText className="text-white w-6 h-6" />
            <h3 className="font-bold text-white">5. Datos de la factura</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CUIT Prestador</label>
                <div className="flex gap-2 items-center">
                  <input
                    className="flex-1 px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white"
                    placeholder="Ej: 30-12345678-9"
                    type="text"
                  />
                  <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all text-sm flex items-center gap-1">
                    <Search size={20} />
                  </button>
                </div>
              </div>
              <SelectField
                label="Tipo de comprobante"
                defaultOption="Seleccionar tipo"
                options={[
                  { value: "factura_a", label: "Factura A" },
                  { value: "factura_b", label: "Factura B" },
                  { value: "factura_c", label: "Factura C" }
                ]}
              />
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <div className="w-1/3 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">P. Venta</label>
                    <input className="w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white" maxLength="5" placeholder="0000" type="text" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nro Comprobante</label>
                    <div className="flex gap-2">
                      <input
                        className={`w-full px-4 py-3 text-base rounded-lg border bg-slate-50 dark:bg-slate-900 focus:ring-4 transition-all shadow-sm text-slate-900 dark:text-white ${facturaStatus === 'error' ? 'border-red-500 focus:ring-red-500/20' : facturaStatus === 'success' ? 'border-green-500 focus:ring-green-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary/20'}`}
                        maxLength="8"
                        placeholder="00000000"
                        type="text"
                        value={factura}
                        onChange={(e) => { setFactura(e.target.value); setFacturaStatus(null); }}
                      />
                      <button onClick={handleValidarFactura} className="px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all text-sm flex items-center justify-center">
                        <CheckCircle size={20} />
                      </button>
                    </div>
                    {facturaStatus === 'error' && <span className="text-red-500 text-xs font-semibold">Factura inválida o ya cargada</span>}
                    {facturaStatus === 'success' && <span className="text-green-500 text-xs font-semibold">Factura válida disponible</span>}
                  </div>
                </div>
              </div>
              <InputField label="Número de CAE" placeholder="Ingrese CAE" />
              <InputField label="Monto total" placeholder="$ 0.00" />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subir factura</label>
                <input
                  className="w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-slate-500"
                  type="file"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Cuenta a Depositar */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#00AEC3]/30 flex items-center gap-2" style={{ background: "#00AEC3" }}>
            <Banknote className="text-white w-6 h-6" />
            <h3 className="font-bold text-white">6. Cuenta a Depositar</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CBU</label>
                <div className="flex gap-2">
                  <input
                    className={`flex-1 px-4 py-3 text-base rounded-lg border bg-slate-50 dark:bg-slate-900 focus:ring-4 transition-all shadow-sm text-slate-900 dark:text-white ${cbuStatus === 'error' ? 'border-red-500 focus:ring-red-500/20' : cbuStatus === 'success' ? 'border-green-500 focus:ring-green-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 focus:border-primary focus:ring-primary/20'}`}
                    placeholder="Ingrese los 22 dígitos del CBU"
                    type="text"
                    value={cbu}
                    onChange={(e) => { setCbu(e.target.value); setCbuStatus(null); }}
                    maxLength="22"
                  />
                  <button onClick={handleValidarCBU} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all text-sm flex items-center gap-1">
                    <CheckCircle size={16} />
                    Validar
                  </button>
                </div>
                {cbuStatus === 'error' && <span className="text-red-500 text-xs font-semibold">El CBU ingresado no es válido</span>}
                {cbuStatus === 'success' && <span className="text-green-500 text-xs font-semibold">CBU validado correctamente</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subir comprobante CBU</label>
                <input
                  className="w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-slate-500"
                  type="file"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button className="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" onClick={() => navigate('/inicio')}>
            Cancelar
          </button>
          <button className="px-10 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            Iniciar Reintegro
          </button>
        </div>
      </div>
    </>
  );
}

// Helper Components
function InputField({ label, placeholder, type = "text", value, readOnly, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <input
        className={`w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white ${readOnly ? 'opacity-80' : 'hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all'}`}
        placeholder={placeholder}
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
    </div>
  );
}

function SelectField({ label, defaultOption, options = [], value, onChange, disabled }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <select
        className={`w-full px-4 py-3 text-base rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all shadow-sm text-slate-900 dark:text-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-400 dark:hover:border-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary'}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">{defaultOption}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function InlineSearchForm({ onSearch, onCancel }) {
  const [dni, setDni] = useState("");

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800">
      <form onSubmit={(e) => { e.preventDefault(); onSearch && onSearch(dni); }} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <SelectField
          label="Sexo"
          defaultOption="Seleccionar..."
          options={[
            { value: "M", label: "Masculino" },
            { value: "F", label: "Femenino" },
            { value: "X", label: "No binario" }
          ]}
        />
        <InputField
          label="DNI / CUIT"
          placeholder="Ej: 20-33444555-9"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <div className="flex gap-4 items-end">
          <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex-1">
            Cancelar
          </button>
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm flex-1">
            <Search size={20} />
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}

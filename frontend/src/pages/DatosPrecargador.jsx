import { 
  User, IdCard, ClipboardList, Hospital, 
  ReceiptText, Banknote, Search, CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DatosPrecargador() {
  const navigate = useNavigate();

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
        {/* Section 1: Datos del Iniciador */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="text-primary w-6 h-6" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Datos del Iniciador</h3>
            </div>
            <button className="px-4 py-1.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm text-sm ml-auto">
              <Search size={16} />
              Buscar Iniciador
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <InputField label="DNI / CUIT" placeholder="Ej: 20-33444555-9" />
              <InputField label="Nombre y Apellido" placeholder="Nombre y Apellido" />
              <InputField label="Domicilio" placeholder="Calle y altura" />
              <InputField label="Mail" placeholder="correo@ejemplo.com" type="email" />
              <InputField label="Celular" placeholder="Código de área + número" />
              <InputField label="Teléfono" placeholder="Número fijo" />
              <InputField label="Número de Afiliado" placeholder="99/00000000/00" />
              <InputField label="Estado Afiliado" placeholder="Estado actual" />
            </div>
          </div>
        </section>

        {/* Section 2: Datos del Afiliado */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <IdCard className="text-primary w-6 h-6" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">2. Datos del Afiliado</h3>
            </div>
            <button className="px-4 py-1.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm text-sm ml-auto">
              <Search size={16} />
              Buscar Afiliado
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <InputField label="DNI / CUIT" placeholder="Ej: 20-33444555-9" />
              <InputField label="Nombre y Apellido" placeholder="Nombre y Apellido" />
              <InputField label="Domicilio" placeholder="Calle y altura" />
              <InputField label="Mail" placeholder="correo@ejemplo.com" type="email" />
              <InputField label="Celular" placeholder="Código de área + número" />
              <InputField label="Teléfono" placeholder="Número fijo" />
              <InputField label="Número de Afiliado" placeholder="99/00000000/00" />
              <InputField label="Estado Afiliado" placeholder="Estado actual" />
            </div>
          </div>
        </section>

        {/* Section 3: Datos del Beneficiario */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ClipboardList className="text-primary w-6 h-6" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">3. Datos del Beneficiario</h3>
            </div>
            <button className="px-4 py-1.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm text-sm ml-auto">
              <Search size={16} />
              Buscar Beneficiario
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <InputField label="DNI / CUIT" placeholder="Ej: 20-33444555-9" />
              <InputField label="Nombre y Apellido" placeholder="Nombre y Apellido" />
              <InputField label="Domicilio" placeholder="Calle y altura" />
              <InputField label="Mail" placeholder="correo@ejemplo.com" type="email" />
              <InputField label="Celular" placeholder="Código de área + número" />
              <InputField label="Teléfono" placeholder="Número fijo" />
              <InputField label="Número de Afiliado" placeholder="99/00000000/00" />
              <InputField label="Estado Afiliado" placeholder="Estado actual" />
            </div>
          </div>
        </section>

        {/* Section 4: Datos de la prestación */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Hospital className="text-primary w-6 h-6" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">4. Datos de la prestación</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField label="Prestación" defaultOption="Seleccionar prestación" />
              <SelectField label="Práctica" defaultOption="Seleccionar práctica" />
            </div>
          </div>
        </section>

        {/* Section 5: Datos de la factura */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <ReceiptText className="text-primary w-6 h-6" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">5. Datos de la factura</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CUIT Prestador</label>
                <div className="flex gap-2 items-center">
                  <input 
                    className="flex-1 rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" 
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
                  {value: "factura_a", label: "Factura A"},
                  {value: "factura_b", label: "Factura B"},
                  {value: "factura_c", label: "Factura C"}
                ]} 
              />
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <div className="w-1/3 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">P. Venta</label>
                    <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" maxLength="5" placeholder="0000" type="text" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nro Comprobante</label>
                    <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" maxLength="8" placeholder="00000000" type="text" />
                  </div>
                </div>
              </div>
              <InputField label="Número de CAE" placeholder="Ingrese CAE" />
              <InputField label="Monto total" placeholder="$ 0.00" />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subir factura</label>
                <input 
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-slate-500" 
                  type="file" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Cuenta a Depositar */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Banknote className="text-primary w-6 h-6" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">6. Cuenta a Depositar</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CBU</label>
                <div className="flex gap-2">
                  <input 
                    className="flex-1 rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" 
                    placeholder="Ingrese los 22 dígitos del CBU" 
                    type="text" 
                  />
                  <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all text-sm flex items-center gap-1">
                    <CheckCircle size={16} />
                    Validar
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subir comprobante CBU</label>
                <input 
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-slate-500" 
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
function InputField({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <input 
        className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" 
        placeholder={placeholder} 
        type={type} 
      />
    </div>
  );
}

function SelectField({ label, defaultOption, options = [] }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-slate-900 dark:text-white">
        <option value="">{defaultOption}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

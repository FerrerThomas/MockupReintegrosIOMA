import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import IniciarReintegro from './pages/IniciarReintegro';
import DatosPrecargador from './pages/DatosPrecargador';
import ListadoReintegros from './pages/ListadoReintegros';
import DetalleReintegro from './pages/DetalleReintegro';
import ReintegrosPendientes from './pages/ReintegrosPendientes';
import AuditoriaDetalle from './pages/AuditoriaDetalle';
import AuditoriaDetalle2 from './pages/AuditoriaDetalle2';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/iniciar-reintegro" element={<IniciarReintegro />} />
          <Route path="/datos-precargado" element={<DatosPrecargador />} />
          <Route path="/listado-reintegros" element={<ListadoReintegros />} />
          <Route path="/detalle-reintegro/:id" element={<DetalleReintegro />} />
          <Route path="/reintegros-pendientes" element={<ReintegrosPendientes />} />
          <Route path="/auditoria-detalle/:id" element={<AuditoriaDetalle />} />
          <Route path="/auditoria-detalle2/:id" element={<AuditoriaDetalle2 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

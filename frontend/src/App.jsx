import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import IniciarReintegro from './pages/IniciarReintegro';
import DatosPrecargador from './pages/DatosPrecargador';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/iniciar-reintegro" element={<IniciarReintegro />} />
          <Route path="/datos-precargado" element={<DatosPrecargador />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

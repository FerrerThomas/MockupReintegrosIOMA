import { Menu, CircleUserRound, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  return (
    <header className="w-full flex items-center justify-between px-0 h-16 shadow-md shrink-0" style={{ background: 'linear-gradient(to right, #00AEC3, #e81f76)' }}>
      <div className="flex items-center h-full">
        <Link to="/" className="h-full flex items-center px-4">
          <img alt="IOMA Logo" className="h-10 w-auto object-contain" src="/logosNavbar/logo IOAMA esquina izquierda.png" />
        </Link>
        <button 
          onClick={onMenuClick}
          className="text-white px-4 h-full flex items-center hover:bg-white/10 transition-colors lg:hidden"
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="flex items-center gap-6 pr-4 h-full">
        <div className="flex items-center text-white gap-2">
          <span className="text-sm font-semibold">Usuario</span>
          <CircleUserRound size={24} />
        </div>
        <button className="flex items-center text-white gap-2 hover:bg-white/10 px-3 py-1 rounded transition-colors h-full">
          <span className="text-sm font-semibold">Salir</span>
          <LogOut size={20} />
        </button>
        <div className="h-12 flex items-center border-l border-white/30 pl-4 ml-2">
          <img alt="Gobierno BA" className="h-10 w-auto object-contain brightness-0 invert" src="/logosNavbar/logo BA esquina derecha.png" />
        </div>
      </div>
    </header>
  );
}

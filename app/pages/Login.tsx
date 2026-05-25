import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogIn } from 'lucide-react';
import logo from 'figma:asset/e26f162e3f7adca37023bc3d257bafaa22f28dae.png';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos login como técnico
    navigate('/panel');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Formas 3D abstractas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Espiral grande superior izquierda */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-600/20 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '8s' }}></div>

        {/* Tubo entrelazado derecha */}
        <div className="absolute top-20 -right-32 w-80 h-[600px] bg-gradient-to-b from-cyan-400/20 to-blue-500/30 rounded-full blur-2xl rotate-45 animate-pulse"
             style={{ animationDuration: '10s', animationDelay: '1s' }}></div>

        {/* Forma orgánica centro-inferior */}
        <div className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/25 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '12s', animationDelay: '2s' }}></div>

        {/* Espiral pequeña superior derecha */}
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-gradient-to-bl from-cyan-300/20 to-blue-400/15 rounded-full blur-2xl animate-pulse"
             style={{ animationDuration: '9s', animationDelay: '0.5s' }}></div>

        {/* Forma abstracta izquierda inferior */}
        <div className="absolute bottom-40 -left-20 w-72 h-72 bg-gradient-to-tr from-blue-600/20 to-cyan-500/25 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '11s', animationDelay: '1.5s' }}></div>
      </div>

      {/* Tarjeta de login con efecto glassmorphism */}
      <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-md">
        {/* Efecto de brillo superior */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

        <div className="flex flex-col items-center mb-8">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-cyan-400/30 blur-2xl rounded-full"></div>
            <img src={logo} alt="InvenDesk Smart Logo" className="w-32 h-32 object-contain relative z-10 drop-shadow-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">InvenDesk Smart</h1>
          <p className="text-sm text-cyan-100/90 text-center">
            Sistema de Inventario y Mesa de Ayuda
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
              placeholder="Ingrese su usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-cyan-500/50 hover:shadow-2xl flex items-center justify-center gap-2 mt-6 border border-white/20"
          >
            <LogIn className="w-5 h-5" />
            Iniciar sesión
          </button>
        </form>

        {/* Separador "or continue with" */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-white/70 bg-white/5 backdrop-blur-sm rounded-full">o continúa con</span>
          </div>
        </div>

        {/* Botones de redes sociales */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Google */}
          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200 py-3 rounded-xl shadow-lg hover:shadow-xl border border-white/50 flex items-center justify-center group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200 py-3 rounded-xl shadow-lg hover:shadow-xl border border-white/50 flex items-center justify-center group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#181717"/>
            </svg>
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200 py-3 rounded-xl shadow-lg hover:shadow-xl border border-white/50 flex items-center justify-center group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
        </div>

        {/* Registro */}
        <div className="text-center">
          <p className="text-white/70 text-sm">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors underline decoration-cyan-300/50 hover:decoration-cyan-200">
              Regístrate gratis
            </a>
          </p>
        </div>

        {/* Efecto de brillo inferior */}
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </div>
    </div>
  );
}
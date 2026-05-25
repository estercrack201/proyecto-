import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface BotonVolverProps {
  ruta: string;
}

export default function BotonVolver({ ruta }: BotonVolverProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 left-72 z-30">
      <button
        onClick={() => navigate(ruta)}
        className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition shadow-lg hover:shadow-xl text-gray-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver
      </button>
    </div>
  );
}

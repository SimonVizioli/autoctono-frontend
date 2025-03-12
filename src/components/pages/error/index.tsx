import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            {/* Fondo con gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-orange-950/30 pointer-events-none" />

            {/* Patrón de puntos */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,48,30,0.15)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 max-w-md w-full text-center space-y-8">
                {/* Icono de error estilizado */}
                <div className="relative mx-auto w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-600 rounded-full opacity-20 blur-xl animate-pulse" />
                    <div className="relative flex items-center justify-center w-full h-full">
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-red-500"
                        >
                            <path
                                d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Mensaje de error */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-white">
                        Algo salió mal
                    </h1>
                    <p className="text-slate-400">
                        Lo sentimos, ha ocurrido un error inesperado. Nuestro
                        equipo ha sido notificado.
                    </p>
                </div>

                {/* Acciones */}
                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        variant="outline"
                        className="border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Ir al inicio
                        </Link>
                    </Button>
                </div>

                {/* Información adicional */}
                <div className="pt-8 border-t border-slate-800 mt-8">
                    <p className="text-sm text-slate-500">
                        Si el problema persiste, por favor contacta a soporte
                        técnico o intenta más tarde.
                    </p>
                </div>
            </div>

            {/* Decoración de cerámica rota */}
            <div className="absolute bottom-0 right-0 w-full h-32 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -bottom-10 right-1/2 transform translate-x-1/2 w-[600px] h-[600px] rounded-full border-8 border-red-700/20"></div>
                <div className="absolute -bottom-5 right-1/4 transform translate-x-1/2 w-[300px] h-[300px] rounded-full border-4 border-red-600/10"></div>
                <div className="absolute -bottom-8 left-1/4 transform -translate-x-1/2 w-[400px] h-[400px] rounded-full border-6 border-orange-600/20"></div>
            </div>
        </div>
    );
};

export default ErrorPage;

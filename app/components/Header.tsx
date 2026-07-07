export function Header() {

    const today = new Date();

    const worldCupEnd = new Date(2026, 6, 20);

    const isFinished = today >= worldCupEnd;

    return (
        <header className="relative pt-12 pb-8 px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 fade-in-up">
                <span
                    className={`w-2 h-2 rounded-full pulse-dot ${isFinished ? "bg-gray-400 text-gray-400" : "bg-green-400 text-green-400"
                        }`}
                ></span>

                <span
                    className={`text-xs font-semibold tracking-wider uppercase ${isFinished ? "text-gray-400" : "text-green-400"
                        }`}
                >
                    {isFinished
                        ? "Mundial Finalizado"
                        : "En vivo · Mundial 2026"}
                </span>
            </div>
            <h1
                className="font-display text-6xl md:text-8xl lg:text-9xl leading-none fade-in-up"
                style={{ animationDelay: '0.1s' }}
            >
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                    TOP SCORERS
                </span>
            </h1>
            <p
                className="mt-4 text-white/50 text-sm md:text-base max-w-xl mx-auto fade-in-up"
                style={{ animationDelay: '0.2s' }}
            >
                Ranking actualizado de goleadores · FIFA World Cup 2026™
            </p>
            <div
                className="mt-8 flex items-center justify-center gap-8 text-xs text-white/40 fade-in-up"
                style={{ animationDelay: '0.3s' }}
            >
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    <span>Datos oficiales</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span>Rating IA</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>Actualizado hoy</span>
                </div>
            </div>
        </header>
    );
}